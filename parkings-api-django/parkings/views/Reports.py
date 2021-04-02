from rest_framework import status
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.response import Response
from ..models.Reports import Reports
from ..serializers import ReportsSerializer
from parkings.models import Audits
from django.utils import timezone
import json

class ReportsView():

    @api_view(['GET', 'POST', 'PUT'])
    def reports_list(request):
        if request.method == 'GET':
            reports = Reports.objects.all()
            serializer = ReportsSerializer(reports, many=True)
            return JsonResponse(serializer.data, safe=False)

        elif request.method == 'POST' and not 'Reports' in request.data:
            try:
                replica = Reports(name=request.data['name'],description=request.data['description'],url=request.data['url'], active=request.data['active'])
                replica.save(using='replica')
            except Exception as e:
                print(e)
            serializer = ReportsSerializer(data=request.data)
            if serializer.is_valid():
                #print("*************************************************************************************")
                Audits(None, request.user, timezone.now(), "ABM Reportes", "POST", request.data).save()
                #print("*************************************************************************************")
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'POST' and 'Reports' in request.data:
            data = request.data['Reports']
            responseData = []
            for report in data:
                try:
                    replica = Reports(name=report['name'],description=report['description'],url=report['url'], active=report['active'])
                    replica.save(using='replica')
                except Exception as e:
                    print(e)
                serializer = ReportsSerializer(data=report)
                if serializer.is_valid():
                    serializer.save()
                    responseData.append(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response(responseData, status=status.HTTP_201_CREATED)

        elif request.method == 'PUT' and 'Reports' in request.data:
            data = request.data['Reports']
            responseData = []
            for report in data:
                try:
                    reportOld = Reports.objects.get(pk=int(report['id']))
                except Reports.DoesNotExist:
                    return Response(status=status.HTTP_404_NOT_FOUND)
                try:
                    replica = Reports(name=report['name'],description=report['description'],url=report['url'], active=report['active'])
                    replica.save(using='replica')
                except Exception as e:
                    print(e)
                serializer = ReportsSerializer(reportOld, data=report)
                if serializer.is_valid():
                    serializer.save()
                    responseData.append(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(responseData, status=status.HTTP_201_CREATED)

    @api_view(['GET', 'PUT', 'DELETE'])
    def report_detail(request, pk):
        try:
            report = Reports.objects.get(pk=pk)
        except Reports.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if request.method == 'GET':
            serializer = ReportsSerializer(report)
            return Response(serializer.data)

        elif request.method == 'PUT':
            try:
                replica = Reports(name=request.data['name'],description=request.data['description'],url=request.data['url'], active=request.data['active'])
                replica.save(using='replica')
            except Exception as e:
                print(e)
            serializer = ReportsSerializer(report, data=request.data)
            if serializer.is_valid():
                #print("*************************************************************************************")
                Audits(None, request.user, timezone.now(), "ABM Reportes", "PUT", request.data).save()
                #print("*************************************************************************************")
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            #print("*************************************************************************************")
            Audits(None, request.user, timezone.now(), "ABM Reportes", "DELETE", "Se elimino la camara con id: "+str(pk)).save()
            #print("*************************************************************************************")
            report.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
