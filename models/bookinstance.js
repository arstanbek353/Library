var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema(
    {
        book: { type: Schema.ObjectId, ref: 'Book', required: true }, //ссылка на книгу
        imprint: { type: String, required: true },
        status: { type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance' },
        due_back: { type: Date, default: Date.now },
        user: { type: Schema.ObjectId, ref: 'User' }
    }
);

//Export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);