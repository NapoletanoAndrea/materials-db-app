import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()


def main():
    from users.models import User
    from django.contrib.auth import authenticate
    # from allauth.account.models import EmailAddress

    # user = User.objects.get(email='and.nap110@gmail.com')
    # EmailAddress.objects.get_or_create(
    #     user=user,
    #     email=user.email,
    #     defaults={"verified": True, "primary": True}
    # )
    # for email in EmailAddress.objects.all():
    #     print(email.email, email.verified, email.primary)

    user = authenticate(request=None,
                        username="admin", password="admin")

    print(user)


if __name__ == "__main__":
    main()
