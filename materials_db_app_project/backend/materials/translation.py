from . import models
from modeltranslation.translator import translator, TranslationOptions


class CategoryTranslation(TranslationOptions):
    fields = ('name',)


translator.register(models.Category, CategoryTranslation)
