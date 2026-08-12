document.addEventListener('DOMContentLoaded', function () {
  initBurgerMenu();
  initMobileAccordion();
  initMegaMenu();
  initQuiz();
  initGallery();
  initSpecTabs();
  initPricing();
  initStickyBar();
  initVideoMute();
});

function initBurgerMenu() {
  var burger = document.querySelector('[data-burger]');
  var panel = document.querySelector('[data-mobile-panel]');
  var header = document.querySelector('.site-header');
  if (!burger || !panel) return;
  function closeAll() {
    burger.classList.remove('open');
    panel.classList.remove('open');
    if (header) header.classList.remove('menu-open');
    document.querySelectorAll('.mobile-section.open').forEach(function (s) { s.classList.remove('open'); });
  }
  burger.addEventListener('click', function () {
    var opening = !panel.classList.contains('open');
    burger.classList.toggle('open', opening);
    panel.classList.toggle('open', opening);
    if (header) header.classList.toggle('menu-open', opening);
    if (!opening) document.querySelectorAll('.mobile-section.open').forEach(function (s) { s.classList.remove('open'); });
  });
  panel.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeAll); });
}

function initMobileAccordion() {
  document.querySelectorAll('.mobile-section-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var section = btn.closest('.mobile-section');
      var isOpen = section.classList.contains('open');
      document.querySelectorAll('.mobile-section.open').forEach(function (s) { s.classList.remove('open'); });
      if (!isOpen) section.classList.add('open');
    });
  });
}

function initMegaMenu() {
  var triggers = document.querySelectorAll('[data-mega-trigger]');
  if (!triggers.length) return;
  function closeAll() {
    document.querySelectorAll('.mega-menu').forEach(function (m) { m.classList.remove('open'); });
  }
  function openMenu(key) {
    document.querySelectorAll('.mega-menu').forEach(function (m) { m.classList.toggle('open', m.getAttribute('data-mega') === key); });
  }
  triggers.forEach(function (link) {
    var key = link.getAttribute('data-mega-trigger');
    link.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var menu = document.querySelector('.mega-menu[data-mega="' + key + '"]');
      if (menu && menu.classList.contains('open')) closeAll();
      else openMenu(key);
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.mega-menu') && !e.target.closest('[data-mega-trigger]')) closeAll();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });
}

function initQuiz() {
  var root = document.querySelector('[data-quiz]');
  if (!root) return;
  var steps = root.querySelectorAll('.quiz-step');
  function show(n) { steps.forEach(function (s) { s.classList.toggle('active', s.getAttribute('data-step') === n); }); }
  root.querySelectorAll('[data-quiz-next]').forEach(function (btn) {
    btn.addEventListener('click', function () { show(btn.getAttribute('data-quiz-next')); });
  });
  root.querySelectorAll('[data-quiz-back]').forEach(function (btn) {
    btn.addEventListener('click', function () { show(btn.getAttribute('data-quiz-back')); });
  });
}

function initGallery() {
  var stage = document.querySelector('[data-gallery]');
  if (!stage) return;
  var imgs = stage.querySelectorAll('img');
  var thumbs = document.querySelectorAll('[data-thumb]');
  thumbs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var idx = btn.getAttribute('data-thumb');
      imgs.forEach(function (img) { img.classList.toggle('active', img.getAttribute('data-shot') === idx); });
      thumbs.forEach(function (b) { b.classList.toggle('active', b === btn); });
    });
  });
}

function initSpecTabs() {
  var tabs = document.querySelectorAll('[data-spec-tab]');
  if (!tabs.length) return;
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var key = tab.getAttribute('data-spec-tab');
      tabs.forEach(function (t) { t.classList.toggle('active', t === tab); });
      document.querySelectorAll('[data-spec-table]').forEach(function (tbl) { tbl.classList.toggle('active', tbl.getAttribute('data-spec-table') === key); });
    });
  });
}

function initPricing() {
  var root = document.querySelector('[data-pricing]');
  if (!root) return;
  var rates = { 24: { weekly: 26.77, fortnightly: 53.54 }, 12: { weekly: 40.17, fortnightly: 80.33 } };
  var state = { term: 24, cycle: 'weekly' };
  function money(n) { return '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function render() {
    var weekly = rates[state.term];
    var amount = state.cycle === 'weekly' ? weekly.weekly : weekly.fortnightly;
    root.querySelectorAll('[data-term]').forEach(function (b) { b.classList.toggle('active', +b.getAttribute('data-term') === state.term); });
    root.querySelectorAll('[data-cycle]').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-cycle') === state.cycle); });
    var mainEl = root.querySelector('[data-price-main]');
    var unitEl = root.querySelector('[data-price-unit]');
    var mainText, unitText;
    mainText = money(amount); unitText = state.cycle === 'weekly' ? 'per week' : 'per fortnight';
    if (mainEl) mainEl.textContent = mainText;
    if (unitEl) unitEl.textContent = unitText;
    var stickyMain = document.querySelector('[data-sticky-price-main]');
    var stickyUnit = document.querySelector('[data-sticky-price-unit]');
    var stickyTerm = document.querySelector('[data-sticky-term]');
    if (stickyMain) stickyMain.textContent = mainText;
    if (stickyUnit) stickyUnit.textContent = unitText;
    if (stickyTerm) stickyTerm.textContent = state.term + ' months · ' + (state.cycle === 'weekly' ? 'weekly' : 'fortnightly');
  }
  root.querySelectorAll('[data-term]').forEach(function (b) { b.addEventListener('click', function () { state.term = +b.getAttribute('data-term'); render(); }); });
  root.querySelectorAll('[data-cycle]').forEach(function (b) { b.addEventListener('click', function () { state.cycle = b.getAttribute('data-cycle'); render(); }); });
  render();
}

function initStickyBar() {
  var bar = document.querySelector('[data-sticky-bar]');
  if (!bar) return;
  window.addEventListener('scroll', function () { bar.classList.toggle('show', window.scrollY > 900); }, { passive: true });
}

function initVideoMute() {
  var v = document.querySelector('[data-hero-video]');
  if (!v) return;
  v.muted = true; v.defaultMuted = true; v.volume = 0;
  v.addEventListener('loadedmetadata', function () { v.muted = true; });
  v.addEventListener('play', function () { v.muted = true; });
}
