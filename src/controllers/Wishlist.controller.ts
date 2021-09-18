import { Request, Response } from 'express'
import Wishlist from '../schema/Wishlist'

class WishlistController {
  public async find (req: Request, res: Response): Promise<Response> {
    const { id } = req.query

    if (id === undefined) {
      const wishlist = await Wishlist.find()

      if (wishlist === undefined) {
        try {
          throw new Error('Lista do banco de dados => Wishlist está vazia')
        } catch (e) {
          return res.status(500).json({
            message: 'Nenhum dado correspondente ao wishlist'
          })
        }
      }

      return res.status(200).json(wishlist)
    } else {
      const wishlist = await Wishlist.findById({ _id: id })

      if (wishlist === undefined) {
        try {
          throw new Error('Lista do banco de dados => ID nao correspondente')
        } catch (e) {
          return res.status(500).json({
            message: 'Nenhum produto correspondente a lista'
          })
        }
      }

      return res.status(200).json(wishlist)
    }
  }

  public async create (req: Request, res: Response): Promise<Response> {
      const wishlist = await Wishlist.create(req.body)

      if (wishlist === undefined) {
        try {
          throw new Error('Payload vazio')
        } catch (e) {
          return res.status(400).json({
            message: 'Nenhum payload correspondente ao wishlist'
          })
        }
      }

      return res.status(201).json({
        message: 'Wishlist criada com sucesso!',
        wishlist
      })
  }

  public async deleteOne (req: Request, res: Response): Promise<Response> {
    const wishlistDelete = await Wishlist.deleteOne({ _id: req.query.id })

    if (wishlistDelete === undefined) {
      try {
        throw new Error('Payload vazio')
      } catch (e) {
        return res.status(400).json({
          message: 'Nenhum payload correspondente ao wishlist'
        })
      }
    }

    return res.status(204).json()
  }

  public async updateOne (req: Request, res: Response): Promise<Response> {
    const wishlist = await Wishlist.updateOne(req.body.filter, req.body.update)

    if (wishlist === undefined) {
      try {
        throw new Error('Payload vazio ou não correspondente')
      } catch (e) {
        return res.status(400).json({
          message: 'Nenhum payload correspondente ao wishlist'
        })
      }
    }

    return res.status(201).json(wishlist)
  }
}

export default new WishlistController()