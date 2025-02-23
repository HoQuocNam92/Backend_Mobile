const express = require('express');
const router = express.Router();
const Authentication = require('../controllers/productController');
const Middleware = require('../middlewares/authMiddleware');
router.post('/api/routes/register', Authentication.register);
router.post('/api/routes/login', Authentication.login);
router.delete('/api/routes/delete/:id', Middleware.verifyToken, Authentication.removeCart);
router.post('/api/routes/cart', Authentication.Cart);
router.get('/api/routes/cartItems', Middleware.verifyToken, Authentication.CartItem);
router.get('/api/routes/dashboard', Middleware.verifyAuthor, Authentication.getUsers);
router.post('/api/routes/dashboard/upload', Middleware.verifyAuthor, Authentication.uploadImage);
router.post('/api/routes/SendMail', Authentication.SendMail);
router.get('/api/routes/items', Authentication.items);

module.exports = router;
