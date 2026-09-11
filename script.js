/* ==========================================================================
   UAI BARBEARIA — script.js
   Funcionalidades:
     1. Menu hambúrguer (abrir / fechar) no mobile
     2. Fechar o menu ao clicar em um link de navegação
     3. Scroll suave ao clicar nos links do menu
     4. Header dinâmico ao rolar a página
     5. Animação "Scroll Reveal" com IntersectionObserver
     6. Link ativo no menu conforme a seção visível
     7. Botão flutuante do WhatsApp (só aparece quando não há outro CTA na tela)
     8. Ano atual no rodapé
     8. Botão flutuante do WhatsApp (evita CTA duplicado na tela)
   ========================================================================== */

(function () {
  'use strict';

  /* =========================================================================
     REFERÊNCIAS DO DOM
     ========================================================================= */
  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelectorAll('.nav__link');
  const yearEl = document.getElementById('year');

  /* =========================================================================
     1. MENU HAMBÚRGUER (MOBILE)
     ========================================================================= */
  function openMenu() {
    nav.classList.add('is-open');
    hamburger.classList.add('is-active');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Fechar menu de navegação');
    document.body.classList.add('no-scroll'); // impede o scroll do fundo
  }

  function closeMenu() {
    nav.classList.remove('is-open');
    hamburger.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Abrir menu de navegação');
    document.body.classList.remove('no-scroll');
  }

  function toggleMenu() {
    if (nav.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (hamburger && nav) {
    hamburger.addEventListener('click', function (event) {
      event.stopPropagation();
      toggleMenu();
    });

    // Fecha o menu ao clicar fora dele (apenas quando estiver aberto)
    document.addEventListener('click', function (event) {
      const menuAberto = nav.classList.contains('is-open');
      if (!menuAberto) return;

      // Ignora cliques dentro do menu ou no próprio botão hambúrguer
      if (nav.contains(event.target) || hamburger.contains(event.target)) return;

      closeMenu();
    });

    // Fecha o menu com a tecla ESC (acessibilidade)
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu();
        hamburger.focus();
      }
    });

    // Se a janela for redimensionada para desktop, garante o menu fechado
    window.addEventListener('resize', function () {
      if (window.innerWidth > 992 && nav.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  /* =========================================================================
     2. FECHAR O MENU AO CLICAR EM UM LINK + 3. SCROLL SUAVE
     ========================================================================= */
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      const targetId = link.getAttribute('href');

      // Ignora links externos ou âncoras vazias
      if (!targetId || targetId.charAt(0) !== '#') return;

      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      event.preventDefault();

      // Fecha o menu mobile imediatamente
      closeMenu();

      // Altura atual do header para compensar o offset da seção fixa
      const headerHeight = header ? header.offsetHeight : 0;

      // Pequeno atraso para o menu terminar de fechar antes de rolar
      window.setTimeout(function () {
        const top = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight + 1;

        window.scrollTo({
          top: top,
          behavior: 'smooth'
        });
      }, 120);
    });
  });

  /* =========================================================================
     4. HEADER DINÂMICO AO ROLAR
     ========================================================================= */
  function handleHeaderOnScroll() {
    if (!header) return;

    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  /* =========================================================================
     5. SCROLL REVEAL (IntersectionObserver)
     ========================================================================= */
  const revealElements = document.querySelectorAll('.reveal');

  function initScrollReveal() {
    // Fallback: navegadores sem suporte exibem tudo de uma vez
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target); // anima apenas uma vez
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* =========================================================================
     6. LINK ATIVO NO MENU CONFORME A SEÇÃO VISÍVEL
     ========================================================================= */
  function initActiveLinkOnScroll() {
    const sections = document.querySelectorAll('section[id], footer[id]');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute('id');

        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      });
    }, {
      threshold: 0.35,
      rootMargin: '-25% 0px -55% 0px'
    });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* =========================================================================
     7. ANO ATUAL NO RODAPÉ
     ========================================================================= */
  function initCurrentYear() {
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  /* =========================================================================
     8. BOTÃO FLUTUANTE DO WHATSAPP (evita CTA duplicado na tela)
     ---------------------------------------------------------------------
     O botão flutuante só aparece quando NENHUM outro botão de WhatsApp
     está visível. Assim ele nunca fica redundante com o botão do Hero,
     o do Sobre ou o do rodapé.
     ========================================================================= */
  function initFloatingWhatsApp() {
    const floatBtn = document.querySelector('.whatsapp-float');
    if (!floatBtn) return;

    // Todos os botões (.btn) que levam para o WhatsApp.
    // Os links pequenos dos cards usam .card__link e ficam de fora de propósito,
    // senão o botão flutuante piscaria a cada card visível.
    const whatsappButtons = document.querySelectorAll('a.btn[href*="wa.me"]');

    // Fallback: sem suporte a IntersectionObserver, mostra o botão direto
    if (!whatsappButtons.length || !('IntersectionObserver' in window)) {
      floatBtn.classList.add('is-visible');
      return;
    }

    // Guarda quais botões estão visíveis no momento
    const visibleButtons = new Set();

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          visibleButtons.add(entry.target);
        } else {
          visibleButtons.delete(entry.target);
        }
      });

      // Só mostra o flutuante quando não há nenhum CTA de WhatsApp na tela
      floatBtn.classList.toggle('is-visible', visibleButtons.size === 0);
    }, {
      threshold: 0
    });

    whatsappButtons.forEach(function (button) {
      observer.observe(button);
    });
  }

  /* =========================================================================
     INICIALIZAÇÃO
     ========================================================================= */
  document.addEventListener('DOMContentLoaded', function () {
    handleHeaderOnScroll();
    initScrollReveal();
    initActiveLinkOnScroll();
    initFloatingWhatsApp();
    initCurrentYear();
  });

  // Listener único de scroll (passa também on-scroll para o header)
  window.addEventListener('scroll', handleHeaderOnScroll, { passive: true });

})();
