# Usa una imagen base de Node.js
FROM node:21-slim

# Crea y establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto que el servidor utilizará
EXPOSE 4000

# Comando para ejecutar la aplicación
CMD ["node", "src/server.js"]
