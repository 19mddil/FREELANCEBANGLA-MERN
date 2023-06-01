const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const token = req.header('Authorization');
    if (!token) return res.status(401).send("Sorry the user is unauthorised");
    try {
        let payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = payload;
        next();
    } catch (e) {
        console.log(e.message);
        res.status(400).send("Not valid token"); //
    }
}