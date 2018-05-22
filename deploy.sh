#!/bin/bash

# Usage:
#   ./deploy.sh production
#   ./deploy.sh staging

echo "deploying to $1"
if [[ $1 == staging ]]; then
    host=staging.paratii.video
    # ssh -o StrictHostKeyChecking=no paratii@build.paratii.video "bash ./devops/deploy_portal.sh staging $1 </dev/null"
elif [[ $1 == production ]]; then
    host=portal.paratii.video
    # ssh -o StrictHostKeyChecking=no paratii@build.paratii.video "bash ./devops/deploy_portal.sh production $1 </dev/null"
else
    echo "unknown parameter - please specify one of 'staging' or 'production'"
    exit
fi
yarn run build:$1
rsync -e 'ssh -o StrictHostKeyChecking=no'  -azh --exclude config . paratii@$host:/home/paratii/paratii-portal/
ssh -o StrictHostKeyChecking=no paratii@$host "sh restart.sh"
