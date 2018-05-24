import React from 'react';
import { connect } from 'react-redux'
import {startNewGame} from "../actions/gameActions";

class GameOverScenario extends React.Component
{
    newGame()
    {
        this.props.dispatch(startNewGame()).then(() => {
            window.location.reload();
        });
    }

    render()
    {
        return (
            <div className='row'>
                <div className='col'>
                    <div dangerouslySetInnerHTML={{__html: this.props.body}} />
                    <h1 className='display-1 text-center'>GAME OVER</h1>
                    <p className='text-center'>
                        <button className='btn btn-warning' onClick={this.newGame.bind(this)}>Новая Игра</button>
                    </p>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        body: state.body,
    };
})(GameOverScenario);