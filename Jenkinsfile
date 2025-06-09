pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "myapp"
        DOCKER_TAG = "latest"
        DOCKER_HUB_REPO = "mayorpasca32/${DOCKER_IMAGE}"
    }

    stages {
        stage('Cleanup') {
            steps {
                cleanWs()
            }
        }

        stage("Checkout") {
            steps {
                git branch: 'main', url: 'https://github.com/mayorpasca32/my_Node.js_app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh "docker run --rm ${DOCKER_IMAGE}:${DOCKER_TAG} npm test"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    withDockerRegistry([credentialsId: '794cbfdd-e4cf-4e22-aba3-dfdf10050e98', url: '']) {
                        sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_HUB_REPO}:${DOCKER_TAG}"
                        sh "docker push ${DOCKER_HUB_REPO}:${DOCKER_TAG}"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh "docker run -d -p 3001:3000 ${DOCKER_HUB_REPO}:${DOCKER_TAG}"
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up Docker images...'
            sh "docker image rm -f ${DOCKER_IMAGE}:${DOCKER_TAG} || true"
        }
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Build or deployment failed.'
        }
    }
}
