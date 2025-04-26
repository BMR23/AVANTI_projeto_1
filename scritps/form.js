const formRegister = document.querySelector('#form-register')


formRegister.addEventListener('submit', event => {
    const clientName = document.querySelector('#client_name')
    if (!clientName) {
        formRegister.reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return
    }

    event.preventDefault();
    const formData = new FormData(event.target);

    const dados = {};
    formData.forEach((valor, chave) => {
      dados[chave] = valor;
    });

    clientName.textContent = `${dados.name}!`

    formRegister.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
})


    