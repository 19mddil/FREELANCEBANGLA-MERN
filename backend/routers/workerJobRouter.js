const router = require('express').Router();
const { FindAllJobAdvertise, GetJobAdvertiseDetail, PostJobApplication, GetAllJobApplications } = require('../controllers/jobController');
const worker = require('../middlewares/worker');
const authorize = require('../middlewares/authorize');

router.route('/advertisement')
    .get([authorize, worker], FindAllJobAdvertise);

router.route('/advertisement/:id')
    .get([authorize, worker], GetJobAdvertiseDetail);

router.route('/application/confirm')
    .post([authorize, worker], PostJobApplication);

router.route('/application/all/:applicant_id')
    .get([authorize, worker], GetAllJobApplications);

module.exports = router;    