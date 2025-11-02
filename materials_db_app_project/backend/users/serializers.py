from .models import User
from rest_framework import serializers
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from django.utils.translation import gettext_lazy as _


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name',
                  'last_name', 'email', 'password', 'date_joined']
        extra_kwargs = {'password': {'write_only': True},
                        'date_joined': {'read_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class CustomRegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150, required=True)
    email = serializers.EmailField(required=True)
    password1 = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if email and User.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                _("A user is already registered with this e-mail address."))
        return email

    def validate_username(self, username):
        username = get_adapter().clean_username(username)
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError(_("Username already taken."))
        return username

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def save(self, request):
        user = User(
            username=self.validated_data['username'],
            email=self.validated_data['email'],
        )
        user.set_password(self.validated_data['password1'])
        user.is_active = False if get_adapter().is_email_verification_required(request, user) else True
        user.save()
        setup_user_email(request, user, [])
        get_adapter().send_confirmation_mail(request, user)
        return user
