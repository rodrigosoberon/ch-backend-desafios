import {Router} from 'express'
import {webAuth} from '../../auth/index.js'

const productosWebRouter = new Router()

productosWebRouter.get('/home', webAuth, (req, res) => {
    res.render('home', {nombre: req.session.nombre})
})

// productosWebRouter.get('/productos-test', (req, res) => {
//     res.render('productos-test')
// })

export default productosWebRouter