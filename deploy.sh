#!/bin/bash

# Exit on error
set -e

# Load environment variables
source .env

# Build client
echo "Building client..."
cd client
npm install
npm run build
cd ..

# Build server
echo "Building server..."
cd server
npm install
npm run build
cd ..

# Create Docker images
echo "Creating Docker images..."
docker build -t schemeskill-client -f client/Dockerfile .
docker build -t schemeskill-server -f server/Dockerfile .

# Deploy to Kubernetes
echo "Deploying to Kubernetes..."
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/mongodb.yaml
kubectl apply -f k8s/redis.yaml
kubectl apply -f k8s/server.yaml
kubectl apply -f k8s/client.yaml
kubectl apply -f k8s/ingress.yaml

# Wait for deployments to be ready
echo "Waiting for deployments to be ready..."
kubectl rollout status deployment/schemeskill-server -n schemeskill
kubectl rollout status deployment/schemeskill-client -n schemeskill

echo "Deployment completed successfully!" 