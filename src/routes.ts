import { Router } from 'express'
import WishlistController from './controllers/Wishlist.controller'

const routes = Router()

routes.get('/api/wishlists', WishlistController.find)
routes.post('/api/wishlists', WishlistController.create)
routes.delete('/api/wishlists', WishlistController.deleteOne)
routes.put('/api/wishlists', WishlistController.updateOne)

export default routes
