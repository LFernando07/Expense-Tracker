# Gasty - Control y Manejo de Gastos Personales 💰

Aplicación web para el **control y manejo de gastos personales**, permitiendo registrar, filtrar, visualizar y analizar tus finanzas de forma sencilla y rápida.

![demo](.github/readme_assets/gasty.png)

## 🌐 Live Demo

Explora la demostración en vivo del proyecto:
[Gasty_App](https://expense-gasty.vercel.app/)

## ✍️ Características

- Creación de gastos
- Formulario para editar un gasto
- Búsqueda de gastos por titulo
- Visualización de gastos en una tabla
- Filtrado de gastos por activos/borrados
- Se hace uso de un softdelete no se realizan borrados fisicos
- Representación de gastos en graficos (barra, metricos y de pastel)
- Interfaz responsiva y atractiva con animaciones y glassmorphism.
- Estado global gestionado con Redux Toolkit.
- **Backend propio** para proteger la clave de la API y servir los datos al frontend.
- Consumo de API creada en Node - ExpressJS
- Mapeo de una base de datos utilizando Prisma ORM

## 👨‍💻 Tecnologías utilizadas

- React JS
- Vite
- TypeScript
- Redux Toolkit
- Tailwindcss
- Node.js + Express (Backend)
- Prisma
- PostgrSQL (supabase)

[![Technologies Used](https://skillicons.dev/icons?i=ts,vite,react,redux,express,vercel,tailwind,prisma,postgres)](https://skillicons.dev)

<details><summary><b>Estructura del proyecto</b></summary>

```bash
Weather_Wrapper_Service/
├── .github/
│   └── assets/
│       └── gasty.png
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── redisClient.js
│   │   └── features/
│   │       └── weather/
│   │           ├── weather.cache.js
│   │           ├── weather.controller.js
│   │           ├── weather.route.js
│   │           └── weather.service.js
│   └── index.js
│   ├── .env
│   ├── package-lock.json
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── vite.svg
│   ├── src/
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── components
│   │   │   ├── FormWeather.tsx
│   │   │   ├── Icons.tsx
│   │   │   └── WeatherDash.tsx
│   │   ├── mocks/
│   │   │   └── Weather_Result.json
│   │   ├── service/
│   │   │   └── weatherAPI.ts
│   │   ├── store/
│   │   │   ├── weather/
│   │   │   │   ├── WeatherSlice.ts
│   │   │   └── index.ts
│   │   ├── styles
│   │   │   ├── FormWeather.css
│   │   │   └── WeatherDash.css
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   ├── types.d.ts
│   │   └── vite-env.d.ts
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── .gitignore
├── README.md
└── package-lock.json
```

</details>

## 🧰 Get Started

Para poner este proyecto en funcionamiento en su entorno de desarrollo, siga estas instrucciones paso a paso.

### ⚙️ Instalación & Correrlo en Local

**Step 0:**

Note :bangbang: **Backend:** La aplicación utiliza autenticación con JWT. Por lo que se deben declarar las siguientes variables de entorno:
`JWT_SECRET` y `SALT_ROUNDS` en el archivo `.env`.

Note :bangbang: **Backend:** El sitio web utiliza Prisma ORM para el mapeo de las tablas de la base de datos. Por lo que se debe declarar una url en la variable de entorno:
`DATABASE_URL` en el archivo `.env`.

**Step 1:**

Descargue o clone este repositorio utilizando el siguiente enlace:

```bash
git clone https://github.com/LFernando07/Expense-Tracker.git
```

**Step 2:**

Ir al backend
Ejecute el siguiente comando en el directorio para instalar las dependencias:

```bash
cd expense-api
npm/pnpm install
```

**Step 3:**
Ejecute el siguiente comando para ejecutar el servidor de desarrollo localmente:
El backend se ejecutará normalmente en [http://localhost:3000](http://localhost:3000).

```bash
npm/pnpm run dev
```

**Step 4:**

Ir al frontend
Ejecute el siguiente comando en el directorio para instalar las dependencias:

```bash
cd expense-ui
npm/pnpm install
```

**Step 5:**

Ejecute el siguiente comando para ejecutar el frontend en el navegador:
El frontend se ejecutará en [http://localhost:5173](http://localhost:5173).

```bash
npm/pnpm run dev
```

## 🔒 Environment Variables

Las variables de entorno se pueden usar para la configuración. Deben configurarse antes de ejecutar la aplicación.

**Expense_Tracker_App** conocido como Gasty usa [PrismaORM](https://www.prisma.io/) accede a la página oficial para poder utilizar la dependencia.

Cree un archivo `.env` en el directorio raíz del proyecto (backend) y agregue las siguientes variables de entorno:

```env
DATABASE_URL=<DATABASE_URL>
```

Ademas de que la aplicación utiliza en la API JSONWEBTOKEN para la autenticación se debe instalar la dependencia **npm/pnpm i jsonwebtoken**
y agegar en `.env` las siguientes variables de enterno:

```env
JWT_SECRET = <VALOR_JWT_SECRET>
SALT_ROUNDS=<VALOR_NUMERICO>

```

## 🚀 Despliegue

### Despliegue en producción (manual)

Puede crear una compilación de producción optimizada con el siguiente comando:

```bash
npm run build
```

### Despliegue Separado De Backend — Frontend

#### Backend

El servicio de la Web API se encuentra hospedado en Render, link del enlace:
— Ver [expense-tracker-api](https://weather-backend-5m1c.onrender.com/)

Para el despliegue en Render se utiliza el siguiente comando:

```bash
npm run build:render
```

#### Frontend

La App de React para consumir la API se encuentra hospedada en Vercel, link del enlace:
— Ver [Gasty_App](https://expense-gasty.vercel.app/)

## 📋 Licencia

**Gasty_App** es software de código abierto
— Ver [licensed as MIT](https://opensource.org/license/mit/) y es de uso gratuito
