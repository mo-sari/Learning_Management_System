from django.urls import path
from . import views
# TODO  must adjust this url's better than this
urlpatterns = [
    path('profiles/<user_id>/', views.ProfileAPIView.as_view()),
    path('categories/', views.CategoryListAPIView.as_view()),
    path('course_detail/<slug>/', views.CourseDetailAPIView.as_view()),
    path('cart/', views.CartAPIView.as_view()),
]
