from rest_framework import status
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.response import Response
from ..models.Audits import Audits
from ..serializers import AuditsSerializer

class AuditsView():

    @api_view(['GET', 'POST', 'PUT'])
    def audits_list(request):
        if request.method == 'GET':
            audits = Audits.objects.all()
            serializer = AuditsSerializer(audits, many=True)
            return JsonResponse(serializer.data, safe=False)

        elif request.method == 'POST' and not 'audits' in request.data:
            serializer = AuditsSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'POST' and 'audits' in request.data:
            data = request.data['audits']
            responseData = []
            for audit in data:
                serializer = AuditsSerializer(data=audit)
                if serializer.is_valid():
                    serializer.save()
                    responseData.append(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response(responseData, status=status.HTTP_201_CREATED)

        elif request.method == 'PUT' and 'audits' in request.data:
            data = request.data['audits']
            responseData = []
            for audit in data:
                try:
                    auditOld = Audits.objects.get(pk=int(audit['id']))
                except Audits.DoesNotExist:
                    return Response(status=status.HTTP_404_NOT_FOUND)
                serializer = AuditsSerializer(auditOld, data=audit)
                if serializer.is_valid():
                    serializer.save()
                    responseData.append(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(responseData, status=status.HTTP_201_CREATED)

    @api_view(['GET', 'PUT', 'DELETE'])
    def audit_detail(request, pk):
        try:
            audit = Audits.objects.get(pk=pk)
        except Audits.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if request.method == 'GET':
            serializer = AuditsSerializer(audit)
            return Response(serializer.data)

        elif request.method == 'PUT':
            serializer = AuditsSerializer(audit, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            audit.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
