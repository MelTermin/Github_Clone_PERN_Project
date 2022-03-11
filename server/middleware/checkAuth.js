const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function(req, res, next) {

  try {
		const jwtTokenFromClient = req.header("token");

		if (!jwtTokenFromClient) {
			return res.status(403).json("Not Authozied");
		}

		//jwt.verify compair 'token from client' and secretKeyFrom and if 'jwtTokenFromClient' and 'SECRET_KEY_FOR_BCRYPT' matched the its return payload
		const payload = jwt.verify(jwtTokenFromClient, process.env.SECRET);

		req.user = payload;
    console.log(payload)
   
		next();
	} catch (e) {
		console.error(e.message);
		return res.status(403).json("Not Authozied");
	}



};