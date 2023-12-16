class CONFIG {
    constructor() {}
    taskConfig() {
      return {
        url: "http://localhost:3000",
        path: {
          taskpath: "/api/tasks",
        },
      };
    }
    usersConfig(){
      return{
        url:'http://localhost:3000',
        path:{
          getAllUsers:'/api/users',
          userSignUp:'/api/users/signup',
          userSignIn:'/api/users/signin',
          getUserById:'/api/users/',
          deleteUser:'/api/users/',
          getUserTaskList:'/api/users/usertasklist/'
        }
      }
    }
  }
  const configService = new CONFIG();
  export { configService };
  