def buildVersion = ''

pipeline {
  agent  { label 'win' }

	options {
			buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '10'))
		}

    stages {
		stage("Restore") {
			steps {
				sh 'node --version'
				sh 'npm install'
    		}
		}

     stage("sonarQube") {
			steps {
			    withSonarQubeEnv('My SonarQube Server'){
                    echo 'run sonar'
                    sh 'npm run sonar'
				}
			}
		}

	 stage("Test Prod") {
			steps {
				echo 'run tests'
				sh 'npm run prod-test'
			}
		}

	}
	post {
		always {

		//	archiveArtifacts allowEmptyArchive: true, artifacts: '.blah/**'
			junit allowEmptyResults: true, testResults: 'backstop_data/prod_ci_report/xunit.xml'
			publishHTML(target: [allowMissing: true, alwaysLinkToLastBuild: true, keepAll: false, reportDir: 'backstop_data/', reportFiles: 'prod_html_report/index.html', reportName: 'HTML Report', reportTitles: ''])
		}

		success {
                        notifyStatus('SUCCESSFUL')
                    }

        failure {
                        notifyStatus('FAILED')
                   }
	}
}
void notifyStatus(String buildStatus) {
        echo 'Initiating email notification...'
        def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
        def summary = "${subject} (${env.BUILD_URL})"
        script {
              emailext body: '${JELLY_SCRIPT,template="static-analysis"}', subject: "${subject}", to: 'qa@beteasy.com.au', replyTo: 'do-not-reply@beteasy.com.au', mimeType: 'text/html';
        }
}
