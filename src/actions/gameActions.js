import axios from 'axios'
import config from '../config'

export const ActionTypes = {
    PAGE_ACTION_REQUEST: 'page_action_push',
    PAGE_ACTION_RESPONSE: 'page_action_response',
    NEW_GAME: 'new_game',
    TAKE_ITEM: 'take_item',
    THROW_ITEM: 'throw_item',
    BUY_ITEM: 'buy_item',
    TOGGLE_ITEMS_UI: 'toggle_items_ui',
    NOTIFY_SHOW: 'notify_show',
    NOTIFY_HIDE: 'notify_hide',
};

function pageActionResponse(page, character, body, answers, scenario, params) {

    window.scrollTo(0, 0);

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

export function loadPage(page, character) {
    return function (dispatch) {

        dispatch(pageActionRequest());

        axios.post(
            config.api.loadPage,
            {
                page,
                character,
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
    return (dispatch) => {
        dispatch({type: ActionTypes.NEW_GAME});
        return Promise.resolve();
    }
}

export function takeItem(index) {
    return {
        type: ActionTypes.TAKE_ITEM,
        index,
    };
}

export function throwItem(index) {
    return {
        type: ActionTypes.THROW_ITEM,
        index,
    };
}

export function buyItem(index) {
    return {
        type: ActionTypes.BUY_ITEM,
        index,
    }
}

export function toggleItemsUI() {
    return {
        type: ActionTypes.TOGGLE_ITEMS_UI,
    }
}

export function showNotify(text) {
    return {
        type: ActionTypes.NOTIFY_SHOW,
        text,
    }
}

export function hideNotify() {
    return {
        type: ActionTypes.NOTIFY_HIDE,
    }
}