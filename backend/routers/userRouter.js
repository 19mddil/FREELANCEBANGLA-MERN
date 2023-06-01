const router = require('express').Router();
const { SignUp, SignIn, EmailVerify } = require('../controllers/userControllers');
const authorize = require('../middlewares/authorize');

router.route('/signup')
    .post(SignUp);
router.route('/signin')
    .post(SignIn);
router.route('/email/verify/')
    .post([authorize], EmailVerify);

module.exports = router;