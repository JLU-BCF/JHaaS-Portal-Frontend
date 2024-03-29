#!/bin/bash

# This is the entrypoint file for DEVELOPMENT!

# Setup trap handler for signals
# $1 Signal
# $2 PID to kill
trap_handler () {
  echo "Relaying signal $1 to Process $2"
  kill -s $1 $2
}

# Only build node_modules if they do not exist or if package-lock changed
if [ ! -d node_modules ] || (! sha1sum --check ~/lock); then
  echo "cache is invalid, rebuilding..."

  echo "rebuild dependencies..."
  npm ci

  echo "creating hash for cache validation..."
  sha1sum package-lock.json > ~/lock
else
  echo "cache is valid, continuing..."
fi

# Start the dev server
npm run dev &

NPM_PID=$!

# Setting up traps
trap "trap_handler SIGINT $NPM_PID" SIGINT
trap "trap_handler SIGTERM $NPM_PID" SIGTERM
trap "trap_handler SIGQUIT $NPM_PID" SIGQUIT

wait $NPM_PID
