import { clickAnimation } from "./main";

// Função para buscar e renderizar os produtos da Fake Store API
async function fetchProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();
  return products;
}

// Função para renderizar os produtos na tela
function renderProducts(products: any[]) {
  const productList = document.getElementById("product-list") as HTMLElement;
  productList.innerHTML = ""; // Limpa a lista antes de renderizar

  products.forEach((product) => {
    const productElement = `
            <div class="w-[178px] flex flex-col gap-[7px]">
                <img src="${product.image}" class="h-[178px] w-[178px]" alt="${
      product.title
    }">
                <h3>${product.title}</h3>
                <span>R$ ${product.price.toFixed(2)}</span>
            </div>
        `;
    productList.innerHTML += productElement;
  });
}

// Função para filtrar os produtos com base na pesquisa
function filterProducts(products: any[], searchTerm: string) {
  return products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

export function listagem() {
  const menuButton = document.getElementById("menuButton") as HTMLImageElement;
  const menu = document.getElementById("menu") as HTMLDivElement;
  let menuIsOpen = false;

  menuButton.addEventListener("click", () => {
    menuIsOpen = !menuIsOpen;
    if (menuIsOpen) {
      menu.style.height = "400px";
      menu.style.left = "24px";
      menu.style.transition = "all .2s ease-in-out";
      menuButton.style.transition = "all .2s ease-in-out";
      clickAnimation(menuButton, "0.2", "1");
      menuButton.src = "./src/assets/svgs/close.svg";
    } else {
      menu.style.height = "0px";
      menu.style.left = "440px";
      clickAnimation(menuButton, "0.2", "1");
      menuButton.src = "./src/assets/svgs/menu.svg";
    }
  });

  const textoEncontrarProduto = document.getElementById(
    "textoEncontrarProduto"
  ) as HTMLElement;
  const search = document.getElementById("search") as HTMLInputElement;

  search.addEventListener("click", () => {
    textoEncontrarProduto.style.height = "0px";
    textoEncontrarProduto.style.overflow = "hidden";
    textoEncontrarProduto.style.transition = "all 0.2s ease-in-out";
  });

  search.addEventListener("blur", () => {
    if (search.value !== "") {
      textoEncontrarProduto.style.height = "0px";
      textoEncontrarProduto.style.overflow = "hidden";
      textoEncontrarProduto.style.transition = "all 0.2s ease-in-out";
    } else {
      textoEncontrarProduto.style.height = "80px";
      textoEncontrarProduto.style.overflow = "hidden";
      textoEncontrarProduto.style.transition = "all 0.15s ease-in-out";
    }
  });

  // Buscar e renderizar os produtos da API
  fetchProducts().then((products) => {
    renderProducts(products);

    // Adicionar evento de pesquisa quando o "Enter" é pressionado
    search.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();  // Impede o envio do formulário
        const target = event.target as HTMLInputElement;
        const searchTerm = target.value.trim();
        
        // Filtrar e renderizar os produtos com base no termo de pesquisa
        const filteredProducts = filterProducts(products, searchTerm);
        renderProducts(filteredProducts);
      }
    });
  });
}
