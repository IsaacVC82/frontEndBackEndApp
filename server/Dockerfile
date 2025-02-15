# Usar una imagen base de Node.js
FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código del servidor
COPY . .

# Exponer el puerto en el que corre la aplicación
EXPOSE 8000

# Comando para iniciar la aplicación
CMD ["node", "server.js"]
