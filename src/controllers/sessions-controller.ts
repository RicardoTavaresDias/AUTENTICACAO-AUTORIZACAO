import { Request, Response } from "express"
import { AppError } from "@/utils/AppError"
import { authConfig } from "@/configs/auth"
import { sign } from "jsonwebtoken"

class SessionsController {
  async create(request: Request, response: Response) {

    const { username, password } = request.body

    // Usuario fake para teste no sistema para autenticação
    const fakeUser = {
      id: "1",
      username: "rodrigo",
      password: "123456",
      role: "sale"
    }

    if(username !== fakeUser.username 
      || password !== fakeUser.password ){
        throw new AppError("Usuário e/ou senha incorreta!", 401)
    }

    const { secret, expiresIn } = authConfig.Jwt

    const token = sign({ role: fakeUser.role }, secret, {
      expiresIn,
      subject: String(fakeUser.id)
    })

    return response.json({ token })
  }
}

export { SessionsController }
