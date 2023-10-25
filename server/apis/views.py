from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout
from .models import htmls, sheets
import json
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.forms.models import model_to_dict
from django.db.models import Q


@csrf_exempt
def login_user(request):
    json_data = json.loads(request.body)
    username = json_data["username"]
    password = json_data["password"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return HttpResponse("Success")
    return HttpResponse("Invalid")


@csrf_exempt
def register_user(request):
    json_data = json.loads(request.body)
    username = json_data.get("username")
    email = json_data["email"]
    password = json_data["password"]
    if username.replace(" ", "") == "":
        return HttpResponse("Invalid Username")
    else:
        try:
            user = User.objects.create_user(
                username=username, email=email, password=password
            )
        except:
            return HttpResponse("Error: Email or Username may already exist")
        print(user)
        return HttpResponse("Success")


@csrf_exempt
def get_htmls(request):
    json_data = json.loads(request.body)
    username = json_data["username"]
    password = json_data["password"]

    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)  # get the projects owned by a user
    if request.user.is_authenticated:
        user = User.objects.get(id=request.user.id)
        user_email = user.email
        try:
            lst = []
            place = htmls.objects.filter(
                Q(admin_user=user_email) | Q(edit_access__icontains=user_email)
            )
            for x in place:
                dict_obj = model_to_dict(x)
                lst.append(dict_obj)
            return HttpResponse(json.dumps(lst))
        except htmls.DoesNotExist:
            return HttpResponse("No Project")

    else:
        return HttpResponse("Not Logged In")


@csrf_exempt
def get_html(request):
    json_data = json.loads(request.body)
    username = json_data["username"]
    password = json_data["password"]
    htm_id = json_data["id"]

    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)  # get the projects owned by a user
    if request.user.is_authenticated:
        user = User.objects.get(id=request.user.id)
        user_email = user.email
        try:
            place = htmls.objects.filter(
                Q(content_id=htm_id),
                Q(admin_user=user_email) | Q(
                    edit_access__icontains=user_email),
            ).first()
            dict_obj = model_to_dict(place)
            return HttpResponse(json.dumps(dict_obj))
        except htmls.DoesNotExist:
            return HttpResponse("No access")

    else:
        return HttpResponse("Not Logged In")


@csrf_exempt
def create_page(request):
    json_data = json.loads(request.body)
    username = json_data["username"]
    password = json_data["password"]
    name = json_data["name"]

    # username = request.GET["username"]
    # password = request.GET["password"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)  # get the projects owned by a user
    if request.user.is_authenticated:
        user = User.objects.get(id=request.user.id)
        user_email = user.email
        htm_obj = htmls(name=name, admin_user=user_email)
        htm_obj.save()
        return HttpResponse("Success")

    else:
        return HttpResponse("Not Logged In")


@csrf_exempt
def get_sheets(request):
    json_data = json.loads(request.body)
    html_id = json_data["id"]
    # username = request.GET["username"]
    # password = request.GET["password"]
    try:
        lst = []
        place = sheets.objects.filter(html_id=html_id)
        for x in place:
            dict_obj = model_to_dict(x)
            lst.append(dict_obj)
        return HttpResponse(json.dumps(lst))
    except htmls.DoesNotExist:
        return HttpResponse("No Sheets")


@csrf_exempt
def sheet(request):
    sheet_id = request.GET["id"]
    sheet_obj = sheets.objects.filter(sheet_id=sheet_id).first()
    return HttpResponse(sheet_obj.content_html)


@csrf_exempt
def add_sheet(request):
    json_data = json.loads(request.body)
    username = json_data["username"]
    password = json_data["password"]
    htm_id = json_data["id"]
    html = json_data["html"]
    name = json_data["name"]
    # username = request.GET["username"]
    # password = request.GET["password"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)  # get the projects owned by a user
    if request.user.is_authenticated:
        user = User.objects.get(id=request.user.id)
        user_email = user.email
        st_ob = sheets(name=name, html_id=htm_id, content_html=html)
        st_ob.save()
        return HttpResponse("Success")

    else:
        return HttpResponse("Not Logged In")


@csrf_exempt
def save_html(request):
    json_data = json.loads(request.body)
    username = json_data["username"]
    password = json_data["password"]
    htm_id = json_data["id"]
    html = json_data["html"]
    css = json_data["css"]
    # username = request.GET["username"]
    # password = request.GET["password"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)  # get the projects owned by a user
    if request.user.is_authenticated:
        user = User.objects.get(id=request.user.id)
        user_email = user.email
        htmls.objects.filter(
            Q(content_id=htm_id),
            Q(admin_user=user_email) | Q(edit_access__icontains=user_email),
        ).update(content_html=html, content_css=css)
        return HttpResponse("Success")

    else:
        return HttpResponse("Not Logged In")


