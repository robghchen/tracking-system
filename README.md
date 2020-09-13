## clone the repo if you have not

`git clone git@github.com:robghchen/tracking-system.git`

## get into the app directory with terminal

`cd tracking-system`

## to go to the main branch

`git checkout master`

## to get the latest code from the main branch in github

`git pull`

## be sure to install packages any time you do git pull

`yarn install`

## create a new branch off of the master branch to encapsulate new code

`git checkout -b <branch name>`  
format is `git checkout -b issueNUMBER-title-with-dashes-in-between`  
ie: `git checkout -b 12-make-home-page`

## run the backend

`npx json-server --watch db.json --port 3001`

## run the frontend

`yarn start`

## work on new code

hit someone up to pair program, it makes learning more fun

## when you're done with the feature and are ready to push it online to github, double check your work on the left panel in vscode, click the fork looking icon then click through the files you worked on to visually inspect the code changes you made. if you're satisfied with what you see then in your terminal type:

`git add .`

## save the work with a message

`git commit -m <message>`  
format is `git commit -m "action(topic): message"`  
ie: `git commit -m "feat(home): create home page"`  
ie: `git commit -m "fix(dashboard): rating not showing next to company name"`  
ie: `git commit -m "style(navbar): change background color to light blue"`

## send the code to github

`git push`  
or
`git push origin head`  
or
`git push origin <branch name>`

## in the terminal where you did git push, you'll see there is a link to github for the branch you just pushed to, click that link

## on the github page click "new pull request", fill in the description then click "create pull request". i will be notified to review your code then i will either request changes or approve your pull request. once approved then you can merge your code into the master branch.

be sure to type `closes #ISSUE_NUMBER` in the description field to link the pull request with the ticket/issue

# Deploying database to Mongodb Cloud and deploying api to Heroku

Visit https://github.com/robghchen/tracking-system-api for instructions.

# Deploying frontend to Netlify

1. Visit https://netlify.com and signup
2. Click "New site from Git"
3. Click "GitHub"
4. Type the repo for your frontend and hit enter
5. Click your repo
6. Click "Deploy site"
7. If your deploy ever fails, click "Production: master@something Failed" to go to the logs and read through it for the error then fix what needs to be fixed.
8. In VSCode, do a global search for `http://localhost:3001/api/v1/` and replace every instance of that with your new api url. i.e: `https://tracking-system-api.herokuapp.com/api/v1/` (notice localhost is http, and heroku is https)
9. Use a setInterval to fetch your data like we do here in `App.tsx` to wake heroku up, more details in this blog post https://medium.com/@robertchen234/save-deploying-your-apps-641532dfce7
10. Save file then git add, git commit, and git push this change
11. Click "Overview" tab
12. Click "Site settings"
13. Click "Change site name"
14. Change it to whatever you want, this will be the public url where anyone can visit your site
