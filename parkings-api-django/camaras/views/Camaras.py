from rest_framework import status
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.response import Response
from ..models.Camaras import Camaras
from ..serializers import CamarasSerializer
from parkings.models import *
from django.utils import timezone

class CamarasView():

    @api_view(['GET', 'POST', 'PUT'])
    def camaras_list(request):
        if request.method == 'GET':
            camaras = Camaras.objects.all()
            serializer = CamarasSerializer(camaras, many=True)
            return JsonResponse(serializer.data, safe=False)

        elif request.method == 'POST' and not 'camaras' in request.data:
            serializer = CamarasSerializer(data=request.data)
            if serializer.is_valid():
                #print("*************************************************************************************")
                Audits(None, request.user, timezone.now(), "ABM Camera", "POST", request.data).save()
                #print("*************************************************************************************")
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'POST' and 'camaras' in request.data:
            data = request.data['camaras']
            responseData = []
            for camara in data:
                serializer = CamarasSerializer(data=camara)
                if serializer.is_valid():
                    serializer.save()
                    responseData.append(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response(responseData, status=status.HTTP_201_CREATED)

        elif request.method == 'PUT' and 'camaras' in request.data:
            data = request.data['camaras']
            responseData = []
            for camara in data:
                try:
                    camaraOld = Camaras.objects.get(pk=int(camara['id']))
                except Camaras.DoesNotExist:
                    return Response(status=status.HTTP_404_NOT_FOUND)
                serializer = CamarasSerializer(camaraOld, data=camara)
                if serializer.is_valid():
                    serializer.save()
                    responseData.append(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(responseData, status=status.HTTP_201_CREATED)

    @api_view(['GET', 'PUT', 'DELETE'])
    def camara_detail(request, pk):
        try:
            camara = Camaras.objects.get(pk=pk)
        except Camaras.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if request.method == 'GET':
            serializer = CamarasSerializer(camara)
            return Response(serializer.data)

        elif request.method == 'PUT':
            serializer = CamarasSerializer(camara, data=request.data)
            if serializer.is_valid():
                #print("*************************************************************************************")
                Audits(None, request.user, timezone.now(), "ABM Camera", "PUT", request.data).save()
                #print("*************************************************************************************")
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            #print("*************************************************************************************")
            Audits(None, request.user, timezone.now(), "ABM Camera", "DELETE", "Se elimino la camara con id: "+str(pk)).save()
            #print("*************************************************************************************")
            camara.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
