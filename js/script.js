document.addEventListener('DOMContentLoaded', function() {
  var windowEl = window,
      html = document.documentElement,
      body = document.body,
      scrollbarWidth = window.innerWidth - document.body.scrollWidth,
      touchStartY;

  windowEl.addEventListener('touchstart', function(event) {
    touchStartY = event.changedTouches[0].screenY;
  });

  document.querySelectorAll('.js-modal').forEach(function(modalTrigger) {
    modalTrigger.addEventListener('click', function() {
      var overlay = modalTrigger.nextElementSibling;
      windowEl.addEventListener('touchmove', touchMoveHandler, { passive: false });
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      if (scrollbarWidth) {
        html.style.paddingRight = scrollbarWidth + 'px';
      }
      overlay.style.display = 'block';
      overlay.style.opacity = 1;
      overlay.style.transition = 'opacity 0.3s';

      var touchMoveHandler = function(event) {
        var currentY = event.changedTouches[0].screenY,
            height = overlay.offsetHeight,
            isTop = touchStartY <= currentY && overlay.scrollTop === 0,
            isBottom = touchStartY >= currentY && overlay.scrollHeight - overlay.scrollTop === height;
        if (isTop || isBottom) {
          event.preventDefault();
        }
      };

      var closeModal = function() {
        body.style.removeProperty('overflow');
        html.style.removeProperty('overflow');
        html.style.removeProperty('padding-right');
        windowEl.removeEventListener('touchmove', touchMoveHandler);
        overlay.style.transition = 'opacity 0.3s';
        overlay.style.opacity = 0;
        setTimeout(function() {
          overlay.scrollTop = 0;
          overlay.style.display = 'none';
          overlay.style.removeProperty('style');
          html.style.removeProperty('style');
        }, 300);
      };

      overlay.addEventListener('click', function(event) {
        if (!event.target.closest('.modal-contents')) {
          closeModal();
        }
      });

      overlay.querySelector('.modal-button').addEventListener('click', function() {
        closeModal();
      });
    });
  });
});