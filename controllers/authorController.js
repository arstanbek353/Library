var Author = require('../models/author.js');
var async = require('async');
var Book = require('../models/book.js');
const { body, validationResult } = require('express-validator');
const paginatedResults = require('../middlewares/paginationMiddleware')

// Display list of all Authors.
// exports.author_list = [
//     paginatedResults(Author),
//     function (req, res, next) {
//     Author.find()
//         .sort([['family_name', 'ascending']])
//         .exec(function (err, list_authors) {
//             if (err) { return next(err); }
//             //Successful, so render
//             //res.render('author_list', { title: 'Author List', author_list: list_authors });
//             res.status(200).json({ title: 'Author List', author_list: list_authors });
//         });
// }]

// Display list of all Authors.
exports.author_list = [
    paginatedResults(Author, { sort: [['family_name', 'ascending']] }),
    function (req, res, next) {
        res.status(200).json({
            title: 'Author List',
            author_list: res.paginatedResults.results,
            ...res.paginatedResults.rest
        });
    }
]


// Display detail page for a specific Author.
exports.author_detail = function (req, res, next) {

    async.parallel({
        author: function (callback) {
            Author.findById(req.params.id)
                .exec(callback)
        },
        authors_books: function (callback) {
            Book.find({ 'author': req.params.id }, 'title summary')
                .exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.author == null) { // No results.
            var err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        //res.render('author_detail', { title: 'Author Detail', author: results.author, author_books: results.authors_books });
        res.status(200).json({ title: 'Author Detail', author: results.author, author_books: results.authors_books });
    });

};


// Показать форму создания автора по запросу GET.
exports.author_create_get = function (req, res) {
    res.status(200).json({ title: 'Create Author' });
};

// Handle Author create on POST.
exports.author_create_post = [

    // Validate and sanitize fields.
    body('first_name').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('family_name').trim().isLength({ min: 1 }).escape().withMessage('Family name must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601().toDate(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            //res.render('author_form', { title: 'Create Author', author: req.body, errors: errors.array() });
            res.status(400).json({ title: 'Create Author', author: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Create an Author object with escaped and trimmed data.
            var author = new Author(
                {
                    first_name: req.body.first_name,
                    family_name: req.body.family_name,
                    date_of_birth: req.body.date_of_birth,
                    date_of_death: req.body.date_of_death
                });
            author.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                //res.redirect(author.url);
                res.status(201).send({ message: 'Author was created', author })
            });
        }
    }
];


// Показать форму удаления автора по запросу GET.
// Display Author delete form on GET.
exports.author_delete_get = function (req, res, next) {

    async.parallel({
        author: function (callback) {
            Author.findById(req.params.id).exec(callback)
        },
        authors_books: function (callback) {
            Book.find({ 'author': req.params.id }).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        // Success
        if (results.authors_books.length > 0) {
            // Author has books. Render in same way as for GET route.
            //res.render('author_delete', { title: 'Delete Author', author: results.author, author_books: results.authors_books });

            res.status(299).json({ message: 'You should delete this books', author: results.author, author_books: results.authors_books });
            return;
        }
        else {
            // Author has no books. Delete object and redirect to the list of authors.
            Author.findByIdAndRemove(req.params.id, function deleteAuthor(err) {
                if (err) { return next(err); }
                // Success - go to author list
                console.log('deleted', req.params.id)
                res.status(200).json({ message: 'Author was deleted', author: results.author, author_books: results.authors_books });
            })
        }
    });

};


// Удалить автора по запросу POST.
// Handle Author delete on POST.
exports.author_delete_post = function (req, res, next) {

    async.parallel({
        author: function (callback) {
            Author.findById(req.params.id).exec(callback)
        },
        authors_books: function (callback) {
            Book.find({ 'author': req.params.id }).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        // Success
        if (results.authors_books.length > 0) {
            // Author has books. Render in same way as for GET route.
            //res.render('author_delete', { title: 'Delete Author', author: results.author, author_books: results.authors_books });

            res.status(299).json({ message: 'You should delete this books', author: results.author, author_books: results.authors_books });
            return;
        }
        else {
            // Author has no books. Delete object and redirect to the list of authors.
            Author.findByIdAndRemove(req.params.id, function deleteAuthor(err) {
                if (err) { return next(err); }
                // Success - go to author list
                console.log('deleted', req.params.id)
                res.status(200).json({ message: 'Author was deleted', author: results.author, author_books: results.authors_books });
            })
        }
    });
};


// Показать форму обновления автора по запросу GET.
exports.author_update_get = function (req, res) {
    async.parallel({
        author: function (callback) {
            Author.findById(req.params.id)
                .exec(callback)
        },
        authors_books: function (callback) {
            Book.find({ 'author': req.params.id }, 'title summary')
                .exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.author == null) { // No results.
            var err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        //res.render('author_detail', { title: 'Author Detail', author: results.author, author_books: results.authors_books });
        res.status(200).json({ title: 'Author Update', author: results.author, author_books: results.authors_books });
    });
};

// Обновить автора по запросу POST.
exports.author_update_post = [

    // Validate and sanitize fields.
    body('first_name').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('family_name').trim().isLength({ min: 1 }).escape().withMessage('Family name must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601().toDate(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            //res.render('author_form', { title: 'Create Author', author: req.body, errors: errors.array() });
            res.status(400).json({ title: 'Update Author', author: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Create an Author object with escaped and trimmed data.
            var author = new Author(
                {
                    first_name: req.body.first_name,
                    family_name: req.body.family_name,
                    date_of_birth: req.body.date_of_birth,
                    date_of_death: req.body.date_of_death,
                    _id: req.params.id
                });
            Author.findByIdAndUpdate(req.params.id, author, {}, function (err) {
                if (err) { return next(err); }
                res.status(200).json({ message: 'the author has been updated', author });
            });
        }
    }
];