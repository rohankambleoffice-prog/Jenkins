pipeline {
    agent any
    
    environment {
        SCANNER_HOME= tool 'sonar-scanner'
    }

    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'main', credentialsId: '723d9a28-1787-40df-814d-47459afc0e1c', url: 'https://github.com/rohankambleoffice-prog/Jenkins.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh "npm ci"
            }
        }
        
        stage('Sonarqube Analysis') {
            steps {
                sh '''$SCANNER_HOME/bin/sonar-scanner -Dsonar.host.url=http://80.65.208.53:9000 \
                -Dsonar.login=squ_90f03e896bbe523f9a41b0ee65c89259b52a3ffc \
                -Dsonar.projectName=Immverseai \
                -Dsonar.projectKey=immverseai \
                -Dsonar.sources=. \
                -Dsonar.exclusions=node_modules/**,coverage/**,dist/** '''
            }
        }
        
        stage('OWASP Scanning') {
            steps {
                dependencyCheck additionalArguments: '--noupdate --scan . --format HTML --format XML', odcInstallation: 'OWASP'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }
        
        stage('Set Image Tag') {
            steps {
                script {
                    def commitMsg = sh(script: "git log -1 --pretty=%B", returnStdout: true).trim()
                    def tagMatch = (commitMsg =~ /tag:(\d+\.\d+\.\d+)/)
                    def IMAGE_TAG = "latest"
                    if (tagMatch.find()) {
                        IMAGE_TAG = tagMatch.group(1)
                    }
                    env.IMAGE_TAG = IMAGE_TAG
                    echo "Using Docker tag: ${IMAGE_TAG}"
                }
            }
        }
        
        stage('Build') {
            steps {
                script{
                    // This step should not normally be used in your script. Consult the inline help for details.       
                    withDockerRegistry(credentialsId: 'Dockerhub') {
//                    withDockerRegistry(credentialsId: 'Dockerhub', toolName: 'docker') {
                        sh "docker build -t immverseai:${IMAGE_TAG} -f Dockerfile ."
                        sh "docker tag immverseai:${IMAGE_TAG} rohankambleoffice/immverseai:${IMAGE_TAG}"
                        sh "docker push rohankambleoffice/immverseai:${IMAGE_TAG}"
                    }
                }
            }
        }
        
        stage('Push') {
            steps {
                script{
                    // This step should not normally be used in your script. Consult the inline help for details.       
                    withDockerRegistry(credentialsId: 'Dockerhub') {
//                    withDockerRegistry(credentialsId: 'Dockerhub', toolName: 'docker') {
                        sh "docker push rohankambleoffice/immverseai:${IMAGE_TAG}"
                    }
                }
            }
        }
        
        stage('Triggering CD Pipeline') {
            steps {
                build job: "Immverseai_Deploy", parameters: [
                string(name: 'IMAGE_TAG', value: env.IMAGE_TAG)
                ]
            }
        }
    }
}

