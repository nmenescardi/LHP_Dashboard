# Generated by Django 3.2 on 2021-04-30 17:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('vwap_offset', '0002_auto_20210430_1429'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vwap',
            name='pair',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='vwap_offset.pair'),
        ),
    ]
