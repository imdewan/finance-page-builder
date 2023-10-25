from django.db import models


class htmls(models.Model):
    content_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=250, null=True)
    content = models.TextField(null=True)
    content_html = models.TextField(null=True)
    content_css = models.TextField(null=True)
    view_any = models.TextField(default="no")
    admin_user = models.TextField(null=True)
    meta = models.TextField(null=True)
    edit_access = models.TextField(null=True)
    view_access = models.TextField(null=True)


class sheets(models.Model):
    sheet_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=250, null=True)
    content = models.TextField(null=True)
    content_html = models.TextField(null=True)
    html_id = models.TextField(null=True)
    meta = models.TextField(null=True)
