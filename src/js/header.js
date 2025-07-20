/**
 * Header Responsivo - Controle de menu mobile
 * (Header Responsivo - Controle de menu mobile)
 */
(function() {
    'use strict';
    
    // DOM Elements (Elementos DOM)
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const body = document.body;
    
    // Create overlay element (Criar elemento de overlay)
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    body.appendChild(overlay);
    
    /**
     * Toggle mobile menu visibility
     * (Alternar visibilidade do menu mobile)
     */
    function toggleMenu() {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        
        menuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Update accessibility attributes (Atualizar atributos de acessibilidade)
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        
        // Prevent body scrolling when menu is open
        // (Impedir rolagem do body quando o menu está aberto)
        body.style.overflow = isExpanded ? '' : 'hidden';
    }
    
    /**
     * Close mobile menu
     * (Fechar menu mobile)
     */
    function closeMenu() {
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    }
    
    /**
     * Handle click on menu items to close menu on mobile
     * (Manipular clique nos itens de menu para fechar o menu em dispositivos móveis)
     * @param {Event} e - Click event (Evento de clique)
     */
    function handleMenuItemClick(e) {
        if (window.innerWidth <= 768) {
            const target = e.target;
            if (target.classList.contains('nav-link')) {
                closeMenu();
            }
        }
    }
    
    /**
     * Handle window resize to fix menu state on viewport changes
     * (Manipular redimensionamento da janela para corrigir estado do menu em mudanças de viewport)
     */
    function handleResize() {
        if (window.innerWidth > 768) {
            closeMenu();
            body.style.overflow = '';
        }
    }
    
    /**
     * Initialize event listeners
     * (Inicializar listeners de eventos)
     */
    function init() {
        menuToggle.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', closeMenu);
        mainNav.addEventListener('click', handleMenuItemClick);
        window.addEventListener('resize', handleResize);
        
        // Add keyboard accessibility (Adicionar acessibilidade por teclado)
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMenu();
            }
        });
        
        // Theme toggle functionality (Funcionalidade de alternar tema)
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                document.body.classList.toggle('dark-theme');
                const isDarkTheme = document.body.classList.contains('dark-theme');
                localStorage.setItem('darkTheme', isDarkTheme);
            });
            
            // Check for saved theme preference (Verificar preferência de tema salva)
            if (localStorage.getItem('darkTheme') === 'true') {
                document.body.classList.add('dark-theme');
            }
        }
    }
    
    // Initialize when DOM is loaded (Inicializar quando o DOM estiver carregado)
    document.addEventListener('DOMContentLoaded', init);
})();