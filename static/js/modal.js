document.addEventListener('DOMContentLoaded', () => {

    const modal = document.getElementById('spotModal');
    const modalContent = document.getElementById('modalContent');
    const modalBody = document.getElementById('modalBody');
    const closeModalBtn = document.getElementById('closeModal');
    const modalBackdrop = document.getElementById('modalBackdrop');

    // ABRIR MODAL
    document.querySelectorAll('.spot-card').forEach(card => {
        card.addEventListener('click', (e) => {

            if (e.target.closest('.like-btn')) return;

            const data = {
                id: card.dataset.spotId,
                name: card.dataset.spotName,
                description: card.dataset.spotDescription,
                place: card.dataset.spotPlace,
                category: card.dataset.spotCategory,
                difficulty: card.dataset.spotDifficulty,
                likes: card.dataset.spotLikes,
                location: card.dataset.spotLocation,
                image: card.dataset.spotImage
            };

            modalBody.innerHTML = modalTemplate(data);

            modal.classList.remove('show');
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });

    // CERRAR MODAL
    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 250);
    };

    closeModalBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});


// PLANTILLA DINÁMICA DEL MODAL
function modalTemplate(spot) {

    let diff = spot.difficulty;

    if (typeof diff === "string") {
        diff = diff.replace(/[^0-9]/g, "");
    }

    const difficultyNum = parseInt(diff);
    const difficulty = !isNaN(difficultyNum) ? difficultyNum : 0;
    const clamped = Math.min(5, Math.max(0, difficulty));
    const widthPercent = (clamped / 5) * 100;

    return `
        <div class="p-6">

            <div class="h-64 rounded-xl overflow-hidden mb-6">
                ${spot.image ? 
                    `<img src="${spot.image}" class="w-full h-full object-cover">`
                : `
                    <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                        <i class="fa-solid fa-skating text-white text-8xl opacity-60"></i>
                    </div>
                `}
            </div>

            <h2 class="text-3xl font-bold dark:text-white mb-2">${spot.name || ''}</h2>

            <p class="inline-block bg-blue-600/20 dark:bg-blue-400/20 text-blue-700 
                       dark:text-blue-300 px-3 py-1 rounded-lg text-sm font-semibold mb-3">
                ${spot.category || 'Sin categoría'}
            </p>

            <p class="text-gray-600 dark:text-gray-400 mb-3">
                <i class="fa-solid fa-location-dot mr-1 text-blue-600 dark:text-blue-400"></i>
                ${spot.place || ''}
            </p>

            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                ${spot.description || ''}
            </p>

            <div class="mt-4 mb-8">
                <p class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Dificultad
                </p>
            
                <div class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                        class="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full transition-all duration-500"
                        style="width: ${widthPercent}%;">
                    </div>
                </div>

                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Nivel: ${clamped} / 5
                </p>
            </div>

            <div class="flex gap-3">

                <a href="${spot.location || '#'}" target="_blank"
                   class="flex-1 bg-blue-600 text-white py-3 rounded-xl text-center font-semibold hover:bg-blue-700">
                    <i class="fa-solid fa-map-location-dot mr-1"></i> Ver Spot
                </a>

                <button class="like-btn bg-gray-300 dark:bg-gray-700 py-3 px-5 rounded-xl transition hover:scale-110"
                        onclick="likeSpot('${spot.id}', this)">
                    <i class="fa-solid fa-heart mr-2"></i>
                    <span id="likes-${spot.id}">
                        ${spot.likes || 0}
                    </span>
                </button>

            </div>
        </div>
    `;
}




