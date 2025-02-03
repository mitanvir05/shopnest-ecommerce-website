const verifyAdmin = (req, res, next) => {
    if (!req.role || req.role!== "admin") {
        return res.status(403).send({ message: "Unauthorized to access this route" });
    }
    next();
};
module.exports = verifyAdmin;
