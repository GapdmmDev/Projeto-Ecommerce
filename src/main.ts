import { listagem } from './listagem';
import { login } from './login';
import './style.css';

export function clickAnimation(element: HTMLElement, firstScale: string, secondScale: string) {
    element.style.scale = firstScale;
        setTimeout(() => {
            element.style.scale = secondScale;
            
        }, 100)
}

if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
    login();
    listagem();
}


    



