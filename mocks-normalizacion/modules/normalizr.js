import { normalize, schema, } from 'normalizr'

const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });
const schemaMessage = new schema.Entity('post', { author: schemaAuthor },{ idAttribute: 'id' } )
const schemaMessages = new schema.Entity('posts', { messages: [schemaMessage] }, { idAttribute: 'id' })
const normalizarMensajes = (mensajesConId) => normalize({ id: 'messages', messages: mensajesConId }, schemaMessages)

export { normalizarMensajes }