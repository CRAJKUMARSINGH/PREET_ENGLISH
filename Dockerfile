# Multi-stage Dockerfile for PREET ENGLISH
# Week 1 - Foundation & Infrastructure

# Stage 1: Base
FROM node:18-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# Stage 2: Dependencies
FROM base AS deps
COPY package*.json ./
RUN npm ci --only=production && \
    npm cache clean --force

# Stage 3: Development Dependencies
FROM base AS dev-deps
COPY package*.json ./
RUN npm ci

# Stage 4: Builder
FROM base AS builder
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build application
ENV NODE_ENV=production
RUN npm run build

# Stage 5: Development
FROM base AS development
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
EXPOSE 5000 3000
CMD ["npm", "run", "dev"]

# Stage 6: Production
FROM base AS production
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY package*.json ./
COPY prisma ./prisma

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs && \
    chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["npm", "start"]
