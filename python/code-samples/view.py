class ActiveServices(viewsets.ModelViewSet):
    """
    Get only active customer's services
    """

    queryset = Services.objects.all()
    serializer_class = CutterServicesSerializer
    permission_classes = (IsAuthenticated, CustomerAccessPermission)

    def get_object(self):
        return self.request.user.customeruser

    def list(self, request, *args, **kwargs):
        customer_instance = self.get_object()
        service_data = CutterServicesSerializer(Services.objects.filter(assign_to=customer_instance, status='Active'),
                                                many=True)
        return Response(service_data.data, status=status.HTTP_200_OK)


class CompanyServicesDetail(viewsets.ModelViewSet):
    """
    Get company details by ID
    """

    queryset = Company.objects.all()
    serializer_class = CompanyWithServicesSerializer

    def retrieve(self, request, pk=None):
        try:
            company = Company.objects.get(id=pk)
        except Company.DoesNotExist:
            return Response({"error": "Incorrect id"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            company_data = CompanyWithServicesSerializer(company)
            return Response(company_data.data, status=status.HTTP_200_OK)

class ChangeHeadquarterViewSet(GenericViewSet, mixins.UpdateModelMixin):
    """
    Update headquarter office of company
    """
    queryset = Company.objects.all()
    serializer_class = CompanyWithHeadquarterSerializer
    lookup_field = 'name'

    def partial_update(self, request, *args, **kwargs):
        name = self.kwargs['name']
        try:
            company = Company.objects.get(name=name)
            current_head = company.offices.get(is_headquarter=True)
            new_head = Office.objects.get(id=request.data['new_head_id'])
            current_head.is_headquarter = False
            new_head.is_headquarter = True
            current_head.save()
            new_head.save()
            return super().partial_update(request, args, kwargs)
        except (Company.DoesNotExist, Office.DoesNotExist):
            return NotFound("Company or offices does not exists")