import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()


def main():
    from django.conf import settings
    raw_env = os.getenv('ALLOWED_HOSTS')
    print(f"Raw ALLOWED_HOSTS from environment: {repr(raw_env)}")

    # Print Django settings
    print(f"Parsed ALLOWED_HOSTS in Django settings: {settings.ALLOWED_HOSTS}")


if __name__ == "__main__":
    main()
