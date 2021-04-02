:: Iniciamos el servidor de streaming
:: Correr el servidor de streaming de NGINX previamente desde la carpeta donde esta instalado.

:: Enviamos al servidor de streaming las fuentes de video y rutas por donde se podrá visualizar
start ffmpeg -re -stream_loop -1 -i cam0.mp4 -c copy -crf 20 -max_muxing_queue_size 9999 -f flv rtmp://localhost:1935/live/camara0
start ffmpeg -re -stream_loop -1 -i cam1.mp4 -c copy -crf 20 -max_muxing_queue_size 9999 -f flv rtmp://localhost:1935/live/camara1
start ffmpeg -re -stream_loop -1 -i cam2.mp4 -c copy -crf 20 -max_muxing_queue_size 9999 -f flv rtmp://localhost:1935/live/camara2
:: streaming de camara real
:: start ffmpeg -re -stream_loop -1 -i http://140.138.178.29:8090/?action=stream -vcodec libx264 -crf 20 -max_muxing_queue_size 9999 -f flv rtmp://localhost:1935/live/camara3