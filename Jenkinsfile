pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Bağımlılıklar yükleniyor..'
                sh 'npm install'
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