# Generated by Django 3.2.2 on 2021-05-14 22:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vwap_offset', '0004_alter_config_symbol'),
    ]

    operations = [
        migrations.AlterField(
            model_name='config',
            name='lickvalue',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='config',
            name='longoffset',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='config',
            name='shortoffset',
            field=models.FloatField(),
        ),
    ]