module.exports = function (req, res, next) {
    if (req.user.role !== 'worker') return res.status(401).send("Forbidden");
    next();
}