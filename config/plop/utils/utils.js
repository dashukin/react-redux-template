const inputRequired = name => value => (/.+/.test(value) ? true : `${name} is required`);

module.exports = { inputRequired };
