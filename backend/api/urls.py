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



    # Student API Endpoints
    path("student/summary/<user_id>/", views.StudentSummaryAPIView.as_view()),
    path("student/course-list/<user_id>/",
         views.StudentCourseListAPIView.as_view()),
    path("student/course-detail/<user_id>/<enrollment_id>/",
         views.StudentCourseDetailAPIView.as_view()),
    path("student/course-completed/",
         views.StudentCourseCompletedCreateAPIView.as_view()),
    path("student/course-note/<user_id>/<enrollment_id>/",
         views.StudentNoteCreateAPIView.as_view()),
    path("student/course-note-detail/<user_id>/<enrollment_id>/<note_id>/",
         views.StudentNoteDetailAPIView.as_view()),
    path("student/rate-course/",
         views.StudentRateCourseCreateAPIView.as_view()),
    path("student/review-detail/<user_id>/<review_id>/",
         views.StudentRateCourseUpdateAPIView.as_view()),
    path("student/wishlist/<user_id>/",
         views.StudentWishListListCreateAPIView.as_view()),
    path("student/question-answer-list-create/<course_id>/",
         views.QuestionAnswerListCreateAPIView.as_view()),
    path("student/question-answer-message-create/",
         views.QuestionAnswerMessageSendAPIView.as_view()),

    # Teacher Routes
    path("teacher/summary/<teacher_id>/",
         views.TeacherSummaryAPIView.as_view()),
    path("teacher/course-lists/<teacher_id>/",
         views.TeacherCourseListAPIView.as_view()),
    path("teacher/review-lists/<teacher_id>/",
         views.TeacherReviewListAPIView.as_view()),
    path("teacher/review-detail/<teacher_id>/<review_id>/",
         views.TeacherReviewDetailAPIView.as_view()),
    path("teacher/student-lists/<teacher_id>/",
         views.TeacherStudentsListAPIVIew.as_view({'get': 'list'})),
    path("teacher/all-months-earning/<teacher_id>/",
         views.TeacherAllMonthEarningAPIView),
    path("teacher/best-course-earning/<teacher_id>/",
         views.TeacherBestSellingCourseAPIView.as_view({'get': 'list'})),
    path("teacher/course-order-list/<teacher_id>/",
         views.TeacherCourseOrdersListAPIView.as_view()),
    path("teacher/question-answer-list/<teacher_id>/",
         views.TeacherQuestionAnswerListAPIView.as_view()),
    path("teacher/coupon-list/<teacher_id>/",
         views.TeacherCouponListCreateAPIView.as_view()),
    path("teacher/coupon-detail/<teacher_id>/<coupon_id>/",
         views.TeacherCouponDetailAPIView.as_view()),
    path("teacher/noti-list/<teacher_id>/",
         views.TeacherNotificationListAPIView.as_view()),
    path("teacher/noti-detail/<teacher_id>/<noti_id>",
         views.TeacherNotificationDetailAPIView.as_view()),
    path("teacher/course-create/", views.CourseCreateAPIView.as_view()),
    path("teacher/course-update/<teacher_id>/<course_id>/",
         views.CourseUpdateAPIView.as_view()),
    path("teacher/course-detail/<course_id>/",
         views.CourseDetailAPIView.as_view()),
    path("teacher/course/variant-delete/<variant_id>/<teacher_id>/<course_id>/",
         views.CourseVariantDeleteAPIView.as_view()),
    path("teacher/course/variant-item-delete/<variant_id>/<variant_item_id>/<teacher_id>/<course_id>/",
         views.CourseVariantItemDeleteAPIVIew.as_view()),


]
