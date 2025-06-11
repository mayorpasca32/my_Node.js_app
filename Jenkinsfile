pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "myapp"
        DOCKER_TAG = "latest"
        DOCKER_HUB_REPO = "mayorpasca32/${DOCKER_IMAGE}"
    }

    stages {
        stage('Cleanup Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/mayorpasca32/my_Node.js_app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image..."
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    echo "Running tests inside container..."
                    sh "docker run --rm ${DOCKER_IMAGE}:${DOCKER_TAG} npm test"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    withDockerRegistry([credentialsId: '794cbfdd-e4cf-4e22-aba3-dfdf10050e98', url: '']) {
                        echo "Tagging and pushing Docker image to Docker Hub..."
                        sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_HUB_REPO}:${DOCKER_TAG}"
                        sh "docker push ${DOCKER_HUB_REPO}:${DOCKER_TAG}"
                    }
                }
            }
        }

        stage('Deploy Container Locally') {
            steps {
                script {
                    echo "Stopping any existing container..."
                    sh "docker rm -f myapp-container || true"

                    echo "Starting new container on port 3001..."
                    sh "docker run -d --name myapp-container -p 3001:3000 ${DOCKER_HUB_REPO}:${DOCKER_TAG}"
                }
            }
        }

        stage('Expose via Ngrok') {
            steps {
                script {
                    echo "Starting ngrok tunnel..."
                    sh "nohup ngrok http 3001 > ngrok.log 2>&1 &"
                    sleep(time: 5, unit: 'SECONDS')
                    echo "Ngrok started. Check ngrok.log for public URL."
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up dangling Docker images (if any)...'
            sh "docker image rm -f ${DOCKER_IMAGE}:${DOCKER_TAG} || true"
        }
        success {
            echo '✅ Deployment completed successfully!'
        }
        failure {
            echo '❌ Build, test, or deployment failed.'
        }
    }
}
