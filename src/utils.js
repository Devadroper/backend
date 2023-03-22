import {dirname} from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcrypt'

export const __dirname = dirname(fileURLToPath(import.meta.url))

export const hashPassword = async (e) => {
    return bcrypt.hash(e, 10)
}

export const comparePasswords = async (pass, ashedPass) => {
    return bcrypt.compare(pass, ashedPass)
}