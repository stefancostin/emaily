#!/bin/bash
# Heroku CentOS installation consisted of downloading the tarball for the Heroku CLI and creating a link
# in /usr/local/bin to points to its binary in Workspace/devtools/Heroku CLI/bin/heroku.

# To create a project for Heroku you need to provide it with an "npm start" command and an "engines" section
# in package.json. Heroku will run the start command with the environment variables sent as arguments to the
# node runtime in order to provide a free port, so usage of "process.env.PORT" is required.

# To create a Heroku application, open up a terminal in your current project's folder and login to the Heroku
# server by running "heroku login". Create a Heroku app by running "heroku create". This will provide you
# with the randomly generated name of the app, the link on which you can view the deployed application and
# the GIT endpoint on which you need to deploy your application to in order to start the deployment process.
# In order to add the remote GIT repository, run this: "git remote add heroku <heroku-git-repo-url>". To view
# what remote repositories you are linked to, run this: "git remote -v". In order to update the heroku git
# repository with your app's code from your origin master branch, run the command: "git push heroku master",
# and essentially telling GIT to update the "heroku" remote repo with the content of "master" (from "origin").
# In order to open the heroku link to the running app, run this: "heroku open".

# BASH SCRIPT
# Commands to redeploy application
git push heroku master ;
heroku open

# My Heroku generated application link and GIT url:
# Link: https://immense-fortress-84982.herokuapp.com/
# GIT:  https://git.heroku.com/immense-fortress-84982.git