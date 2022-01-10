function init(squaresPerSide=16){

    let gridContainer = document.querySelector('#grid-container');
    gridContainer.style['grid-template-columns'] = `repeat(${squaresPerSide}, 1fr)`;
    gridContainer.style['grid-template-rows'] = `repeat(${squaresPerSide}, 1fr)`;
    
    for(let i = squaresPerSide * squaresPerSide; i > 0; i--){
        let childDiv = document.createElement('div');
        childDiv.classList.add('field');
        
        childDiv.addEventListener('mouseover', () => {

            if(!childDiv.style.background){
                childDiv.style.background = `#f0f0f0`;
            }
            
            if(childDiv.style.background){
                let rgbValues = rgbToArray(childDiv.style.backgroundColor);
                let currentColor = rgbToHex(rgbValues[0], rgbValues[1], rgbValues[2]);
                childDiv.style.backgroundColor = ColorLuminance(currentColor, -0.2);
            }
        });
        gridContainer.appendChild(childDiv);
    }
}

function clear() {
    let paintedFields = document.querySelectorAll('div.field');
    paintedFields.forEach(paintedField => {
        paintedField.style.backgroundColor = 'white';
    });
}

function startNewSketch(){
    let squaresPerSide = prompt('How many squares do you want per side?');
    let squaresPerSideNumber = parseInt(squaresPerSide);

    if(typeof squaresPerSideNumber != "number"){
        init();
        return;
    }
    
    init(squaresPerSideNumber);
}

function ColorLuminance(hex, lum) {
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;
	
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
  
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

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

    return rgbValues;
}

let clearBtn = document.querySelector('#clear-btn');
clearBtn.addEventListener('click', clear);
clearBtn.addEventListener('click', startNewSketch);

init();