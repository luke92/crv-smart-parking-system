from rest_framework import status
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.response import Response
from ..models.Parkings import Parkings
from ..serializers import ParkingsSerializer
from ..models.Audits import Audits
from django.utils import timezone

class ParkingsView():

    @api_view(['GET', 'POST', 'PUT'])
    def parkings_list(request):
        if request.method == 'GET':
            parkings = Parkings.objects.all()
            serializer = ParkingsSerializer(parkings, many=True)
            return JsonResponse(serializer.data, safe=False)

        elif request.method == 'POST' and not 'parkings' in request.data:
            try:
                replica = Parkings(tl_x=request.data['tl_x'],tl_y=request.data['tl_y'],br_x=request.data['br_x'], br_y=request.data['br_y'], isOccupied=request.data['isOccupied'],patent=request.data['patent'],cameraId=request.data['cameraId'])
                replica.save(using='replica')
            except Exception as e:
                print(e)
            serializer = ParkingsSerializer(data=request.data)
            if serializer.is_valid():
                #print("*************************************************************************************")
                Audits(None, request.user, timezone.now(), "Configure Parkings", "POST", request.data).save()
                #print("*************************************************************************************")
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'POST' and 'parkings' in request.data:
            data = request.data['parkings']
            responseData = []
            for parking in data:
                try:
                    replica = Parkings(tl_x=parking['tl_x'],tl_y=parking['tl_y'],br_x=parking['br_x'], br_y=parking['br_y'], isOccupied=parking['isOccupied'],patent=parking['patent'],cameraId=parking['cameraId'])
                    replica.save(using='replica')
                except Exception as e:
                    print(e)
                serializer = ParkingsSerializer(data=parking)
                if serializer.is_valid():
                    serializer.save()
                    responseData.append(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(responseData, status=status.HTTP_201_CREATED)

        elif request.method == 'PUT' and 'parkings' in request.data:
            data = request.data['parkings']
            responseData = []
            for parking in data:
                try:
                    parkingOld = Parkings.objects.get(pk=int(parking['id']))
                except Parkings.DoesNotExist:
                    return Response(status=status.HTTP_404_NOT_FOUND)
                try:
                    replica = Parkings(tl_x=parking['tl_x'],tl_y=parking['tl_y'],br_x=parking['br_x'], br_y=parking['br_y'], isOccupied=parking['isOccupied'],patent=parking['patent'],cameraId=parking['cameraId'])
                    replica.save(using='replica')
                except Exception as e:
                    print(e)
                serializer = ParkingsSerializer(parkingOld, data=parking)
                if serializer.is_valid():
                    serializer.save()
                    responseData.append(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(responseData, status=status.HTTP_201_CREATED)

    @api_view(['GET', 'PUT', 'DELETE'])
    def parking_detail(request, pk):
        try:
            parking = Parkings.objects.get(pk=pk)
        except Parkings.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if request.method == 'GET':
            serializer = ParkingsSerializer(parking)
            return Response(serializer.data)

        elif request.method == 'PUT':
            try:
                replica = Parkings(tl_x=request.data['tl_x'],tl_y=request.data['tl_y'],br_x=request.data['br_x'], br_y=request.data['br_y'], isOccupied=request.data['isOccupied'],patent=request.data['patent'],cameraId=request.data['cameraId'])
                replica.save(using='replica')
            except Exception as e:
                print(e)
            serializer = ParkingsSerializer(parking, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':     
            #print("*************************************************************************************")
            Audits(None, request.user, timezone.now(), "Configure Parkings", "DELETE", "Se elimino el park con id: "+str(pk)).save()
            #print("*************************************************************************************")
            parking.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
