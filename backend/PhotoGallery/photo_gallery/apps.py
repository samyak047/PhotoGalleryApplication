from django.apps import AppConfig


class PhotoGalleryConfig(AppConfig):
    name = 'photo_gallery'

    def ready(self):
        # Makes sure all signal handlers are connected
        # from photo_gallery import handlers  # noqa
        pass