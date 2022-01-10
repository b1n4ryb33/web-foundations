function add (a=0, b=0) {
	return a + b;
}

function subtract (a=0, b=0) {
	return a - b;
}

function sum (items=[]) {

	if (items.length === 0)
		return 0;
	
	const sum = items.reduce((total, item) => {
		return total + item;
	}, 0);

	return sum;
}

function multiply (items = []) {
	if (items.length === 0)
		return 0;

	const product = items.reduce((total, item) => {
		return total * item;
	}, 1);

	return product;
}

function power(base, power) {
	return Math.pow(base, power);
}

function factorial(n=0) {
	return n === 0 ? 1 : n * factorial(n-1);
}

module.exports = {
	add,
	subtract,
	sum,
	multiply,
    power,
	factorial
}