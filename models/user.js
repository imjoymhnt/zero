const mongoose = require('mongoose');
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
    Username:{
        type: String,
        required: true
    },
    Email:{
        type:String,
        required: true
    },
    Password:{
        type:String,
        required: true 
    }
});
// userSchema
//   .virtual("password")
//   .set(function (password) {
//     (this._password = password),
//       (this.salt = uuidv4()),
//       (this.encry_password = this.securePassword(password));
//   })
//   .get(function () {
//     return this._password;
//   });
// userSchema.methods = {
//   authenticate: function (plainPassword) {
//     return this.securePassword(plainPassword) === this.encry_password;
//   },
//   securePassword: function (plainPassword) {
//     if (!plainPassword) return "";
//     try {
//       return crypto
//         .createHmac("sha256", this.salt)
//         .update(plainPassword)
//         .digest("hex");
//     } catch (err) {
//       return "";
//     }
//   },
// };

module.exports = mongoose.model('User', userSchema);