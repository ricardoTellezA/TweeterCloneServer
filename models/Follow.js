const moongose = require("mongoose");
const Schema = moongose.Schema;


const FollowSchema = new Schema({
 idUser: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
 },


 follow: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
 },

 createAt: {
    type: Date,
    default: Date.now(),
 } 

});



module.exports = moongose.model("Follow", FollowSchema);