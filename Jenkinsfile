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
               echo 'The following "npm" command runs your Node.js/React application in'
echo 'development mode and makes the application available for web browsing.'
echo 'The "npm start" command has a trailing ampersand so that the command runs'
echo 'as a background process (i.e. asynchronously). Otherwise, this command'
echo 'can pause running builds of CI/CD applications indefinitely. "npm start"'
echo 'is followed by another command that retrieves the process ID (PID) value'
echo 'of the previously run process (i.e. "npm start") and writes this value to'
echo 'the file ".pidfile".'
sh 'set -x'
sh 'npm start &'
sh 'set +x'
echo 'Now...'
echo 'Visit http://localhost:3000 to see your Node.js/React application in action.'
echo '(This is why you specified the "args ''-p 3000:3000''" parameter when you'
echo 'created your initial Pipeline as a Jenkinsfile.)'
            }
        }
    }
}
