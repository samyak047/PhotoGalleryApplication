from rest_framework.authtoken.models import Token

def authenticate_request(request):
    try:
        token = request.META['HTTP_AUTHORIZATION'].split(" ")[1]
        print(token)
        token = Token.objects.get(key = token)
        return token.user
    except:
        return None