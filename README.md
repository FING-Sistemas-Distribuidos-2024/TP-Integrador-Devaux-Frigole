### README.md

# Redis Chat Application

## Descripción General

Este proyecto es una aplicación de chat en tiempo real construida utilizando Redis para la mensajería y WebSockets para la comunicación en tiempo real. La aplicación está diseñada con un frontend construido con React y un backend desarrollado con Node.js y Express. Redis actúa como intermediario de mensajes, proporcionando una solución eficiente y escalable para el manejo de mensajes en tiempo real.

## Componentes del Proyecto

### 1. Frontend

**Tecnologías**: Next, React, Socket.IO

El frontend de la aplicación está construido con React. Utiliza la biblioteca Socket.IO para establecer una conexión WebSocket con el backend, lo que permite la comunicación en tiempo real. Los mensajes enviados desde el frontend se transmiten al backend y viceversa, permitiendo que los usuarios vean los mensajes en tiempo real.

**Configuración**:

- La URL del backend se configura a través de una variable de entorno `BACKEND_URL`, que se establece a través de los manifiestos de kubernetes.
- Los usuarios pueden unirse a una única sala de chat y enviar mensajes que se transmiten a través de WebSockets.

### 2. Backend

**Tecnologías**: Node.js, Express, Socket.IO, Redis

El backend está desarrollado con Node.js y Express. Utiliza Socket.IO para manejar las conexiones WebSocket con el frontend. Redis se utiliza para la publicación y suscripción de mensajes, permitiendo la comunicación en tiempo real entre los usuarios a través de diferentes instancias de la aplicación.

**Características**:

- **WebSockets**: El backend establece una conexión WebSocket con los clientes para transmitir mensajes en tiempo real.
- **Redis**: Actúa como intermediario de mensajes. Los mensajes enviados desde el frontend se publican en Redis, y los suscriptores en el backend reciben estos mensajes y los retransmiten a todos los clientes conectados.

**Configuración**:

- El backend se conecta a Redis utilizando la URL del servicio Redis en Kubernetes.
- Los mensajes se publican y se suscriben en Redis para manejar la comunicación en tiempo real.

### 3. Comunicación

La comunicación entre el frontend y el backend se realiza a través de WebSockets utilizando la biblioteca Socket.IO. Cuando un usuario envía un mensaje desde el frontend, este se transmite al backend a través de WebSockets. El backend publica el mensaje en Redis, que actúa como un canal de mensajes. Todos los clientes suscritos reciben el mensaje en tiempo real, permitiendo la comunicación instantánea entre los usuarios.

### 4. Uso de Redis

Redis se utiliza como intermediario de mensajes en este proyecto. Cuando un usuario envía un mensaje, el backend publica el mensaje en un canal Redis. Todos los backend que están suscritos a este canal reciben el mensaje y lo retransmiten a los clientes conectados. Esto permite que los mensajes se transmitan en tiempo real a todos los usuarios, incluso si el backend está distribuido en múltiples instancias.

## Despliegue en Kubernetes

En la carpeta `k8s` se encuentran todos los archivos YAML necesarios para desplegar la aplicación en un clúster de Kubernetes. Estos archivos incluyen:

- **backend-deployment.yaml**: Define el despliegue del backend, incluyendo los contenedores y el servicio.
- **frontend-deployment.yaml**: Define el despliegue del frontend, incluyendo los contenedores y el servicio.
- **redis-deployment.yaml**: Define el despliegue de Redis, incluyendo los contenedores y el servicio.
- **job.yaml**: Un Job de Kubernetes para actualizar el ConfigMap con la URL del backend después de su despliegue.

### Pasos para Desplegar la Aplicación en Kubernetes con Minikube

1. **Iniciar Minikube**:

   ```bash
   minikube start
   ```

2. **Construir las Imágenes de Docker**:

   ```bash
   eval $(minikube docker-env)
   docker build -t chat-backend ./server
   docker build -t chat-frontend ./client
   ```

3. **Desplegar Redis en Kubernetes**:

   ```bash
   kubectl apply -f k8s/redis-deployment.yaml
   ```

4. **Desplegar el Backend en Kubernetes**:

   ```bash
   kubectl apply -f k8s/backend-deployment.yaml
   ```

5. **Ejecutar el Job para Actualizar el ConfigMap**:

   ```bash
   kubectl apply -f k8s/job.yaml
   ```

6. **Desplegar el Frontend en Kubernetes**:

   ```bash
   kubectl apply -f k8s/frontend-deployment.yaml
   ```

7. **Acceder a la Aplicación**:

   Para acceder a la aplicación frontend:

   ```bash
   minikube service chat-frontend
   ```

Este comando abrirá la URL en tu navegador, permitiéndote interactuar con la aplicación de chat en tiempo real.

### Despliegue Actual

Actualmente, la aplicación se encuentra corriendo en http://10.230.110.12:80, en el cluster Proxmox de la materia.