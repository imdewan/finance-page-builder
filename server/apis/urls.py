from django.urls import path
from . import views


urlpatterns = [
    path('login/', views.login_user),
    path('register/', views.register_user),
    path('get_htmls/', views.get_htmls),
    path('get_html/', views.get_html),
    path('view_html/', views.view_html),
    path('create_page/', views.create_page),
    path('save_html/', views.save_html),
    path('sheet/', views.sheet),
    path('get_sheets/', views.get_sheets),
    path('add_sheet/', views.add_sheet),
    path('share/', views.share),
    path('view_access/', views.view_access),
    path('delete_access/', views.delete_access),

]
