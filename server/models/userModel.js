import  mongoose from  'mongoose'

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
  email: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true,
  },
  todos:[]
})

const UserSchema = mongoose.model('UserSchema', userSchema)
export default UserSchema