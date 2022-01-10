const rgbToArray = require('./color')

describe('colors to valid js', function() {
  it('full numbered css to js', function() {
    expect(rgbToArray('rgb(255, 255, 255)')).toEqual([255, 255, 255]);
  });
  it('half numbered css to js', function() {
    expect(rgbToArray('rgb(55, 55, 55)')).toEqual([55, 55, 55]);
  });
  it('single numbered css to js', function() {
    expect(rgbToArray('rgb(5, 5, 5)')).toEqual([5, 5, 5]);
  });
  it('exception with invalid input', function() {
    expect(function(){rgbToArray('rgb(5, text, 5)');}).toThrow(new Error('One of the parameters is not a number!'));
  });
});
