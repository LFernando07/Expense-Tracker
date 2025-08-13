import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { PrivatedRoute } from "./components/routes/PrivatedRoute";
import LandingPage from "./pages/LandingPage.tsx";
import { Toaster } from "sonner";
import { Loading } from "./components/layout/Loading.tsx";
import { useAppDispatch } from "./hooks/store.ts";
import { fetchProfile } from "./store/thunks/auth.thunks.ts";
import { SessionWatcher } from "./components/session/SessionWatcher.tsx";

// Importaciones dinamicas de paginas
const LazyLoginPage = lazy(() => import("./pages/LoginPage.tsx"));
const LazyRegisterPage = lazy(() => import("./pages/RegisterPage.tsx"));
const LazyDashboardPage = lazy(() => import("./pages/DashboardPage.tsx"));
const LazyNotFoundPage = lazy(() => import("./pages/NotFoundPage.tsx"));
const LazyProfile = lazy(() => import("./pages/ProfilePage.tsx"));

function App() {
  const dispatch = useAppDispatch();

  // 🧠 Importante: al iniciar la app, validamos sesión con la cookie
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        {/* Para notificacaciones */}
        <Toaster expand={true} position="top-right" richColors />
        {/* Para expiracion de sesion */}
        <SessionWatcher />

        <Routes>
          {/*Rutas no protegidas para el usuario  */}
          <Route path="/" Component={LandingPage} />
          <Route path="/login" Component={LazyLoginPage} />
          <Route path="/register" Component={LazyRegisterPage} />

          {/* Rutas protegidas para cuando el usuario autenticado */}
          <Route element={<PrivatedRoute />}>
            {/* ✅ Aquí puedes agregar más rutas protegidas */}
            <Route path="/dashboard" element={<LazyDashboardPage />} />
            <Route path="/profile" element={<LazyProfile />} />
          </Route>

          {/* Ruta para rutas no encontradas */}
          <Route path="*" Component={LazyNotFoundPage} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
