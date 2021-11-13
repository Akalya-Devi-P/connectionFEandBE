const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name:{type:String, default:''},
        email:{type:String, required:true},
        mobile:{type:String, required:true},
        password:{type:String, required:true}
    },
    {collection:'list'}
)

module.exports = mongoose.model('user', userSchema)