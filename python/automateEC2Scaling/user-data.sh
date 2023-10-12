#!/bin/bash

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "Node.js is not installed. Installing..."
    sudo apt-get update
    sudo apt-get install -y ca-certificates curl gnupg git
    mkdir -p /etc/apt/keyrings
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

    NODE_MAJOR=18
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
    sudo apt-get update
    sudo apt-get install nodejs -y
fi

# Continue with the rest of your script
sudo npm install -g pm2

# Clone your Git repository
git clone https://github.com/s-iliyas/projects.git
cd projects/python/automateEC2Scaling/load-app

# Install app dependencies and start the Node.js app using PM2
npm install
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u iliyas --hp /home/iliyas
sudo pm2 start index.js

# Set up PM2 to run the app on system startup
sudo pm2 startup systemd
sudo pm2 save

cd ..
sudo chmod +x start.sh
./start.sh &

echo "*****Script completed*****"