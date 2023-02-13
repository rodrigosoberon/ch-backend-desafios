const Router = require('koa-router')

const router = new Router({ prefix: '/api/products' })

let products = [
	{ id: 1, description: 'Product 1', price: 100 },
	{ id: 2, description: 'Product 2', price: 120 },
	{ id: 3, description: 'Product 3', price: 190 },
	{ id: 4, description: 'Product 4', price: 800 },
	{ id: 5, description: 'Product 5', price: 200 }
] // dummy data

router.get('/', ctx => {
	ctx.body = {
		status: 'success',
		message: products
	}
})

router.get('/:id', ctx => {
	const id = ctx.params.id
	const product = products.find(p => p.id == id)
	if (product) {
		ctx.body = {
			status: 'success',
			message: product
		}
	} else {
		ctx.body = {
			status: 'error',
			message: 'Product not found'
		}
	}
})

router.post('/', ctx => {
	const product = ctx.request.body
	products.push(product)
	ctx.body = {
		status: 'success',
		message: product
	}
})

router.put('/:id', ctx => {
	const id = ctx.params.id
	const product = products.find(p => p.id == id)
	if (product) {
		const index = products.indexOf(product)
		products[index] = ctx.request.body
		ctx.body = {
			status: 'success',
			message: products[index]
		}
	} else {
		ctx.body = {
			status: 'error',
			message: 'Product not found'
		}
	}
})

router.delete('/:id', ctx => {
	const id = ctx.params.id
	const product = products.find(p => p.id == id)
	if (product) {
		const index = products.indexOf(product)
		products.splice(index, 1)
		ctx.body = {
			status: 'success',
			message: 'Product deleted'
		}
	} else {
		ctx.body = {
			status: 'error',
			message: 'Product not found'
		}
	}
})

module.exports = router
