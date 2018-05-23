import {ActionTypes} from "../actions/gameActions";
import InventoryUtil from "../utils/Inventory";

const initialState = {
    character: {
        name: '',
        class: '',
        health: 0,
        healthMax: 0,
        skills: [],
        inventory: {
            maxWeight: 8,
            items: [],
        },
        keywords: [],
        money: 0,
    },
    answers: [],
    body: '',
    page: 'test_shop', //TODO test!
    is_loading: false,
    scenario: '',
    params: [],
    item_ui_opened: false,
    notify: {
        text: '',
        type: 'warning',
        active: false,
    },
};

export default function (state = initialState, action) {
    switch (action.type)
    {
        case ActionTypes.PAGE_ACTION_REQUEST:
        {
            return {
                ...state,
                is_loading: true,
            }
        }
        case ActionTypes.PAGE_ACTION_RESPONSE:
        {
            return {
                ...state,
                is_loading: false,
                item_ui_opened: false,
                character: action.character,
                body: action.body,
                page: action.page,
                answers: action.answers,
                scenario: action.scenario,
                params: (state.page === action.page && state.params.length !== 0) ? state.params : action.params,
            };
        }
        case ActionTypes.NEW_GAME:
        {
            return {
                ...state,
                initialState,
            }
        }
        case ActionTypes.TAKE_ITEM:
        {
            let items = state.params.takeItems;
            let inventory = state.character.inventory;

            InventoryUtil.moveInventoryItem(items, inventory, action.index);

            return {
                ...state,
                character: {
                    ...state.character,
                    inventory: inventory,
                },
                params: {
                    ...state.params,
                    takeItems: items,
                }
            }
        }
        case ActionTypes.THROW_ITEM:
        {
            let items = state.params.takeItems;
            let inventory = state.character.inventory;

            InventoryUtil.moveInventoryItem(inventory, items, action.index);

            return {
                ...state,
                character: {
                    ...state.character,
                    inventory: inventory,
                },
                params: {
                    ...state.params,
                    takeItems: items,
                }
            }
        }
        case ActionTypes.BUY_ITEM:
        {
            let items = state.params.shop;
            let inventory = state.character.inventory;

            const price = parseInt(items.items[action.index].price, 10);

            InventoryUtil.moveInventoryItem(items, inventory, action.index);

            return {
                ...state,
                character: {
                    ...state.character,
                    inventory: inventory,
                    money: parseInt(state.character.money, 10) - price,
                },
                params: {
                    ...state.params,
                    shop: items,
                }
            }
        }
        case ActionTypes.TOGGLE_ITEMS_UI:
        {
            return {
                ...state,
                item_ui_opened: !state.item_ui_opened,
            };
        }
        case ActionTypes.NOTIFY_SHOW:
        {
            return {
                ...state,
                notify: {
                    ...state.notify,
                    text: action.text,
                    active: true,
                }
            }
        }
        case ActionTypes.NOTIFY_HIDE:
        {
            return {
                ...state,
                notify: {
                    ...state.notify,
                    active: false,
                }
            }
        }
        default:
            return state;
    }
}