const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add a name'],
        unique:[true,"username is already taken"],
    },
    email:{
        type:String,
        required:[true,'Please add an email'],
        unique:[true,"A user with this email already exists"],
    },
    password:{
        type:String,
        required:[true,'Please add a password']
    },
    avatar:{
        type:Number,
        default: 0
    }
},{
    timestamps:true
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

module.exports = mongoose.model('User',userSchema)