@csrf_exempt
def view_html(request):
    json_data = json.loads(request.body)
    htm_id = json_data["id"]
    username = ""
    password = ""
    try:
        username = json_data["username"]
        password = json_data["password"]
    except Exception as es:
        try:
            place = htmls.objects.filter(
                Q(content_id=htm_id), Q(view_any="yes")
            ).first()
            dict_obj = model_to_dict(place)
            return HttpResponse(json.dumps(dict_obj))
        except Exception as ess:
            HttpResponse("No access")

    # username = request.GET["username"]
    # password = request.GET["password"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)  # get the projects owned by a user
    if request.user.is_authenticated:
        user = User.objects.get(id=request.user.id)
        user_email = user.email
        try:
            place = htmls.objects.filter(
                Q(content_id=htm_id),
                Q(admin_user=user_email)
                | Q(edit_access__icontains=user_email)
                | Q(view_access__icontains=user_email),
            ).first()
            dict_obj = model_to_dict(place)
            return HttpResponse(json.dumps(dict_obj))
        except Exception as e:
            return HttpResponse("No access")

    else:
        return HttpResponse("Not Logged In")


@csrf_exempt
def share(request):
    json_data = json.loads(request.body)
    username = json_data["username"]
    password = json_data["password"]
    htm_id = json_data["id"]
    access = json_data["access"]
    email = json_data["email"]
    # username = request.GET["username"]
    # password = request.GET["password"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)  # get the projects owned by a user
    if request.user.is_authenticated:
        try:
            user = User.objects.get(id=request.user.id)
            user_email = user.email
            place = htmls.objects.filter(
                Q(content_id=htm_id),
                Q(admin_user=user_email) | Q(
                    edit_access__icontains=user_email),
            ).first()
            if access == "edit":
                old = str(place.edit_access)
                if old == "None":
                    old = ""
                if email in old:
                    return HttpResponse("Already Exist")
                edit = email + ", " + str(old)
                htmls.objects.filter(
                    Q(content_id=htm_id),
                    Q(admin_user=user_email) | Q(
                        edit_access__icontains=user_email),
                ).update(edit_access=edit)
            else:
                old = str(place.view_access)
                if old == "None":
                    old = ""
                if email in old:
                    return HttpResponse("Already Exist")
                view = email + ", " + str(old)
                htmls.objects.filter(
                    Q(content_id=htm_id),
                    Q(admin_user=user_email) | Q(
                        edit_access__icontains=user_email),
                ).update(view_access=view)
            return HttpResponse("Success")
        except htmls.DoesNotExist:
            return HttpResponse("No access")

    else:
        return HttpResponse("Not Logged In")


@csrf_exempt
def view_access(request):
    json_data = json.loads(request.body)
    username = json_data["username"]
    password = json_data["password"]
    htm_id = json_data["id"]
    access = json_data["access"]
    # username = request.GET["username"]
    # password = request.GET["password"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)  # get the projects owned by a user
    if request.user.is_authenticated:
        try:
            user = User.objects.get(id=request.user.id)
            user_email = user.email
            place = htmls.objects.filter(
                Q(content_id=htm_id),
                Q(admin_user=user_email) | Q(
                    edit_access__icontains=user_email),
            ).first()
            if access == "any":
                htmls.objects.filter(
                    Q(content_id=htm_id),
                    Q(admin_user=user_email) | Q(
                        edit_access__icontains=user_email),
                ).update(view_any="yes")
            else:
                htmls.objects.filter(
                    Q(content_id=htm_id),
                    Q(admin_user=user_email) | Q(
                        edit_access__icontains=user_email),
                ).update(view_any="no")
            return HttpResponse("Success")
        except htmls.DoesNotExist:
            return HttpResponse("No access")

    else:
        return HttpResponse("Not Logged In")


@csrf_exempt
def delete_access(request):
    json_data = json.loads(request.body)
    username = json_data["username"]
    password = json_data["password"]
    htm_id = json_data["id"]
    access = json_data["access"]
    email = json_data["email"]
    # username = request.GET["username"]
    # password = request.GET["password"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)  # get the projects owned by a user
    if request.user.is_authenticated:
        try:
            user = User.objects.get(id=request.user.id)
            user_email = user.email
            place = htmls.objects.filter(
                Q(content_id=htm_id),
                Q(admin_user=user_email) | Q(
                    edit_access__icontains=user_email),
            ).first()
            if access == "edit":
                edit = place.edit_access.replace(email + ", ", "")
                htmls.objects.filter(
                    Q(content_id=htm_id),
                    Q(admin_user=user_email) | Q(
                        edit_access__icontains=user_email),
                ).update(edit_access=edit)
            else:
                view = place.view_access.replace(email + ", ", "")
                htmls.objects.filter(
                    Q(content_id=htm_id),
                    Q(admin_user=user_email) | Q(
                        edit_access__icontains=user_email),
                ).update(view_access=view)
            return HttpResponse("Success")
        except htmls.DoesNotExist:
            return HttpResponse("No access")

    else:
        return HttpResponse("Not Logged In")
