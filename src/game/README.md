# Game

## Class

```
class Game {
    private textLoader: TextLoader;
    private questionsBuilder: QuestionsBuilder;
    private state: State;

   constructor(
            private gameData: GameData,
            private textData: TextData = {},
            private locale: string = 'EN_en',
            private saveData?: SaveData) {
    }

    // Methods

    /*
      Start the game (execute the startInstruction)
    */
    start(): void {
    }

    /*
      Answer the current question
    */
    answer(answer: string): void { // 
    }

    /*
      Return the current question
    */
    display(): Question {
    }

    /*
      Return the question corresponding to the ID
    */
    question(id: any): Question {
    }

    /*
      Build and return the save data
    */
    getSaveData() {
    }

    // Getters

    get name() {
    }
}
```

## Example

```
const game = new Game(gameData, textData, locale, saveData);
game.start();
```

## Interfaces

```
interface GameData {
  name: string;
  theme: string;
  questions: Array<Question>;
  startInstruction: string;
}

interface SaveData {
  question: number;
  state: State;
}

interface TextData {
  [key: string]: any;
}
```