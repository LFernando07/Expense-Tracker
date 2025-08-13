import {
  ArrowRight,
  BarChart3,
  Smartphone,
  Users,
  CheckCircle,
  Star,
  Menu,
  X,
  Facebook,
  Linkedin,
  Github,
  BarChart2,
  PiggyBank,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";
import { Navbar } from "../components/layout/NavBar";
// images
import expenseImg from "../assets/expense-img.png";
import expenseSVG from "../assets/expense-movil.png";
import avatar from "../assets/man.png";
// Estyle
import "../styles/LandingPage.css";

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="nav-brand">
            <PiggyBank className="logo-icon" />
            <span className="brand-name">Gastly</span>
          </div>

          {/* Barra de Navegacion */}
          <Navbar isMenuOpen={isMenuOpen} />

          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Controla tus gastos con
                <span className="gradient-text"> Gastly</span>
              </h1>
              <p className="hero-description">
                La aplicación más intuitiva para gestionar tus finanzas
                personales. Rastrea gastos y alcanza tus metas financieras de
                manera simple y efectiva.
              </p>
              <div className="hero-buttons">
                <button className="btn btn-primary btn-large">
                  <Link className="btnLink" to={"/register"}>
                    Comenzar
                  </Link>
                  <ArrowRight className="btn-icon" />
                </button>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">Usuarios Activos</span>
                </div>
                <div className="stat">
                  <span className="stat-number">$2M+</span>
                  <span className="stat-label">Ahorros Generados</span>
                </div>
                <div className="stat">
                  <span className="stat-number">4.9★</span>
                  <span className="stat-label">Calificación</span>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <div className="phone-mockup">
                <div className="app-screenshot">
                  <img
                    src={expenseSVG}
                    alt="Gastly App Interface"
                    className="app-screenshot-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Características Principales</h2>
            <p className="section-description">
              Descubre todas las herramientas que Gastly te ofrece para tomar
              control total de tus finanzas
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <BarChart3 />
              </div>
              <h3 className="feature-title">Análisis Inteligente</h3>
              <p className="feature-description">
                Visualiza tus patrones de gasto con gráficos interactivos y
                obtén insights personalizados sobre tus hábitos financieros.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Smartphone />
              </div>
              <h3 className="feature-title">Multiplataforma</h3>
              <p className="feature-description">
                Accede desde cualquier dispositivo. Sincronización automática
                entre móvil, tablet y escritorio.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Users />
              </div>
              <h3 className="feature-title">Gastos Compartidos</h3>
              <p className="feature-description">
                Gestiona gastos familiares o de grupo de manera colaborativa con
                notificaciones en tiempo real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="benefits">
        <div className="container">
          <div className="benefits-content">
            <div className="benefits-text">
              <h2 className="section-title">¿Por qué elegir Gastly?</h2>
              <p className="section-description">
                Más que una app de gastos, es tu compañero financiero personal
              </p>

              <div className="benefits-list">
                <div className="benefit-item">
                  <CheckCircle className="benefit-icon" />
                  <div>
                    <h4>Ahorra hasta 30% más</h4>
                    <p>
                      Identifica gastos innecesarios y optimiza tu presupuesto
                      automáticamente
                    </p>
                  </div>
                </div>

                <div className="benefit-item">
                  <CheckCircle className="benefit-icon" />
                  <div>
                    <h4>Configuración en 2 minutos</h4>
                    <p>
                      Conecta tus cuentas bancarias de forma segura y comienza
                      inmediatamente
                    </p>
                  </div>
                </div>

                <div className="benefit-item">
                  <CheckCircle className="benefit-icon" />
                  <div>
                    <h4>Alertas inteligentes</h4>
                    <p>
                      Recibe notificaciones personalizadas antes de exceder tu
                      presupuesto
                    </p>
                  </div>
                </div>

                <div className="benefit-item">
                  <CheckCircle className="benefit-icon" />
                  <div>
                    <h4>Metas financieras</h4>
                    <p>
                      Establece objetivos de ahorro y recibe un plan
                      personalizado para alcanzarlos
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="benefits-image">
              <img
                src={expenseImg}
                alt="Gastly Dashboard"
                className="dashboard-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Lo que dicen nuestros usuarios</h2>
            <p className="section-description">
              Miles de personas ya han transformado sus finanzas con Gastly
            </p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="star-filled" />
                ))}
              </div>
              <p className="testimonial-text">
                &quot;Gastly cambió completamente mi relación con el dinero. En
                3 meses logré ahorrar más de lo que había ahorrado en todo el
                año anterior.&quot;
              </p>
              <div className="testimonial-author">
                <img
                  src={avatar}
                  alt="Marcos González"
                  className="author-avatar"
                />
                <div>
                  <h4>Marcos González</h4>
                  <p>Diseñador UX</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="star-filled" />
                ))}
              </div>
              <p className="testimonial-text">
                &quot;La función de gastos compartidos es increíble. Mi familia
                y yo ahora tenemos total transparencia en nuestros gastos del
                hogar.&quot;
              </p>
              <div className="testimonial-author">
                <img src={avatar} alt="Carlos Ruiz" className="author-avatar" />
                <div>
                  <h4>Carlos Ruiz</h4>
                  <p>Ingeniero de Software</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="star-filled" />
                ))}
              </div>
              <p className="testimonial-text">
                &quot;Los análisis automáticos me ayudaron a identificar que
                gastaba demasiado en suscripciones. Cancelé las que no usaba y
                ahorro $200 al mes.&quot;
              </p>
              <div className="testimonial-author">
                <img
                  src={avatar}
                  alt="Antonio Martínez"
                  className="author-avatar"
                />
                <div>
                  <h4>Antonio Martínez</h4>
                  <p>Contadora</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">
              ¿Listo para tomar control de tus finanzas?
            </h2>
            <p className="cta-description">
              Únete a miles de usuarios que ya están ahorrando más y gastando
              mejor con Gastly
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary btn-large">
                <Link
                  style={{ color: "#2563eb" }}
                  className="btnLink"
                  to={"/register"}
                >
                  Comenzar
                </Link>
                <ArrowRight className="btn-icon" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="nav-brand">
                <BarChart2 className="logo-icon" />
                <span className="brand-name">Gastly</span>
              </div>
              <p className="footer-description">
                La forma más inteligente de gestionar tus finanzas personales
              </p>
            </div>

            <div className="footer-links">
              <div className="footer-column">
                <h4>Producto</h4>
                <a href="#features">Características</a>
                <a href="#pricing">Precios</a>
                <a href="#security">Seguridad</a>
                <a href="#api">API</a>
              </div>

              <div className="footer-column">
                <h4>Empresa</h4>
                <a href="#about">Acerca de</a>
                <a href="#careers">Carreras</a>
                <a href="#press">Prensa</a>
                <a href="#contact">Contacto</a>
              </div>

              <div className="footer-column">
                <h4>Recursos</h4>
                <a href="#blog">Blog</a>
                <a href="#help">Centro de Ayuda</a>
                <a href="#community">Comunidad</a>
                <a href="#webinars">Webinars</a>
              </div>

              <div className="footer-column">
                <h4>Legal</h4>
                <a href="#privacy">Privacidad</a>
                <a href="#terms">Términos</a>
                <a href="#cookies">Cookies</a>
                <a href="#licenses">Licencias</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 Gastly. Todos los derechos reservados.</p>
            <div className="footer-social">
              <a href="#" aria-label="Twitter">
                <Github />
                Github
              </a>
              <a href="#" aria-label="LinkedIn">
                <Linkedin />
                LinkedIn
              </a>
              <a href="#" aria-label="Facebook">
                <Facebook />
                Facebook
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
