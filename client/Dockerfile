# Usa una imagen base de Node.js
FROM node:21

# Crea y establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Expone el puerto que el servidor utilizará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
