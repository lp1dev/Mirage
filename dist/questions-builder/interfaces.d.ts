interface Question {
    id: any;
    text: string;
    answers?: {
        [key: string]: string;
    };
    hide?: {
        [key: string]: string;
    };
}
export { Question };
