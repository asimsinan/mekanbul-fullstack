pipeline {
  agent any
    tools {
    nodejs 'nodejs'
  }
  stages {
    stage('Build') {
      steps {
        echo 'Bağımlılıklar yükleniyor...'
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
       echo 'Testler başarılı.'
      }
    }

    stage('Deploy') {
      steps {
        echo 'Dağıtılıyor...'
      }
    }

  }

}
