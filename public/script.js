const input1 = document.querySelector('.input1');
const inputOn = document.querySelector('.inputOn');
 input1.addEventListener("click", inputClick);

// selecteer p element
const paragraph = document.querySelector('.test');

function inputClick(){
 input1.classList.toggle('inputOn');
 paragraph.classList.toggle('test');
}


