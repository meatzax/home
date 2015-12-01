# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='BackgroundImage',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('full_url', models.CharField(max_length=300)),
                ('regular_url', models.CharField(max_length=300)),
                ('html_url', models.CharField(max_length=300)),
                ('date_added', models.DateTimeField()),
            ],
        ),
    ]
