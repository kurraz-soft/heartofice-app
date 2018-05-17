import {ActionTypes} from "../actions/gameActions";

export default function (state = {
    character: {
        name: '',
        class: '',
        health: 0,
        healthMax: 0,
        skills: [],
        inventory: [],
    },
    answers: [],
    body: '',
    page: 'start',
    is_loading: false,
}, action) {
    switch (action.type)
    {
        case ActionTypes.PAGE_ACTION_REQUEST:
        {
            return Object.assign({}, state, {is_loading: true});
        }
        case ActionTypes.PAGE_ACTION_RESPONSE:
        {
            return Object.assign({}, state, {
                is_loading: false,
                character: action.character,
                body: action.body,
                page: action.page,
                answers: action.answers,
            })
        }
        default:
            return state;
    }
}