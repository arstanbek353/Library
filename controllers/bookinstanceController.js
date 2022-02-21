var BookInstance = require('../models/bookinstance.js');
var Book = require('../models/book.js');
var User = require('../models/user.js');
var async = require('async');
const { body, validationResult } = require('express-validator');
const paginatedResults = require('../middlewares/paginationMiddleware')


// Display list of all BookInstances.
exports.bookinstance_list = [
    paginatedResults(BookInstance, { populate: 'book' }),
    function (req, res, next) {
        res.status(200).json({
            title: 'Book List',
            bookinstance_list: res.paginatedResults.results,
            ...res.paginatedResults.rest
        });
        // BookInstance.find()
        //     .populate('book')
        //     .exec(function (err, list_bookinstances) {
        //         if (err) { return next(err); }
        //         // Successful, so render
        //         //res.render('bookinstance_list', { title: 'Book Instance List', bookinstance_list: list_bookinstances });
        //         res.send({ title: 'Book Instance List', bookinstance_list: list_bookinstances });
        //     });

    }]


// Display detail page for a specific BookInstance.
exports.bookinstance_detail = function (req, res, next) {

    BookInstance.findById(req.params.id)
        .populate('book')
        .exec(function (err, bookinstance) {
            if (err) { return next(err); }
            if (bookinstance == null) { // No results.
                var err = new Error('Book copy not found');
                err.status = 404;
                return next(err);
            }
            // Successful, so render.
            //res.render('bookinstance_detail', { title: 'Copy: ' + bookinstance.book.title, bookinstance: bookinstance });
            res.send({ title: 'Copy: ' + bookinstance.book.title, bookinstance: bookinstance });
        })

};


// Display BookInstance create form on GET.
exports.bookinstance_create_get = function (req, res, next) {

    Book.find({}, 'title')
        .exec(function (err, books) {
            if (err) { return next(err); }
            // Successful, so render.
            //res.render('bookinstance_form', { title: 'Create BookInstance', book_list: books });
            res.status(200).json({ title: 'Create BookInstance', book_list: books });
        });

};


// Handle BookInstance create on POST.
exports.bookinstance_create_post = [

    // Validate and sanitise fields.
    body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
    body('imprint', 'Imprint must be specified').trim().isLength({ min: 1 }).escape(),
    body('status').escape(),
    body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601().toDate(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a BookInstance object with escaped and trimmed data.
        var bookinstance = new BookInstance(
            {
                book: req.body.book,
                imprint: req.body.imprint,
                status: req.body.status,
                due_back: req.body.due_back
            });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values and error messages.
            Book.find({}, 'title')
                .exec(function (err, books) {
                    if (err) { return next(err); }
                    // Successful, so render.
                    //res.render('bookinstance_form', { title: 'Create BookInstance', book_list: books, selected_book: bookinstance.book._id, errors: errors.array(), bookinstance: bookinstance });
                    res.status(400).json({ message: "Something went wrong", bookinstance: bookinstance })
                });
            return;
        }
        else {
            // Data from form is valid.
            bookinstance.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new record.
                //res.redirect(bookinstance.url);
                res.status(201).json({ message: "Book Instance was created", bookinstance: bookinstance })
            });
        }
    }
];


// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = function (req, res, next) {
    async.parallel({
        bookinstance: function (callback) {
            BookInstance.findById(req.params.id)
                .exec(callback)
        }
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.bookinstance == null) { // No results.
            res.status(400).json({ message: 'error' });
        }
        // Successful, so render.
        BookInstance.findByIdAndRemove(req.params.id, function deleteBookInstance(err) {
            if (err) { return next(err); }
            // Success - go to author list
            res.status(200).json({ message: 'Book Instance was deleted', bookinstance: results.bookinstance });
        })
    });
};

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = function (req, res) {
    res.status(400).json({ message: 'error' });
};

// Display BookInstance update form on GET.
exports.bookinstance_update_get = function (req, res, next) {


    async.parallel({
        books: function (callback) {
            Book.find({}, 'title')
                .exec(callback);
        },
        bookinstance: function (callback) {
            BookInstance.findById(req.params.id)
                .exec(callback)
        }
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.bookinstance == null) { // No results.
            res.status(400).json({ message: 'error' });
        }
        // Successful, so render.

        res.status(200).json({ title: 'bookinstance', book_list: results.books, bookinstance: results.bookinstance });
    });


};

// Handle bookinstance update on POST.
exports.bookinstance_update_post = [

    // Validate and sanitise fields.
    body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
    body('imprint', 'Imprint must be specified').trim().isLength({ min: 1 }).escape(),
    body('status').escape(),
    body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601().toDate(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a BookInstance object with escaped and trimmed data.


        if (!errors.isEmpty()) {
            res.status(400).json({ message: "Something went wrong" })
            return;
        }
        else {
            // Data from form is valid.
            var bookinstance = new BookInstance(
                {
                    book: req.body.book,
                    imprint: req.body.imprint,
                    status: req.body.status,
                    due_back: req.body.due_back,
                    _id: req.params.id
                });
            BookInstance.findByIdAndUpdate(req.params.id, bookinstance, {}, function (err) {
                if (err) { return next(err); }
                res.status(200).json({ message: 'the bookinstance has been updated', bookinstance });
            });
        }
    }
];


// Display BookInstance update form on GET.
exports.bookinstance_lend_get = function (req, res, next) {


    async.parallel({
        user: function (callback) {
            User.find({ role: 'viewer' })
                .exec(callback);
        },
        // books: function (callback) {
        //     Book.find({}, 'title')
        //         .exec(callback);
        // },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.user == null) { // No results.
            res.status(400).json({ message: 'error' });
        }
        // Successful, so render.

        res.status(200).json({ title: 'Users', users: results.user });
    });


};