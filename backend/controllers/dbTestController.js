const { dbConnect, dbCreateUser } = require('../mysql/dbControllers');
module.exports.dbTestPage = async (req, res) => {
    let connection = null;
    try {
        connection = await dbConnect('localhost');

    } catch (err) {
        return res.send(err.message);
    }

    console.log(connection.threadId);
    return res.send(`connection successful at threadId ${connection.threadId}`);

}
