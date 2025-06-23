document.addEventListener('DOMContentLoaded', () => {
    // Слайдер
    const slides = document.querySelectorAll('.slider__item');
    const prevButton = document.querySelector('.slider__prev');
    const nextButton = document.querySelector('.slider__next');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    if (nextButton && prevButton) {
        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);
    }

    showSlide(currentSlide);
    setInterval(nextSlide, 5000); // Автосмена слайдов каждые 5 секунд

    // Анимация появления блоков при скролле
    const infoBlocks = document.querySelectorAll('.info-box');

    function checkBlocks() {
        const triggerBottom = window.innerHeight * 0.8;

        infoBlocks.forEach(block => {
            const blockTop = block.getBoundingClientRect().top;

            if (blockTop < triggerBottom) {
                block.classList.add('show');
            }
        });
    }

    window.addEventListener('scroll', checkBlocks);
    checkBlocks(); // Проверка при загрузке страницы
});

document.addEventListener('DOMContentLoaded', () => {
    // Слайдер (для index.html)
    const slides = document.querySelectorAll('.slider__item');
    if (slides.length > 0) {
        const prevButton = document.querySelector('.slider__prev');
        const nextButton = document.querySelector('.slider__next');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        if (nextButton && prevButton) {
            nextButton.addEventListener('click', nextSlide);
            prevButton.addEventListener('click', prevSlide);
        }

        showSlide(currentSlide);
        setInterval(nextSlide, 5000);

        // Анимация появления блоков при скролле
        const infoBlocks = document.querySelectorAll('.info-box');

        function checkBlocks() {
            const triggerBottom = window.innerHeight * 0.8;

            infoBlocks.forEach(block => {
                const blockTop = block.getBoundingClientRect().top;

                if (blockTop < triggerBottom) {
                    block.classList.add('show');
                }
            });
        }

        window.addEventListener('scroll', checkBlocks);
        checkBlocks();
    }

    // Каталог (для catalog.html)
    const catalog = document.querySelector('.catalog');
    if (catalog) {
        const items = document.querySelectorAll('.item');
        const searchInput = document.querySelector('#searchInput');
        const priceRange = document.querySelector('#priceRange');
        const priceValue = document.querySelector('#priceValue');
        const categoryFilter = document.querySelector('#categoryFilter');
        const prevPage = document.querySelector('#prevPage');
        const nextPage = document.querySelector('#nextPage');
        const pageInfo = document.querySelector('#pageInfo');

        let currentPage = 1;
        const itemsPerPage = 2;
        const totalPages = 3;

        // Обновление значения цены
        if (priceRange && priceValue) {
            priceRange.addEventListener('input', () => {
                priceValue.textContent = priceRange.value;
                filterItems();
            });
        }

        // Фильтрация и поиск
        function filterItems() {
            const searchTerm = searchInput.value.toLowerCase();
            const maxPrice = parseInt(priceRange.value);
            const selectedCategory = categoryFilter.value;

            let visibleItems = Array.from(items).filter(item => {
                const title = item.querySelector('h4').textContent.toLowerCase();
                const price = parseInt(item.getAttribute('data-price'));
                const category = item.getAttribute('data-category');

                return title.includes(searchTerm) &&
                       price <= maxPrice &&
                       (selectedCategory === 'all' || category === selectedCategory);
            });

            // Пагинация
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;

            items.forEach(item => item.style.display = 'none');
            visibleItems.slice(start, end).forEach(item => item.style.display = 'block');

            // Обновление кнопок пагинации
            prevPage.disabled = currentPage === 1;
            nextPage.disabled = currentPage === totalPages || visibleItems.length <= end;
            pageInfo.textContent = `${currentPage} / ${totalPages}`;
        }

        // События
        if (searchInput) searchInput.addEventListener('input', filterItems);
        if (categoryFilter) categoryFilter.addEventListener('change', filterItems);
        if (prevPage) prevPage.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                filterItems();
            }
        });
        if (nextPage) nextPage.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                filterItems();
            }
        });

        // Инициализация
        filterItems();
    }
});