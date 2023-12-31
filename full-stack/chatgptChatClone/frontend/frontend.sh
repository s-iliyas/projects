#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
# Run a case command
case $1 in
    server)
    WEBSITE_BASE_NAME="$(printenv WEBSITE_NAME)"
    BASE_PATH=/var/www/${WEBSITE_BASE_NAME}
    cd $BASE_PATH
    npm install --force
    echo "Packages Installation Success."
    npm run build
    echo "Build Success."
    cp .htaccess /var/www/${WEBSITE_BASE_NAME}/dist
    chmod 755 /var/www/${WEBSITE_BASE_NAME}
    apache2ctl -D FOREGROUND
    a2enmod rewrite
    service apache2 start
    ;;
esac