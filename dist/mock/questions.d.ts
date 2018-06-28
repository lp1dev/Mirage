declare const unparsedQuestions: ({
    id: string;
    text: string;
    answers: {
        'GAME_INTRO1': string;
        'GAME_INTRO2': string;
        'GAME_INTRO3': string;
        'CHAPTER1_1'?: undefined;
        'CHAPTER1_2'?: undefined;
    };
} | {
    id: string;
    text: string;
    answers: {
        'CHAPTER1_1': string;
        'CHAPTER1_2': string;
        'GAME_INTRO1'?: undefined;
        'GAME_INTRO2'?: undefined;
        'GAME_INTRO3'?: undefined;
    };
})[];
export { unparsedQuestions };
