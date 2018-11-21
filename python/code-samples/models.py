class Company(models.Model):
    picture = models.ImageField(upload_to=IMAGE_PATH, blank=True)
    naming = models.CharField('naming', max_length=100, default="")

    def __str__(self):
        return self.naming


class ServicesNaming(models.Model):
    naming = models.CharField('naming', max_length=100, unique=False)
    description = models.CharField('description', max_length=300)
    cost = models.DecimalField('cost', max_digits=5, decimal_places=2, default=0)
    picture = models.ImageField(upload_to=IMAGE_PATH, blank=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.naming

class DriverUser(OurUser):
    STATUSES = (
        ('Active', 'Active'),
        ('Pending', 'Pending'),
        ('Inactive', 'Inactive'),
    )

    TYPES = (
        ('driving', 'driving'),
        ('walking', 'walking'),
        ('bicycling', 'bicycling')
    )
    phone_number = models.CharField('phone_number', max_length=100, default="")
    vehicle_model = models.CharField('vehicle_model', max_length=100, default="")
    vehicle_number = models.CharField('vehicle_number', max_length=100, default="")
    transport_mode = models.CharField(max_length=12, choices=TYPES, default='driving')
    status = models.CharField(max_length=10, choices=STATUSES, default='Active')
    available_services = models.ManyToManyField(ServicesNaming)
    lat = models.DecimalField('lat', max_digits=27, decimal_places=25, default=0)
    lng = models.DecimalField('lng', max_digits=27, decimal_places=25, default=0)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True)
    address = models.CharField('address', max_length=1300, default="")

    def __str__(self):
        return self.email

    def get_driver_address(self):
        google_maps = GoogleMaps()
        return google_maps.convert_point_to_geo((self.lat, self.lng))

    def save(self, *args, **kwargs):
        self.address = self.get_driver_address()
        super().save(*args, **kwargs)