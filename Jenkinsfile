pipeline {
    agent any
   tools {
        nodejs 'NodeJS'
    }
    stages {
        stage('Build') {
            steps {
                echo 'Bağımlılıklar yükleniyor..'
                sh 'npm install'
                echo 'audit yapılıyor..'
                sh 'npm audit fix --force'
            }
        }
        stage('Test') {
            steps {
                echo 'Test yapılıyor..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Dağıtılıyor..'
            }
        }
    }
}