import store from '../store'
import {gameAnswerAction} from "../actions/gameActions";

class Game
{
    run()
    {
        return {};
    }

    loadGame()
    {
        //TODO
    }

    chooseAnswer(selected)
    {
        store.dispatch(gameAnswerAction(selected));
    }
}

export default Game