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

## when you're done with the feature and are ready to push it online to github, on the left panel in vscode, click the fork looking icon then click through the files you worked on to visually inspect the code changes you made. if you're satisfied with what you see then in your terminal type:

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
