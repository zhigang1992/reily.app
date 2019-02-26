#!/bin/sh -l

set -e
sh -c "yarn install"
sh -c "yarn build"
TARGET_BRANCH=$(echo $GITHUB_REF | cut -d'/' -f 3) sh -c "yarn $*"