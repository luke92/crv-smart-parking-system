# parking-cubes

Proyecto para crear los reportes de Cubo del sistema e incrustarlos en sitios web (Como React FrontEnd)

# Cloud Metabase
- https://crv-metabase.herokuapp.com/
- Usuario: admin@parking.com
- Clave: Admin2020

# Cloud MySQL para tomar los datos
- Base de datos: u633776427_parking_system
- Usuario: u633776427_parking_system
- Clave: Parking2020
- Ip: 212.107.19.2 o sql234.main-hosting.eu

# Requisitos
- JRE o JDK 8
- Metabase v0.37.2
- Docker (Opcional)
- Base de datos tipo MySQL para guardar la config de Metabase (Opcional)

## Descargar Metabase (Puede usarse Docker o Java)
- https://www.metabase.com/start/oss/
- https://downloads.metabase.com/v0.37.2/metabase.jar 

## Iniciar Metabase
- https://www.metabase.com/docs/v0.37.2/operations-guide/running-the-metabase-jar-file.html 
- https://www.metabase.com/docs/latest/operations-guide/customizing-jetty-webserver.html

### Iniciar Metabase en Windows en distinto puerto
- SET MB_JETTY_PORT=12345
- java -jar metabase.jar

### Iniciar Metabase en LINUX / MAC en distinto puerto
- export MB_JETTY_PORT=12345
- java -jar metabase.jar

## Credenciales
- Nombre y Apellido: Admin Parking
- Usuario: admin@parking.com
- Clave: Admin2020
- Equipo: CRV Smart Parking System

## Configurar Metabase
- https://www.metabase.com/docs/v0.37.2/setting-up-metabase.html 
- Elegir tipo de base de datos: SQLite
- Nombre: CRV Smart Parking System
- Filename: Colocar ruta completa de donde esta la base de datos (Lo ideal seria colocar metabase en la misma carpeta que este situado db.sqlite3 para colocar solamente el nombre de archivo)

## Guias
- https://www.metabase.com/docs/v0.37.2/getting-started.html
- https://www.metabase.com/docs/v0.37.2/administration-guide/start.html 

## Incrustrar reportes en otras aplicaciones
- https://github.com/metabase/embedding-reference-apps 
- http://localhost:12345/admin/settings/embedding_in_other_applications
- https://crv-metabase.herokuapp.com/admin/settings/embedding_in_other_applications
- http://localhost:12345/admin/settings/public_sharing
- https://crv-metabase.herokuapp.com/admin/settings/public_sharing

## Exportar reportes (incluido con parametros)
- https://www.metabase.com/docs/latest/users-guide/13-sql-parameters.html
- https://www.metabase.com/docs/latest/administration-guide/12-public-links.html
- https://www.metabase.com/docs/latest/administration-guide/13-embedding.html
- https://www.metabase.com/docs/latest/enterprise-guide/full-app-embedding.html

## Dashboards o Cuadros de mando
- https://crv-metabase.herokuapp.com/collection/root?type=dashboard

## Ejemplo de reporte exportado
- 1) Ir a https://crv-metabase.herokuapp.com/dashboard/2
- 2) Click en Compartiendo y Incrustando
- 3) Copiamos el enlace publico. Ejemplo: http://crv-metabase.herokuapp.com/public/dashboard/c7b5d502-f92e-4b65-968f-ce7ecdc92579

### Customizacion del enlace publico
* Se debe colocar un # al final de la url y luego los parametros (Los parametros se concatenan igual que un querystring o sea bordered=false&titled=false
* Sin borde bordered=false : https://crv-metabase.herokuapp.com/public/dashboard/c7b5d502-f92e-4b65-968f-ce7ecdc92579#bordered=false
* Sin titulo titled=false : https://crv-metabase.herokuapp.com/public/dashboard/c7b5d502-f92e-4b65-968f-ce7ecdc92579#titled=false
* Oscuro theme=night : https://crv-metabase.herokuapp.com/public/dashboard/c7b5d502-f92e-4b65-968f-ce7ecdc92579#theme=night

## Reiniciar contraseña (No olvidar el correo que colocamos del usuario al registrarlo)
- https://www.metabase.com/docs/latest/faq/using-metabase/how-do-i-reset-my-password.html 
- java -jar metabase.jar reset-password email@example.com (Devuelve un token)
- http://localhost:12345/auth/reset_password/:token (":token" es lo que nos devolvio en el comando anterior)

## Manejo de Usuarios
- https://www.metabase.com/docs/latest/administration-guide/04-managing-users.html

## Como usar la base de datos SQLITE de la API DJANGO entre usuarios windows y linux
- Colocar el jar de Metabase sobre la misma carpeta que este situado db.sqlite3
- RECOMENDACION: Tener una base de datos tipo replica a donde consultar los datos