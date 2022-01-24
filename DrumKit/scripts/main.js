function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
  }

  function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (!audio) return;

    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
  }

  function dance(){
    const rightHand = document.querySelector('.right-hand');
    const leftHand = document.querySelector('.left-hand');
    rightHand.classList.add('dancing');
    leftHand.classList.add('dancing-left');
  }

  function stopDancing(){
 
    const rightHand = document.querySelector('.right-hand');
    const leftHand = document.querySelector('.left-hand');
    rightHand.classList.remove('dancing');
    leftHand.classList.remove('dancing-left');
  }

  function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }
 

  const keys = Array.from(document.querySelectorAll('.key'));

  keys.forEach(key => key.addEventListener('transitionend', removeTransition));
  
  window.addEventListener('keydown', playSound);
  window.addEventListener('keydown', dance);
  window.addEventListener('keyup', stopDancing);