const logger = require('../../logger')
const {Router} = require ('express')

const productosWebRouter = Router()

const checkAtuhentication = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

productosWebRouter.get('/home',checkAtuhentication, (req, res) => {
    let username = req.user.username;
    res.render('home', {username})
})

module.exports = productosWebRouter