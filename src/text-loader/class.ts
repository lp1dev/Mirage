class TextLoader {
  constructor(private textData: any, private locale?: string) {
  }

  get(id: string) {
    console.log(id);
    return this.textData[id][this.locale];
  }

  setLocale(locale: string) {
    this.locale = locale;
  }

}

export default TextLoader