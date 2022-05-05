#!/bin/bash

REPO=$1
BRANCH=$2
SHELL=$3
AUTO_PULL=$4

shell_access () {
    cat << EOF
************************************************************
Shell access mode enabled! Enter 'exit' to quit shell access mode.
WARNING! terminal text editors and long running processes do not work in this mode.
************************************************************
container@alaister:$ 
EOF
    
    while true; do
        read -p "container@alaister:$ " cmd
        if [ "$cmd" == "exit" ]; then
            break
        else
            eval "$cmd"
            sleep 1
            echo "container@alaister:$ "
        fi
    done
}

if [ "$SHELL" == "ask" ]; then
    echo "** Do you want to enable shell access mode? (for advanced users) [Enter yes or no] **"
    echo "Hint: You can now hide this prompt by setting the default value on the 'Startup' page."
    read confirm
    case $confirm in
        [Yy]* ) shell_access;;
    esac
elif [ "$SHELL" == "yes" ]; then
    shell_access
fi

echo "Shell access mode disabled!";
cd /home/container

if [[ $REPO != *.git ]]; then
    REPO=${REPO}.git
fi

if [ -d .git ]; then
    if [ -f .git/config ]; then
        ORIGIN=$(git config --get remote.origin.url)
        if [ ! -z "$ORIGIN" ] && [ "$AUTO_PULL" != "no" ]; then
            if [ "$AUTO_PULL" == "ask" ]; then
                echo "** .git config detected. Continue to pull from '${ORIGIN}'? [Enter yes or no] **"
                echo "Hint: You can now hide this prompt by setting the default value on the 'Startup' page."
                read confirm
                case $confirm in
                    [Yy]* )
                        echo "Pulling from '${ORIGIN}'..."
                        git pull --ff-only
                        ;;
                    * ) echo "Skipped!";;
                esac
            else
                git pull --ff-only ${REPO}
            fi
        fi
    fi
elif [ ! -z "$REPO" ] && [ ! -z "$BRANCH" ]; then
    echo "*** WARNING! By cloning a Git repo, all existing files will be deleted. Continue? [Enter yes or no] ***"
    read confirm
    case $confirm in
        [Yy]* )
            rm -rf ..?* .[!.]* *
            echo "/home/container is now empty. Cloning '${BRANCH}' from '${REPO}'..."
            git clone --single-branch --branch ${BRANCH} ${REPO} .
            ;;
        * ) echo "Skipped!";;
    esac
fi
