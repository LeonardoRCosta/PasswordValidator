interface ResultObject {
  result: boolean;
  errors: string[];
}

export class PasswordValidator {
  private resultObject: ResultObject;

  private password: string;

  private SPECIAL_CARACTERS: string[];

  constructor() {
    this.resultObject = { result: true, errors: [] };
    this.password = '';
    this.SPECIAL_CARACTERS = ['!', '@', '$', '%', '&', '*', '~', '^', '?', '#'];
  }

  toASCII() {
    const charCodes = this.password.split('').map((char) => char.charCodeAt(0));

    return charCodes;
  }

  validateLength() {
    const isLengthValid =
      this.password.length >= 16 && this.password.length <= 32;

    if (!isLengthValid) {
      this.resultObject.errors.push(
        'Invalid size! Password must have between 16 and 32 characters!'
      );

      this.resultObject.result = false;
    }
  }

  validateSpecialCharacters() {
    const characters = this.password.split('');

    const specialCharacters = characters.reduce((acc, character) => {
      if (this.SPECIAL_CARACTERS.includes(character)) acc++;
      return acc;
    }, 0);

    if (specialCharacters < 2) {
      this.resultObject.errors.push(
        'Password must have at least 2 special characters!'
      );

      this.resultObject.result = false;
    }
  }

  validateUpperAndLower() {
    const charCodes = this.toASCII();

    let upper = charCodes.reduce((acc, charCode) => {
      if (charCode > 64 && charCode < 91) acc++;

      return acc;
    }, 0);

    let lower = charCodes.reduce((acc, charCode) => {
      if (charCode > 96 && charCode < 123) acc++;

      return acc;
    }, 0);

    if (upper === 0 || lower === 0) {
      this.resultObject.errors.push(
        'Password must have lower and upper characters!'
      );

      this.resultObject.result = false;
    }
  }

  validateIfIsSequence() {
    for (let i = 0; i < this.password.length; i++) {
      const isSequence =
        this.password.charCodeAt(i) === this.password.charCodeAt(i + 1) - 1 &&
        this.password.charCodeAt(i + 1) === this.password.charCodeAt(i + 2) - 1;

      if (isSequence) {
        this.resultObject.errors.push(
          'Password must not have sequence characters!'
        );

        this.resultObject.result = false;
      }
    }
  }

  execute(password: string) {
    this.password = password;

    this.validateLength();

    this.validateSpecialCharacters();

    this.validateUpperAndLower();

    this.validateIfIsSequence();

    return this.resultObject;
  }
}

const validator = new PasswordValidator();

console.log(validator.execute('125fdcvfdbsFsafd$af!safdasas'));
