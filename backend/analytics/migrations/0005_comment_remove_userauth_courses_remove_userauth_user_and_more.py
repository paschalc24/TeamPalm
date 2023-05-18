# Generated by Django 4.2 on 2023-05-15 14:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('analytics', '0004_course_userauth'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('comment_id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('endorsed', models.BooleanField(default=False)),
                ('is_answer', models.BooleanField(default=False)),
                ('body', models.CharField(max_length=200)),
                ('publishedAt', models.DateTimeField(null=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='analytics.author')),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='post', to='analytics.post')),
            ],
        ),
        migrations.RemoveField(
            model_name='userauth',
            name='courses',
        ),
        migrations.RemoveField(
            model_name='userauth',
            name='user',
        ),
        migrations.DeleteModel(
            name='Course',
        ),
        migrations.DeleteModel(
            name='UserAuth',
        ),
    ]
