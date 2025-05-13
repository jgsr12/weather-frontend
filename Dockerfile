# 1) Build stage
FROM node:22-alpine AS builder
WORKDIR /app

# Instala dependencias
COPY package*.json ./
RUN npm install --production=false

# Copia el resto y construye
COPY . .
RUN npm run build

# 2) Run stage
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copia artefactos de build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expone el puerto de Next.js
EXPOSE 3000

# Comando de producción
CMD ["npm", "start"]
