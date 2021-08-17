const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { protect, admin } = require('../middleware/authMiddleware')

router
  .route('/')
  .post(userController.registerUser)
  .get(protect, admin, userController.getUsers)
router.post('/login', userController.authUser)
router
  .route('/profile')
  .get(protect, userController.getUserProfile)
  .put(protect, userController.updateUserProfile)
router
  .route('/:id')
  .delete(protect, admin, userController.deleteUser)
  .get(protect, admin, userController.getUserById)
  .put(protect, admin, userController.updateUser)

module.exports = router
