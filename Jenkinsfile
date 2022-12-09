pipeline {
  agent any
  tools {
    nodejs 'nodejs'
  }
  stages {
    stage('Initialize') {
      steps {
        echo 'Checked out git repository.'
        sh 'npm i'
      }
    }
    stage('Running') {
      steps {
        echo 'Start cypress...'
        sh 'npx cypress run --headless'
      }
    }
  }

  post {
        success  {
          echo 'Generate Report...'
          publishHTML(target : [allowMissing: true,
                alwaysLinkToLastBuild: false,keepAll: false,
                reportDir: '/var/jenkins_home/workspace/Smoke Test/cypress/reports/html/',
                reportFiles: 'index.html',
                reportName: 'HTML Report',
                reportTitles: 'HTML Report'])

          emailext(attachLog: true, mimeType: 'text/html',
                body: '<h1>Finished: SUCCESS</h1><h2>----------</h2><h3>Please visit http://152.69.209.1:8080/job/Smoke%20Test/HTML_20Report/ for further information</h3>',
                subject: "[Jenkins][Smoke Test] '${env.JOB_NAME}' #'${env.BUILD_NUMBER}' - Success!",
                to: 'ha.hoang@xpondigital.com, duyen.dao@xpondigital.com')
        }
        failure {
          echo 'Generate Report...'
          publishHTML(target : [allowMissing: true,
                alwaysLinkToLastBuild: false,keepAll: false,
                reportDir: '/var/jenkins_home/workspace/Smoke Test/cypress/reports/html/',
                reportFiles: 'index.html',
                reportName: 'HTML Report',
                reportTitles: 'HTML Report'])

          emailext(attachLog: true, mimeType: 'text/html',
                body: '<h1>Finished: Failed</h1><h3>Please visit http://152.69.209.1:8080/job/Smoke%20Test/HTML_20Report/ for error details</h3>',
                subject: "[Jenkins][Smoke Test] '${env.JOB_NAME}' #'${env.BUILD_NUMBER}' - Failed!",
                to: 'ha.hoang@xpondigital.com, duyen.dao@xpondigital.com')
        }

        aborted  {
          emailext(attachLog: true, mimeType: 'text/html',
                body: '<h1>Aborted</h1><h1>This build is aborted by you or someone!</h1>',
                subject: "[Jenkins][Smoke Test] '${env.JOB_NAME}' #'${env.BUILD_NUMBER}' - Aborted!",
                to: 'ha.hoang@xpondigital.com')
        }
  }
}
