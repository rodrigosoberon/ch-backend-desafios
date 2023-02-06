const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const {buildSchema} = require('graphql')
const crypto = require('crypto')

const schema = buildSchema(`
input ProductInput {
    description: String,
    price: Int
  }
  type Product {
    id: ID!
    description: String,
    price: Int
  }
  type Query {
    getProduct(id: ID!): Product,
    getProducts(field: String, value: String): [Product],
  }
  type Mutation {
    createProduct(data: ProductInput): Product
    updateProduct(id: ID!, data: ProductInput): Product,
    deleteProduct(id: ID!): Product,
  }
`)


class Product{
  constructor(id, {description, price}){
    this.id = id
    this.descripcion = description
    this.price = price
  }
}

const productsMap = {}
function getProducts({field, value}){
  const products = Object.values(productsMap)
  if (field && value){
    return products.filter(p=>p[field]===value)
  }else{
    return products
  }
}

function getProduct({id}){
  if(!productsMap[id]){
    throw new Error('Product not found')
  }
  return productsMap[id]
}

function createProduct({ data }) {
  const id = crypto.randomBytes(10).toString('hex');
  const newProduct = new Product(id, data)
  productsMap[ id ] = newProduct;
  return newProduct;
}

function updateProduct({ id, data }) {
  if (!productsMap[ id ]) {
    throw new Error('Product not found');
  }
  const updatedProduct = new Product(id, data)
  productsMap[ id ] = updatedProduct;
  return updatedProduct;
}

function deleteProduct({ id }) {
  if (!productsMap[ id ]) {
    throw new Error('Product not found');
  }
  const deletedProduct = productsMap[ id ]
  delete productsMap[ id ];
  return deletedProduct;
}

//Server

const app = express()

app.use(express.static('public'))

const configGraphql = {
  schema: schema,
  rootValue: {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
  },
  graphiql: true
}

app.use('/graph', graphqlHTTP(configGraphql))

app.listen(5000)