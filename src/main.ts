import { listagem } from './listagem';
import { login } from './login';
import './style.css';

if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
    login();
}

if (window.location.pathname === '/listagem.html') {
    listagem();
}


