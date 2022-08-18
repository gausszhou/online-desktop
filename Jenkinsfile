pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                yarn 
                yarn build
                docker build -t oneline-desktop .
                docker save oneline-desktop:latest | gzip >  oneline-desktop-latest.tar.gz
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                scp -P 2222 -r "online-desktop-latest.tar.gz" root@8.218.79.208:/docker/project
            }
        }
    }
}