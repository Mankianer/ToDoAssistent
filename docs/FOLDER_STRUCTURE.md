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
│   └───.gitignore  //module-custom .gitignore
├───auth-jwt-service/                   (module)  
├───todo-service/                       (module)
├───.....                          
├───...                          
│   
├───Dockerfile  //Master Image Build
├───docker-compose.yml  //start up      (START)
└───    
```
