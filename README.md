# Documentation

## Prereq

Install wasp

```shell
curl -sSL https://get.wasp-lang.dev/installer.sh | sh
```

# Dev 

```shell
wasp start db
wasp start
```
# Prod

# Wasp Build backend image 
```shell
cd ./app && wasp build
cd .wasp/build/
```

Replace in Dockerfile EXPOSE $PORT by EXPOSE 3000

```shell
docker build . -t quay.io/florian_even/opensaas-backend:latest
docker push quay.io/florian_even/opensaas-backend:latest
```

# Wasp Build frontend 

```shell
cd ./app/.wasp/build/web-app
npm install
REACT_APP_API_URL=https://api.rueil-malmaison-triathlon.fr npm run build
```

# Build frontend image 

In the folder ./app/.wasp/build/web-app create the below Dockerfile

```
# Utilise l'image officielle NGINX
FROM nginx:alpine AS web-app-production

# Copie les fichiers de construction dans le répertoire attendu par NGINX
COPY ./build /usr/share/nginx/html

# Expose les ports 80 et 443 pour HTTP et HTTPS
EXPOSE 80 443
```

```shell
docker build . -t quay.io/florian_even/opensaas-frontend:latest
docker push quay.io/florian_even/opensaas-frontend:latest
```

# Start opensaas in docker environnement

```shell
podman-compose up -d
```

# Activate ssl

```shell
docker compose run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ -d rueil-malmaison-triathlon.fr
docker compose run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ -d api.rueil-malmaison-triathlon.fr
```


# Clean

```shell
podman-compose down
```
