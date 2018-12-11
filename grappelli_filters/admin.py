from django.contrib import admin


class FiltersMixin(admin.ModelAdmin):
    base_change_list_template = "admin/change_list.html"

    def changelist_view(self, request, extra_context=None):
        extra_context = extra_context or {}
        extra_context['base_change_list_template'] = self.base_change_list_template
        return super(FiltersMixin, self).changelist_view(request,
                                                         extra_context=extra_context)

    class Media:
        js = ('grappelli_filters/filter.js', )
        css = {
            'all': ('grappelli_filters/filter.css', )
        }
