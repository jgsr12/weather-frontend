## Descripción del proyecto

Este es un proyecto de [Next.js](https://nextjs.org) generado con [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) framework para react.

## Configuración previa

Antes de ejecutar el proyecto, crea un archivo `.env.local` (o `.env`) en la raíz con las variables de entorno necesarias, por ejemplo:

```
# Puerto de desarrollo (opcional)
PORT=3000

# URL del backend
NEXT_PUBLIC_API_URL=http://localhost:4000

# Otras variables...
```

## Instalación y ejecución

1. Instalar dependencias:

   ```bash
   npm install
   ```
2. Iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```
3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

> La página se recarga automáticamente al editar archivos.

## Compilación y despliegue

1. Generar la versión de producción:

   ```bash
   npm run build
   ```
2. Iniciar el servidor en modo producción:

   ```bash
   npm start
   ```

## Ejecución con Docker

Si prefieres Docker, asegúrate de tener Docker Desktop abierto y ejecutándose, luego ejecuta:

```bash
docker-compose up --build
```

Esto construirá la imagen y levantará los contenedores definidos en `docker-compose.yml`.

## Pruebas

Para ejecutar tests unitarios o de integración:

```bash
npm run test
```
