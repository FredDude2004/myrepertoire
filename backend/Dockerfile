# ===== Build stage =====
FROM golang:1.25-alpine AS builder

# Install dependencies needed for building
RUN apk add --no-cache git gcc musl-dev

# Set working directory
WORKDIR /app

# Copy go modules files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the rest of the code
COPY . .

# Build the Go binary
RUN go build -o backend .

# ===== Production image =====
FROM alpine:latest

# Install ca-certificates (needed for HTTPS requests)
RUN apk add --no-cache ca-certificates

WORKDIR /app

# Copy the compiled binary from builder
COPY --from=builder /app/backend .

# Expose the port (should match your .env PORT)
EXPOSE 8080

# Run the binary
CMD ["./backend"]
