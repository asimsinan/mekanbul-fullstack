pipeline {
  agent any
    tools {
    nodejs 'nodejs'
  }
      environment {
        mekanid="0"
        yorumid="0"
    }
  stages {
    stage('Build Mekanbul') {
      steps {
        echo 'Bağımlılıklar yükleniyor...'
        sh 'npm install'
        echo 'Bağımlılıklar yüklendi!'
        echo 'Audit yapılıyor..'
        sh 'npm audit fix --force'
        echo 'Audit yapıldı!'
      }
    }
    stage('Test Mekanbul') {
      steps {
        echo 'Test yapılıyor'
        sh 'npm run test'
       echo 'Testler başarılı.'
      }
    }

    stage('Deploy Mekanbul') {
      steps {
        echo 'Dağıtılıyor...'
      }
    }

  }

}
