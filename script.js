// script.js - модальные окна, кликабельные кнопки, переходы

document.addEventListener('DOMContentLoaded', () => {
    // Модальное окно
    const modal = document.getElementById('modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const welcomeBtn = document.getElementById('welcomeBtn');

    // Функция открытия модалки
    function openModal(title = 'Добро пожаловать!', message = 'Нажмите на любой турнир, чтобы узнать детали.') {
        const modalContent = document.querySelector('.modal-content');
        if (modalContent && !modalContent.querySelector('.custom-message')) {
            const existingH2 = modalContent.querySelector('h2');
            const existingP = modalContent.querySelector('p');
            if (existingH2) existingH2.innerHTML = title;
            if (existingP) existingP.innerHTML = message;
        }
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    if (welcomeBtn) {
        welcomeBtn.addEventListener('click', () => {
            openModal('🔥 Турниры ждут!', 'Выберите дисциплину на главной или перейдите в раздел CS2, Dota 2, Valorant.');
        });
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Функция для создания модального окна с деталями турнира
    function showTournamentDetails(tournamentName) {
        const detailsModal = document.createElement('div');
        detailsModal.className = 'modal';
        detailsModal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>📌 ${tournamentName}</h2>
                <p>Это топовый турнир по киберспорту с участием лучших команд мира. Следите за расписанием на официальном сайте!</p>
                <button class="modal-btn close-detail">Закрыть</button>
            </div>
        `;
        document.body.appendChild(detailsModal);
        detailsModal.style.display = 'block';

        const closeDetail = () => {
            detailsModal.remove();
        };

        detailsModal.querySelector('.close-modal').addEventListener('click', closeDetail);
        detailsModal.querySelector('.close-detail').addEventListener('click', closeDetail);
        detailsModal.addEventListener('click', (e) => {
            if (e.target === detailsModal) closeDetail();
        });
    }

    // Обработчики для кнопок "Подробнее" на всех турнирных карточках
    const detailButtons = document.querySelectorAll('.details-btn');
    detailButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const tournament = btn.getAttribute('data-tournament') || 'Турнир';
            showTournamentDetails(tournament);
        });
    });

    // Кликабельные кнопки на главной (переход на страницы игр)
    const cs2Btn = document.querySelector('.cs2-btn');
    const dota2Btn = document.querySelector('.dota2-btn');
    const valorantBtn = document.querySelector('.valorant-btn');

    if (cs2Btn) cs2Btn.addEventListener('click', () => window.location.href = 'cs2.html');
    if (dota2Btn) dota2Btn.addEventListener('click', () => window.location.href = 'dota2.html');
    if (valorantBtn) valorantBtn.addEventListener('click', () => window.location.href = 'valorant.html');

    // Клик по карточкам игр на главной (дополнительно)
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            const game = card.getAttribute('data-game');
            if (game === 'cs2') window.location.href = 'cs2.html';
            if (game === 'dota2') window.location.href = 'dota2.html';
            if (game === 'valorant') window.location.href = 'valorant.html';
        });
    });

    console.log('Сайт загружен, все кнопки и модальные окна работают!');
});