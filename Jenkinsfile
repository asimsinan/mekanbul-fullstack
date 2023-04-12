pipeline {
   tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Build') {
            steps {
                echo 'Bağımlılıklar yükleniyor..'
                sh 'node --version'
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