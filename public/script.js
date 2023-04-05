
// Dit is temporary | Js code voor de logboek
const input1 = document.querySelector('.input1');
const inputOn = document.querySelector('.inputOn');
 input1.addEventListener("click", inputClick);

// selecteer p element
const paragraph = document.querySelector('.test');

function inputClick(){
 input1.classList.toggle('inputOn');
 paragraph.classList.toggle('test');
}

// Chat proce pagina
function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }


// Formulier animatie button (MiniNotitie)
  var button = document.querySelector('.notitieSubmit');

  button.addEventListener('mouseenter', function() {
    button.classList.add('animated');
  });

  button.addEventListener('mouseleave', function() {
    button.classList.remove('animated');
  });