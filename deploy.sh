echo "update code from gitlab branch master..."
git pull origin master

echo "update deps"
yarn install

echo "rebuild app..."
yarn build:prod

echo "restart pm2..."
pm2 restart oopsreview

echo "deploy finished and SITE IS LIVE..."
