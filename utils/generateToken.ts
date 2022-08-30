import jwt, { Secret } from 'jsonwebtoken'
import { IUser } from './schemaInterfaces'


function generateAccessToken(user: IUser) {
    const token = jwt.sign({ id: user._id?.toString(), name: user.name, email: user.email }, <Secret>process.env.TOKEN_SECRET, { expiresIn: '3600s' })
    return token
}

export default generateAccessToken