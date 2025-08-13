import cors from "cors";

const ACCEPTED_ORIGINS = [
  "http://localhost:5173", // Vite
  "http://localhost:8080", // Vue CLI
  "http://localhost:3000", // React
  "http://localhost:1234", // Personal
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      // Permitir peticiones sin origen (como Postman o curl)
      if (!origin) return callback(null, true);

      // Verificamos si el origen está permitido
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Rechazar otros orígenes
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    optionsSuccessStatus: 200, // Para evitar errores en navegadores antiguos
  });
