import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

let swiper;
let margin_card = window.innerWidth < 1024 ? 10 : 17;

function iniciarSwiper() {
  if (swiper) swiper.destroy(true, true); // Destroi o swiper anterior, se existir

  swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: margin_card,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.custom-next',
      prevEl: '.custom-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
}

// Inicializa o swiper pela primeira vez
iniciarSwiper();

// Adiciona o listener para redimensionamento
window.addEventListener('resize', () => {
  const largura = window.innerWidth;
  const novo_margin = largura < 1024 ? 10 : 17;

  if (novo_margin !== margin_card) {
    margin_card = novo_margin;
    iniciarSwiper(); // Recria o swiper com novo valor de spaceBetween
  }
});
