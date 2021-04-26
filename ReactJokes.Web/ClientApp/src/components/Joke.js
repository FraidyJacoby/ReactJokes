import React from 'react';

const Joke = ({ joke, showButtons, onLikeDislike }) => {
    const { setup, punchline, likes, dislikes, likeDisabled, dislikeDisabled } = joke;

    return (
        <div className="row" style={{ marginTop: 30 }}>
            <div className="well col-md-6 col-md-offset-3">
                <h6 className="text-muted">Setup:</h6>
                <h4 className="text-warning">{setup}</h4>
                <h6 className="text-muted">Punchline:</h6>
                <h4 className="text-info">{punchline}</h4>
                <h5>Likes: {likes}</h5>
                <h5>Dislikes: {dislikes}</h5>
                {showButtons && <span>
                    <button className="btn btn-success" onClick={onLikeDislike} value={true} disabled={likeDisabled} style={{ marginRight: 20 }}>:)</button>
                    <button className="btn btn-danger" onClick={onLikeDislike} value={false} disabled={dislikeDisabled} >:(</button>
                </span>}
            </div>
        </div>
        );
}

export default Joke;