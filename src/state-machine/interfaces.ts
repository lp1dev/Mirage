interface State {
  [any: string]: any
};

interface Instruction {
  type: string;
  params?: Array<string>;
}

export { State, Instruction };
