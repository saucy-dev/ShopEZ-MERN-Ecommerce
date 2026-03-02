const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
    registerUser, loginUser, getUserProfile,
    updateUserProfile, getUsers, deleteUser,
} = require('../controllers/userController');

router.post('/login', loginUser);
router.post('/register', registerUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/').get(protect, admin, getUsers);
router.route('/:id').delete(protect, admin, deleteUser);

module.exports = router;
