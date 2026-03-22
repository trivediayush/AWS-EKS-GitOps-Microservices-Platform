FROM golang:1.21-alpine

WORKDIR /app
COPY . .
RUN go mod init inventory-service && go mod tidy
RUN go build -o inventory-service main.go

EXPOSE 4000
CMD ["./inventory-service"]
