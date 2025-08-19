from .models import ExampleModel
from modeltranslation.translator import translator, TranslationOptions


class ExampleModelTranslation(TranslationOptions):
    fields = ('name', 'description')


translator.register(ExampleModel, ExampleModelTranslation)
