from rest_framework import status
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.response import Response
from ..models.Registrys import Registrys
from ..serializers import RegistrysSerializer
from django.db.models import Sum
from django.db.models import Count
from django.db.models import Q

class RegistrysView():

    @api_view(['GET', 'POST', 'PUT'])
    def registrys_list(request):
        if request.method == 'GET':
            registrys = Registrys.objects.all()
            serializer = RegistrysSerializer(registrys, many=True)
            return JsonResponse(serializer.data, safe=False)

        elif request.method == 'POST' and not 'registrys' in request.data:
            try:
                registryReplica = Registrys(fecha=request.data['fecha'],idParking=request.data['idParking'],patente=request.data['patente'], tipo=request.data['tipo'], cameraId=request.data['cameraId'])
                registryReplica.save(using='replica')
            except Exception as e:
                print(e)
            serializer = RegistrysSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'POST' and 'registrys' in request.data:
            data = request.data['registrys']
            responseData = []
            for registry in data:
                try:
                    registryReplica = Registrys(fecha=registry['fecha'],idParking=registry['idParking'],patente=registry['patente'], tipo=registry['tipo'], cameraId=registry['cameraId'])
                    registryReplica.save(using='replica')
                except Exception as e:
                    print(e)
                serializer = RegistrysSerializer(data=registry)
                if serializer.is_valid():
                    serializer.save()
                    responseData.append(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response(responseData, status=status.HTTP_201_CREATED)

        elif request.method == 'PUT' and 'registrys' in request.data:
            data = request.data['registrys']
            responseData = []
            for registry in data:
                try:
                    registryReplica = Registrys(fecha=registry['fecha'],idParking=registry['idParking'],patente=registry['patente'], tipo=registry['tipo'], cameraId=registry['cameraId'])
                    registryReplica.save(using='replica')
                except Exception as e:
                    print(e)
                try:
                    registryOld = Registrys.objects.get(pk=int(registry['id']))
                except Registrys.DoesNotExist:
                    return Response(status=status.HTTP_404_NOT_FOUND)
                serializer = RegistrysSerializer(registryOld, data=registry)
                if serializer.is_valid():
                    serializer.save()
                    responseData.append(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(responseData, status=status.HTTP_201_CREATED)

    @api_view(['GET', 'PUT', 'DELETE'])
    def registry_detail(request, pk):
        try:
            registry = Registrys.objects.get(pk=pk)
        except Registrys.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if request.method == 'GET':
            serializer = RegistrysSerializer(registry)
            return Response(serializer.data)

        elif request.method == 'PUT':
            try:
                registryReplica = Registrys(fecha=request.data['fecha'],idParking=request.data['idParking'],patente=request.data['patente'], tipo=request.data['tipo'], cameraId=request.data['cameraId'])
                registryReplica.save(using='replica')
            except Exception as e:
                print(e)
            serializer = RegistrysSerializer(registry, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            registry.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

    @api_view(['GET'])
    def get_top_vehicles(request,cant):
        result = Registrys.objects.values('patente').annotate(count=Count('patente')).order_by('-count')[:cant]
        return Response(result, status=status.HTTP_200_OK)

    @api_view(['GET'])
    def get_top_parkings(request,cant):
        result = Registrys.objects.exclude(idParking__isnull=True).exclude(tipo=False).values('idParking').annotate(count=Count('idParking')).order_by('-count')[:cant]
        return Response(result, status=status.HTTP_200_OK)
