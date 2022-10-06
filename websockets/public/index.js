const socket = io();

function mostrarProductos(data) {
  const html = data
    .map((elem, index) => {
      return `<tr>
          <td scope="row">${elem.title}</td>
          <td scope="row">${elem.price}</td>
          <td scope="row"><img src="${elem.thumbnail}" alt="${elem.title}" height="30px"/></td>
      </tr>`;
    })
    .join(" ");
  document.getElementById("productos").innerHTML = html;
}

function mostrarMensajes(data) {
  const html = data
    .map((elem, index) => {
      return `<div>
                <strong style="color: blue;">${elem.author}</strong> 
                <span style="color: red;">[${elem.timestamp}]</span>: 
                <em style="color: green;">${elem.text}</em>
              </div>`;
    })
    .join(" ");
  document.getElementById("messages").innerHTML = html;
}

socket.on("products", (data) => {
  mostrarProductos(data);
});

socket.on("messages", (data) => {
  mostrarMensajes(data);
});

function addProduct() {
  const title = document.getElementById("title");
  const price = document.getElementById("price");
  const url = document.getElementById("url");
  const product = {
    title: title.value,
    price: price.value,
    url: url.value,
  };
  socket.emit("newProduct", product);
  return false;
}

function addMessage() {
  const username = document.getElementById("username");
  const message = document.getElementById("message");
  const now = new Date();
  const timestamp = now.toLocaleString();
  const mensaje = {
    author: username.value,
    text: message.value,
    timestamp: timestamp,
  };
  message.value = "";
  socket.emit("newMessage", mensaje);
  return false;
}
