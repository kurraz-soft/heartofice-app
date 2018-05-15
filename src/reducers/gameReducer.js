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
}, action) {
    switch (action.type)
    {
        default:
            return state;
    }
}