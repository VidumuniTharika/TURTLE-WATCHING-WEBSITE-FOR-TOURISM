@echo off
cd /d d:\rekawa
git add .
git commit -m "rekawa website"
git branch -M main
git pull origin main --allow-unrelated-histories -X ours
git push -u origin main
echo DONE! All files pushed to GitHub!
pause
