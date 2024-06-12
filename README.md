### README.md

# Redis Chat Application

Francisco Devaux
Bautista Frigolé

## Descripción General

Este proyecto es una aplicación de chat en tiempo real construida utilizando Redis para la mensajería y WebSockets para la comunicación en tiempo real. La aplicación está diseñada con un frontend construido con Next JS y un backend desarrollado con Node JS y Express. En Redis se persisten los mensajes de las comunicaciones.

## Componentes del Proyecto

### 1. Frontend

**Tecnologías**: Next JS

El frontend de la aplicación está construido con Next. Utiliza la biblioteca react-use-websocket para establecer una conexión WebSocket con el backend, lo que permite la comunicación en tiempo real. Los mensajes enviados desde el frontend se transmiten al backend y viceversa, permitiendo que los usuarios vean los mensajes en tiempo real. Se cuenta con una réplica del frontend en el cluster Proxmox. En la carpeta `client` se encuentra el código fuente del frontend, junto con el Dockerfile para construir la imagen de Docker.

**Configuración**:

- La URL del backend se configura a través de una variable de entorno `BACKEND_URL`, que se establece a través de los manifiestos de kubernetes.
- Los usuarios pueden unirse a una única sala de chat y enviar mensajes que se transmiten a través de WebSockets.

### 2. Backend

**Tecnologías**: Node JS, Express, Redis

El backend está desarrollado con Node y Express. Utiliza WebSocket para manejar las conexiones con el frontend. Redis se utiliza para la persistencia de mensajes. Se cuenta con dos réplicas del backend en el cluster Proxmox. En la carpeta `server` se encuentra el código fuente del backend, junto con el Dockerfile para construir la imagen de Docker.

**Configuración**:

- La IP de Redis se configura a través de una variable de entorno `REDIS_IP` junto con `REDIS_PASSWORD` que es la contraseña que se encuentra en los secrets de kubernetes. Las mismas se establecen a través de los manifiestos de kubernetes.

### 3. Redis

Se utilizó el cluster de Redis creado en un TP de la materia. El mismo cuenta con 6 nodos en el cluster Proxmox.

### 4. Metallb

Se utilizó Metallb para asignar una IP fija al cluster de Redis. El mismo fue creado en un TP de la materia.

## Despliegue en Kubernetes

En la carpeta `k8s` se encuentran todos los archivos YAML necesarios para desplegar la aplicación en un clúster de Kubernetes. Estos archivos incluyen:

- **backend.yaml**: Define el despliegue del backend, incluyendo los contenedores y el servicio.
- **frontend.yaml**: Define el despliegue del frontend, incluyendo los contenedores y el servicio.

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

3. **Deplegar el Cluster de Redis**:

   ```bash
   ./deploy_redis_cluster.sh
   ```

4. **Desplegar el Backend en Kubernetes**:

   ```bash
   kubectl apply -f k8s/backend-deployment.yaml
   ```

5. **Desplegar el Frontend en Kubernetes**:

   ```bash
   kubectl apply -f k8s/frontend-deployment.yaml
   ```

6. **Acceder a la Aplicación**:

   Para acceder a la aplicación frontend:

   ```bash
   minikube service chat-frontend
   ```

Este comando abrirá la URL en tu navegador, permitiéndote interactuar con la aplicación de chat en tiempo real.

### Despliegue Actual

Actualmente, la aplicación se encuentra corriendo en http://10.230.110.15:80, en el cluster Proxmox de la materia.

Si bien se persisten los mensajes en el cluster de Redis, los mismos no están siendo obtenidos cada vez que se une un nuevo usuario a la sala de chat. Nos gustaría implementarlo en un futuro.
