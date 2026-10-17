// Меню роллов
const sushiData = [
    { id: 1, emoji: '🍣', name: 'Филадельфия', desc: 'Лосось, сыр, огурец', price: 490 },
    { id: 2, emoji: '🍱', name: 'Калифорния', desc: 'Краб, авокадо, икра', price: 450 },
    { id: 3, emoji: '🍤', name: 'Дракон', desc: 'Угорь, креветка, авокадо', price: 590 },
    { id: 4, emoji: '🥢', name: 'Аляска', desc: 'Лосось, сыр, рис', price: 520 },
    { id: 5, emoji: '🍥', name: 'Красный дракон', desc: 'Тунец, огурец', price: 560 },
    { id: 6, emoji: '🍚', name: 'Спайси', desc: 'Лосось, острый соус', price: 480 },
];

// Корзина
let cart = [];

// Рендер меню
const menuGrid = document.getElementById('menuGrid');
menuGrid.innerHTML = sushiData.map(item => `
    <div class="menu-card">
        <div class="menu-card-emoji">${item.emoji}</div>
        <div class="menu-card-title">${item.name}</div>
        <div class="menu-card-desc">${item.desc}</div>
        <div class="menu-card-footer">
            <div class="menu-card-price">${item.price} ₽</div>
            <button class="menu-card-btn" data-id="${item.id}">+ В корзину</button>
        </div>
    </div>
`).join('');

// Добавление в корзину
document.querySelectorAll('.menu-card-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        const item = sushiData.find(i => i.id === id);
        const existing = cart.find(i => i.id === id);
        if (existing) {
            existing.qty++;
        } else {
            cart.push({ ...item, qty: 1 });
        }
        updateCart();
        btn.textContent = '✓ Добавлено';
        setTimeout(() => btn.textContent = '+ В корзину', 1000);
    });
});

// Обновление корзины
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

function updateCart() {
    const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
    cartCount.textContent = totalQty;

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="cart-empty">Корзина пуста</div>';
        cartTotal.textContent = '0 ₽';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div style="display: flex; gap: 12px; padding: 12px; background: #f8f0e8; border-radius: 12px; align-items: center;">
            <div style="font-size: 32px;">${item.emoji}</div>
            <div style="flex: 1;">
                <div style="font-weight: 700; font-size: 14px;">${item.name}</div>
                <div style="font-size: 13px; color: #ff3c5a; font-weight: 700;">${item.price} ₽ × ${item.qty}</div>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    cartTotal.textContent = total.toLocaleString('ru-RU') + ' ₽';
}

// Открытие/закрытие корзины
const cartModal = document.getElementById('cartModal');
const cartOverlay = document.getElementById('cartOverlay');

document.getElementById('cartBtn').addEventListener('click', () => {
    cartModal.classList.add('show');
    cartOverlay.classList.add('show');
});

document.getElementById('cartClose').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

function closeCart() {
    cartModal.classList.remove('show');
    cartOverlay.classList.remove('show');
}

// Оформление заказа
document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Корзина пуста');
        return;
    }
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    alert('Заказ оформлен! Сумма: ' + total.toLocaleString('ru-RU') + ' ₽');
    cart = [];
    updateCart();
    closeCart();
});