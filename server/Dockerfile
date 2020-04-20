FROM clearlinux/golang

RUN swupd bundle-add python3-basic

WORKDIR /go/src/server

COPY . /go/src/server

RUN go get ./...

RUN go get github.com/githubnemo/CompileDaemon

ENTRYPOINT CompileDaemon --build="go build main.go" --command=./main