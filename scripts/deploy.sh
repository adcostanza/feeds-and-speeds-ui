git stash
git branch -D gh-pages
git checkout -b gh-pages
npm install
npm run build
find ./ -mindepth 1 ! -regex '^./dist\(/.*\)?' -delete
cp -Rf dist/. .
rm -Rf dist
git push -u origin gh-pages --force