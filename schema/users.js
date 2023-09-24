const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Username: String,
    Name: String,
    Bio: String,
    Major: String,
    School: String,
    Hashpassword: String,
    School: String,
    Year: Number,
    JoinDate: Number,
    Friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    Requests: [String]
});


const User = mongoose.model("users", UserSchema);

module.exports = User;