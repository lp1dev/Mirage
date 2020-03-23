
interface Question {
  id: any;
  text: string;
  answers?: {[key: string]: string};
  conditions?: {[key: string]: string};
  expressions?: Array<string>;
}

export { Question }