import {ActionTypes} from "../actions/gameActions";

const initialState = {
    character: {
        name: '',
        class: '',
        health: 0,
        healthMax: 0,
        skills: [],
        inventory: [],
        money: 0,
    },
    answers: [],
    body: '',
    page: 'start',
    is_loading: false,
    scenario: '',
    params: [],
};

export default function (state = initialState, action) {
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
                scenario: action.scenario,
                params: action.params,
            })
        }
        case ActionTypes.NEW_GAME:
        {
            return Object.assign({}, state, initialState);
        }
        default:
            return state;
    }
}