#!/bin/bash

# Usage:
#   ./deploy.sh production
#   ./deploy.sh staging



if [[ $1 == staging ]]; then
    # ok
    echo "deploying to $1"
    rm -r build
    yarn run build:staging
    rsync -avzh paratii-portal paratii@staging.paratii.video:/home/paratii/
    # ssh -o StrictHostKeyChecking=no paratii@build.paratii.video "bash ./devops/deploy_portal.sh staging $1 </dev/null"
elif [[ $1 == production ]]; then
    # ok
    echo "deploying to $1"
    ssh -o StrictHostKeyChecking=no paratii@build.paratii.video "bash ./devops/deploy_portal.sh production $1 </dev/null"
else
    echo "unknown parameter - please specify one of 'staging' or 'production'"
    exit
fi
