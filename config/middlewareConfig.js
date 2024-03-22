const middleware = require('../middlewares/verifyApiToken');

const middlewareConfig = {
    '/products' : middleware.checkToken,
    '/products/:id' : middleware.checkToken
}

module.exports = middlewareConfig;