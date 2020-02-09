from corsheaders.signals import check_request_enabled

# from .models import photo_gallery

def cors_allow_mysites(sender, request, **kwargs):
    # return photo_gallery.objects.filter(host=request.host).exists()
    return True

check_request_enabled.connect(cors_allow_mysites)