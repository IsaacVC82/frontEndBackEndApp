# Imagen base con Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar y instalar las dependencias del backend
COPY server/package*.json ./
RUN npm install --legacy-peer-deps

# Copiar el resto del código del backend
COPY server/ ./

# Copiar y construir el frontend
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install --legacy-peer-deps
COPY client/ ./
RUN npm run build

# Mover el build del frontend a la carpeta del servidor
WORKDIR /app
RUN mkdir -p client/build && cp -r client/build/* client/build/

# Exponer el puerto para el backend
EXPOSE 8000

# Comando para iniciar el servidor
CMD ["node", "server.js"]
