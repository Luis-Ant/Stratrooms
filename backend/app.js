import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const app = express();

// Configurar CORS para permitir solicitudes desde el frontend
app.use(
  cors({
    origin: "http://localhost:3000", // Permite solicitudes desde este origen
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
    credentials: true, // Si necesitas enviar cookies o encabezados de autenticación
  })
);

// Middleware para parsear JSON
app.use(express.json());

// Rutas de autenticación
app.use("/auth", authRoutes);

// Ruta principal
app.get("/", (req, res) => {
  res.send("¡El servidor está funcionando!");
});

export default app;
