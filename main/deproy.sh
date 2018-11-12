#!/bin/sh

cd `dirname $0`

npm install
npm run build

if [ -d ./nginx/app ]; then
    rm -rf ./nginx/app
fi

mkdir ./nginx/app
mv ./build/* ./nginx/app
