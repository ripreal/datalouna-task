docker build . -t cleaner
docker image tag cleaner ghcr.io/ripreal/cleaner:latest
docker push ghcr.io/ripreal/cleaner:latest
