from django.contrib import admin


class FiltersMixin(admin.ModelAdmin):
    class Media:
        js = ('grappelli_filters/filter.js', )
        css = {
            'all': ('grappelli_filters/filter.css', )
        }
