git cheat sheet

git help command															\\ pulls the help file for the "git command"

git config --global user.name "Kris Wall" 									\\ Set username
git config --global user.email "Kris@urbanscouter.com" 						\\ Set e-mail address
git config --global color.ui true 											\\ sets pretty colors
git config --list 															\\ lists the global config data followed by the repo config data

git init																	\\ initializes an empty local git repository

git status																	\\ what has changed since last commit
git add README.txt															\\ adds README.txt to staging area
git commit -m "Create a README."											\\ added to timeline and into the local repository

git log																		\\ shows what has been committed in the local repository

git diff																	\\ shows unstaged differences since last commit
git diff --staged															\\ shows the differences since the "staged" commit

git reset HEAD <file>														\\ unstages the file

Helpful info -- what is HEAD?												\\ HEAD refers to the last commit on the current branch (timeline)

git checkout -- <file> <file>												\\ Reverts to the last committed <file> version

git commit -a -m "Modify readme"											\\ adds changes from all tracked files and commits them

git reset --hard HEAD^														\\ Undo last commit and all changes
git reset --hard HEAD^^														\\ Undo last 2 commits and all changes
git reset --soft HEAD^														\\ reset last commit into staging, removes everything from the local repository,  																						\\ ^ means the last commit

git commit --amend -m "modify the file"										\\ Adds to the last commmit

git remote add origin https://github.com/krisW/git-real.git 				\\ Adds a remote repository named canonically as origin
git remote rm <name>														\\ removes the remote repo <name>

git remote -v 																\\ Shows all remote repositories that git is aware of
git remote prune origin														\\ cleans up stale references to branches on the remote repo
git remote show origin														\\ Shows details about origin repo and its branches
																			\\ Shows details about the local branches
																			\\ Shows details about where the branches push and if they're up-to-date

git push -u <remote_rep> <local_rep> 		 								\\ -u saves the locations, "git push -u origin master" is typical usage
git push origin :<remote_branch>											\\ Deletes the remote branch

git pull 																	\\ pulls the latest changes from the current selected branch and syncs the local repo

Helpful info -- multiple repos												\\ it is common to have multiple remote repos, like "origin", "test", "production"

git clone https://github.com:example/petshop.git 							\\ 1. clones the remote repo to your local repo in a new directory, 2. adds the origin 																					\\ remote repo, 3. checkouts out the initial branch and sets the HEAD
git clone https://github.com:example/petshop.git New_Folder					\\ same, but the new directory is called New_Folder

Helpful info -- work in test branches										\\ try to not work in your local master repo

git branch <branch_name>													\\ creates a new local branch of your repo
git branch 																	\\ checks which branch we're using
git branch -d <branch_name>													\\ Deletes the local branch
git branch -r 																\\ lists all remote branches

Helpful info -- what is a branch?											\\ a branch is an alternate timeline to your master timeline

git checkout <branch_name>													\\ creates a new timeline called <branch_name> with a new HEAD
git checkout -b <branch_name>												\\ creates and checksouts the new branch
git checkout v0.0.1															\\ checks out code at commit

git merge <branch_name>														\\ merges current timeline with other branch timeline

Helpful info -- Fast forward												\\ means the master branch is catching up with the alternate time line

git branch -d <branch_name>													\\ Deletes the branch

git fetch																	\\ merges the origin master with master	

Helpful info -- Tags														\\ is a reference to a commit, used for release versioning
																			\\ create a tag to mark all versions

git tag 																	\\ list all tags
git tag -a v0.0.3 -m "version 0.0.3" 										\\ adds a new tag called v0.0.3
git push --tags 															\\ push the tags to the origin (remote repo)


git rebase <branch>															\\ 1. moves all changes to <branch>, but not in origin\master, to a temp area
																			\\ 2. runs all origin\master commits, one by one, to local
																			\\ 3. runs all temp area commits, to local


git blame filename															\\ tracks all the changes to a file to learn who did what

