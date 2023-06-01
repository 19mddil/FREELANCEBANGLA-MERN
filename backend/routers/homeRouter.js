const { dbTestPage } = require('../controllers/dbTestController');
const router = require('express').Router();

router.route('/')
    .get(dbTestPage);

module.exports = router;
