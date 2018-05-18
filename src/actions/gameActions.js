import axios from 'axios'
import config from '../config'

export const ActionTypes = {
    PAGE_ACTION_REQUEST: 'page_action_push',
    PAGE_ACTION_RESPONSE: 'page_action_response',
    NEW_GAME: 'new_game',
};

function pageActionResponse(page, character, body, answers, scenario, params) {
    return {
        type: ActionTypes.PAGE_ACTION_RESPONSE,
        page,
        character,
        body,
        answers,
        scenario,
        params,
    }
}

function pageActionRequest() {
    return {
        type: ActionTypes.PAGE_ACTION_REQUEST,
    }
}

export function pageActionFetch(character, page, answer) {
    return function (dispatch) {

        dispatch(pageActionRequest());

        axios.post(
            config.api.nextPage,
            {
                character,
                page,
                answer,
            }
        ).then(function (response) {
            dispatch(pageActionResponse(
                response.data.page,
                response.data.character,
                response.data.body,
                response.data.answers,
                response.data.scenario,
                response.data.params
            ));
        })
    }
}

export function startNewGame() {
    return {
        type: ActionTypes.NEW_GAME,
    }
}