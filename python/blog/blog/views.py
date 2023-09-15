from multiprocessing import context
from django.shortcuts import render, get_object_or_404, redirect,HttpResponse

from django.utils import timezone
from .models import Post
from .forms import PostForm

# Create your views here.
def post_list(request):

    posts = Post.objects.filter(published_date__lte=timezone.now()).order_by(
        "-published_date"
    )

    context = {"posts": posts}

    return render(request, "blog/post_list.html", context)


def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    context = {"post": post}
    return render(request, "blog/post_detail.html", context)


def post_new(request):
    if request.method == "POST":
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            try:
             post.author = request.user
            except Exception as e:
                return HttpResponse("Please login as admin at '/admin'.")
            post.published_date = timezone.now()
            post.save()
            return redirect("post_detail", pk=post.pk)
    else:
        form = PostForm()
    return render(request, "blog/post_edit.html", {"form": form})


def post_edit(request, pk):
    post = get_object_or_404(Post, pk=pk)
    if request.method == "POST":
        form = PostForm(request.Post, instance=post)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.published_date = timezone.now()
            post.save()
            return redirect("post_detail", pk=post.pk)
    else:
        form = PostForm(instance=post)
    return render(request, "blog/post_edit.html", {"form": form})
