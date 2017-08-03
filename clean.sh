rm -rf node_modules/
watchman watch-del-all
yarn cache clean
cd ios/ && xcodebuild clean && rm -rf build/ && cd ..
rm -fr $TMPDIR/ react-*
rm -rf /ios/build
yarn
