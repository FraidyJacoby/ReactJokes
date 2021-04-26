import React from 'react';
import { AuthContext } from '../AuthContext';
import Joke from '../components/Joke';
import axios from 'axios';
import { produce } from 'immer';

class Home extends React.Component {
    state = {
        joke: {
            id: '',
            setup: '',
            punchline: '',
            likes: '',
            dislikes: '',
            likeDisabled: false,
            dislikeDisabled: false
        },
        interactedWithJoke: false,
        timer: null,
        timeout: false
    }

    componentDidMount = async () => {
        await this.getNewJoke();
    }

    getNewJoke = async() => {
        const { data } = await axios.get('/api/jokes/getrandomjoke');
        this.setState({ joke: data });
        await this.getLikesAndDislikes();
        await this.checkInteractionAndSetButtons();
    }

    getLikesAndDislikes = async () => {
        const { data } = await axios.get(`/api/jokes/getlikesdislikescount?jokeId=${parseInt(this.state.joke.id)}&liked=true`);
        const { data: dataDislikes } = await axios.get(`/api/jokes/getlikesdislikescount?jokeId=${parseInt(this.state.joke.id)}&liked=false`);

        const nextState = produce(this.state, draft => {
            draft.joke.likes = data;
            draft.joke.dislikes = dataDislikes;
        })
        this.setState(nextState);
    }

    checkInteractionAndSetButtons = async () => {
        const { data } = await axios.get(`/api/jokes/getpreviousinteraction?jokeId=${parseInt(this.state.joke.id)}`);
        if (data) {
            this.disableButtons();
        }
        this.setState({ interactedWithJoke: true });
    }

    toggleButtons = like => {
        const nextState = produce(this.state, draft => {
            draft.joke.likeDisabled = (like ? true : false);
            draft.joke.dislikeDisabled = (like ? false : true);
        })
        this.setState(nextState);
    }

    disableButtons = () => {
        const nextState = produce(this.state, draft => {
            draft.joke.likeDisabled = true;
            draft.joke.dislikeDisabled = true;
        })
        this.setState(nextState);
    }

    setTimer = () => {
        const timeout = setTimeout(() => {
            this.disableButtons();
            this.setState({ timeout: true });
        }, 30000)
        this.setState({ timer: timeout });
    }

    onLikeDislike = async value => {
        const like = (value === 'true' ? true : false);

        const jokeId = parseInt(this.state.joke.id);

        if (this.state.interactedWithJoke) {
            await axios.post('/api/jokes/deleteuserlikedjoke', { jokeId });
        }

        const vm = {
            jokeId,
            like
        }

        await axios.post('/api/jokes/likedislikejoke', vm);
        await this.getLikesAndDislikes();

        this.setState({ interactedWithJoke: true });
        if (!this.state.timeout) {
            this.toggleButtons(like);
        }
        if (this.state.timer == null) {
            this.setTimer();
        }
    }

    onNewClick = async () => {
        window.location.reload();
    }

    componentWillUnmount = () => {
        clearTimeout(this.state.timer);
    }

    render() {
        const { joke } = this.state;
        const { onLikeDislike, onNewClick } = this;

        return (
            <AuthContext.Consumer>
                {value => {
                    const { user } = value;
                    const isLoggedIn = !!user;
                    return (
                        <>
                            <Joke joke={joke} key={joke.id} showButtons={isLoggedIn} onLikeDislike={e => onLikeDislike(e.target.value)} />
                            <button style={{ marginTop: 30 }} className="btn btn-primary" onClick={onNewClick}>New Joke</button>
                        </>
                    );
                }}
            </AuthContext.Consumer>
        );
    }
}

export default Home;
