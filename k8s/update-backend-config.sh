#!/bin/bash

# Obtener la IP de Minikube
MINIKUBE_IP=$(minikube ip)

# Obtener el puerto del servicio backend
BACKEND_PORT=$(kubectl get svc chat-backend -o=jsonpath='{.spec.ports[0].nodePort}')

# Construir la URL completa del backend
BACKEND_URL="http://${MINIKUBE_IP}:${BACKEND_PORT}"

# Actualizar el ConfigMap con la URL del backend
kubectl create configmap backend-config --from-literal=BACKEND_URL="${BACKEND_URL}" --dry-run=client -o yaml | kubectl apply -f -

# Setear variable de entorno BACKEND_URL
export BACKEND_URL="${BACKEND_URL}"

echo "Backend URL updated in ConfigMap: ${BACKEND_URL}"
