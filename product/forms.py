from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['title', 'category', 'unit', 'standard_size', 'use_days', 'current_inventory']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['author'].widget = forms.HiddenInput()
        self.fields['author'].initial = self.instance.author_id if self.instance else self.request.user.id
