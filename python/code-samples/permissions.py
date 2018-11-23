class CustomerAccessPermission(permissions.BasePermission):
    """
    Permission class ONLY for customer access
    """

    message = 'Only customers can do that'

    def has_permission(self, request, view):
        return hasattr(request.user, 'customeruser')

class DriverAccessPermission(permissions.BasePermission):
    """
    Permission class ONLY for driver access
    """

    message = 'Only drivers can do that'

    def has_permission(self, request, view):
        return hasattr(request.user, 'driveruser')