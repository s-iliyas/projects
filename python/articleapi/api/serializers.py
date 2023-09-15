from pyexpat import model
from rest_framework import serializers
from . import models


# class ArticleSerializer(serializers.Serializer):
#     title=serializers.CharField(max_length=100)
#     author=serializers.CharField(max_length=100)
#     email=serializers.EmailField(max_length=100)
#     datte = serializers.DateTimeField()
    
    
#     def create(self,validated_data):
#         return Article.objects.create(validated_data)
    
#     def update(self,instance,validated_data):
#         instance.title = validated_data.get('title',instance.title)
#         instance.author = validated_data.get('author',instance.author)
#         instance.email = validated_data.get('email',instance.email)
#         instance.date = validated_data.get('date',instance.date)
#         instance.save()
#         return instance
#python3 manage.py shell
#>>> from api.models import Article
#>>> from api.serializers import ArticleSerializer
#>>> from rest_framework.renderers import JSONRenderer
#>>> from rest_framework.parsers import JSONParser
# >>> meraa = Article(title='ILIYAS',author='MERAA',email='a@a.com')
# >>> meraa.save()
#>>> serializer = ArticleSerializer(meraa)
#>>> serializer.data
# >>> content=JSONRenderer().render(serializer.data)
# >>> content
#TO SERIALIZE A QUERYSET
#>>> serializer = ArticleSerializer(Article.objects.all(),many=True)
#>>> serializer.data

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Article
        fields = ['id','title','author','email']
#         >>> serializer = ArticleSerializer()
# >>> print(repr(serializer))
# ArticleSerializer():
#     title = CharField(max_length=100)
#     author = CharField(max_length=100)
#     email = EmailField(max_length=100)
#     datte = DateTimeField()
# >>> 