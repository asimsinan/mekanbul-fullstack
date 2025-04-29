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
      }
    }
     stage('Start server in background') {
            steps {
                sh '''
                    npm start &              # Start server in background
                    SERVER_PID=$!            # Capture process ID
                    echo "Server PID: $SERVER_PID"
                    sleep 10                 # Wait for server to be ready (adjust as needed)
                '''
            }
        }
    stage('Test Mekanbul') {
      steps {
        echo 'Test yapılıyor'
        sh 'npm run test'
       echo 'Testler başarılı.'
      }
    }
  stage('Stop server') {
            steps {
                sh '''
                    pkill -f "node .*start" || true
                '''
            }
        }
    stage('Deploy Mekanbul') {
      steps {
        echo 'Dağıtılıyor...'
      }
    }

  }

}
