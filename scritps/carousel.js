import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

let swiper;

export function iniciarSwiper() {
  // if (swiper) swiper.destroy(true, true); // Destroi o swiper anterior, se existir

  swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 10,
    // slidesPerGroup: 3,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      // dynamicBullets: false,
    },
    navigation: {
      nextEl: '.custom-next',
      prevEl: '.custom-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    breakpoints: {
      1028: {
        // slidesPerView: 5,
        // slidesPerGroup: 5,
      },
      1308: {
        // slidesPerView: 5,
        // slidesPerGroup: 5,
        spaceBetween: 17,
      },
    },
  });
}

iniciarSwiper();

// Inicializa o swiper pela primeira vez
/* iniciarSwiper();

// Adiciona o listener para redimensionamento
window.addEventListener('resize', () => {
  const largura = window.innerWidth;
  const novo_margin = largura < 1024 ? 10 : 17;
  const slidesPerView = largura < 1024 ? 2 : 5

  if (novo_margin !== margin_card) {
    margin_card = novo_margin;
    iniciarSwiper(); // Recria o swiper com novo valor de spaceBetween
  }
}); */
