from django.contrib import admin
from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework.permissions import AllowAny
from rest_framework_jwt.views import obtain_jwt_token, \
refresh_jwt_token, verify_jwt_token

urlpatterns = [
    path('jet/', include('jet.urls', 'jet')),
    path('jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')),

    path('api/login', obtain_jwt_token),
    path('api/token-refresh', refresh_jwt_token),
    path('api/token-verify', verify_jwt_token),

    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('docs/', include_docs_urls(title='API documentation',
                                    permission_classes=[AllowAny]))
]

