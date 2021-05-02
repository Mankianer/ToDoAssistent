# ToDoAssistent

_currently only german version available_

Ziel:  
Anwendung zum Verwalten von ToDos in Sync mit einem Kalender, wie z.B. GoogleKalender.  
GUI: Web-Interface  
Module-Communication: via Network  
Dockerized

Review-System für erledigte/ verschobene Task  
Tages Routinen mit Benachrichtigungen, Auswahl von Todos, AufgabenReflexion, TagesInfos, etc    

## Build/ Deployment
In der [docker-compose.yml](docker-compose.yml) wird ein Master Image gebaut.
Dieses beinhaltet alle Services.

## setUp Projekt Struktur
führe project_setUp.bat oder project_setUp.sh aus. 

Startbefehl:  
```
docker-compose up
```

## Configuration
Die Konfiguration läuft über Umgebungsvariablen.  
Im Folgenden sind die Umgebungsvariablen global und pro Modul aufgeführt.  

### global
_verfügbar in libs Modulen_  
**libs/express-utils**
````
ENV SSH_KEY_PUBLIC_PATH= default: dev/default-sshkey.pub //JWT-Public Key (currently unsed)
ENV SSH_KEY_PRIVATE_PATH= default: dev/default-sshkey //JWT-Private Key
ENV JWT_EXPIRESIN= default: 10m //JWT-Expire In Time
ENV JWT_ALGORITHMS= default: HS256 //JWT Algorithmus (currently only HS256 works)
````

### Todo-Service
````
ENV PORT= default: 3000 //Port
ENV MONGODB_URL= default: mongodb://admin:admin@localhost:27017/?authMechanism=SCRAM-SHA-1&authSource=admin&useUnifiedTopology=true //MongoDB Connection Url
ENV MONGODB_DB= default: todos //MongoDB Database for Collections
ENV MONGODB_COLLECTION= default: todos //MongoDB Collection for todos
````

### Auth-JWT-Service
````
ENV PORT= default: 3001 //Port
ENV USER_FILE= default: dev/users.json //Path to a .Json-file for login
````

### Planing-Service
````
ENV PORT= default: 3003 //Port
````
