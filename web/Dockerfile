FROM node:16.13-alpine
WORKDIR /app

ENV NODE_ENV production

COPY node_modules node_modules
COPY web/.next .next
COPY web/next-i18next.config.js next-i18next.config.js
COPY web/next-i18next.config.js next.config.js
COPY web/public public
COPY web/package.json package.json

EXPOSE 3000

ENV PORT 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]
