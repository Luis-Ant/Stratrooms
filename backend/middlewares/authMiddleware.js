import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Acceso no autorizado" });
  }
};

export default authMiddleware;
