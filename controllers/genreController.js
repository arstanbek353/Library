var mongoose = require('mongoose');
var Genre = require('../models/genre.js');
var Book = require('../models/book.js');
var async = require('async');
const { body, validationResult } = require("express-validator");
const paginatedResults = require('../middlewares/paginationMiddleware')

// Display list of all Genre.
exports.genre_list = [
    paginatedResults(Genre),
    function (req, res) {
        res.status(200).json({
            title: 'Genre List',
            genre_list: res.paginatedResults.results,
            ...res.paginatedResults.rest
        });
    }
]

// Display detail page for a specific Genre.
exports.genre_detail = function (req, res, next) {
    var id = mongoose.Types.ObjectId(req.params.id);
    async.parallel({
        genre: function (callback) {
            Genre.findById(id)
                .exec(callback);
        },

        genre_books: function (callback) {
            Book.find({ 'genre': id })
                .exec(callback);
        },

    }, function (err, results) {
        if (err) { return next(err); }
        if (results.genre == null) { // No results.
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        //res.render('genre_detail', { title: 'Genre Detail', genre: results.genre, genre_books: results.genre_books });
        res.send({ title: 'Genre Detail', genre: results.genre, genre_books: results.genre_books });
    });

};


// Display Genre create form on GET.
exports.genre_create_get = function (req, res) {
    res.send({ title: 'Create Genre' });
};

// Handle Genre create on POST.
exports.genre_create_post = [

    // Validate and sanitize the name field.
    body('name', 'Genre name required').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a genre object with escaped and trimmed data.
        var genre = new Genre(
            { name: req.body.name }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.status(400).json({ title: 'Create Genre', genre: genre, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.
            // Check if Genre with same name already exists.
            Genre.findOne({ 'name': req.body.name })
                .exec(function (err, found_genre) {
                    if (err) { return next(err); }

                    if (found_genre) {
                        // Genre exists, redirect to its detail page.
                        //res.redirect(found_genre.url);
                        res.status(200).json({ message: 'This genre already exists', genre: genre })
                    }
                    else {

                        genre.save(function (err) {
                            if (err) { return next(err); }
                            // Genre saved. Redirect to genre detail page.
                            //res.redirect(genre.url);
                            res.status(201).json({ message: 'Genre was created', genre: genre })
                        });

                    }

                });
        }
    }
];


// Display Genre delete form on GET.
exports.genre_delete_get = function (req, res) {
    async.parallel({
        genre: function (callback) {
            Genre.findById(req.params.id).exec(callback)
        }
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.genre == null) { // No results.
            res.status(400).json({ message: 'error' });
        }
        // Successful, so render.
        Genre.findByIdAndRemove(req.params.id, function deleteGenre(err) {
            if (err) { return next(err); }
            // Success - go to author list
            res.status(200).json({ message: 'Genre was deleted', genre: results.genre });
        })
    });
};

// Handle Genre delete on POST.
exports.genre_delete_post = function (req, res) {
    res.status(400).json({ message: 'error' });
};

// Display Genre update form on GET.
exports.genre_update_get = function (req, res, next) {
    async.parallel({
        genre: function (callback) {
            Genre.findById(req.params.id).exec(callback)
        }
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.genre == null) { // No results.
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        //res.render('book_form', { title: 'Update Book', authors: results.authors, genres: results.genres, book: results.book });
        res.status(200).json({ title: 'Update Genre', genre: results.genre });
    });
};

// Handle Genre update on POST.
exports.genre_update_post = [

    // Validate and sanitize the name field.
    body('name', 'Genre name required').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);



        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.status(400).json({ title: 'Create Genre', genre: genre, errors: errors.array() });
            return;
        }
        else {
            // Create a genre object with escaped and trimmed data.
            var genre = new Genre(
                {
                    name: req.body.name,
                    _id: req.params.id //This is required, or a new ID will be assigned!
                }
            );
            // Data from form is valid.
            // Check if Genre with same name already exists.
            Genre.findByIdAndUpdate(req.params.id, { name: genre.name }, function (err) {
                if (err) { return next(err); }
                // Successful - redirect to book detail page.
                res.status(200).json({ message: 'the genre has been updated', genre: genre });
            });
        }
    }
];