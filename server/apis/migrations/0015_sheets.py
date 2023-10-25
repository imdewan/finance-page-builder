# Generated by Django 4.2.3 on 2023-07-19 14:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0014_htmls_content_css'),
    ]

    operations = [
        migrations.CreateModel(
            name='sheets',
            fields=[
                ('sheet_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=250, null=True)),
                ('content', models.TextField(null=True)),
                ('content_html', models.TextField(null=True)),
                ('content_css', models.TextField(null=True)),
                ('html_id', models.TextField(null=True)),
                ('meta', models.TextField(null=True)),
            ],
        ),
    ]