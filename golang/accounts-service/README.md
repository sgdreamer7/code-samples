###Requirments
* go 1.10.3+
* dep

###Install
* Run `dep ensure`

###Usage
* Run `go run main.go`

**Please note:** you might want to run it with live reloading. [Reflex](https://github.com/cespare/reflex "Reflex") is good enough to take care. Example: `reflex -d none -s -R vendor. -r \.go$ -- go run cmd/server/main.go`
