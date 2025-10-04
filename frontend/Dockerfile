# Install dependencies only when needed
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm set fetch-timeout 60000 \
    && npm set fetch-retries 5 \
    && npm ci --registry=https://registry.npmjs.org/

FROM node:20-alpine AS builder
WORKDIR /app

ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only necessary files
COPY --from=builder /app/ ./

EXPOSE 3000

CMD ["npm", "start"]
