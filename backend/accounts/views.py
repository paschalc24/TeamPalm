from django.shortcuts import render
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, logout
from django.http import HttpResponseRedirect, HttpResponse
from django.views.decorators.csrf import csrf_exempt

def login_view(request):
  if request.method == 'POST':
    form = AuthenticationForm(data=request.POST)
    if form.is_valid():
      user = form.get_user()
      login(request, user)
      return HttpResponseRedirect('http://localhost:5173/')
    else:
      return render(request, 'login.html', {'form':form, 'error_messages':'Please enter a correct username and password. Note that both fields may be case-sensitive.'})
  else: 
    form = AuthenticationForm()
  return render(request, 'login.html', {'form':form})

@csrf_exempt
def logout_view(request):
  if request.method == 'POST':
    logout(request)
    return HttpResponseRedirect('/')

