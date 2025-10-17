// ArtConnect - Red Social para Creadores
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar año actual en el footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Smooth scrolling para enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animación del balance de la billetera
    const balanceElement = document.querySelector('.balance-amount');
    if (balanceElement) {
        animateBalance(balanceElement);
    }

    // Event listeners para botones
    initializeEventListeners();

    // Efectos de hover para tarjetas
    initializeCardEffects();

    // Sistema de modal
    initializeModalSystem();

    console.log('ArtConnect - Red Social cargada correctamente');
});

function animateBalance(element) {
    let balance = 0;
    const targetBalance = 1250;
    const increment = targetBalance / 50;
    
    const updateBalance = () => {
        if (balance < targetBalance) {
            balance += increment;
            element.textContent = '$' + Math.round(balance).toLocaleString();
            setTimeout(updateBalance, 30);
        } else {
            element.textContent = '$' + targetBalance.toLocaleString();
        }
    };

    // Iniciar animación cuando la sección de billetera esté en vista
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateBalance();
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(document.querySelector('.wallet-section'));
}

function initializeEventListeners() {
    // Botones de autenticación
    document.getElementById('loginBtn')?.addEventListener('click', () => {
        showModal('Iniciar Sesión', `
            <div class="auth-form">
                <h3>Bienvenido de vuelta</h3>
                <form id="loginForm">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" placeholder="tu@email.com" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Contraseña</label>
                        <input type="password" id="password" placeholder="••••••••" required>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 20px;">Iniciar Sesión</button>
                </form>
                <p style="text-align: center; margin-top: 15px; font-size: 14px;">
                    ¿No tienes cuenta? <a href="#" style="color: var(--primary);" id="switchToRegister">Regístrate aquí</a>
                </p>
            </div>
        `);
    });

    document.getElementById('registerBtn')?.addEventListener('click', () => {
        showModal('Crear Cuenta', `
            <div class="auth-form">
                <h3>Únete a ArtConnect</h3>
                <form id="registerForm">
                    <div class="form-group">
                        <label for="fullName">Nombre Completo</label>
                        <input type="text" id="fullName" placeholder="Tu nombre completo" required>
                    </div>
                    <div class="form-group">
                        <label for="registerEmail">Email</label>
                        <input type="email" id="registerEmail" placeholder="tu@email.com" required>
                    </div>
                    <div class="form-group">
                        <label for="registerPassword">Contraseña</label>
                        <input type="password" id="registerPassword" placeholder="••••••••" required>
                    </div>
                    <div class="form-group">
                        <label for="userType">Tipo de Creador</label>
                        <select id="userType" required>
                            <option value="">Selecciona tu perfil</option>
                            <option value="artist">Artista Visual</option>
                            <option value="designer">Diseñador</option>
                            <option value="musician">Músico</option>
                            <option value="writer">Escritor</option>
                            <option value="entrepreneur">Emprendedor Creativo</option>
                            <option value="other">Otro</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 20px;">Crear Cuenta</button>
                </form>
            </div>
        `);
    });

    // Botones de acción principales
    document.getElementById('ctaMain')?.addEventListener('click', () => {
        showModal('Comenzar en ArtConnect', `
            <div style="text-align: center;">
                <h3>¡Estás a un paso de unirte!</h3>
                <p>Elige cómo quieres comenzar:</p>
                <div style="display: flex; gap: 15px; margin-top: 25px; flex-direction: column;">
                    <button class="btn btn-primary" onclick="document.getElementById('registerBtn').click()">
                        Crear Cuenta Gratis
                    </button>
                    <button class="btn btn-outline" onclick="showDemoTour()">
                        Ver Tour de Demostración
                    </button>
                </div>
            </div>
        `);
    });

    document.getElementById('demoBtn')?.addEventListener('click', showDemoTour);

    // Botones de la billetera
    document.querySelectorAll('.wallet-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            handleWalletAction(action);
        });
    });

    // Enlaces legales
    document.getElementById('termsLink')?.addEventListener('click', (e) => {
        e.preventDefault();
        showLegalModal('Términos y Condiciones');
    });

    document.getElementById('privacyLink')?.addEventListener('click', (e) => {
        e.preventDefault();
        showLegalModal('Política de Privacidad');
    });

    // Botón unirse ahora
    document.getElementById('joinNow')?.addEventListener('click', () => {
        document.getElementById('registerBtn').click();
    });
}

