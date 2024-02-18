from django.shortcuts import render,redirect
from .models import Song

# Create your views here.


def home(request):
    songs = Song.objects.all().order_by('title')
    song_list = list(Song.objects.all().order_by('title').values())
    print(song_list)
    
    return render(request,"home.html",{"songs":songs,"song_list":song_list})


def add(request):
    
    if request.method == 'POST':
        title = request.POST.get('title')
        artist = request.POST.get('artist')
        band = request.POST.get('band')
        song_file = request.FILES.get('audio_file')  # Use request.FILES for file input
        image = request.FILES.get('cover_image')  
        
        # Check if required fields are not empty
        if title and artist and song_file:
            all_data = Song(title=title, artist=artist, band=band, image=image, song_file=song_file)
            all_data.save()
            return redirect('home')
        else:
            # Handle the case where required fields are missing
            error_message = "Please fill out all required fields."
            return render(request, "add.html", {'error_message': error_message})
            
    return render(request,"add.html")