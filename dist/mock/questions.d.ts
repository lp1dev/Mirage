declare const unparsedQuestions: ({
    id: string;
    text: string;
    answers: {
        'T_GAME_INTRO1': string;
        'T_GAME_INTRO2': string;
        'T_GAME_INTRO3': string;
        'T_CHAPTER1_1'?: undefined;
        'T_CHAPTER1_2'?: undefined;
        'T_GAME_INTRO2_1'?: undefined;
        'T_GAME_INTRO2_2'?: undefined;
    };
    hide?: undefined;
} | {
    id: string;
    text: string;
    answers: {
        'T_CHAPTER1_1': string;
        'T_CHAPTER1_2': string;
        'T_GAME_INTRO1'?: undefined;
        'T_GAME_INTRO2'?: undefined;
        'T_GAME_INTRO3'?: undefined;
        'T_GAME_INTRO2_1'?: undefined;
        'T_GAME_INTRO2_2'?: undefined;
    };
    hide?: undefined;
} | {
    id: string;
    text: string;
    answers: {
        'T_GAME_INTRO2_1': string;
        'T_GAME_INTRO2_2': string;
        'T_GAME_INTRO1'?: undefined;
        'T_GAME_INTRO2'?: undefined;
        'T_GAME_INTRO3'?: undefined;
        'T_CHAPTER1_1'?: undefined;
        'T_CHAPTER1_2'?: undefined;
    };
    hide: {
        'T_GAME_INTRO2_1': string;
    };
})[];
export { unparsedQuestions };
