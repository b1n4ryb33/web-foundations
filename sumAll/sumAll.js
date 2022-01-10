const sumAll = function(start=0, end=0) {
    
    // isNaN returns false for '90' as other types then numbers first get parsed. Th4 fuck 
    // therefore, typeof needs to be used
    if(start < 0 || end < 0 || typeof start != "number" || typeof end != "number")
        return 'ERROR';
    
    let lowerValue;
    let higherValue;

    if(start === end && typeof start == "number")
        return start;
    
    else if(end > start){
        lowerValue = start;
        higherValue = end;
    }else if(end < start){
        lowerValue = end;
        higherValue = start;
    }

    let sum = 0;

    for(lowerValue; lowerValue <= higherValue; lowerValue++){
        sum += lowerValue;
    }

    return sum;
}

module.exports = sumAll
