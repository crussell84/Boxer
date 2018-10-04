// Used to check if the user is logged in
module.exports = (req, res, next) => {
    if (req.user) {
        return next();
    }

    return res.redirect("/");
}