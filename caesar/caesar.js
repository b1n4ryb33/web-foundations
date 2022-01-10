const caesar = function(s='', k=0) {

    var n = 26; // alphabet letters amount
    if (k < 0) {
        return caesar(s, k + n);
    }
    return s.split('')
        .map( (c) => {
            if (c.match(/[a-z]/i)) {
                var code = c.charCodeAt();
                var shift = code >= 65 && code <= 90 ? 65 : code >= 97 && code <= 122 ? 97 : 0;
                return String.fromCharCode(((code - shift + k) % n) + shift);
            }
            return c;
        }).join('');

}

module.exports = caesar
