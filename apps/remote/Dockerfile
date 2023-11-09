FROM node:18-alpine AS base
    ENV PNPM_HOME="/pnpm"
    ENV PATH="$PNPM_HOME:$PATH"
    RUN corepack enable
    # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
    RUN apk add --no-cache libc6-compat

FROM base AS builder
    WORKDIR /app
    RUN pnpm install -g turbo
    COPY . .
    RUN turbo prune --scope=remote --docker

FROM base as installer
    WORKDIR /app
    ENV CI true
    RUN pnpm install -g turbo

    # First install dependencies (as they change less often)
    COPY .gitignore .gitignore
    COPY --from=builder /app/out/json/ .
    COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
    RUN pnpm install

    # Build the project and its dependencies
    COPY --from=builder /app/out/full/ .
    COPY turbo.json turbo.json

    # Uncomment and use build args to enable remote caching
    # ARG TURBO_TEAM
    # ENV TURBO_TEAM=$TURBO_TEAM

    # ARG TURBO_TOKEN
    # ENV TURBO_TOKEN=$TURBO_TOKEN

    # Disable telemetry during the build.
    ENV NEXT_TELEMETRY_DISABLED 1

    RUN turbo run build --filter=remote...

FROM base AS runner
    WORKDIR /app

    ENV NODE_ENV production
    # Disable telemetry during runtime.
    ENV NEXT_TELEMETRY_DISABLED 1

    # Don't run production as root
    RUN addgroup --system --gid 1001 nodejs
    RUN adduser --system --uid 1001 nextjs
    USER nextjs

    COPY --from=installer /app/apps/remote/next.config.js .
    COPY --from=installer /app/apps/remote/package.json .

    # Automatically leverage output traces to reduce image size
    # https://nextjs.org/docs/advanced-features/output-file-tracing
    COPY --from=installer --chown=nextjs:nodejs /app/apps/remote/.next/standalone ./
    COPY --from=installer --chown=nextjs:nodejs /app/apps/remote/.next/static ./apps/remote/.next/static
    COPY --from=installer --chown=nextjs:nodejs /app/apps/remote/public ./apps/remote/public

    EXPOSE 3334

    ENV PORT 3334

    # set hostname to localhost
    ENV HOSTNAME "0.0.0.0"
    CMD node apps/remote/server.js