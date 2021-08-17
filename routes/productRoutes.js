const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const { protect, admin } = require('../middleware/authMiddleware')

router
  .route('/')
  .get(productController.getProducts)
  .post(protect, admin, productController.createProduct)
router
  .route('/:id/reviews')
  .post(protect, productController.createProductReview)
router.get('/top', productController.getTopProducts)
router
  .route('/:id')
  .get(productController.getProductById)
  .delete(protect, admin, productController.deleteProduct)
  .put(protect, admin, productController.updateProduct)

module.exports = router
