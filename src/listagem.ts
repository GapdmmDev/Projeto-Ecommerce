import { clickAnimation } from "./main";
import { decodeJWT } from "./login";

export function listagem() {
    const menuButton = document.getElementById('menuButton') as HTMLImageElement;
    const menu = document.getElementById('menu') as HTMLDivElement;
    const containerProdutos = document.getElementById('containerProdutos') as HTMLDivElement;
    const inputSearch = document.getElementById('search') as HTMLInputElement;
    const modalLogin = document.getElementById('modalLogin') as HTMLDialogElement;
    const buttonCarrinho = document.getElementById('buttonCarrinho') as HTMLImageElement;


    carregarProdutos();

    let menuIsOpen = false;

    menuButton.addEventListener('click', () => {
        menuIsOpen = !menuIsOpen;

        if (menuIsOpen) {
            menu.style.height = '400px'
            menu.style.left = '24px'
            menu.style.transition = 'all .2s ease-in-out'
            menuButton.style.transition = 'all .2s ease-in-out'
            clickAnimation(menuButton, '0.2', '1')
            menuButton.src = './src/assets/svgs/close.svg'

        } else {
            menu.style.height = '0px'
            menu.style.left = '440px'
            clickAnimation(menuButton, '0.2', '1')
            menuButton.src = './src/assets/svgs/menu.svg'
        }
    })

    buttonCarrinho.addEventListener('click', () => {
        clickAnimation(buttonCarrinho, '0.7', '1');
        buttonCarrinho.style.transition = 'all .2s ease-in-out';
        setTimeout(() => {
            if (token === null) {
                modalLogin.showModal();
                modalLogin.style.display = 'none';
                modalLogin.offsetHeight;
                modalLogin.style.display = '';
            } else {
                window.location.href = './carrinho.html'
            }
        }, 300)


    })

    const textoEncontrarProduto = document.getElementById('textoEncontrarProduto') as HTMLElement;
    const search = document.getElementById('search') as HTMLInputElement;

    search.addEventListener('click', () => {
        textoEncontrarProduto.style.height = '0px';
        textoEncontrarProduto.style.overflow = 'hidden';
        textoEncontrarProduto.style.transition = 'all 0.2s ease-in-out';

    })

    search.addEventListener('blur', () => {
        if (search.value != '') {
            textoEncontrarProduto.style.height = '0px';
            textoEncontrarProduto.style.overflow = 'hidden';
            textoEncontrarProduto.style.transition = 'all 0.2s ease-in-out';
        } else {
            textoEncontrarProduto.style.height = '80px';
            textoEncontrarProduto.style.overflow = 'hidden';
            textoEncontrarProduto.style.transition = 'all 0.15s ease-in-out';
        }
    })

    let produtos: any[] = [];

    async function carregarProdutos() {
        const res = await fetch('https://fakestoreapi.com/products');
        produtos = await res.json();
        exibirProdutos(produtos);
    };

    function exibirProdutos(produtos: any[]) {
        containerProdutos.innerHTML = '';  

        produtos.forEach((produto) => {
            containerProdutos.innerHTML += `
            <div style="width: 100%; display: flex; padding: 8px; border: 1px solid #e5e7eb; border-radius: 0.375rem; gap: 20px; height: 152px;">
                <img src="${produto.image}" style="width: 132px; height: 100%; border-radius: 0.375rem;" alt="${produto.title}">
                <div style="display: flex; flex-direction: column; justify-content: space-between;">
                    <div style="display: flex; flex-direction: column;">
                    <h3 style="width: 208px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;">
                        ${produto.title}
                    </h3>
                    <span style="display: flex; gap: 5px; font-size: 12px;">
                        <img src="./src/assets/svgs/star.svg" alt="Rating"> ${produto.rating.rate} (${produto.rating.count})
                    </span>
                </div>
                <span style="font-size: 0.875rem; font-family: 'Inter', sans-serif; font-weight: 500;">
                    R$ ${(produto.price * 5.64).toFixed(2)}
                </span>
                <button style="background-color: #3483FA; color: white; height: 36px; width: 100%; border-radius: 4px; font-size: 0.875rem;" id="${produto.id}">
                    Adicionar
                </button>
                </div>        
            </div>
            `;
        });

        renderizarBotoesProdutos()

        // Após a renderização dos produtos, adicionar o evento
        produtos.forEach((produto) => {
            const botao = document.getElementById(produto.id.toString()) as HTMLButtonElement;
            if (botao) {
                botao.addEventListener('click', () => {
                    animationButtonAdicionar(botao);
                });
            }
        });
    };

    function animationButtonAdicionar(botao: HTMLButtonElement) {
        clickAnimation(botao, '0.9', '1');
        botao.style.transition = 'all .2s ease-in-out';
    }



    function filtrarProdutos() {
        const valueInput = inputSearch.value.toLowerCase();


        const produtosFiltrados = produtos.filter((produto) => {
            return produto.title.toLowerCase().includes(valueInput);
        });

        exibirProdutos(produtosFiltrados);
    };


    inputSearch.addEventListener('input', filtrarProdutos);


    async function renderizarBotoesProdutos() {
        const botoesProdutos = document.querySelectorAll('#containerProdutos button');
        return botoesProdutos.forEach(botao => {

            botao.addEventListener('click', (event) => {
                const target = event.target as HTMLButtonElement;
                fetch(`https://fakestoreapi.com/products/${target.id}`)
                    .then(res => res.json())
                    .then(json => incluirProdutoCarrinho(json))
            })
        })
    };



    const token = sessionStorage.getItem('@TOKEN');
    const userId = token !== null ? decodeJWT(String(token)) : undefined;



    let produtoCarrinho: any[] = JSON.parse(sessionStorage.getItem('@CARRINHO') || '[]');

    if (!Array.isArray(produtoCarrinho)) {
        produtoCarrinho = [];
    }

    function incluirProdutoCarrinho(produto: any) {
        if (token === null) {
            modalLogin.showModal();
            modalLogin.style.display = 'none';
            modalLogin.offsetHeight;
            modalLogin.style.display = '';
        } else {
            const produtoExistente = produtoCarrinho.some(p => p.id === produto.id);

            if (!produtoExistente) {
                produtoCarrinho.push(produto);

                fetch(`https://fakestoreapi.com/carts/${userId.sub}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        products: produtoCarrinho,
                        userId: userId.sub
                    })
                })
                    .then(res => res.json())
                    .then(json => {
                        sessionStorage.setItem('@CARRINHO', JSON.stringify(json));
                    })
                    .catch(err => console.error('Erro ao atualizar carrinho:', err));
            } else {
                console.log('Produto já está no carrinho');
            }
        }
    };

    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('@CARRINHO', JSON.stringify(produtoCarrinho));
    });
}