export FONTCONFIG_PATH=/home/runner/mcytdev/fonts/
success=$(npm run-script check)
if [ success = "Modules failed!" ]; then
	npm install
fi
npm start
