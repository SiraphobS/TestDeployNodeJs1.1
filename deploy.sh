sudo aws ecr get-login-password --region ap-southeast-1 | sudo docker login --username AWS --password-stdin 957383305801.dkr.ecr.ap-southeast-1.amazonaws.com
sudo docker stop $1
sudo docker rm $1
sudo docker rmi $2
sudo docker pull $2
sudo docker run -d -p 81:81 --name $1 $2