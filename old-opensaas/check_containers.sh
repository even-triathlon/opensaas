#!/bin/bash

# Chemin absolu vers le répertoire contenant docker-compose.yaml
COMPOSE_DIR="/home/opc/opensaas"

# Définir les noms des conteneurs
CONTAINERS=("db" "backend" "opensaas_frontend_1")

# Changer le répertoire de travail
cd "$COMPOSE_DIR" || exit

# Boucle à travers chaque conteneur et vérifier son statut
for CONTAINER in "${CONTAINERS[@]}"; do
  STATUS=$(podman inspect -f '{{.State.Status}}' "$CONTAINER" 2>/dev/null)

  if [ "$STATUS" != "running" ]; then
    echo "Container $CONTAINER is not running. Restarting..."
    podman compose up -d
    break
  fi
done

