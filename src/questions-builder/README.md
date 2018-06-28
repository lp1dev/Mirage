# Questions Builder

## Class

```

class QuestionsBuilder {
  private cache: Array<Question>;

  constructor(private textLoader: any) {
  }

  /* Replace the question's text IDs with corresponding text*/
  build(question: Question) {
  }
}

```

## Example

```
const question = {
  test: "GAME_INTRO",
  answers: {
    "ANSWER1_TEXT": "GOTO GAME1"
  }
};
const builder = new QuestionsBuilder(textLoader);
const builtQuestion = builder.build(question);
```

## Interfaces

```
interface Question {
  id?: any;
  text: string;
  answers?: any;
}
```