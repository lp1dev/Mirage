
interface Question {
  id?: any;
  text: string;
  answers: Array<{[key: string]: string}>
}

export { Question }