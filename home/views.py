import os
import shutil
import requests
from datetime import datetime
from random import randint
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.conf import settings

from .tasks import add
from .models import BackgroundImage


# Create your views here.
def index(request):
    return render(request, 'home/base.html')


def get_homepage_image(request):
    """
    Returns random URL from unsplash.com API
    """
    data = {'client_id': settings.UNSPLASH_CLIENT}
    homepage_img = settings.BASE_DIR + '/static/img/background.jpg'

    try:
        req = requests.get('https://api.unsplash.com/photos/', params=data)
    except Exception as e:
        return HttpResponse(e)

    try:
        img = req.json()[randint(0,9)]
        img_url = img['urls']['regular']
        img_resp = requests.get(img_url, stream=True)
        os.remove(homepage_img)
        with open(homepage_img, 'wb') as outfile:
            shutil.copyfileobj(img_resp.raw, outfile)

        background_img = BackgroundImage(full_url=img['urls']['full'],
                                         regular_url=img['urls']['regular'],
                                         html_url=img['links']['html'],
                                         date_added=datetime.now())
        background_img.save()
    except Exception as e:
        return HttpResponse(e)

    return HttpResponse(img_url)


def get_image_url(request):
    image = BackgroundImage.objects.last()
    image_resp = {'html': image.html_url,
                  'full_url': image.full_url,
                  'regular_url': image.regular_url,
                  'date_added': image.date_added}

    return JsonResponse(image_resp)

def add_view(request):
    add.delay(2, 2)