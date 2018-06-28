export class Exception {
  private params: Array<any>;
  type = 'Exception';

  constructor(...params) {
    this.params = params;
  }
  
  toString() {
    return `${this.type} :: ${this.params}`;
  }
};

class InvalidDataFormatException extends Exception { 
  type = 'InvalidDataFormatException';
};

class InvalidQuestionIdException extends Exception { 
  type = 'InvalidQuestionIdException';

};

class InvalidTextIdException extends Exception { 
  type = 'InvalidTextIdException';
};

class InvalidLocaleSpecifiedException extends Exception { 
  type = 'InvalidLocaleSpecifiedException';
};

class InvalidStateException extends Exception { 
  type = 'InvalidStateException';
};

class InvalidInstructionFormatException extends Exception { 
  type = 'InvalidInstructionFormat';
};

class InvalidInstructionTypeException extends Exception { 
  type = 'InvalidInstructionTypeException';
};

class UndefinedValueException extends Exception { 
  type = 'UndefinedValueException';
};

export { 
  InvalidDataFormatException, 
  InvalidQuestionIdException,
  InvalidTextIdException,
  InvalidLocaleSpecifiedException,
  InvalidStateException,
  InvalidInstructionFormatException,
  InvalidInstructionTypeException,
  UndefinedValueException,
};
