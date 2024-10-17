import './style.css';

const inputEmail = document.getElementById('email') as HTMLInputElement;
const labelEmail = document.getElementById('labelEmail') as HTMLLabelElement;
const inputSenha = document.getElementById('senha') as HTMLInputElement;
const labelSenha = document.getElementById('labelSenha') as HTMLLabelElement;

//Function para animação da Label

function addLabelAnimation(input: HTMLInputElement, label: HTMLLabelElement) {
    input.addEventListener('focus', () => {
      label.style.top = '8px';
      label.style.left = '8px';
      label.style.fontSize = '13px';
      label.style.backgroundColor = '#fff';
      label.style.padding = '0 5px';
      label.style.transition = 'all 0.2s ease-in-out';
    });
  
    input.addEventListener('blur', () => {
      if (input.value !== '') {
        label.style.top = '8px';
        label.style.left = '8px';
        label.style.fontSize = '13px';
        label.style.backgroundColor = '#fff';
        label.style.padding = '0 5px';
        label.style.transition = 'all 0.2s ease-in-out';
      } else {
        label.style.top = '42px';
        label.style.left = '18px';
        label.style.fontSize = '16px';
        label.style.backgroundColor = 'none';
        label.style.padding = '0 5px';
        label.style.transition = 'all 0.2s ease-in-out';
      }
    });
  }

  addLabelAnimation(inputEmail, labelEmail);
  addLabelAnimation(inputSenha, labelSenha);


// Alterar type do input senha

const inputEye = document.getElementById('inputEye') as HTMLImageElement;

let eyeIsOn = false;

inputEye.addEventListener('click', () => {
    eyeIsOn = !eyeIsOn;
    if(eyeIsOn) {
        inputEye.src = './src/assets/svgs/visibble-eye.svg'
        inputSenha.type = 'text'
        inputEye.ariaLabel = 'Esconder senha'
    }else{
        inputEye.src = './src/assets/svgs/hidden-eye.svg'
        inputSenha.type = 'password'
        inputEye.ariaLabel = 'Exibir senha'
    }
    
})