from django import forms
from .models import Spot

class SpotForm(forms.ModelForm):
    class Meta:
        model = Spot
        fields = ['name', 'category', 'description', 'place', 'location', 'difficulty']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'input'}),
            'category': forms.TextInput(attrs={'class': 'input'}),
            'description': forms.Textarea(attrs={'class': 'textarea'}),
            'place': forms.TextInput(attrs={'class': 'input'}),
            'location': forms.URLInput(attrs={'class': 'input'}),
            'difficulty': forms.NumberInput(attrs={'class': 'input'}),
        }
