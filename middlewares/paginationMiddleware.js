module.exports = function paginatedResults(model, option = {}) {
    const find = option.find || []
    const sort = option.sort || null
    const populate = option.populate || null
    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = { rest: {} }

        results.pages = await model.countDocuments().exec()
        if (endIndex < results.pages) {
            results.rest.next = {
                page: page + 1,
                limit: limit
            }
        } else {
            results.rest.next = {
                page: null
            }
        }

        if (startIndex > 0) {
            results.rest.prev = {
                page: page - 1,
                limit: limit
            }
        } else {
            results.rest.prev = {
                page: null
            }
        }
        results.rest.pages = Math.ceil(results.pages / limit)
        try {
            results.results = await model.find(...find).sort(sort).limit(limit).skip(startIndex).populate(populate).exec()
            res.paginatedResults = results
            next()
        } catch (e) {
            next(e)
        }
    }
}