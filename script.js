function selectOption(selected) {
    let figures = selected.parentElement.children;
    for (let figure of figures) {
        if (figure != selected) figure.children[0].classList.remove('selected');
        else figure.children[0].classList.add('selected');
    }
    changeFunction(document.querySelector('.img-link').value);
}

const TemplateCardPedido = (item) => {
    return `
    <figure class="pedidos-fig">
        <img src="${item.image}" alt="Blusa ${item.id}" width="180px" height="180px">
        <figcaption class="roboto-text">
            <b>Criador:</b> ${item.owner}
        </figcaption>
    </figure>
  `
}

const queryGetApi = async() => {
    const queryUrl = await fetch(`https://mock-api.driven.com.br/api/v4/shirts-api/shirts`);
    const queryResponseJson = await queryUrl.json();
    return queryResponseJson;
}

const selectElement = (element, type) => {
    return (type === 'all') ? document.querySelectorAll(element) : document.querySelector(element);
}

const renderCardsScreen = async() => {
    const pedidosContainer = document.querySelector('.ultimos-pedidos > div');
    const pedidos = await queryGetApi();
    pedidos.forEach(item => {
        pedidosContainer.innerHTML += TemplateCardPedido(item);
    })
}

function changeFunction(value) {
    const modelos = document.querySelector('.modelo').children;
    let flagM = false;
    const golas = document.querySelector('.gola').children;
    let flagG = false;
    const tecidos = document.querySelector('.tecido').children;
    let flagT = false;
    for (let modelo of modelos)
        for (let classe of modelo.children[0].classList)
            if (classe == 'selected') flagM = true;
    for (let gola of golas)
        for (let classe of gola.children[0].classList)
            if (classe == 'selected') flagG = true;
    for (let tecido of tecidos)
        for (let classe of tecido.children[0].classList)
            if (classe == 'selected') flagT = true;
    const reg = /^http(s?):\/\/.*/;
    const button = document.querySelector('.img-submit');
    let ok = reg.exec(value);
    if (ok && flagM && flagG && flagT) {
        button.disabled = false;
        button.classList.add('enabled');
    } else {
        button.disabled = true;
        button.classList.remove('enabled');
    }
}
renderCardsScreen();