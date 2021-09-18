import { Request, Response } from 'express'
import User, { IAuthDocument } from '../schema/User'
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const isTokenExpired = (token: string): boolean => {
  try {
      const { exp } = jwt.decode(token) as {
          exp: number;
      };
      const expirationDatetimeInSeconds = exp * 1000;
      
      console.log("Está expirado? ", expirationDatetimeInSeconds)
      console.log("Date: ", Date.now())

      return Date.now() >= expirationDatetimeInSeconds;
  } catch {
      return true;
  }
};

class UserController {
  public async findToken(req: Request, res: Response): Promise<Response> {
    const token: string = req.query.token as string

    if (isTokenExpired(token)) {
      return res.status(200).json({
        isToken: false
      })
    }

    return res.status(200).json({
      isToken: true
    })
  }
  
  public async find(req: Request, res: Response): Promise<Response> {
    const token: string = req.query.token as string

    if (token === undefined) {
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
      const user = await User.findOne({
        token: token
      })

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

  public async create(req: Request, res: Response): Promise<Response> {

    const user = await User.create(req.body)

    return res.status(201).json({
      message: 'Usuário criado com sucesso!',
      user
    })
  }

  public async authenticate(req: Request, res: Response): Promise<Response> {
    const email: string = req.body.email as string
    const compare: string = req.body.password as string
    let token = null

    const auth = await User.findOne({ email }, async function (err: Error, response: IAuthDocument) {
      if (response && response.password) {
        console.log(bcrypt.compareSync(compare, response.password))
        if (bcrypt.compareSync(compare, response.password)) {
          const id = response._id
          token = jwt.sign({ id }, 'ovo', {
            expiresIn: 60 // expira em 1 dia
          })

          console.log("Nome token", token)

          await User.updateOne({ email }, { token })
        }
      }
    })

    if (token) {
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