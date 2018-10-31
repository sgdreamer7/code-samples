# TSS - Time Series Storage

This is application for storing time series values as timestamp/double pairs.
Data store in plain files with custom structure. Timestamps don't stored on disk, actually,
to reduce files size. This storage is capable to hold up to tens millions series with simultaneously writes
for ~1000 series per second. Reading series values perfomance is about 50ms for 1440 points in one serie.
Timestamps values limited between 1900-01-01 and 2099-12-31.

Tech stack:

```shell
Erlang/OTP
```

Installation `Rebar` build tool:

```shell
$ sudo apt install rebar
```

Building project:

```shell
$ rebar compile
```
