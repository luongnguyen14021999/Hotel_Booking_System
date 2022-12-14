# Generated by Django 4.1 on 2022-10-25 06:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('backend', '0002_alter_booking_customer_alter_room_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='check_out',
            field=models.DateTimeField(null=True, verbose_name='check out date'),
        ),
        migrations.AlterField(
            model_name='room',
            name='type',
            field=models.CharField(choices=[('president', 'president'), ('single', 'single'), ('double', 'double'), ('family', 'family')], max_length=50),
        ),
        migrations.CreateModel(
            name='CardPayment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cardName', models.CharField(max_length=250)),
                ('cardNumber', models.CharField(max_length=16)),
                ('expDate', models.CharField(max_length=50)),
                ('cvv', models.IntegerField()),
                ('published', models.DateTimeField(default=django.utils.timezone.now)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('-published',),
            },
        ),
    ]
