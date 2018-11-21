class MapsServicesSerializer(serializers.ModelSerializer):
    driver_path = serializers.SerializerMethodField()
    service_descr = ServiceNamingSerializer(required=False)
    assign_to = MapCustomerSerializer(read_only=True)
    will_be_evaluated_by = MapDriverSerializer(read_only=True)

    def get_driver_path(self, obj):
        return {
                    "start_point": (obj.lat, obj.lng),
                    "end_point": (obj.will_be_evaluated_by.lat, obj.will_be_evaluated_by.lng),
                    "lat": obj.lat,
                    "lng": obj.lng,
                    "address": obj.address
                }

    class Meta:
        model = Services
        fields = ('id', 'driver_path', 'service_descr', 'assign_to', 'will_be_evaluated_by', 'lat', 'lng')
        depth = 1
        read_only_fields = ('id',)
