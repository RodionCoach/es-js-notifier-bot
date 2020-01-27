const validate = (value) => /^[1-9]?[0-9]{1}$|^100$/.test(+value);

module.exports = validate;
