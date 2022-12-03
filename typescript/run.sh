#!/bin/bash

run="deno run --allow-all day$1/day$1_$2.ts"

t1=$(date +%s%3N); $run; t2=$(date +%s%3N); echo "time: $((t2-t1)) ms"