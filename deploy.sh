#!/bin/bash
# the 'build_and_deploy.sh' referred to in this script is https://github.com/Paratii-Video/devops/blob/master/files/build_and_deploy.sh

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

# ssh -o StrictHostKeyChecking=no paratii@build.paratii.video "cd ~/devops && fab deploy_portal"
ssh -o StrictHostKeyChecking=no paratii@build.paratii.video "cd ~/devops && fab deploy_portal $1 </dev/null >ldeploy_portal.log 2>&1 &"
