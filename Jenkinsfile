pipeline {
  agent any
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
        sh 'npm run test'
        sh 'npm run test'
      }
    }

    stage('Deploy') {
      steps {
        echo 'Dağıtılıyor...'
      }
    }

  }
  tools {
    nodejs 'NodeJS'
  }
}