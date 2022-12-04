#!/bin/bash

run="go run cmd/aoc/main.go run -d $1 -p $2"

t1=$(date +%s%3N); $run; t2=$(date +%s%3N); echo "time: $((t2-t1)) ms"