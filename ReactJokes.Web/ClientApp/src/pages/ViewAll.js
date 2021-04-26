import React from 'react';
import axios from 'axios';
import Joke from '../components/Joke';

class ViewAll extends React.Component {

    state = {
        jokes: [],
    }

    componentDidMount = () => {
        let jokes = [];

        axios.get('/api/jokes/getalljokes').then(response => {
            jokes = response.data;
        })
            .then(() =>
                Promise.all(jokes.map(joke =>
                    axios.get(`api/jokes/getlikesdislikescount?jokeId=${joke.id}&liked=true`)
                        .then(response => {
                            joke.likes = response.data;
                        })
                        .then(() =>
                            Promise.all(jokes.map(joke =>
                                axios.get(`api/jokes/getlikesdislikescount?jokeId=${joke.id}&liked=false`)
                                    .then(response => {
                                        joke.dislikes = response.data;
                                    })
                            ))
                        )
                        .then(() => {
                            this.setState({ jokes });
                        })
                )))
    }

    render() {
        return (
            <>
                {this.state.jokes.map(j => <Joke joke={j} key={j.id} showButtons={false} onLikeDislike={() => { }} />)}
            </>
        );
    }
}

export default ViewAll;