# Stage 1: build
FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Vite inlines import.meta.env.VITE_* into the static bundle at build time —
# a runtime container env var on the Deployment (Stage 2 just serves static
# files via nginx) has no effect. Must be passed as --build-arg.
ARG VITE_OTEL_ENABLED=false
ARG VITE_OTEL_EXPORTER_ENDPOINT=/api/otel/v1/traces
ARG VITE_OPENREPLAY_PROJECT_KEY=
ARG VITE_OPENREPLAY_INGEST_POINT=
ENV VITE_OTEL_ENABLED=$VITE_OTEL_ENABLED
ENV VITE_OTEL_EXPORTER_ENDPOINT=$VITE_OTEL_EXPORTER_ENDPOINT
ENV VITE_OPENREPLAY_PROJECT_KEY=$VITE_OPENREPLAY_PROJECT_KEY
ENV VITE_OPENREPLAY_INGEST_POINT=$VITE_OPENREPLAY_INGEST_POINT

RUN npm run build

# Stage 2: runtime
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
RUN printf 'server {\n\
    listen 80;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
        add_header Cache-Control "no-cache";\n\
    }\n\
    location ~* \\.(js|css|png|jpg|svg|ico|woff2?)$ {\n\
        expires 1y;\n\
        add_header Cache-Control "public, immutable";\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
