import cors from "cors";

const DEFAULT_LOCALHOSTS = [
  "http://localhost:5173", // Vite
  "http://localhost:5174", // Vite
  "http://localhost:8080", // Vue CLI
  "http://localhost:3000", // React
  "http://localhost:1234", // Personal
];

// Middleware de CORS
export const corsMiddleware = () => {
  // Obtenemos el origen de producción desde variable de entorno
  const prodOrigin = process.env.CORS_ORIGIN;

  // Combinamos localhost + producción si existe
  const ACCEPTED_ORIGINS = [...DEFAULT_LOCALHOSTS];
  if (prodOrigin) ACCEPTED_ORIGINS.push(prodOrigin);

  return cors({
    origin: (origin, callback) => {
      // Permitir peticiones sin origen (Postman, curl)
      if (!origin) return callback(null, true);

      // Verificamos si el origen está permitido
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      // Rechazar otros orígenes
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    optionsSuccessStatus: 200, // Para navegadores antiguos
  });
};
