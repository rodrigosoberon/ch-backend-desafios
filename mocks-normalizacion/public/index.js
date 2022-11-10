const socket = io();

const schemaAuthor = new normalizr.schema.Entity('author', {}, {idAttribute: 'id'});
const schemaMessage = new normalizr.schema.Entity('post', {author: schemaAuthor}, {idAttribute: 'id'})
const schemaMessages = new normalizr.schema.Entity('posts', {messages: [schemaMessage]}, {idAttribute: 'id'})


function mostrarMensajes(data) {
    const html = data.messages
        .map((elem) => {
            return `<div>
                <strong style="color: blue;">${elem.author.email}</strong> 
                <span style="color: red;">[${new Date(elem.timestamp).toLocaleString()}]</span>
                <em style="color: green;">${elem.text}</em>
                <img src="${elem.author.avatar}" height="30px">
              </div>`;
        })
        .join(" ");
    document.getElementById("messages").innerHTML = html;
}

socket.on("messages", (data) => {
    console.log("------NORMALIZADOS-------")
    console.log((data))
    console.log("-----DESNORMALIZADOS-----")
    console.log((normalizr.denormalize(data.result, schemaMessages, data.entities)))
    const normalizados = JSON.stringify(data).length

    const desnormalizados = JSON.stringify(normalizr.denormalize(data.result, schemaMessages, data.entities)).length
    const compresion = parseInt((normalizados * 100)/desnormalizados)
    console.log(`Tamaño normalizados: ${normalizados} - Tamaño desnormalizados ${desnormalizados}`)
    console.log(`La compresion es del ${compresion}%`)

    mostrarMensajes(normalizr.denormalize(data.result, schemaMessages, data.entities));

    document.getElementById("compresion").innerText = `Porcentaje de compresión: ${compresion}%`;
});

function addMessage() {
    const message = {
        author: {
            email: document.getElementById('email').value,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            edad: document.getElementById('edad').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value
        },
        text: document.getElementById("message").value,
        timestamp: new Date()
    }

    document.getElementById("message").value = "";
    socket.emit("newMessage", message);
    return false;
}
