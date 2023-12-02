const bcrypt = require("bcrypt");

export const validatePassword = (password: string, hash: string) => {
  bcrypt.compare(password, hash, function (err: Error, result: boolean) {
    return result;
  });
};

export const isValidationError = (error: any) => {
  return String(error).includes("PrismaClientValidationError");
};
