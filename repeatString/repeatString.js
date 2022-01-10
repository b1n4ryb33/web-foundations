const repeatString = function(text='', iterations=0) {
    
    if(iterations < 0)
        return 'ERROR';

    let returnText = '';

    for (let i = iterations; i > 0; i--)
        returnText += text;  

    return returnText;
}

module.exports = repeatString
