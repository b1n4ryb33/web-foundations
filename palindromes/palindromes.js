const palindromes = function(text='') {

    const punctuationless = text.replace(/[\s.,\/#!$%\^&\*;:{}=\-_`~()]/g,'').toLowerCase();

    const textAsArr = punctuationless.split('');
    const textReverse = [];

    textAsArr.forEach(char => textReverse.unshift(char));

    return punctuationless === textReverse.join('');
}

module.exports = palindromes
