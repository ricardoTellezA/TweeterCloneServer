const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    }, 

    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },

    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },

    avatar: {
        type: String,
        trim: true,
    },

    portada: {
        type: String,
        trim: true,
    },

    description:{
        type: String,
        trim: true,
    },

    

    password:{
        type: String,
        required: true,
        trim: true, 

    },

    createAdd:{
        type: Date,
        default: Date.now(),
    }
});


module.exports = mongoose.model("User", UserSchema);