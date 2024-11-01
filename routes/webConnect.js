const express = require('express');
const router = express.Router();
const Authentication = require('../Controllers/Auth');
const middleController = require('../Controllers/middlewareControllers');
router.post('/api/routes/register', Authentication.register);
router.post('/api/routes/login', Authentication.login);
router.get('/api/routes/Productcart', Authentication.ProductCart)
router.post('/api/routes/delete/:id', Authentication.removeCart)
router.post('/api/routes/cart', Authentication.Cart)
module.exports = router;

