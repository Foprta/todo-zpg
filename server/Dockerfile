FROM clearlinux/golang

RUN swupd bundle-add python3-basic

WORKDIR /go/src/server

COPY go.mod go.sum ./
RUN go mod download

RUN go get github.com/githubnemo/CompileDaemon

COPY . .

ENTRYPOINT CompileDaemon --build="go build main.go" --command=./main