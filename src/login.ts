import { clickAnimation } from "./main";

export function login() {
  const inputEmail = document.getElementById('email') as HTMLInputElement;
  const labelEmail = document.getElementById('labelEmail') as HTMLLabelElement;
  const inputSenha = document.getElementById('senha') as HTMLInputElement;
  const labelSenha = document.getElementById('labelSenha') as HTMLLabelElement;
  const spanErro = document.getElementById('spanErro') as HTMLSpanElement;
  const eyeButton = document.getElementById('eyeButton') as HTMLImageElement;
  const formLogin = document.getElementById('formLogin') as HTMLFormElement;
  const buttonLogin = document.getElementById('buttonLogin') as HTMLButtonElement;
  const backButtonLogin = document.getElementById('backButtonLogin') as HTMLButtonElement;
  const modalLogin = document.getElementById('modalLogin') as HTMLDialogElement;
  const saudacaoUsuario = document.getElementById('saudacaoUsuario') as HTMLSpanElement;
  const imgProfileLogin = document.getElementById('imgProfileLogin') as HTMLImageElement;

  // Fechar modal
  backButtonLogin.addEventListener('click', () => {
    clickAnimation(backButtonLogin, '0.75', '1');
    backButtonLogin.style.transition = 'all 0.1s ease-in-out';
    setTimeout(() => {
      modalLogin.close();
    }, 200);
  });

  // Realizar login via listagem
  const token = sessionStorage.getItem('@TOKEN');

  imgProfileLogin.addEventListener('click', () => {
    if (!token) {
      clickAnimation(imgProfileLogin, '0.9', '1');
      imgProfileLogin.style.transition = 'all 0.1s ease-in-out';
      setTimeout(() => {
        modalLogin.showModal();
        modalLogin.style.display = 'none';
        modalLogin.offsetHeight;
        modalLogin.style.display = '';
      }, 200);
    }
  });

  // Function para animação da Label
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

  eyeButton.addEventListener('click', () => {
    eyeIsOn = !eyeIsOn;
    console.log('click');
    if (eyeIsOn) {
      eyeButton.src = './src/assets/svgs/visibble-eye.svg';
      inputSenha.type = 'text';
      eyeButton.ariaLabel = 'Esconder senha';
    } else {
      eyeButton.src = './src/assets/svgs/hidden-eye.svg';
      inputSenha.type = 'password';
      eyeButton.ariaLabel = 'Exibir senha';
    }
  });

  buttonLogin.addEventListener('click', () => {
    buttonLogin.style.transition = 'all 0.1s ease-in-out';
    clickAnimation(buttonLogin, '0.9', '1');

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
  });

  // Função assíncrona para capturar nome de usuário
  async function capturarNomeUsuario(tokenDecodificado: any): Promise<string> {
    const id = String(tokenDecodificado.sub);

    try {
      const response = await fetch(`https://fakestoreapi.com/users/${id}`);
      const json = await response.json();
      const nomeUsuario = json.name.firstname;
      return nomeUsuario;
    } catch (error) {
      console.error('Erro ao capturar o nome do usuário:', error);
      throw error;
    }
  }

  // Gerar Token
  formLogin.addEventListener('submit', async (event) => {
    event?.preventDefault();

    const username = inputEmail.value;
    const password = inputSenha.value;

    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.token) {
        setTimeout(async () => {
          sessionStorage.setItem('@TOKEN', data.token);
          const nomeUsuario = await capturarNomeUsuario(decodeJWT(data.token));
          sessionStorage.setItem('@NOME_USUARIO', nomeUsuario);
          window.location.reload();
          modalLogin.close();
        }, 700);
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      setTimeout(() => {
        spanErro.style.height = '44px';
        spanErro.style.transition = 'all 0.1s ease-in-out';
        console.log(error);
        buttonLogin.innerHTML = `
          Tente novamente
        `;
      }, 700);
    }
  });

  // Atualizar nome de usuario na listagem
  window.addEventListener('pageshow', () => {
    const nomeUsuario = sessionStorage.getItem('@NOME_USUARIO');

    if (nomeUsuario) {
      imgProfileLogin.src = './src/assets/images/userPicture.jpg';
      saudacaoUsuario.innerHTML = `
        <span class="text-gray-500 text-md">Olá,</span><br>
        ${nomeUsuario[0].toUpperCase() + nomeUsuario.slice(1)}
      `;
    }
  });
}

export function decodeJWT(token: string): any {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
  const usuario = JSON.parse(jsonPayload);

  return usuario;
}

console.log('username: johnd, password: m38rmF$');

// email:'John@gmail.com',
// username:'johnd',
// password:'m38rmF$'
