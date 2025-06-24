document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#contactForm');
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const messageInput = document.querySelector('#message');

    [nameInput, emailInput, messageInput].forEach(input => {
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.id = `${input.id}-error`;
        input.parentNode.insertBefore(errorMessage, input.nextSibling);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        [nameInput, emailInput, messageInput].forEach(input => {
            input.classList.remove('error');
            document.querySelector(`#${input.id}-error`).textContent = '';
        });

        if (!/^[a-zA-Zа-яА-ЯёЁ\s]{2,}$/.test(nameInput.value.trim())) {
            nameInput.classList.add('error');
            document.querySelector('#name-error').textContent = 'Имя должно содержать только буквы и быть не короче 2 символов';
            isValid = false;
        }

        // Валидация email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
            emailInput.classList.add('error');
            document.querySelector('#email-error').textContent = 'Введите корректный email';
            isValid = false;
        }

        if (messageInput.value.trim().length < 10) {
            messageInput.classList.add('error');
            document.querySelector('#message-error').textContent = 'Сообщение должно быть не короче 10 символов';
            isValid = false;
        }

        if (isValid) {
            alert('Форма успешно отправлена!'); 
            form.reset();
        }
    });
});