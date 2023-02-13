const Koa = require('koa')
const { koaBody } = require('koa-body')
const products = require('./products')

const app = new Koa()

app.use(koaBody())

app.use(products.routes())

app.listen(3000)
