makelink() {
  cd $1/src/
  ln -s -r ../../libs/
  cd ../../
}

makelink todo-service
makelink auth-jwt-service
