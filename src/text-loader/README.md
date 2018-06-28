# State Machine

## Class

```
class TextLoader {
  constructor(private textData: any, private locale: string) {
  }

  /*
    Return the string corresponding to ID
  */
  get(id: string) {
  }

  /* Update the locale value */
  setLocale(locale: string) {
  }

}
```

## Example

```
const loader = new TextLoader(textData, 'EN_en');
loader.setLocale('FR_fr');
loader.get('GAME_INTRO_TEXT');

```

## Interfaces

```
interface State {
  [any: string]: any
};

interface Instruction {
  type: string;
  params?: Array<string>;
}

```