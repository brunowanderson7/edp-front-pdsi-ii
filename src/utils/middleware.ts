import jwt from "jsonwebtoken"


export const authMiddleware = (token: string) => {

  try {
    const decoded = jwt.decode(token)
    console.log(decoded)

    if (!decoded || (typeof decoded === 'string') || (decoded.exp && Date.now() / 1000 > decoded.exp)) {
      return false
    } else {
      return true
    }
  } catch (error) {
    console.error('Erro ao decodificar o token:', error)
    return false
  }
}