function selectOption(selected) {
    let figures = selected.parentElement.children;
    for (let i of figures) {
        if (i != selected) i.children[0].classList.remove('selected');
        else i.children[0].classList.add('selected');
    }
}

const TemplateCardPedido = (item) => {
    return `
    <figure class="pedidos-fig">
        <img src="${item.image}" alt="Blusa ${item.id}" width="180px" height="180px">
        <figcaption class="roboto-text">
            Criador: ${item.owner}
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
    const pedidosContainer = selectElement('.ultimos-pedidos > div', 'single');
    const pedidos = await queryGetApi();
    pedidos.forEach(item => {
        pedidosContainer.innerHTML += TemplateCardPedido(item);
    })
}

renderCardsScreen();