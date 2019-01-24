const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateStoryInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.body = !isEmpty(data.body) ? data.body : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title  is required";
  }

  if (Validator.isEmpty(data.body)) {
    errors.body = "Story is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
