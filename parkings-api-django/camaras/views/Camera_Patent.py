from rest_framework import status
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.response import Response
from ..models.Camera_Patent import Camera_Patent
from ..serializers import CameraPatentSerializer
from parkings.models import *
from django.utils import timezone

class CameraPatentView():

    @api_view(['GET', 'POST', 'PUT'])
    def camaras_list(request):
        if request.method == 'GET':
            camaras = Camera_Patent.objects.all()
            serializer = CameraPatentSerializer(camaras, many=True)
            return JsonResponse(serializer.data, safe=False)

        elif request.method == 'POST' and not 'camerapatent' in request.data:
            serializer = CameraPatentSerializer(data=request.data)
            if serializer.is_valid():
                #print("*************************************************************************************")
                Audits(None, request.user, timezone.now(), "ABM Camera-Patent", "POST", request.data).save()
                #print("*************************************************************************************")
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'POST' and 'camerapatent' in request.data:
            data = request.data['camerapatent']
            responseData = []
            for camara in data:
                serializer = CameraPatentSerializer(data=camara)
                if serializer.is_valid():
                    serializer.save()
                    responseData.append(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response(responseData, status=status.HTTP_201_CREATED)

        elif request.method == 'PUT' and 'camerapatent' in request.data:
            data = request.data['camerapatent']
            responseData = []
            for camara in data:
                try:
                    camaraOld = Camera_Patent.objects.get(pk=int(camara['id']))
                except Camera_Patent.DoesNotExist:
                    return Response(status=status.HTTP_404_NOT_FOUND)
                serializer = CameraPatentSerializer(camaraOld, data=camara)
                if serializer.is_valid():
                    serializer.save()
                    responseData.append(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(responseData, status=status.HTTP_201_CREATED)

    @api_view(['GET', 'PUT', 'DELETE'])
    def camara_detail(request, pk):
        try:
            camara = Camera_Patent.objects.get(pk=pk)
        except Camera_Patent.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if request.method == 'GET':
            serializer = CameraPatentSerializer(camara)
            return Response(serializer.data)

        elif request.method == 'PUT':
            serializer = CameraPatentSerializer(camara, data=request.data)
            if serializer.is_valid():
                #print("*************************************************************************************")
                Audits(None, request.user, timezone.now(), "ABM Camera-Patent", "PUT", request.data).save()
                #print("*************************************************************************************")
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            #print("*************************************************************************************")
            Audits(None, request.user, timezone.now(), "ABM Camera-Patent", "DELETE", "Se elimino la camara-patente con id: "+str(pk)).save()
            #print("*************************************************************************************")
            camara.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
