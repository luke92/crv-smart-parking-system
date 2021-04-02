# CRV Smart Parking System - Streaming SERVER

# Requisitos
- Servidor Nginx que contenga el modulo RTMP (Por ejemplo Nginx 1.7.11.3 Gryphon)
- Emisor de fuente de video (Video mp4, retransmision, webcam, imagenes) por ejemplo ffmpeg
- Instalar ambos con las variables de entorno de windows

# Documentacion

## NGINX
- https://nginx.org/en/docs/
- https://docs.nginx.com/nginx/admin-guide/dynamic-modules/rtmp/

## FFMPEG
- https://ffmpeg.org/documentation.html
- https://news.mistserver.org/news/71/An+introduction+to+encoding+and+pushing+with+ffmpeg

# Instalar Requisitos

## Nginx 1.7.11.3 Gryphon

### Windows

- http://nginx-win.ecsds.eu/download/nginx%201.7.11.3%20Gryphon.zip
- O copiar la carpeta nginx-1.7.11.3-Gryphon a C:\ (C:\nginx-1.7.11.3-Gryphon)
- Asociar la carpeta con la variable de entorno PATH
- Crear una variable de entorno nueva llamada NGINX_HOME asociada con la carpeta mencionada
- Crear carpeta hls dentro de nginx (Si no existiese)

### Linux / MACOS

## Configuracion de NGINX -> %NGINX_HOME%/conf/nginx.conf 
En el repositorio esta configurado
- RTMP en el puerto 1935
- HTTP de NGINX en 8080
- Dentro de RTMP podemos tener varios applications para poder realizar streaming. En este se tiene solo el application live, al cual apuntaremos luego.
- Carpeta donde se guarda el contenido del RTMP para el application live esta en %NGINX_HOME%/hls -> hls_path(Es decir se debe crear una capeta llamada hls
- Carpeta del index del servidor HTTP -> location (esta en / )
- Root de la aplicacion
- En windows debe colocarse la ruta con \\

## FFMPEG
- HomePage https://ffmpeg.org/download.html
- Linux https://ffmpeg.org/download.html#build-linux
- MAC https://evermeet.cx/ffmpeg/ 
- Windows https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-full.7z
- Luego extraer la carpeta en alguna ubicación del disco (Ejemplo C:\ffmpeg)
- Asociar la carpeta bin con la variable de entorno PATH (Es decir C:\ffmpeg\bin)
- Tutorial: https://www.youtube.com/watch?v=DCJWJbRIiVA
- Tutorial2: http://4youngpadawans.com/stream-camera-video-and-audio-with-ffmpeg/

# Iniciar Servidor
- Abrir Nginx

# Emitir Fuente de Video
- Aqui es donde indicaremos a que servidor de NGINX apuntaremos, que aplicacion, y que nombre tendra el recurso de video.
- Ejemplo: rtmp://localhost:1935/live/test donde rtmp es el protocolo, localhost:1935 el ip y puerto del server, live la aplicacion, y test el nombre del recurso de video que estamos creando.

## Hostear archivo de video con ffmpeg
- ffmpeg -re -stream_loop -1 -i cam2.mp4 -c copy -crf 0 -max_muxing_queue_size 9999 -f flv rtmp://localhost:1935/live/test
- Esto hace que luego en NGINX en la carpeta hls aparezca un archivo nuevo llamado test.m3u8 que es el que necesitamos para invocarlo por http

# Emitir fuente de video desde Webcam

## Emitir webcam desde ffmpeg
- https://johnathan.org/attempting-to-stream-a-webcam-to-an-rtmp-server/
- ffmpeg -f dshow -i video="Integrated Camera" -framerate 1 -video_size 720x404 -vcodec libx264 -maxrate 768k -bufsize 8080k -vf "format=yuv420p" -g 60 -f flv rtmp://localhost:1935/live/webcam

# Visualizacion del Streaming

## VLC

### RTMP

- Medio -> Abrir Ubicación de red -> rtmp://localhost:1935/live/test
- O ejecutar "vlc rtmp://localhost:1935/live/test"

### HTTP

- Se debe stremear primero a RTMP para poder obtenerlo. Recordar que el nombre final es dado por el nombre colocado anteriormente. El recurso siempre termina con la extension .m3u8
- Medio -> Abrir Ubicación de red -> http://localhost:8080/hls/test.m3u8
- O ejecutar "vlc http://localhost:8080/hls/test.m3u8"

## HTML

- Abrir el archivo test.html
- El mismo tiene una libreria llamada hls.js que es la que permite obtener el video desde un archivo .m3u8

# Iniciar server automaticamente con los 2 videos que necesitamos
- Correr nginx desde la carpeta donde esta instalado
- Correr start-streaming-nginx-rtmp.bat

# Detener Servidor de NGINX
- Correr nginx-stop.bat o
- nginx -s stop

