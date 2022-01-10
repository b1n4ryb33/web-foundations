const leapYears = function(year=0) {

    return year % 4 === 0 && (year % 100 != 0 || year % 400 === 0);



    if(year % 400 == 0)
        return true;
    else if(year % 100 == 0) 
        return false;
    else if(year % 4 == 0)
        return true;  

    return false;
}

module.exports = leapYears
