export function login() {
const inputEmail = document.getElementById('email') as HTMLInputElement;
const labelEmail = document.getElementById('labelEmail') as HTMLLabelElement;
const inputSenha = document.getElementById('senha') as HTMLInputElement;
const labelSenha = document.getElementById('labelSenha') as HTMLLabelElement;
const spanErro = document.getElementById('spanErro') as HTMLSpanElement;
const inputEye = document.getElementById('inputEye') as HTMLImageElement;
const formLogin = document.getElementById('formLogin') as HTMLFormElement;
const buttonLogin = document.getElementById('buttonLogin') as HTMLButtonElement;

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

buttonLogin.addEventListener('click', () => {
  buttonLogin.style.scale = '0.9';
  buttonLogin.style.transition = 'all 0.1s ease-in-out';
  setTimeout(() => {
    buttonLogin.style.scale = '1';
    
  }, 100);

  setTimeout(() => {
    buttonLogin.innerHTML = `
      <img id="loading" src="./src/assets/svgs/loading.svg">
    `;
  }, 200);

  setTimeout(() => {
    const loading = document.getElementById('loading') as HTMLImageElement;

    loading.style.rotate = '360deg';
    loading.style.transition = 'rotate .9s ease-in-out';
  }, 300);
  
  
})


// Gerar Token

  formLogin.addEventListener('submit' , () => {
  event?.preventDefault();

  const username = inputEmail.value;
  const password = inputSenha.value;

  fetch('https://fakestoreapi.com/auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: username,
        password: password
    })
  })
  .then(response => response.json())
  .then(data => {

    
    if (data.token) {
      setTimeout(() => {
        console.log(data.token);
        sessionStorage.setItem('@TOKEN', data.token)
        window.location.href = "../listagem.html";
      }, 700)} else {
        console.log('Login failed');
    }
  })
  .catch(error => {

    setTimeout(() => {
      spanErro.style.height = '44px'
      spanErro.style.transition = 'all 0.1s ease-in-out';
      console.log(error)
      buttonLogin.innerHTML = `
        Tente novamente
      `
    }, 700)
    
  });

  
    
})



           

}


// email:'John@gmail.com',
// username:'johnd',
// password:'m38rmF$',

