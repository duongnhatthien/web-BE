const express = require('express');
const { authMiddleWare } = require('../MiddleWare/authMiddleWare');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
router.post('/create-product', ProductController.CreateProduct);
router.put(
    '/update-product/:id',
    authMiddleWare,
    ProductController.UpdateProduct
);
router.delete(
    '/delete-product',
    authMiddleWare,
    ProductController.DeleteProduct
);
router.get('/getAllProduct', ProductController.GetAllProduct);
router.get('/detail-product/:id', ProductController.GetDetailProduct);
module.exports = router;
