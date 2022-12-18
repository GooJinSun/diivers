#!/bin/bash

GREEN=$(tput setaf 2)
NO_COLOR=$(tput sgr0)

notify() {
	echo "${GREEN}[DEPLOYBOT] $1 ${NO_COLOR}"
}

# B.Access to source code
source /home/ubuntu/venv/bin/activate
notify "Executed python virtual environment..."
cd /home/ubuntu/adoor
notify "Changed directory to diivers code..."

# C.Update Code
# Stored username and password using 'git config credential.helper store'
notify "Checkout to main branch..."
git checkout main
notify "Pulling latest code..."
git pull

notify "Do you want to create a new git tag? (y/n)"
read answer
if [ $answer == "y" ]
then
	notify "Enter the version of git tag (including v prefix): "
	read version
	git tag $version
	git push --tag
	notify "Created git tag... DON'T FORGET TO WRITE RELEASE NOTE!"
fi

notify "
Which part of the code has changed? Enter the number...
Multiple selection is possible using comma(,) (ex. 1,2,3)
1. Backend DB structure
2. Backend code
3. Frontend code
"
read change
notify "Deploy in progress..."
if [[ $change == *"1"* ]]
then
	notify "Deploying backend DB structure..."
	cd /home/ubuntu/adoor/backend/adoorback
	./manage.py makemigrations
	./manage.py migrate
fi
if [[ $change == *"2"* ]]
then
	notify "Deploying backend code..."
	sudo systemctl restart uwsgi
fi
if [[ $change == *"3"* ]]
then
	notify "Deploying frontend code..."
	cd /home/ubuntu/adoor/frontend
	npm run build --prod
	sudo systemctl restart nginx
fi

notify "Deployment is all done. Check if the changes are properly reflected on the server."
