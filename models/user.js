const { Schema, model } = require('mongoose')

const schema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
    role: { type: String, default: 'viewer' },
    bookInstances: [{ type: Schema.ObjectId, ref: 'BookInstance' }]
})

module.exports = model('User', schema)
