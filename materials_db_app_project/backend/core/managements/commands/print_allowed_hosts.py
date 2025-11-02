from django.core.management.base import BaseCommand
from django.conf import settings
import os


class Command(BaseCommand):
    help = 'Prints the current ALLOWED_HOSTS as Django sees it'

    def handle(self, *args, **kwargs):
        raw_env = os.getenv('ALLOWED_HOSTS')
        self.stdout.write(self.style.SUCCESS(
            f"Raw ALLOWED_HOSTS from environment: {repr(raw_env)}"))
        self.stdout.write(self.style.SUCCESS(
            f"Parsed ALLOWED_HOSTS in Django settings: {settings.ALLOWED_HOSTS}"))
