#!/bin/sh

# Install PHP & WGET
dnf clean metadata
dnf install -y php8.2 php8.2-{common,mbstring,gd,bcmath,xml,fpm,intl,zip}
dnf install -y wget

# INSTALL COMPOSER
EXPECTED_CHECKSUM="$(wget -q -O - https://composer.github.io/installer.sig)"
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
ACTUAL_CHECKSUM="$(php -r "echo hash_file('sha384', 'composer-setup.php');")"

if [ "$EXPECTED_CHECKSUM" != "$ACTUAL_CHECKSUM" ]
then
    >&2 echo 'ERROR: Invalid installer checksum'
    rm composer-setup.php
    exit 1
fi

php composer-setup.php --quiet
rm composer-setup.php

# INSTALL COMPOSER DEPENDENCIES
php composer.phar install
composer update

# Force clean slate - prevent cross-deployment cache pollution
rm -rf storage/framework/cache/*
rm -rf bootstrap/cache/*
php artisan cache:clear --quiet

# Set unique build identifier to prevent cache collisions
export BUILD_ID="${VERCEL_GIT_COMMIT_SHA:-$(date +%s)}"
echo "Using BUILD_ID: $BUILD_ID"

# BUILD ASSETS
mix --production

# GENERATE APP KEY
php artisan key:generate

# BUILD GLOSSARY JSON
php artisan glossary:generate-json

# GENERATE DATA FILES
php artisan rbac:generate-data

php please generate:markdown-files
# BUILD STATIC SITE
php please stache:warm -n -q
php please ssg:generate --workers=4