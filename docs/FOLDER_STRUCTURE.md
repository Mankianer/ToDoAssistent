# Project-Structure

```
ToDoAssistent                           (root-project-folder)  
│ 
├───docs/                               (project-documentation)  
│ 
├───libs/                               (project-libraries)  
│   └───<lib-name>                      (project-library)
│ 
├───<module-name>/                      (module)  
│   ├───Dockerfile  //Stand-Alone-Container
│   └───.gitignore  //module-custom .gitignore
├───auth-jwt-service/                   (module)  
├───todo-service/                       (module)
│   
├───docker-compose.yml  //start up      (START)
└───    
```
