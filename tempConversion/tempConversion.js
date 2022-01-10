const ftoc = function(temperature) {
  return Number(((temperature - 32) * 5/9).toFixed(1));
}

const ctof = function(temperature) {
  return Number((temperature * 9/5 + 32).toFixed(1));
}

module.exports = {
  ftoc,
  ctof
}
