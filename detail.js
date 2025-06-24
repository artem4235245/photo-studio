document.addEventListener('DOMContentLoaded', () => {
    // Галерея
    const mainImage = document.querySelector('#mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const src = thumbnail.getAttribute('data-src');
            mainImage.src = src;
            mainImage.alt = thumbnail.alt;
            thumbnails.forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
        });
    });

    // Отзывы
    const reviewName = document.querySelector('#reviewName');
    const reviewText = document.querySelector('#reviewText');
    const submitReview = document.querySelector('#submitReview');
    const reviewList = document.querySelector('#reviewList');

    // Загрузка отзывов из localStorage
    const loadReviews = () => {
        const reviews = JSON.parse(localStorage.getItem('portraitReviews') || '[]');
        reviewList.innerHTML = '';
        reviews.forEach(review => {
            const reviewDiv = document.createElement('div');
            reviewDiv.classList.add('review');
            reviewDiv.innerHTML = `<p><strong>${review.name}:</strong> ${review.text}</p>`;
            reviewList.appendChild(reviewDiv);
        });
        // Добавляем статические отзывы после динамических
        reviewList.innerHTML += `
            <div class="review">
                <p><strong>Анжелла:</strong> Очень понравилось! Атмосфера и результат — на высоте.</p>
            </div>
            <div class="review">
                <p><strong>Дмитрий:</strong> Фотограф учёл все пожелания. Качественные снимки.</p>
            </div>
        `;
    };

    // Сохранение отзыва
    if (submitReview) {
        submitReview.addEventListener('click', () => {
            if (reviewName.value.trim() && reviewText.value.trim()) {
                const reviews = JSON.parse(localStorage.getItem('portraitReviews') || '[]');
                reviews.push({
                    name: reviewName.value.trim(),
                    text: reviewText.value.trim()
                });
                localStorage.setItem('portraitReviews', JSON.stringify(reviews));
                reviewName.value = '';
                reviewText.value = '';
                loadReviews();
            } else {
                alert('Пожалуйста, заполните все поля.');
            }
        });
    }

    // Инициализация
    loadReviews();
    thumbnails[0].classList.add('active'); // Первая миниатюра активна по умолчанию
});