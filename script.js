Math.clamp = (value, min, max) => {
    if (value < min) return min;
    if (value > max) return max;
    return value;
};


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


function map(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}


var currentRoll = 0;
var currentPitch = 0;


    



function updateScreen(){
    let tempAngle = map(currentPitch, -90, 90, -395, 395);
    fixed_needle.style.transform = `rotate(${Math.clamp(-currentRoll, -60, 60)}deg)`;
    back.style.transform = `translateY(${tempAngle}px) rotate(${-currentRoll}deg)`;
    back.style.transformOrigin = `center ${back.offsetHeight/2 - tempAngle}px`; 
}



onkeydown = onkeyup = (evt) => {
    if ( controller[evt.key] ){
        controller[evt.key].pressed = evt.type == 'keydown';
    }
};




function update(){

    Object.keys(controller).forEach(key => {
        
        if ( controller[key].pressed ){
            controller[key].call();
            updateScreen();
        }
    });


    requestAnimationFrame(update);


}

onload = update;


const controller = {

    "ArrowLeft": {
        "pressed": false,
        "call": () => {
            currentRoll -= 2;
            if ( currentRoll < -180 ){
                currentRoll = 180;
            }
        }
    },


    "ArrowRight": {
        "pressed": false,
        "call": () => {
            currentRoll = (currentRoll + 2) % 360;
        }
    },


    "ArrowUp": {
        "pressed": false,
        "call": () => {
            currentPitch = Math.clamp(currentPitch - Math.cos(currentRoll*Math.PI/180), -90, 90);
        }
    },


    "ArrowDown": {
        "pressed": false,
        "call": () => {
            currentPitch = Math.clamp(currentPitch + Math.cos(currentRoll*Math.PI/180), -90, 90);
        }
    }

};