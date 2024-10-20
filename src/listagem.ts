import { clickAnimation } from "./main";

export function listagem() {
    const menuButton = document.getElementById('menuButton') as HTMLImageElement;
    const menu = document.getElementById('menu') as HTMLDivElement;

    let menuIsOpen = false;

    menuButton.addEventListener('click', () => {
        menuIsOpen = !menuIsOpen;

        if(menuIsOpen) {
            menu.style.height = '400px'
            menu.style.left = '24px'
            menu.style.transition = 'all .2s ease-in-out'
            menuButton.style.transition = 'all .2s ease-in-out'
            clickAnimation(menuButton, '0.2', '1')
            menuButton.src = './src/assets/svgs/close.svg'

        }else {
            menu.style.height = '0px'
            menu.style.left = '440px'
            clickAnimation(menuButton, '0.2', '1')
            menuButton.src = './src/assets/svgs/menu.svg'
        }        
    })
    
    const textoEncontrarProduto = document.getElementById('textoEncontrarProduto') as HTMLElement;
    const search = document.getElementById('search') as HTMLInputElement;

    search.addEventListener('click', () => {
        textoEncontrarProduto.style.height = '0px';
        textoEncontrarProduto.style.overflow = 'hidden';
        textoEncontrarProduto.style.transition = 'all 0.2s ease-in-out';
  
    })

    search.addEventListener('blur', () => {
        if(search.value != '') {
            textoEncontrarProduto.style.height = '0px';
            textoEncontrarProduto.style.overflow = 'hidden';
            textoEncontrarProduto.style.transition = 'all 0.2s ease-in-out';
        }else{
            textoEncontrarProduto.style.height = '80px';
            textoEncontrarProduto.style.overflow = 'hidden';
            textoEncontrarProduto.style.transition = 'all 0.15s ease-in-out';
        }
    })
}