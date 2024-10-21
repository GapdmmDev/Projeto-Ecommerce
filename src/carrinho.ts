import { clickAnimation } from "./main";

interface ProdutoCarrinho {
    id: number;
    title: string;
    price: number;
    image: string;
    quantidade: number; 
}

export function carrinho() {
    const containerCarrinho = document.getElementById('containerCarrinho') as HTMLDivElement;
    const subtotal = document.getElementById('subtotal') as HTMLSpanElement;
    const totalCheckout = document.getElementById('totalCheckout') as HTMLSpanElement;

    const backButtonCarrinho = document.getElementById('backButtonCarrinho') as HTMLImageElement;
    backButtonCarrinho.addEventListener('click', () => {
        clickAnimation(backButtonCarrinho, '0.7', '1')
        backButtonCarrinho.style.transition = 'all .2s ease-in-out';
        setTimeout(() => {
            window.location.href = './index.html';
        }, 300)
    });

    let carrinho: ProdutoCarrinho[] = JSON.parse(sessionStorage.getItem('@CARRINHO') || '[]');

    if (!Array.isArray(carrinho) || carrinho.length === 0) {
        containerCarrinho.innerHTML = '<p>O carrinho está vazio.</p>';
        return;
    }

    carrinho = carrinho.map(produto => ({
        ...produto,
        quantidade: produto.quantidade || 1  
    }));

    function atualizarTotal() {
        const total = carrinho.reduce<number>((accumulator, produto) => {
            return accumulator + ((produto.price * 5.64) * produto.quantidade); 
        }, 0);

        const frete = 70;
        const desconto = 0;
        subtotal.innerText = `R$ ${total.toFixed(2)}`;
        
        

        const totalComFreteEDesconto= (total + frete) - desconto;
        totalCheckout.innerText = `R$ ${totalComFreteEDesconto.toFixed(2)}`;
    }

    atualizarTotal();

    containerCarrinho.innerHTML = '';

    carrinho.forEach((produto, index) => {
        const precoConvertido = produto.price * 5.64;  

        containerCarrinho.innerHTML += `
            <div style="display: flex; align-items: center; gap: 14px;">
                <div style="height: 112px; width: 112px">
                    <img src="${produto.image}" alt="${produto.title}" style="height: 100%; width: 100%">
                </div>

                <div style="width: 100%; display: flex; flex-direction: column; justify-content: space-between; gap: 14px;">
                    <h3 style="width: 208px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${produto.title}</h3>
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <span>R$ ${(precoConvertido).toFixed(2)}</span> <!-- Exibe o preço unitário fixo -->
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <img src="./src/assets/svgs/remove.svg" aria-label="Remover" class="Remove" data-index="${index}">
                            <span id="quantidade-${index}">${produto.quantidade}</span> 
                            <img src="./src/assets/svgs/add.svg" aria-label="Adicionar" class="Add" data-index="${index}">
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    const removeButtons = document.querySelectorAll('.Remove');
    const addButtons = document.querySelectorAll('.Add');

    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = parseInt((event.target as HTMLElement).getAttribute('data-index')!);
            if (carrinho[index].quantidade > 1) {
                carrinho[index].quantidade -= 1;
                document.getElementById(`quantidade-${index}`)!.innerText = carrinho[index].quantidade.toString();
                sessionStorage.setItem('@CARRINHO', JSON.stringify(carrinho));
                atualizarTotal();
            }
        });
    });

    addButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = parseInt((event.target as HTMLElement).getAttribute('data-index')!);
            carrinho[index].quantidade += 1;
            document.getElementById(`quantidade-${index}`)!.innerText = carrinho[index].quantidade.toString();
            sessionStorage.setItem('@CARRINHO', JSON.stringify(carrinho));
            atualizarTotal();
        });
    });    
}
