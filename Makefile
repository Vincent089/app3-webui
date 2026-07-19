run:
	npm run dev

build-image:
	docker build . -f .\.k8s\Dockerfile -t app3-webui `
		--build-arg VITE_OTEL_ENABLED=true `
		--build-arg VITE_OTEL_EXPORTER_ENDPOINT=/api/otel/v1/traces