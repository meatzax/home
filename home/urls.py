from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^photo$', views.get_homepage_image, name='photo'),
    url(r'^photo/url$', views.get_image_url, name='get_image_url')
]