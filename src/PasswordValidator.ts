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

  execute(password: string) {
    this.password = password;
    this.validateLength();
    this.validateSpecialCharacters();

    return this.resultObject;
  }
}

const validator = new PasswordValidator();

console.log(validator.execute('125fdcvfdbsFsafd$af!safdasas'));
