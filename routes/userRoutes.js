const express = require('express');
const router = express.Router();
const {registerUser, authUser, updateUserProfile} = require('../controllers/userControllers');
const verifyJWT = require('../middlewares/verifyJWT');

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/profile').post(verifyJWT,updateUserProfile);

module.exports = router;