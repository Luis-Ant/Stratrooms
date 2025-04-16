import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/database.js";
const { Usuario } = db;

const authService = {
  async register(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return Usuario.create({ ...data, password: hashedPassword });
  },

  async login(email, password) {
    const user = await Usuario.findOne({ where: { email } });
    if (!user) throw new Error("Credenciales incorrectas");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Credenciales incorrectas");

    const accessToken = jwt.sign(
      { id: user.idUsuario, tipoUsuario: user.tipoUsuario },
      process.env.JWT_SECRET,
      { expiresIn: "15m" } // Access token válido por 15 minutos
    );

    const refreshToken = jwt.sign(
      { id: user.idUsuario },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" } // Refresh token válido por 7 días
    );

    return { accessToken, refreshToken, user };
  },

  verifyToken(accessToken) {
    return jwt.verify(accessToken, process.env.JWT_SECRET);
  },

  verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  },
};

export default authService;
