FROM golang

RUN go get github.com/golang/dep/cmd/dep

RUN mkdir -p /go/src/accounts-service
COPY Gopkg.lock Gopkg.toml /go/src/accounts-service/
WORKDIR /go/src/accounts-service/

RUN dep ensure -vendor-only

COPY . /go/src/accounts-service/
RUN go build -o /bin/project

EXPOSE 3000
ENTRYPOINT ["/bin/project"]
CMD ["-env", "local"]
