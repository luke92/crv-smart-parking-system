from rest_framework import status
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.response import Response
from ..models.Patents import Patents
from ..serializers import PatentsSerializer
from parkings.models import *
from django.utils import timezone

class PatentsView():

    @api_view(['GET', 'POST', 'PUT'])
    def patents_list(request):
        if request.method == 'GET':
            patents = Patents.objects.all()
            serializer = PatentsSerializer(patents, many=True)
            return JsonResponse(serializer.data, safe=False)

        elif request.method == 'POST' and not 'patents' in request.data:
            serializer = PatentsSerializer(data=request.data)
            if serializer.is_valid():
                #print("*************************************************************************************")
                Audits(None, request.user, timezone.now(), "ABM Patents", "POST", request.data).save()
                #print("*************************************************************************************")
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'POST' and 'patents' in request.data:
            data = request.data['patents']
            responseData = []
            for patent in data:
                serializer = PatentsSerializer(data=patent)
                if serializer.is_valid():
                    serializer.save()
                    responseData.append(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response(responseData, status=status.HTTP_201_CREATED)

        elif request.method == 'PUT' and 'patents' in request.data:
            data = request.data['patents']
            responseData = []
            for patent in data:
                try:
                    patentOld = Patents.objects.get(pk=int(patent['id']))
                except Patents.DoesNotExist:
                    return Response(status=status.HTTP_404_NOT_FOUND)
                serializer = PatentsSerializer(patentOld, data=patent)
                if serializer.is_valid():
                    serializer.save()
                    responseData.append(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(responseData, status=status.HTTP_201_CREATED)

    @api_view(['GET', 'PUT', 'DELETE'])
    def patent_detail(request, pk):
        try:
            patent = Patents.objects.get(pk=pk)
        except Patents.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if request.method == 'GET':
            serializer = PatentsSerializer(patent)
            return Response(serializer.data)

        elif request.method == 'PUT':
            serializer = PatentsSerializer(patent, data=request.data)
            if serializer.is_valid():
                #print("*************************************************************************************")
                Audits(None, request.user, timezone.now(), "ABM Patents", "PUT", request.data).save()
                #print("*************************************************************************************")
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            #print("*************************************************************************************")
            Audits(None, request.user, timezone.now(), "ABM Patents", "DELETE", "Se elimino la patente con id: "+str(pk)).save()
            #print("*************************************************************************************")
            patent.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
