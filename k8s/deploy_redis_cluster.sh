# Esto despliega un cluster redis con 3 master y 3 slaves, cuyo nombre es redis-cluster.
# Tambien dejará creado un Service de tipo NodePort con el mismo nombre el cual usaremos como redis-host para conectarnos.
# Este deploymente generará un secret con la contraseña de conexión el cual deberá ser mapeado en los deployments que necesiten acceder al redis.

helm install my-release --set fullnameOverride=redis-cluster oci://registry-1.docker.io/bitnamicharts/redis-cluster
