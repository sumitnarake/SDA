from multiprocessing import AuthenticationError
from django.http import HttpResponse,HttpResponseRedirect
from django.shortcuts import render,redirect
from .forms import userForm
from packages.models import Package
from django.core.paginator import Paginator
from usercontact.models import Contact
from django.contrib import messages
from django.contrib.auth.models import User,auth

def home(request):
    return render(request,"index.html")

def main(request):
    return render(request,"main.html")

def category(request):
    return render(request,"category.html")


# def login(request):
#     c=Contact.objects.all()
#     data={}
#     try:
#         if request.method =="POST":
#             email=request.POST.get('email')
#             password=request.POST.get('password')
#             for i in c:
#                 if email==i.email:
#                     if password==i.phone:
#                         data={'eamil':email}
#                         return redirect('packages')
#                 else:
#                     return HttpResponse("please fill correct credential")
       
#     except:
#         pass
#     return render(request,"login.html")

def packages(request):
    packageData=Package.objects.all()
    if request.method == "GET":
        p=request.GET.get('packages')
        if p!=None:
            packageData=Package.objects.filter(place = p)
    paginator=Paginator(packageData,2)
    page=request.GET.get('page')
    packageDatafinal=paginator.get_page(page)
    total=packageDatafinal.paginator.num_pages
    data={
        'packageData':packageDatafinal,
        'list':[n+1 for n in range(total)]
         

    }
    # print(packageData.has_previous)
    return render(request,"packages.html",data)

def contact(request):
    fn = userForm()
    data={'form':fn}
    try:
        if request.method == "POST":
            if request.POST.get('name') == '':
                return render(request,"contact.html",{'error':True,'value':'name'})
            if request.POST.get('email') == '':
                return render(request,"contact.html",{'error':True,'value':'eamil'})
            if request.POST.get('phone') == '':
                return render(request,"contact.html",{'error':True,'value':'phone'})
            if request.POST.get('subject') == '':
                return render(request,"contact.html",{'error':True,'value':'subject'})
            name=request.POST.get('name')
            email=request.POST.get('email')
            phone=request.POST.get('phone')
            subject=request.POST.get('subject')
            data={
                'name':name,
                'email':email,
                'phone':phone,
                'subject': subject,
            }
            en=Contact(name=name,email=email,phone=phone,subject=subject)
            en.save()
            return render(request,"sure.html",data)             
    except:
        pass
    

    return render(request,"contact.html")


def thanks(request):
    return render(request,"thanks.html")

def sure(request):
    data={}
    try:
        if request.method == "POST":
            name=request.POST.get('name')
            email=request.POST.get('email')
            phone=request.POST.get('phone')
            subject=request.POST.get('subject')
            data={
                'name':name,
                'email':email,
                'phone':phone,
                'subject': subject,  
            } 
        
          
    except:
        pass
    return render(request,"sure.html",data)


def login(request):
    if request.method=="POST":
        password=request.POST.get("password")
        username=request.POST.get("username")
        p=auth.authenticate(username=username,password=password)
        if p is not None:
            auth.login(request,p)
            return redirect('home')
        else:
            messages.error(request,'invalid password or username') 
            messages.error(request,'invalid password or username') 
            messages.error(request,'invalid password or username') 
            messages.error(request,'invalid password or username') 
            return redirect('login')
    else:
        return render(request,"login.html")

def logout(request):
    auth.logout(request)
    return redirect('login')




def calculator(request):
    data={}
    c=''
    try:
        if request.method == "POST":
            if request.POST.get('num1') =='':
                return render(request,"calculator.html",{'error':True})
            n1=eval(request.POST.get('num1'))
            if n1%2==0:
                data={'c':'even','n1':n1}
            else:
                data={
                'c':"odd",'n1':n1
                }
            return render(request,"calculator.html",data)
                    
            # opr=request.POST.get('opr')
            # n2=eval(request.POST.get('num2'))
            # if opr == "+":
            #     c=n1+n2
            # if opr == "-":
            #     c=n1-n2
            # if opr == "/":
            #     c=n1/n2
            # if opr == "*":
            #     c=n1*n2
    except:
        pass
    return render(request,"calculator.html",data)

