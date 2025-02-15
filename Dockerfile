# Usar una imagen base de Node.js
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de dependencias del backend
COPY server/package*.json ./

# Instalar las dependencias del backend
RUN npm install

# Copiar el resto del código del backend
COPY server ./

# Copiar la carpeta client al contenedor
COPY client ./client

# Construir el frontend
RUN cd client && npm install && npm run build

# Exponer el puerto en el que corre la aplicación
EXPOSE 8000

# Comando para iniciar la aplicación
CMD ["node", "server.js"]