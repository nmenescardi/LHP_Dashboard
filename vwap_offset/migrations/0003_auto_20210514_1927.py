# Generated by Django 3.2.2 on 2021-05-14 22:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vwap_offset', '0002_config'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='config',
            name='value',
        ),
        migrations.AddField(
            model_name='config',
            name='lickvalue',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='config',
            name='longoffset',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='config',
            name='min_lick_value',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='config',
            name='percentage_factor',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='config',
            name='shortoffset',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='config',
            name='symbol',
            field=models.CharField(default='', max_length=50),
        ),
    ]
