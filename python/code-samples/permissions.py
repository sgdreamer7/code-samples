class CustomerAccessPermission(permissions.BasePermission):
    message = 'Only customers can do that'

    def has_permission(self, request, view):
        return hasattr(request.user, 'customeruser')


class AdminAccessPermission(permissions.BasePermission):
    message = 'Only admin can do that'

    def has_permission(self, request, view):
        return request.user.is_admin

class DriverAccessPermission(permissions.BasePermission):
    message = 'Only drivers can do that'

    def has_permission(self, request, view):
        return hasattr(request.user, 'driveruser')