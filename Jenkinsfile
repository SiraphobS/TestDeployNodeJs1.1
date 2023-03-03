import groovy.json.JsonSlurperClassic

node {
  /* Variable */
    def serviceName = "frontend-service"
    // def repoCredId = "docker-hub"
    def repoCredId = "aws-ecr"
    def sourcecodeDir = "Application"
    def prefixServiceName = "itsupporttirawat"
    def profile = ""
    def projectName = "tirawat"
    def endpointWebApp = ""
    def credentialProfile = ""
    
    switch(env.BRANCH_NAME) {
        case "master":
            // env.IMAGE_PATH = "${prefixServiceName}/${serviceName}-prod"
            env.IMAGE_PATH = "${serviceName}-prod"
            profile = "prod"
            endpointWebApp = "ubuntu@192.168.180.207"
            credentialProfile = "prod"
        break
        case "staging":
            // env.IMAGE_PATH = "${prefixServiceName}/${serviceName}-staging"
            env.IMAGE_PATH = "${serviceName}-staging"
            profile = "staging"
            endpointWebApp = "ubuntu@192.168.180.65"
            credentialProfile = "dev"
        break
        case "dev":
            // env.IMAGE_PATH = "${prefixServiceName}/${serviceName}-dev"
            env.IMAGE_PATH = "${serviceName}-dev"
            profile = "dev"
            endpointWebApp = "ubuntu@192.168.180.65"
            credentialProfile = "dev"
        break
    }  

    //env.DOCKER_REGISTRY = "index.docker.io"
    env.DOCKER_REGISTRY = "957383305801.dkr.ecr.ap-southeast-1.amazonaws.com"
    // env.IMAGE_PATH = "tirawatgroup-website/${serviceName}-${profile}"
    env.IMAGE_NAME = "${serviceName}-${profile}"
    env.TAG_PREFIX = "${profile}"

  /* Variable */

    stage('Clone repository') {
        dir("${sourcecodeDir}"){
            checkout scm
            sh 'git rev-parse HEAD > commitSha1'
            def commit = readFile('commitSha1').trim()
            sh 'rm commitSha1'
            env.COMMITSHA = commit.substring(0, 11)
            echo "${env.COMMITSHA}"
        }
    } /* 'Clone repository' */

    stage('Build & Push Docker image') {
        dir("${sourcecodeDir}"){
            switch(env.BRANCH_NAME) {
                case "master":
                    echo "Production not have to buid anymore"
                break
                case ["staging","dev"]:
                    echo "Start building"
                    def dockerfile = "./Dockerfile"
                    sh "sed -i \'s/npm run build:x/npm run build${profile}/g\' ./Dockerfile"
                    docker.withRegistry("https://${env.DOCKER_REGISTRY}", "	ecr:ap-southeast-1:${repoCredId}") {
                        def img = docker.build("${env.IMAGE_PATH}:${env.TAG_PREFIX}-${env.COMMITSHA}", "-f ${dockerfile} .")
                        img.push('latest')
                    }
                    // docker.withRegistry("", "${repoCredId}") {
                    //     def img = docker.build("${env.IMAGE_PATH}:${env.TAG_PREFIX}-${env.COMMITSHA}", "-f ${dockerfile} .")
                    //     // img.push()
                    //     img.push('latest')
                    // }
                    echo "Removing docker image ${env.IMAGE_PATH}:${env.TAG_PREFIX}-${env.COMMITSHA}"
                    sh "docker rmi ${env.IMAGE_PATH}:${env.TAG_PREFIX}-${env.COMMITSHA}"
                    echo "Removing docker image ${env.IMAGE_PATH}:latest"
                    sh "docker rmi ${env.DOCKER_REGISTRY}/${env.IMAGE_PATH}:latest"
                break
            }
        }
    }
    /* Build docker image & push to nexus */

    stage('Deploy') {
      dir("${sourcecodeDir}"){
            echo "Start deploy image"
            sh "ls -al"
            echo "use credentials webapp_${credentialProfile}"
            sshagent(credentials: ["webapp_${credentialProfile}"]){
                // sh "ssh -o StrictHostKeyChecking=no ${endpointWebApp} ls -al" --- this line use only fix error "Host key verification failed."
                sh "ssh ${endpointWebApp} rm -rf /home/ubuntu/dist-frontend/"
                sh "ssh ${endpointWebApp} mkdir /home/ubuntu/dist-frontend/"
                sh "scp deploy.sh ${endpointWebApp}:/home/ubuntu/dist-frontend/"
                sh "ssh ${endpointWebApp} chmod +x /home/ubuntu/dist-frontend/deploy.sh"
                sh "ssh ${endpointWebApp} sudo /home/ubuntu/dist-frontend/deploy.sh ${serviceName}-${profile} ${env.DOCKER_REGISTRY}/${env.IMAGE_PATH}"
            }

            //----- if branch staging have to build for production
            //----- due to when ready for production
            //----- would not build docker image again
            if(env.BRANCH_NAME == "staging") {
                env.IMAGE_PATH = "${serviceName}-prod"
                env.TAG_PREFIX = "prod"
                echo "Start building for production"
                def dockerfile = "./Dockerfile"
                sh "sed -i \'s/npm run build:x/npm run buildprod/g\' ./Dockerfile"
                docker.withRegistry("https://${env.DOCKER_REGISTRY}", "	ecr:ap-southeast-1:${repoCredId}") {
                    def img = docker.build("${env.IMAGE_PATH}:${env.TAG_PREFIX}-${env.COMMITSHA}", "-f ${dockerfile} .")
                    img.push('latest')
                }
                // docker.withRegistry("", "${repoCredId}") {
                //     def img = docker.build("${env.IMAGE_PATH}:${env.TAG_PREFIX}-${env.COMMITSHA}", "-f ${dockerfile} .")
                //     // img.push()
                //     img.push('latest')
                // }
                echo "Removing docker image ${env.IMAGE_PATH}:${env.TAG_PREFIX}-${env.COMMITSHA}"
                sh "docker rmi ${env.IMAGE_PATH}:${env.TAG_PREFIX}-${env.COMMITSHA}"
                echo "Removing docker image ${env.IMAGE_PATH}:latest"
                sh "docker rmi ${env.DOCKER_REGISTRY}/${env.IMAGE_PATH}:latest"
            }
        }
    } /* stage deploy */

    stage('Check application start') {
        dir("${sourcecodeDir}"){
            sshagent(credentials: ["webapp_${credentialProfile}"]){
                echo "Checking application start"
                sh "ssh ${endpointWebApp} sudo docker ps | grep ${env.DOCKER_REGISTRY}/${env.IMAGE_PATH} > dockerResponse"
                def response = readFile('dockerResponse').trim()
                echo "${response}"
                sh 'rm dockerResponse'
                echo "check result: ${response.contains(env.DOCKER_REGISTRY+'/'+env.IMAGE_PATH)}"
                if(!response.contains(env.DOCKER_REGISTRY+'/'+env.IMAGE_PATH)) {
                    error "Application not running"
                }
            }
        }
    } 
    
} /* node */
