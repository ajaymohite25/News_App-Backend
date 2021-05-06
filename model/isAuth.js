import jwt from "jsonwebtoken";

function isAuth(req, res, next) {
  if (req.headers.authorization) {
    const decodedJwt = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECREAT
    );

    if (decodedJwt) {
      req.userEmail = decodedJwt.email;
      next();
    } else {
      res.status(401).json({ message: "unauthorizeaccess" });
    }
  } else {
    res.status(401).json({ message: "unauthorizeaccess" });
  }
}

export default isAuth;