Helpful info -- Exlude a folder 											\\ place folder in .git/info/exclude. Other options include:
																			\\ tutorial.mp4 - that file
																			\\ *.mp4 - all mp4 files
																			\\ logs/*.log - all .log files in logs directory


Helpful info -- ignore a file/folder 										\\ add exclusions to the .gitignore file


git rm --cached file.log 													\\ stops tracking a file

===========================================================================


== Example  ==																\\ You are asked to fix something in the master branch

git checkout master															\\ Switches to the branch "master"
git branch 																	\\ checks which branch we're on
git pull 																	\\ pulls the lastest data from the admin branch repo
git add file.js																\\ adds the needed file
git commit -m "Fix the problem" 											\\ commits the missing file to the local stage
git push	 																\\ syncs local staging area with remote repo
git checkout <test_branch>													\\ switches back to the <test_branch> branch
 -- finish work in the <test_branch> --
 git checkout master														\\ switches back to the master branch
 git merge <test_branch>													\\ merges the master and <test_branch> branches
  -- git will open a text editor, like vi --
  -- make any changes needed, then press "Esc"
  -- finally, type ":wq" and press enter



 == Example == 																\\ If your commit/push is rejected, your local repo timeline is behind the remote repo
 git pull 																	\\ this will catch you up with the remote repo (sync/fetch)
 git push 																	\\ pushes your changes into the remote repo



== Example == 																\\ merge conflict
-- edit the conflicted file --												\\ remove the content that doesn't belong as both versions are contained within
git commit -a 																\\ starts a merge, edit the merge text doc, save & exit with ":wq"
git push 																	\\ sync origin/master with master



== Example == 																\\ merge conflict file
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Our Cat-alog</title>
  </head>
  <body>
    <nav>
      <ul>
<<<<<<< HEAD 																\\ Shows the HEAD conflict location
        <li><a href="cat.html">Cats</a></li> 								\\ Your commit
        <li><a href="dog.html">Dogs</a></li>
=======
        <li><a href="cat.html">Felines</a></li> 							\\ Bob's commit
        <li><a href="dog.html">Canines</a></li>
>>>>>>> 6a487f9eb0e0a5110bdf2a45a4f5dbcc3d4eec53
      </ul>
    </nav>
  </body>
</html>



== Example == 																\\ Cleaned up merge conflict file
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Our Cat-alog</title>
  </head>
  <body>
    <nav>
      <ul>
        <li><a href="cat.html">Cats</a></li>
        <li><a href="dog.html">Dogs</a></li>
      </ul>
    </nav>
  </body>
</html>



== Example == 																\\ pushing a branch to a remote repo so others can use it
git checkout -b <test_branch>												\\ (You)creates and checks out a new branch
git push origin <test_branch> 												\\ (You) pushes your <test_branch> to the remote repo
git pull 																	\\ (Bob) pulls the remote repo and will receive the new branch
git branch 																	\\ (Bob) will only display Bob's master
git branch -r 																\\ (Bob) lists all remote branches
git checkout <test_branch> 													\\ (Bob) is now working in the <test_branch>



== Example == 																\\ How to rebase, rather than a bunch of merges
git checkout admin															\\ switch to branch 'admin'
git rebase master															\\ runs master commits, then runs admin commits
git checkout master 														\\ switch to branch 'master'
git merge admin																\\ cleanly merges the two branches (fast forward)



== Example == 																\\ How to rebase with conflicts, README.txt
git fetch																	\\ pulls down github's commits, so it changes the timeline
git rebase 	<branch>														\\ moves all changes to master, but not in origin/master, to temp area. Runs master then 																				\\ temp commits
 -- make changes to local master README.txt--
 -- or "git rebase --skip"													\\ skips conflict
 -- or "git rebase --abort"													\\ aborts the merge/rebase
 git status																	\\ shows "Not currently on any branch"
git add README.txt 															\\ adds back to staging
git rebase --continue														\\ resumes the rebase