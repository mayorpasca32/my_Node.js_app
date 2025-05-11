pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "myapp"
        DOCKER_TAG = "latest"
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/your-repo/your-app.git'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t $DOCKER_IMAGE:$DOCKER_TAG ."
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    sh "docker run --rm $DOCKER_IMAGE:$DOCKER_TAG npm test"
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                withDockerRegistry([credentialsId: 'docker-hub-credentials', url: '']) {
                    sh "docker tag $DOCKER_IMAGE:$DOCKER_TAG your-dockerhub-username/$DOCKER_IMAGE:$DOCKER_TAG"
                    sh "docker push your-dockerhub-username/$DOCKER_IMAGE:$DOCKER_TAG"
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    sh "docker run -d -p 80:3000 your-dockerhub-username/$DOCKER_IMAGE:$DOCKER_TAG"
                }
            }
        }
    }
}
