from django import forms

class userForm(forms.Form):
    name=forms.CharField(label="name",widget=forms.TextInput(attrs={'class':"form-control"}))
    email=forms.EmailField()
    phone=forms.CharField()
    subject=forms.CharField()