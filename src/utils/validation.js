const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Please enter valid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }
};

const validateEditProfile = (req) => {
  const validData = ["firstName", "lastName", "age", "gender", "skills"];
  const isValid = Object.keys(req.body).every((fields) =>
    validData.includes(fields)
  );
  return isValid;
};
module.exports = {
  validateSignupData,
  validateEditProfile,
};
