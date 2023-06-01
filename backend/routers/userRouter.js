const router = require('express').Router();
const { SignUp, SignIn } = require('../controllers/userControllers');

router.route('/signup')
    .post(SignUp);
router.route('/signin')
    .post(SignIn);

module.exports = router;