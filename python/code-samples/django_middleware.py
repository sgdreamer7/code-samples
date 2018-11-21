class PushNotificationsMiddleware:
    """
    Middleware that generate push notifications based on URL paths and send notifications to mobile phones.
    """
    
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        notification_text = ""
        if request.method == 'POST' and request.path == '/customer_orders/':
            notification_body = {"customer": response.data['assign_to']['name'],
                                 "driver": response.data['will_be_evaluated_by']['name']}

            notification_text = "Order for {} will be evaluated by {}".format(notification_body['customer'], notification_body['driver'])

        elif request.method == 'PATCH':
            if request.path == '/driver/':
                notification_body = {"name": response.data['name'], "status": response.data['status']}
                notification_text = "Change  order {} status to {}".format(request.user.driveruser.get_driver_address(), notification_body['status'])

            elif request.path.startswith('/customer_order'):
                if response.data.get('address', ''):
                    notification_body = {"address": response.data['address'], "status": response.data['status']}
                else:
                    notification_body = {"address": request.user.customeruser.get_customer_address(),
                                         "status": response.data['status']}

                notification_text = "Change  order {} status to {}".format(notification_body['address'], notification_body['status'])

        elif request.method == 'DELETE' and request.path.startswith('/customer_order'):
            notification_body = {"address": response.data['address']}
            notification_text = "Delete order {}".format(notification_body['address'])

        if notification_text:
            print("NOTIFICATION TEXT IS " + str(notification_text))

            all_browsers = WebPushDevice.objects.all()

            for phone in APNSDevice.objects.all():
                phone.send_message(notification_text)

            for phone in GCMDevice.objects.all():
                phone.send_message(notification_text)

            for browser in all_browsers:
                browser.send_message(str(notification_text))

        return response

class RequestLoggerMiddleware:
    """
    Provides full logging of requests and responses
    """
    _initial_http_body = None

    def __init__(self, get_response):
        self._initial_http_body = get_response

    def __call__(self, request):
        response = self._initial_http_body(request)
        if not isinstance(response, FileResponse):
            print("GET: {} Request url: {} Response code: {} Response content {}"
                  .format(request.GET, request.path, response.status_code, response.content))

        return response
