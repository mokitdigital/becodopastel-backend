import { Router } from 'express'
import UserController from './controllers/User.controller'
import WishlistController from './controllers/Wishlist.controller'

const routes = Router()

routes.get('/api/wishlists', WishlistController.find)
routes.post('/api/wishlists', WishlistController.create)
routes.delete('/api/wishlists', WishlistController.deleteOne)
routes.put('/api/wishlists', WishlistController.updateOne)

routes.post('/api/user', UserController.create)
routes.post('/api/login', UserController.authenticate)
routes.get('/api/user', UserController.find)
routes.get('/api/token', UserController.findToken)

export default routes
