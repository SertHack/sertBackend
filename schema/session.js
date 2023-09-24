const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    Username: String,
    sessionID: String,
})

const Session = mongoose.model("sessions", sessionSchema);

module.exports = Session;