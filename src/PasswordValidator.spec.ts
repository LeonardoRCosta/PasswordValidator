import { PasswordValidator } from './PasswordValidator';

describe('Password Validation', () => {
  it('should push the error message "Invalid size..." into the result object errors array', () => {
    const passwordValidator = new PasswordValidator();

    const resultObject = passwordValidator.execute('acrF!#');

    expect(resultObject).toEqual(
      expect.objectContaining({
        errors: [
          'Invalid size! Password must have between 16 and 32 characters!',
        ],
      })
    );
  });

  it('should push the error message "Password must have at least 2 special characters!" into the result object errors array', () => {
    const passwordValidator = new PasswordValidator();

    const resultObject = passwordValidator.execute('afGePls184PsetRpÇmCd');

    expect(resultObject).toEqual(
      expect.objectContaining({
        errors: ['Password must have at least 2 special characters!'],
      })
    );
  });

  it('should push the error message "Password must have lower and upper characters!" into the result object errors array', () => {
    const passwordValidator = new PasswordValidator();

    const resultObject = passwordValidator.execute('afgfdesaerg!#$sdthgvls184');

    expect(resultObject).toEqual(
      expect.objectContaining({
        errors: ['Password must have lower and upper characters!'],
      })
    );
  });

  it('should push the error message "Password must not have sequence characters!" into the result object errors array', () => {
    const passwordValidator = new PasswordValidator();

    const resultObject = passwordValidator.execute('123asbrCdsleo@3!FlpfVc');

    expect(resultObject).toEqual(
      expect.objectContaining({
        errors: ['Password must not have sequence characters!'],
      })
    );
  });

  it('should return an object containing the result property set to true and the erros array property empty', () => {
    const passwordValidator = new PasswordValidator();

    const resultObject = passwordValidator.execute('rZpy*D95&WBE^Z&B');

    expect(resultObject).toEqual(
      expect.objectContaining({
        result: true,
        errors: [],
      })
    );
  });
});
