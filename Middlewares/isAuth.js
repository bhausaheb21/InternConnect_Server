const { verify } = require("jsonwebtoken");

exports.isAuth = async (req, res, next) => {
    try {
        const Authorization = req.get("Authorization")
        // console.log(Authorization)
        if (!Authorization) {
            const error = new Error("Unauthorized access")
            error.code = 403;
            throw error;
        }
        const token = Authorization.split(" ")[1]
        // console.log(token);
        if (!token) {
            const error = new Error("Not Authorized access")
            error.code = 403;
            throw error;
        }
        const user = await verify(token, process.env.SECRET_KEY)
        if (!user) {
            const error = new Error("Invalid token")
            error.code = 403;
            throw error;
        }
        console.log(user);
        req.userId = user._id;
        console.log(user._id);
        return next()
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}