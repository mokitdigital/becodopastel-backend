import { Router } from 'express'
import UserController from './controllers/User.controller'
import WishlistController from './controllers/Wishlist.controller'

const routes = Router()

routes.get('/api/wishlists', WishlistController.find)
routes.post('/api/wishlists', WishlistController.create)
routes.delete('/api/wishlists', WishlistController.deleteOne)
routes.put('/api/wishlists', WishlistController.updateOne)

routes.post('/api/user', UserController.create)
routes.get('/api/user', UserController.find)

export default routes
