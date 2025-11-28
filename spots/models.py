from django.db import models

# Create your models here
class Spot(models.Model):
    id = models.AutoField(primary_key=True)
    spot_id = models.CharField(max_length=50, unique=True, editable=False)

    name = models.CharField(max_length=100, null=False, blank=False, default="Spot")
    category = models.CharField(max_length=100, null=False, blank=False, default="Spot")
    description = models.TextField(null=False, blank=False, default="Spot para patinar")
    place = models.CharField(max_length=100, null=True, blank=True)
    location = models.CharField(max_length=200, null=False, blank=False, default="https://maps.app.goo.gl/MH7LMjYTEEnPKqPy8")
    likes = models.IntegerField(default=0)
    difficulty = models.IntegerField(null=False, blank=False, default=0)

    PREFIX = 'spot_'

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        # Generar spot_id SOLO si no existe
        if not self.spot_id:
            self.spot_id = f"{self.PREFIX}{self.id:03d}"
            super().save(update_fields=['spot_id'])

    def __str__(self):
        return f"{self.spot_id} - {self.name}"

class SpotImage(models.Model):
    spot = models.ForeignKey(Spot, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='spot_images/')

    def __str__(self):
        return f"foto de {self.spot.name}"