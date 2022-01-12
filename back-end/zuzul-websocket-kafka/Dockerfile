FROM node:alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/yarn.lock ./yarn.lock
COPY ./index.js /app

FROM node:alpine AS runner
WORKDIR /app
COPY --from=builder /app ./
CMD ["yarn", "start"]