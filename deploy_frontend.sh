#cd frontend
sudo npm run build
sudo cp dist2/.htaccess dist/.htaccess
sudo cp dist2/widget_js.php dist/widget_js.php
sudo cp -r dist2/api dist/api
cd ..
sudo git add .
sudo git commit -m "Finished signup."
sudo git push