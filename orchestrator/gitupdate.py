import os
import git


repository_url = 'https://git.cpg.dell.com/scm/mac/testplatform.git'
branch = "main"
root_path = os.path.abspath('.')
test_engine_path = os.path.dirname(root_path)

def git_pusher():
    print("Starting git push process...")
    print(f"Opening the repository at {test_engine_path}...")
    repo = git.Repo(test_engine_path)
    print(f"Checking out to {branch} branch...")
    repo.git.checkout(branch)
    print("Staging the changes...")
    repo.git.add('-A')
    print("Committing the changes...")
    repo.git.commit('-m', 'commit message')
    origin = repo.remote(name='origin')
    print(f"Pushing the changes to the remote repository {repository_url}...")
    origin.push(branch)
    print("Git push process completed successfully.")

if __name__ == "__main__":
    git_pusher()
