#!/bin/bash

# Usage:
#   ./deploy.sh production
#   ./deploy.sh staging
#   ./deploy.sh production verbose



if [[ $1 == staging ]]; then
    # ok
    echo "deploying to $1"
elif [[ $1 == production ]]; then
    # ok
    echo "deploying to $1"
else
    echo "unknown parameter - please specify one of 'staging' or 'production'"
    exit
fi

if [[ $2 == verbose ]]; then
    ssh -o StrictHostKeyChecking=no paratii@build.paratii.video "cd ~/devops && fab deploy_portal:$1 </dev/null"
else
    ssh -o StrictHostKeyChecking=no paratii@build.paratii.video "cd ~/devops && fab deploy_portal:$1 </dev/null >ldeploy_portal.log 2>&1 &"
fi
