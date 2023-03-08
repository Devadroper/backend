const socketClient = io();

const prods = document.getElementById("prods");

socketClient.emit('mongoProds')

const render = (e) => {
  e.docs.forEach((elem) => {
    const div = document.createElement("div");
    div.className = "prodCard";
    div.innerHTML = `
    <p>${elem.title}</p>
    <button>Agregar al carrito</button>
    `
    prods.appendChild(div);
  });
};

socketClient.on('prods', (e) => {
  prods.innerHTML = ''
  render(e)
})