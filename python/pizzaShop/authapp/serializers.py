from .models import User
from rest_framework import serializers
from phonenumber_field.serializerfields import PhoneNumberField


class UserCreationSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=15)
    email = serializers.EmailField(max_length=30)
    phone_number = PhoneNumberField()
    password = serializers.CharField(max_length=8)

    class Meta:
        model = User
        fields = ['email', 'username', 'phone_number', 'password']

    def validate(self, attrs):
        username_exists = User.objects.filter(
            username=attrs[('username')]).exists()
        if username_exists:
            raise serializers.ValidationError(detail="username exists")
        email_exists = User.objects.filter(email=attrs[('email')]).exists()
        if email_exists:
            raise serializers.ValidationError(detail="email exists")
        phonenumber_exists = User.objects.filter(
            phone_number=attrs[('phone_number')]).exists()
        if phonenumber_exists:
            raise serializers.ValidationError(detail="phone number exists")
        return super().validate(attrs)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            phone_number=validated_data['phone_number'],
            email=validated_data['email'],
        )

        user.set_password(validated_data['password'])
        user.save()
        return user