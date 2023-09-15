# UserModel

--> Using Django created simple custom user model.

- What is custom user model?

  - This simple custom user model is a way to override Django's built-in User model with a model of your own.
  - This can be useful when the default User model doesn't provide all the fields or functionality that you need in your application.
  - With a custom user model, you can add, remove or modify fields and methods, as well as use different authentication methods such as email instead of username.
  - Custom user model also provides better security and flexibility for your Django project.

- Clone this repository into folder.

- Then open terminal in that folder and make migrations.

```bash
python3 manage.py makemigrations
```

```bash
python3 manage.py migrate
```

- Run server by using below command

```bash
python3 manage.py runserver
```

## Happy coding :)
