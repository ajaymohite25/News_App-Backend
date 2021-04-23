const jwt = require("jsonwebtoken");

function jwtIsAuth(req, res, next) {
  if (req.headers.authorization) {
    const jwtToken = req.headers.authorization.split(" ")[1];
    jwt.verify(jwtToken, process.env.JWT_SECREAT, (err, decodedjwt) => {
      if (err) {
        res.status(401).json("unauthrise Access");
      } else {
        next();
      }
    });
  } else {
    console.log(req.headers);
    res.status(401).json("unauthrise Accesss");
  }
}

exports.isAuth = jwtIsAuth;