function initializeCardEffects() {
    // Efecto de parallax suave en scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-visual, .feature-card');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

function initializeModalSystem() {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-modal');

    // Cerrar modal al hacer clic en la X
    closeBtn?.addEventListener('click', closeModal);

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function showModal(title, content) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2 style="margin-bottom: 20px; color: var(--primary);">${title}</h2>
        ${content}
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showDemoTour() {
    showModal('Tour de Demostración', `
        <div class="demo-tour">
            <h3>Descubre ArtConnect</h3>
            <div class="tour-steps">
                <div class="tour-step">
                    <strong>1. Crea tu Perfil</strong>
                    <p>Muestra tu trabajo y conecta con otros creadores</p>
                </div>
                <div class="tour-step">
                    <strong>2. Explora Proyectos</strong>
                    <p>Descubre iniciativas creativas y colabora</p>
                </div>
                <div class="tour-step">
                    <strong>3. Usa la Billetera</strong>
                    <p>Gestiona tus ingresos y participa en rondas de ayuda</p>
                </div>
                <div class="tour-step">
                    <strong>4. Crece Juntos</strong>
                    <p>Forma parte de una comunidad que se apoya mutuamente</p>
                </div>
            </div>
            <button class="btn btn-primary" style="width: 100%; margin-top: 20px;" onclick="closeModal(); document.getElementById('registerBtn').click();">
                Comenzar Ahora
            </button>
        </div>
        
        <style>
            .tour-steps {
                margin: 25px 0;
            }
            .tour-step {
                background: var(--light);
                padding: 15px;
                border-radius: 8px;
                margin-bottom: 10px;
            }
            .tour-step strong {
                color: var(--primary);
            }
            .tour-step p {
                margin: 5px 0 0 0;
                font-size: 14px;
                color: var(--gray);
            }
        </style>
    `);
}

function handleWalletAction(action) {
    const actions = {
        send: {
            title: 'Enviar Dinero',
            content: `
                <div class="wallet-action-form">
                    <h3>Enviar Fondos</h3>
                    <form>
                        <div class="form-group">
                            <label for="recipient">Destinatario</label>
                            <input type="text" id="recipient" placeholder="Usuario o email" required>
                        </div>
                        <div class="form-group">
                            <label for="amount">Cantidad</label>
                            <input type="number" id="amount" placeholder="0.00" min="0.01" step="0.01" required>
                        </div>
                        <div class="form-group">
                            <label for="message">Mensaje (opcional)</label>
                            <textarea id="message" placeholder="Añade un mensaje..." rows="3"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%;">Enviar</button>
                    </form>
                </div>
            `
        },
        receive: {
            title: 'Recibir Dinero',
            content: `
                <div class="wallet-action-form" style="text-align: center;">
                    <h3>Recibir Fondos</h3>
                    <div style="background: var(--light); padding: 20px; border-radius: 10px; margin: 20px 0;">
                        <p><strong>Tu ID de ArtConnect:</strong></p>
                        <p style="font-family: monospace; background: white; padding: 10px; border-radius: 5px; word-break: break-all;">
                            user_${Math.random().toString(36).substr(2, 9)}
                        </p>
                    </div>
                    <p>Comparte este ID para recibir pagos de otros usuarios</p>
                    <button class="btn btn-outline" style="width: 100%; margin-top: 10px;">
                        Copiar ID
                    </button>
                </div>
            `
        },
        exchange: {
            title: 'Canjear Monedas',
            content: `
                <div class="wallet-action-form">
                    <h3>Canjear ArtConnect Coins</h3>
                    <form>
                        <div class="form-group">
                            <label for="fromCurrency">De</label>
                            <select id="fromCurrency">
                                <option value="atc">ArtConnect Coins (ATC)</option>
                                <option value="usd">Dólares (USD)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="toCurrency">A</label>
                            <select id="toCurrency">
                                <option value="usd">Dólares (USD)</option>
                                <option value="atc">ArtConnect Coins (ATC)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="exchangeAmount">Cantidad</label>
                            <input type="number" id="exchangeAmount" placeholder="0.00" min="0.01" step="0.01" required>
                        </div>
                        <div style="background: var(--light); padding: 15px; border-radius: 8px; margin: 15px 0;">
                            <p><strong>Tasa de cambio:</strong> 1 ATC = $10.00 USD</p>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%;">Canjear</button>
                    </form>
                </div>
            `
        }
    };

    if (actions[action]) {
        showModal(actions[action].title, actions[action].content);
    }
}

function showLegalModal(type) {
    const content = {
        'Términos y Condiciones': `
            <div style="max-height: 400px; overflow-y: auto;">
                <h3>Términos y Condiciones de Uso</h3>
                <p><strong>Última actualización:</strong> ${new Date().toLocaleDateString()}</p>
                
                <h4>1. Aceptación de los Términos</h4>
                <p>Al acceder y utilizar ArtConnect, aceptas cumplir con estos términos y condiciones.</p>
                
                <h4>2. Servicios de Billetera Digital</h4>
                <p>La billetera digital está diseñada para transacciones entre miembros de la comunidad. Todas las transacciones están sujetas a verificación.</p>
                
                <h4>3. Propiedad Intelectual</h4>
                <p>Los usuarios mantienen los derechos de su contenido creativo. ArtConnect solo tiene licencia para mostrar y distribuir según la configuración de privacidad.</p>
                
                <h4>4. Sistema de Ayuda Mutua</h4>
                <p>La participación en rondas de financiamiento implica aceptar los términos específicos del modelo de ayuda mutua.</p>
                
                <p><em>Este es un documento de ejemplo. Para producción, consulta con un abogado especializado.</em></p>
            </div>
        `,
        'Política de Privacidad': `
            <div style="max-height: 400px; overflow-y: auto;">
                <h3>Política de Privacidad</h3>
                <p><strong>Última actualización:</strong> ${new Date().toLocaleDateString()}</p>
                
                <h4>1. Información que Recopilamos</h4>
                <p>Recopilamos información que nos proporcionas directamente, como nombre, email, información de perfil y contenido que publicas.</p>
                
                <h4>2. Uso de la Información</h4>
                <p>Utilizamos tu información para proporcionar y mejorar nuestros servicios, procesar transacciones y comunicarnos contigo.</p>
                
                <h4>3. Billetera Digital y Datos Financieros</h4>
                <p>Los datos financieros se procesan de forma segura y se almacenan cifrados. Cumplimos con las regulaciones aplicables de protección de datos financieros.</p>
                
                <h4>4. Compartir Información</h4>
                <p>No vendemos tu información personal. Compartimos información limitada necesaria para el funcionamiento de los servicios.</p>
                
                <p><em>Este es un documento de ejemplo. Para producción, desarrolla una política completa con asesoría legal.</em></p>
            </div>
        `
    };

    showModal(type, content[type] || '<p>Contenido no disponible.</p>');
}

// Efectos visuales adicionales
function addLoadingAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .loading {
            animation: pulse 2s infinite;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
            color: var(--dark);
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid var(--gray-light);
            border-radius: 8px;
            font-size: 14px;
            transition: border-color 0.3s;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--primary);
        }
    `;
    document.head.appendChild(style);
}

// Inicializar efectos de carga
addLoadingAnimation();