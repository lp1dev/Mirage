declare const unparsedQuestions: ({
    id: string;
    text: string;
    answers: {
        'GAME_INTRO1': string;
        'GAME_INTRO2': string;
        'GAME_INTRO3': string;
    };
} | {
    id: string;
    text: string;
    answers: {
        'CHAPTER1_1': string;
        'CHAPTER1_2': string;
    };
})[];
export { unparsedQuestions };
