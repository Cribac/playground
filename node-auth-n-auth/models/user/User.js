import { model } from 'mongoose'
import UserSchema from './schema.js'

const User = model('User', UserSchema)

export default User
