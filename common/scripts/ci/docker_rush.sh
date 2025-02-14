#!/bin/bash

# Absolute root directory - for volumes
ROOT_DIR=$(echo $(cd $(dirname "${BASH_SOURCE[0]}")/../../.. && pwd -P))

IMAGE="020413372491.dkr.ecr.us-east-1.amazonaws.com/3rdparty/library/node:18"

echo "Running \"$*\" using ${IMAGE} in root directory ${ROOT_DIR}"

#
# Environment variables to propagate to docker
#
export CI=true

echo "-----------------------------------------------------------------------"
echo "--- starting: rush-$*"
echo "-----------------------------------------------------------------------"

#
# Execute `rush` using dockerized node - all heavy lifting is done against SDK sources mounted as a volume onto the
# /workspace directory
#

if [ -z $WIREMOCK_NET ]; then
  net_param=""
else
  net_param="--net ${WIREMOCK_NET} --net-alias tests"
fi

docker run \
  --env CI \
  --env WIREMOCK_NET \
  --env HOME="/workspace" \
  --env EXAMPLES_BUILD_TYPE \
  --env NPM_PUBLISH_TOKEN \
  --env EXAMPLE_MAPBOX_ACCESS_TOKEN \
  --env BROWSERSLIST_IGNORE_OLD_DATA=true \
  --rm \
  ${net_param} \
  --volume ${ROOT_DIR}:/workspace:Z \
  -u $(id -u ${USER}):$(id -g ${USER}) \
  -w /workspace \
  ${IMAGE} \
  node "./common/scripts/install-run-rush.js" $*
