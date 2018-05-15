const ActionTypes = {
    ANSWER: 'answer',
};

export function gameAnswerAction(answer) {
    return {
        type: ActionTypes.ANSWER,
        answer,
    }
}