let pedido = {
    "model": "",
    "neck": "",
    "material": "",
    "image": "",
    "owner": "",
    "author": ""
}

const renderCardsScreen = async() => {
    const pedidosContainer = document.querySelector('.ultimos-pedidos > div');
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts');
    promise.then(value => {
        const pedidos = value.data;
        pedidos.forEach(item => {
            pedidosContainer.innerHTML += TemplateCardPedido(item);
        })
    })
}

const TemplateCardPedido = (item) => {
    return `
    <figure class="pedidos-fig" 
    data-model="${item.model}" 
    data-neck="${item.neck}" 
    data-material="${item.material}"
    data-image="${item.image}"
    data-owner="${item.owner}"
    onclick="redoPedido(this)">
        <img src="${item.image}" alt="Blusa ${item.id}" width="180px" height="180px">
        <figcaption class="roboto-text">
            <b>Criador:</b> ${item.owner}
        </figcaption>
    </figure>
  `
}

function selectOption(selected) {
    let figures = selected.parentElement.children;
    for (let figure of figures) {
        if (figure != selected) figure.children[0].classList.remove('selected');
        else figure.children[0].classList.add('selected');
    }
    changeFunction(document.querySelector('.img-link').value);
}

function redoPedido(newPedido) {
    let text = "Quer copiar esse pedido!\nOK or Cancel.";
    if (confirm(text) == true) {
        pedido.model = newPedido.dataset.model;
        pedido.neck = newPedido.dataset.neck;
        pedido.material = newPedido.dataset.material;
        pedido.image = newPedido.dataset.image;
        pedido.author = newPedido.dataset.owner;
        clicouBotao();
        pedido.author = pedido.owner;
    }
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
            if (classe == 'selected') {
                flagM = true;
                pedido.model = modelo.children[0].children[0].alt;
            }
    for (let gola of golas)
        for (let classe of gola.children[0].classList)
            if (classe == 'selected') {
                flagG = true;
                pedido.neck = gola.children[0].children[0].alt;
            }
    for (let tecido of tecidos)
        for (let classe of tecido.children[0].classList)
            if (classe == 'selected') {
                flagT = true;
                pedido.material = tecido.children[0].children[0].alt;
            }
    const reg = /^http(s?):\/\/.*/;
    const button = document.querySelector('.img-submit');
    pedido.image = value;
    let ok = reg.exec(value);
    if (ok && flagM && flagG && flagT) {
        button.disabled = false;
        button.classList.add('enabled');
    } else {
        button.disabled = true;
        button.classList.remove('enabled');
    }
}

function clicouBotao() {
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', pedido);
    requisicao.then(() => {
        alert("blusa encomendada com sucesso");
        enviouBlusa();
    });
    requisicao.catch(() => { alert("Ops, não conseguimos processar sua encomenda"); });
}

function enviouBlusa() {
    const ultimosPedidos = document.querySelector('.ultimos-pedidos > div').children;
    console.log(ultimosPedidos.length);
    for (let pedido of ultimosPedidos)
        pedido.remove();
    if (ultimosPedidos.length == 0) {
        document.querySelector('.img-link').value = '';
        renderCardsScreen();
    } else
        enviouBlusa();
}

function getName() {
    let nome = prompt("Digite seu nome:");
    pedido.author = nome;
    pedido.owner = nome;
}

getName();
renderCardsScreen();