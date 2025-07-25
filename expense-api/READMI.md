# 💸 Expense Tracker API

Una API RESTful desarrollada en Node.js para gestionar gastos personales con autenticación segura basada en JWT y operaciones CRUD protegidas.

## 🚀 Funcionalidades

- Registro e inicio de sesión de usuarios
- Generación y validación de JWT
- CRUD de gastos por usuario autenticado
- Filtros de gastos por:
  - Última semana
  - Último mes
  - Últimos 3 meses
  - Rango de fechas personalizado
- Clasificación de gastos por categorías:
  - Groceries
  - Leisure
  - Electronics
  - Utilities
  - Clothing
  - Health
  - Others

## 🛠️ Tecnologías

- **Node.js + Express**
- **Prisma ORM** (con PostgreSQL, MySQL u otra)
- **JWT** para autenticación
- **bcryptjs** para hashing de contraseñas
- **cookie-parser** para manejo de JWT httpOnly
- **dotenv** para configuración por entorno

## 📁 Estructura del proyecto

Expense_Tracker/
├── expense-api/
│ ├── common/
│ │ └── handle_request.js
│ ├── controllers/
│ │ ├── auth.controller.js
│ │ ├── expense.controller.js
│ │ └── user.controller.js
│ ├── middlewares/
│ │ └── auth.middleware.js
│ ├── prisma/
│ │ └── schema.prisma
│ ├── routes/
│ │ ├── auth.route.js
│ │ ├── expense.route.js
│ │ └── user.route.js
│ ├── services/
│ │ ├── auth.service.js
│ │ ├── expense.service.js
│ │ └── user.service.js
│ ├── index.js
