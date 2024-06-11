FROM ubuntu:latest
LABEL authors="bakud"

ENTRYPOINT ["top", "-b"]