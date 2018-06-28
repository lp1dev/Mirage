interface Question {
    id?: any;
    text: string;
    answers: {
        [key: string]: string;
    };
}
export { Question };
