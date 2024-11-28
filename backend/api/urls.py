from django.urls import path
from . import views
# TODO  must adjust this url's better than this
urlpatterns = [
    path('profiles/<user_id>/', views.ProfileAPIView.as_view()),


    # Core Endpoints
    path("course/categories/", views.CategoryListAPIView.as_view()),
    path("course/course-list/", views.CourseListAPIView.as_view()),
    path("course/course-detail/<slug>/", views.CourseDetailAPIView.as_view()),
    path("course/cart/", views.CartAPIView.as_view()),
    path("course/cart-list/<cart_id>/", views.CartListAPIView.as_view()),
    path("cart/stats/<cart_id>/", views.CartStatsAPIView.as_view()),
    path("course/cart-item-delete/<cart_id>/<item_id>/",
         views.CartItemDeleteAPIView.as_view()),
    path("order/create-order/", views.CreateOrderAPIView.as_view()),
    path("order/checkout/<oid>/", views.CheckoutAPIView.as_view()),
    path("order/coupon/", views.CouponApplyAPIView.as_view()),


]
