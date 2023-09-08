# App To Connect

## Descripción del proyecto

Este proyecto tiene como finalidad ser complemento para una agencia telefonica, en la que se poermite poder tener un registro de usuarios, poder mostrar información relevante acerca del usuario, crear los datos necesarios como lo son un número de teléfono y una extensión, así como otras herramientas especificas para poder tener una mejor visualización de los usuarios de acuerdo al rol que tengan.
La aplicación esta construida con Node.js, Express y utiliza como base de datos MongoDB.

## Características principales:

1. Registrar usuarios y tener un rol(Jr, Sr, Supervisor).
2. Loguearse con un usuario.
3. Desde el momento en el que se registra un usuario se crea un no. teléfono y una extensión.
4. Tener una vista y herramientas personalizadas para el supervisor.
5. Cada usuario puede atualizar su información.

## Tecnologías utilizadas:

1. Express: Un framework minimalista de Node.js que facilita la creación de aplicaciones web y APIs.
2. Express-rate-limit: Middleware de Express que limita la cantidad de solicitudes que un cliente puede hacer en un período de tiempo especificado.
3. Helmet: Es un middleware que provee encabezados extra de seguridad, los cuales pueden configurarse.
4. MongoDB: Es un sistema de base de datos NoSQL, orientado a documentos y de código abierto.
5. Mongoose: Es una librería para Node.js que nos permite escribir consultas para una base de datos de MongooDB, con características como validaciones, construcción de queries, middlewares, conversión de tipos y algunas otras, que enriquecen la funcionalidad de la base de datos.
6. Firebase: Una plataforma de desarrollo de aplicaciones móviles y web que proporciona herramientas para crear, mejorar y hacer crecer aplicaciones.
7. Jsonwebtokens: JWT (JSON Web Token) es un estándar qué está dentro del documento RFC 7519.

## Requisitos previos para utilizar el proyecto

1. Tener node instalado en el equipo.
2. Tener MongoDB instalado.
3. Tener creada una base de datos en MongoDB.
4. Tener una instancia de firebase creada con almacenamiento en firestore.

## Como ejecutar el proyecto

1. Clonar el repositorio
2. Ejecutar npm install:

```
  npm install
```

3. Tener una base de datos en MongoDB y realizar la conexión.
4. Crearse una app de firebase e inicializar firestore en ella, NOTA: En el esquema del modelo utilizar una URL de una imagen base para el valor por default del campo "profileImgUrl".
5. Clonar el .env.template y renombrarlo a .env
6. Llenar las variables de entorno
7. Levantar el modo de desarrollo utilizando el comando:

```
  npm run start:dev
```

## _Esta aplicación ha sido creada por Jesús Pichardo._
