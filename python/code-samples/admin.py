class ServicesNamingAdmin(admin.ModelAdmin):
    
    list_display = ('naming', 'description', 'cost')

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if hasattr(request.user, 'companyadmins'):
            return qs.filter(company=request.user.companyadmins.company)
        else:
            return qs

    def save_model(self, request, obj, form, change):
        obj.company = request.user.companyadmins.company
        obj.save()
        super().save_model(request, obj, form, change)

    models = ServicesNaming
    exclude = ('company',)

    def has_module_permission(self, request):
        return hasattr(request.user, 'companyadmins')

    models._meta.verbose_name_plural = "Services naming"


    class ServicesAdmin(admin.ModelAdmin):
    
        list_display = ('status', 'assign_to', 'will_be_evaluated_by', 'data', 'address', 'service_descr', 'service_descr_cost')
        list_filter = ('data', 'assign_to', 'will_be_evaluated_by')

        def service_descr_cost(self, instance):
            return instance.service_descr.cost

        def get_queryset(self, request):
            qs = super().get_queryset(request)
            if hasattr(request.user, 'companyadmins'):
                return qs.filter(company=request.user.companyadmins.company,
                                will_be_evaluated_by__isnull=False)
            else:
                return qs

        def render_change_form(self, request, context, *args, **kwargs):
            context['adminform'].form.fields[
                'will_be_evaluated_by'].queryset = DriverUser.objects.filter(
                company=request.user.companyadmins.company)
            context['adminform'].form.fields[
                'service_descr'].queryset = ServicesNaming.objects.filter(
                company=request.user.companyadmins.company)
            return super().render_change_form(request, context, *args, **kwargs)

        def has_module_permission(self, request):
            return hasattr(request.user, 'companyadmins')

        def save_model(self, request, obj, form, change):
            obj.company = request.user.companyadmins.company
            obj.save()
            super().save_model(request, obj, form, change)

        models = Services
        exclude = ('company',)
        models._meta.verbose_name_plural = "Services"