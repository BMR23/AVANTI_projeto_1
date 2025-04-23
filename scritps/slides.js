import { iniciarSwiper } from './carousel.js';

function criarSlideProduto() {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide', 'card');

    // Div relativa com imagem e selo "NOVO"
    const relativeDiv = document.createElement('div');
    relativeDiv.classList.add('relative');

    const navNovo = document.createElement('nav');
    navNovo.classList.add('absolute', 'top-0', 'left-0', 'text-[0.7rem]', 'text-white');

    const spanNovo = document.createElement('span');
    spanNovo.classList.add('bg-[#00264E]', 'px-2', 'py-1', 'rounded-md');
    spanNovo.textContent = 'NOVO';

    navNovo.appendChild(spanNovo);
    relativeDiv.appendChild(navNovo);

    const img = document.createElement('img');
    img.src = './assets/img/main/produto-avanti-Mockup.svg';
    img.alt = '';
    // img.classList.add('size-[158px]', );
    // img.classList.add('size-[158px]', 'lg:size-[222px]');
    img.classList.add('w-full');

    relativeDiv.appendChild(img);
    slide.appendChild(relativeDiv);

    // Título
    const h3 = document.createElement('h3');
    h3.classList.add('capitalize', 'text-gray-700', 'text-sm', 'mt-1');
    h3.textContent = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit';
    slide.appendChild(h3);

    // Preços
    const precoDiv = document.createElement('div');
    precoDiv.classList.add('flex', 'mt-3', 'relative');

    const precoInterno = document.createElement('div');

    const previousPrice = document.createElement('nav');
    previousPrice.id = 'previous-price';
    previousPrice.classList.add('line-through', 'text-gray-700', 'text-sm');
    previousPrice.textContent = 'R$ 100,00';

    const precoFinal = document.createElement('nav');
    precoFinal.classList.add('font-bold', 'text-[1.18rem]/[100%]');
    precoFinal.textContent = 'R$79,90';

    precoInterno.appendChild(previousPrice);
    precoInterno.appendChild(precoFinal);

    const navPromo = document.createElement('nav');
    navPromo.id = 'promo';
    navPromo.classList.add(
        'absolute', 'top-[-4px]', 'left-20', 'text-xs', 'text-white',
        'my-2', 'px-2', 'py-[4px]', 'whitespace-nowrap',
        'rounded-[4px]', 'h-min', 'font-semibold', 'bg-[#5EC0BE]'
    );
    navPromo.textContent = '10% OFF';

    precoDiv.appendChild(precoInterno);
    precoDiv.appendChild(navPromo);
    slide.appendChild(precoDiv);

    // Parcelamento
    const spanParcelamento = document.createElement('span');
    spanParcelamento.classList.add('text-xs', 'text-[#303030]');
    spanParcelamento.innerHTML = 'Ou em até <strong>10x de R$ 7,90</strong>';
    slide.appendChild(spanParcelamento);

    // Botão
    const botao = document.createElement('button');
    botao.classList.add('bg-[#005CFF]', 'text-white', 'text-sm', 'w-full', 'rounded-md', 'py-2', 'mt-1');
    botao.textContent = 'Comprar';
    slide.appendChild(botao);

    return slide;
}
  
  // Exemplo: adicionando à swiper wrapper
  const swiperWrappers = document.querySelectorAll('.swiper-wrapper');
  const num_slides = 10;
  for (let i = 0; i < num_slides; i++) {
    for (const swiperWrapper of swiperWrappers) {
        swiperWrapper.appendChild(criarSlideProduto());
    }
  }
  
  setTimeout(() => {
    iniciarSwiper();
  }, 1000);