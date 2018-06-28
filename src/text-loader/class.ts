import { InvalidTextIdException, InvalidLocaleSpecifiedException } from "../game/exceptions";

class TextLoader {
  constructor(private textData: any, private locale: string) {
  }

  get(id: string) {
    if (!this.textData[id]) {
      return id;
    } else if (!this.textData[id][this.locale]){
      throw new InvalidLocaleSpecifiedException(this.locale);
    } else {
      return this.textData[id][this.locale];
    }
  }

  setLocale(locale: string) {
    this.locale = locale;
  }

}

export default TextLoader