import { Router } from 'express'

const authWebRouter = new Router()

authWebRouter.get('/', (req, res) => {
    res.redirect('/home')
})

authWebRouter.get('/login', (req, res) => {
    const nombre = req.session?.nombre
    if (nombre) {
        res.redirect('/')
    } else {
        res.render( 'login')
    }
})

authWebRouter.get('/logout', (req, res) => {
    const nombre = req.session?.nombre
    if (nombre) {
        req.session.destroy(err => {
            if (!err) {
                res.render('logout', { nombre })
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
})

authWebRouter.post('/login', (req, res) => {
    req.session.nombre = req.body.nombre
    res.redirect('/home')
})

export default authWebRouter