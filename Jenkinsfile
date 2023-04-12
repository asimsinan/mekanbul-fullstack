pipeline {
    agent any
   tools {
        nodejs 'NodeJS'
    }
    stages {
        stage('Build') {
            steps {
                echo 'Bağımlılıklar yükleniyy...'
                sh 'npm install'
                echo 'Bağımlılıklar yüklendi!'
                echo 'Audit yapılıyor..'
                sh 'npm audit fix --force'
                echo 'Audit yapıldı!'
            }
        }
        stage('Test') {
            steps {
                echo 'Test yapılıyor'
                sh 'ls '
            }
        }
        stage('Deploy') {
            steps {
                echo 'Dağıtılıyor...'
                sh 'npm start'
            }
        }
    }
}
