FROM node:18-alpine

WORKDIR /app

# Backend
COPY server/package*.json ./
RUN npm install
COPY server ./

# Frontend
COPY client ./client
WORKDIR /app/client
RUN npm install --legacy-peer-deps && npm run build

# Mover el build del frontend
WORKDIR /app
RUN mkdir -p client/build && cp -r client/build/* client/build/

# Exponer el puerto
EXPOSE 8000

# Iniciar la app
CMD ["node", "server.js"]
