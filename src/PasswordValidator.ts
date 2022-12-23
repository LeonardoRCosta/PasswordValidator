interface ResultObject {
  result: boolean;
  errors: string[];
}

export class PasswordValidator {
  private resultObject: ResultObject;

  private passwordCharacters: string[];

  private SPECIAL_CARACTERS: string[];

  private PASSWORD_MIN_LENGTH: number;

  private PASSWORD_MAX_LENGTH: number;

  constructor() {
    this.resultObject = { result: true, errors: [] };

    this.passwordCharacters = [];

    this.SPECIAL_CARACTERS = ['!', '@', '$', '%', '&', '*', '~', '^', '?', '#'];

    this.PASSWORD_MIN_LENGTH = 16;

    this.PASSWORD_MAX_LENGTH = 32;
  }

  toASCII(passwordCharacters: string[]) {
    const charCodes = passwordCharacters
      .filter((char) => !this.SPECIAL_CARACTERS.includes(char))
      .map((char) => char.charCodeAt(0));

    return charCodes;
  }

  validateLength() {
    const isLengthValid =
      this.passwordCharacters.length >= this.PASSWORD_MIN_LENGTH &&
      this.passwordCharacters.length <= this.PASSWORD_MAX_LENGTH;

    if (!isLengthValid) {
      this.resultObject.errors.push(
        'Invalid size! Password must have between 16 and 32 characters!'
      );

      this.resultObject.result = false;
    }
  }

  validateSpecialCharacters() {
    const characters = this.passwordCharacters;

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
    const charCodes = this.toASCII(this.passwordCharacters);

    let upper = charCodes.reduce((acc, charCode) => {
      const isUpperCase = charCode > 64 && charCode < 91;

      if (isUpperCase) acc++;

      return acc;
    }, 0);

    let lower = charCodes.reduce((acc, charCode) => {
      const isLowerCase = charCode > 96 && charCode < 123;

      if (isLowerCase) acc++;

      return acc;
    }, 0);

    const hasUpperCase = upper !== 0;

    const hasLowerCase = lower !== 0;

    if (!hasUpperCase || !hasLowerCase) {
      this.resultObject.errors.push(
        'Password must have lower and upper characters!'
      );

      this.resultObject.result = false;
    }
  }

  validateIfIsSequence() {
    const lowerCasePassword = this.passwordCharacters.map((char) =>
      char.toLowerCase()
    );
    const asciiCodes = this.toASCII(lowerCasePassword);

    asciiCodes.forEach((code, idx) => {
      const isSequence =
        code === asciiCodes[idx + 1] - 1 &&
        asciiCodes[idx + 1] === asciiCodes[idx + 2] - 1;

      if (isSequence) {
        this.resultObject.errors.push(
          'Password must not have sequence characters!'
        );

        this.resultObject.result = false;
      }
    });
  }

  execute(password: string) {
    this.passwordCharacters = password.split('');

    this.validateLength();

    this.validateSpecialCharacters();

    this.validateUpperAndLower();

    this.validateIfIsSequence();

    return this.resultObject;
  }
}

const validator = new PasswordValidator();

console.log(validator.execute('13faBevfdbFVs#$%safd$af!safdasas'));
