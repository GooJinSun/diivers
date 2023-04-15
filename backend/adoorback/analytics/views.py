from django.shortcuts import render

def dashboard(request):
    print("Dashboard view called")
    return render(request, 'tracking/dashboard.html')
