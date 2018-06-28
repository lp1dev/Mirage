declare class TextLoader {
    private textData;
    private locale;
    constructor(textData: any, locale: string);
    get(id: string): any;
    setLocale(locale: string): void;
}
export default TextLoader;
