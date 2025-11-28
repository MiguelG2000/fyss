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
                difficulty: card.dataset.spotDifficulty,
                likes: card.dataset.spotLikes,
                location: card.dataset.spotLocation,
                image: card.dataset.spotImage
            };

            modalBody.innerHTML = modalTemplate(data);

            modal.classList.remove('hidden');
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

            <h2 class="text-3xl font-bold dark:text-white">${spot.name}</h2>

            <p class="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">${spot.description}</p>

            <p class="mt-4 text-gray-600 dark:text-gray-400">${spot.place}</p>

            <div class="mt-4 flex items-center justify-between">
                <div class="flex items-center">
                    ${Array.from({ length: 5 }).map((_, i) =>
                        `<i class="fa-solid fa-star ${i < spot.difficulty ? "text-yellow-400" : "text-gray-400"}"></i>`
                    ).join('')}
                    <span class="ml-2 text-gray-500">${spot.difficulty}/5</span>
                </div>

                <div class="text-red-500 font-semibold flex items-center">
                    <i class="fa-solid fa-heart mr-2"></i>
                    ${spot.likes} likes
                </div>
            </div>

            <div class="mt-8 flex gap-3">
                <a href="${spot.location}" target="_blank"
                   class="flex-1 bg-blue-600 text-white py-3 rounded-xl text-center font-semibold hover:bg-blue-700">
                    Ver en Maps
                </a>

                <button class="like-btn bg-gray-300 dark:bg-gray-700 py-3 px-5 rounded-xl"
                        onclick="likeSpot('${spot.id}', this)">
                    <i class="fa-solid fa-heart mr-2"></i>
                    <span id="modal-likes-${spot.id}">${spot.likes}</span>
                </button>
            </div>
        </div>
    `;
}
