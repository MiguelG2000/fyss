from lib2to3.fixes.fix_input import context
from django.http import JsonResponse
from django.shortcuts import render, redirect
from .models import Spot, SpotImage
from django.core.paginator import Paginator
from django.db.models import Q
from .forms import SpotForm
from django.contrib import messages

def index(request):
    query = request.GET.get("q", "")

    spots = Spot.objects.all()

    if query:
        spots = spots.filter(
            Q(name__icontains=query) |
            Q(category__icontains=query) |
            Q(place__icontains=query) |
            Q(description__icontains=query)
        )

    paginator = Paginator(spots, 9)  # 9 por página
    page_number = request.GET.get("page")
    spots_page = paginator.get_page(page_number)

    return render(request, "index.html", {
        "spots": spots_page,
        "query": query
    })

def like_spot(request, spot_id):
    try:
        spot = Spot.objects.get(spot_id=spot_id)
        spot.likes += 1
        spot.save()
        return JsonResponse({"likes": spot.likes})
    except Spot.DoesNotExist:
        return JsonResponse({"error": "Spot no encontrado"}, status=404)

def add_spot(request):
    if request.method == "POST":
        form = SpotForm(request.POST)

        if form.is_valid():
            spot = form.save()

            # guardar todas las imágenes del input
            for img in request.FILES.getlist("images"):
                SpotImage.objects.create(spot=spot, image=img)

            messages.success(request, "¡El spot fue agregado correctamente! 🛹🔥")
            return redirect("index")

        messages.error(request, "Revisa los datos.")
    else:
        form = SpotForm()

    context = {
        "form": form
    }

    return render(request, "add_spot.html", context)


