📦 Microservices GitOps Platform (AWS EKS)

A cloud-native microservices-based application deployed on Kubernetes (EKS) with containerised services, inter-service communication, and a lightweight frontend dashboard.

🚀 Architecture Overview

This system consists of four independent microservices:

👤 User Service → Python (Flask)
📦 Order Service → Node.js (Express)
📊 Inventory Service → Go
🔔 Notification Service → Python (Flask)
🌐 Frontend → HTML/JS served via Nginx

All services communicate over internal Kubernetes networking.

🧱 System Design
Frontend
   │
   ▼
Order Service (Node.js)
   ├── User Service (Flask)
   ├── Inventory Service (Go)
   └── Notification Service (Flask)
⚙️ Tech Stack
Kubernetes (EKS)
Docker
Python (Flask)
Node.js (Express)
Go
Nginx (Frontend)
AWS ECR (Container Registry)
AWS EKS (Orchestration)
📂 Project Structure
aws_microservices_gitops/
│
├── user-service/
│   ├── app.py
│   ├── Dockerfile
│
├── order-service/
│   ├── index.js
│   ├── Dockerfile
│
├── notification-service/
│   ├── app.py
│   ├── Dockerfile
│
├── inventory-service/
│   ├── main.go
│   ├── Dockerfile
│
└── frontend/
    ├── index.html
    ├── Dockerfile
🐳 Build Docker Images
docker build -t user-service ./user-service
docker build -t order-service ./order-service
docker build -t notification-service ./notification-service
docker build -t inventory-service ./inventory-service
docker build -t frontend ./frontend
📤 Push to AWS ECR
aws ecr get-login-password --region eu-north-1 \
| docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.eu-north-1.amazonaws.com
docker tag user-service:latest <ECR_URL>/user-service:latest
docker push <ECR_URL>/user-service:latest

(Repeat for all services)

☸️ Deploy on Kubernetes (EKS)
kubectl apply -f k8s/
kubectl get pods
kubectl get svc
🌐 Frontend Access

Frontend runs on Nginx:

http://<ALB_OR_NODE_IP>:80
🔗 Service Endpoints
Service	Endpoint
User Service	/users
Order Service	/orders
Inventory	/items
Notification	/notify
⚠️ Known Limitations (Current Version)
❌ In-memory storage (data resets on restart)
❌ No persistent database yet
❌ No authentication layer
❌ Basic frontend UI
🧠 Key Learning Outcomes
Microservices architecture design
Containerisation using Docker
Kubernetes deployment (EKS)
Service-to-service communication
Basic cloud networking on AWS
🚀 Future Improvements
PostgreSQL integration for persistence
AWS Load Balancer Controller setup
ArgoCD GitOps pipeline
CI/CD with GitHub Actions
Observability (Prometheus + Grafana)
Modern React-based frontend upgrade
👨‍💻 Author

Built as a DevOps learning project demonstrating:

Cloud-native architecture
Kubernetes orchestration
Multi-language microservices
