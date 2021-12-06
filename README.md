# Todo list usando reactjs y python

## Mi primer proyecto en react 🚀🚀

Todo list usando una api hecha en python, MongoDB para la base de datos y react para el frontend

para correr la aplicacion primero crea una carpeta llamada data y adentro una llamada db
Inicia el servidor de mongo usando

```
mongod --dbpath ./data/db
```

Despues instala las dependencias de Node

```
npm install
```

despues inicia el servidor de react

```
npm start
```

Despues instala los paquetes necesarios para la api

```
pip install fastapi pymongo dnspython uvicorn
```

o si estas en linux

```
pip3 install fastapi pymongo dnspython uvicorn
```

(uvicorn es el servidor para correr el backend, se pueden usar otros...)

entra a la carpeta api y corre el backend usando

```
uvicorn main:app
```
