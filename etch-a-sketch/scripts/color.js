// 'rgb(a,b,c)' => [a, b, c]
function rgbToArray (rgbText = '') {

        let rgbValues = [];

        rgbValuesText = rgbText.replace('rgb(', '').replace(')', '').split(',');
        
        rgbValuesText.forEach(rgbValue => {
            rgbValue = rgbValue.replace(' ', '');
            rgbValues.push(parseInt(rgbValue));
        });

        if(rgbValues.includes(NaN)){
            throw new Error('One of the parameters is not a number!');
        }

        console.log(rgbValues);
        return rgbValues;
}

// module.exports = rgbToArray;