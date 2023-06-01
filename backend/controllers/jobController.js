const {
    dbConnect,
    dbCreateUser,
    dbCreateJobAdvertise,
    dbFindAllAdvertiseJobs,
    dbFindAllAdvertiseJobsByClientId,
    dbGetJobAdvertiseDetail,
    dbPostJobApplication,
    dbGetJobApplicantsByJobId,
    dbGetAllJobApplicationsByApplicantId,
    dbPostSelectedJobApplicationByApplicationId,
    dbUpdateRejectedJobApplicationByApplicationId
} = require('../mysql/dbControllers');

const formidable = require('formidable');

module.exports.CreateJobAdvertise = async (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    let connection = null;
    try {
        connection = await dbConnect('localhost');
    } catch (err) {
        return res.status(500).send(err.message);
    }
    form.parse(req, async (err, fields, files) => {
        try {
            const result = await dbCreateJobAdvertise(connection, { ...fields, client_id: req.user.id });
            connection.destroy();
            return res.status(201).send({ messeage: result });
        } catch (err) {
            connection.destroy();
            return res.status(500).send(err.message);
        }
    })
};

module.exports.DeleteJobAdvertise = async (req, res) => {

};

module.exports.UpdateJobAdvertise = () => {

}

module.exports.FindAllJobAdvertiseByClientId = async (req, res) => {
    let connection = null;
    const client_id = req.params.client_id;
    try {
        connection = await dbConnect('localhost');
    } catch (err) {
        return res.status(500).send(err.message);
    }
    try {
        const result = await dbFindAllAdvertiseJobsByClientId(connection, client_id);
        return res.status(200).send(result);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

module.exports.FindAllJobAdvertise = async (req, res) => {
    let connection = null;
    try {
        connection = await dbConnect('localhost');
    } catch (err) {
        return res.status(500).send(err.message);
    }
    try {
        const result = await dbFindAllAdvertiseJobs(connection);
        return res.status(200).send(result);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

module.exports.GetJobAdvertiseDetail = async (req, res) => {
    let connection = null;
    let jobId = req.params.id;
    try {
        connection = await dbConnect('localhost');
    } catch (err) {
        return res.status(500).send(err.message);
    }
    try {
        const result = await dbGetJobAdvertiseDetail(connection, jobId);
        return res.status(200).send(result);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

module.exports.PostJobApplication = async (req, res) => {
    let connection = null;
    try {
        connection = await dbConnect('localhost');
    } catch (err) {
        return res.status(500).send(err.message);
    }
    try {
        const result = await dbPostJobApplication(connection, req.body);
        return res.status(200).send(result);
    } catch (err) {
        return res.status(500).send(err);
    }
}

module.exports.FindAllJobApplicantsByJobId = async (req, res) => {
    let connection = null;
    let jobId = req.params.job_id;
    let clientId = req.params.client_id;
    try {
        connection = await dbConnect('localhost');
    } catch (err) {
        return res.status(500).send(err.message);
    }
    try {
        const result = await dbGetJobApplicantsByJobId(connection, jobId, clientId);
        return res.status(200).send(result);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

module.exports.GetAllJobApplications = async (req, res) => {
    let connection = null;
    let applciantId = req.params.applicant_id;
    try {
        connection = await dbConnect('localhost');
    } catch (err) {
        return res.status(500).send(err.message);
    }
    try {
        const result = await dbGetAllJobApplicationsByApplicantId(connection, applciantId);
        return res.status(200).send(result);
    } catch (err) {
        return res.status(500).send(err.message);

    }
}

module.exports.SelectJobApplicationByApplicationId = async (req, res) => {
    let connection = null;
    try {
        connection = await dbConnect('localhost');
    } catch (err) {
        return res.status(500).send(err.message);
    }
    try {

        const result = await dbPostSelectedJobApplicationByApplicationId(connection, req.body);
        return res.status(200).send(result);
    } catch (err) {
        return res.status(500).send(err.message);
    }

}

module.exports.RejectJobApplicationByApplicationId = async (req, res) => {
    let connection = null;
    try {
        connection = await dbConnect('localhost');
    } catch (err) {
        return res.status(500).send(err.message);
    }
    try {

        const result = await dbUpdateRejectedJobApplicationByApplicationId(connection, req.body);
        return res.status(200).send(result);
    } catch (err) {
        return res.status(500).send(err.message);
    }

}