module.exports = function (req, res, next) {
    if (req.user.role !== 'client') return res.status(401).send("Forbidden");
    next();
}