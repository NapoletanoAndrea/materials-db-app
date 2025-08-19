from django.utils import translation


class FrontendLanguageMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        lang = request.headers.get('Accept-Language')
        # print(lang)
        if lang:
            translation.activate(lang)
            request.LANGUAGE_CODE = lang
        else:
            translation.activate('en-gb')  # Default fallback

        response = self.get_response(request)
        translation.deactivate()
        return response
