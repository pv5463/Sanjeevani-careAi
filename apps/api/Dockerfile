FROM node:20-alpine AS base
WORKDIR /app

# ── Dependencies ──────────────────────────────────────────────────────────────
FROM base AS deps
COPY package*.json ./
RUN npm ci --legacy-peer-deps --production

# ── Build ─────────────────────────────────────────────────────────────────────
FROM base AS builder
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

# ── Production runner ─────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001
COPY --from=deps --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/package.json ./

USER nestjs
EXPOSE 4000

CMD ["node", "dist/main.js"]
