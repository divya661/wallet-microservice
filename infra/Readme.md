# Deploying:  
- `gcloud container clusters get-credentials wallet-cluster-1 --zone asia-south1`

## Apply the YAML files using kubectl:  
- `kubectl apply -f mysql-deployment.yaml`  
- `kubectl apply -f backend-deployment.yaml`  
- `kubectl apply -f frontend-deployment.yaml`
## Monitor the deployment:
- `kubectl get pods`
## Pushing into Artifact Registry in GCP
- `docker build -f ./prod.Dockerfile -t wallet-service:latest .`
- `docker build -f ./prod.Dockerfile -t wallet-ui:latest .`
- `docker tag wallet-service asia-south1-docker.pkg.dev/maximal-mason-411208/wallet/wallet-service:latest`
- `docker tag wallet-service asia-south1-docker.pkg.dev/maximal-mason-411208/wallet/wallet-ui:latest`
- `docker tag mysql asia-south1-docker.pkg.dev/maximal-mason-411208/wallet/mysql:latest`
- `docker push asia-south1-docker.pkg.dev/maximal-mason-411208/wallet/wallet-service:latest`
- `docker push asia-south1-docker.pkg.dev/maximal-mason-411208/wallet/wallet-ui:latest`
