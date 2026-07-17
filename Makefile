run:
	npm run dev

build-image:
	docker build . -f .\.k8s\Dockerfile -t app3-webui