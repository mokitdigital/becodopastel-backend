import { Request, Response } from 'express'
import User, { IAuthDocument } from '../schema/User'
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

class UserController {
  public async find (req: Request, res: Response): Promise<Response> {
    const { id } = req.query

    if (id === undefined) {
      const user = await User.find()

      if (user === undefined) {
        try {
          throw new Error('Lista do banco de dados => Usuário está vazia')
        } catch (e) {
          console.log(e)
          return res.status(500).json({
            message: 'Nenhum dado correspondente ao usuário'
          })
        }
      }

      return res.status(200).json(user)
    } else {
      const user = await User.findById({ _id: id })

      if (user === undefined) {
        try {
          throw new Error('Lista do banco de dados => ID nao correspondente')
        } catch (e) {
          console.log(e)
          return res.status(500).json({
            message: 'Nenhum usuário correspondente a lista'
          })
        }
      }

      return res.status(200).json(user)
    }
  }
  
  public async create (req: Request, res: Response): Promise<Response> {
    const user = await User.create(req.body)

    if (user === undefined) {
      try {
        throw new Error('Payload vazio')
      } catch (e) {
        console.log(e)
        return res.status(400).json({
          message: 'Nenhum payload correspondente ao usuário'
        })
      }
    }

    return res.status(201).json({
      message: 'Usuário criado com sucesso!',
      user
    })
  }

  public async authenticate (req: Request, res: Response): Promise<Response> {
    const email: string | any = req.body.email
    const compare: string | any = req.body.password
    let token

    const auth = await User.findOne({ email }, async function (err: Error, response: IAuthDocument) {
      if(response && response.password) {
        if(bcrypt.compareSync(compare, response.password)) {
          const id = response._id
          token = jwt.sign({ id }, 'ovo', {
            expiresIn: 86400000 // expira em 1 dia
          })

          await User.updateOne({ email }, { token })
        }
      }
    })

    if (auth) {
      return res.status(200).json({
        msg: "Autentificação bem sucedida!",
        token
      })
    } else {
      return res.status(500).json({
        error: "Senha Inválida"
      })
    }
    
  }
}

export default new UserController()