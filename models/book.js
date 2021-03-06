var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: Schema.ObjectId, ref: 'Author', required: true },
        summary: { type: String, required: true },
        isbn: { type: String, required: true },
        genre: [{ type: Schema.ObjectId, ref: 'Genre' }]
    }
);

//Export model
module.exports = mongoose.model('Book', BookSchema);