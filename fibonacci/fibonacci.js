const fibonacci = function(n) {

    n = parseInt(n);

    return n < 0 ? 'OOPS' :  (n === 1 || n === 2) ? 1 : fibonacci(n - 1) + fibonacci(n - 2);

}

module.exports = fibonacci
