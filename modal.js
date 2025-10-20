export class Modal {
  constructor(options = {}) {
    this.options = {
      title: 'Modal',
      content: '',
      showClose: true,
      closeOnBackdrop: true,
      animate: true,
      ...options
    };
    
    this.modal = null;
    this.isOpen = false;
    this.init();
  }

  init() {
    this.createModal();
    this.bindEvents();
  }

  createModal() {
    this.modal = document.createElement('div');
    this.modal.className = `modal ${this.options.animate ? 'modal--animate' : ''}`;
    this.modal.innerHTML = `
      <div class="modal__backdrop"></div>
      <div class="modal__container">
        <div class="modal__header">
          <h3 class="modal__title">${this.options.title}</h3>
          ${this.options.showClose ? '<button class="modal__close">&times;</button>' : ''}
        </div>
        <div class="modal__content">
          ${this.options.content}
        </div>
        <div class="modal__footer">
          <button class="modal__btn modal__btn--primary">Aceptar</button>
          <button class="modal__btn modal__btn--secondary">Cancelar</button>
        </div>
      </div>
    `;

    document.body.appendChild(this.modal);
  }

  bindEvents() {
    const closeBtn = this.modal.querySelector('.modal__close');
    const backdrop = this.modal.querySelector('.modal__backdrop');
    const cancelBtn = this.modal.querySelector('.modal__btn--secondary');
    const acceptBtn = this.modal.querySelector('.modal__btn--primary');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    if (this.options.closeOnBackdrop && backdrop) {
      backdrop.addEventListener('click', () => this.close());
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => this.close());
    }

    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        this.close();
        if (this.options.onAccept) {
          this.options.onAccept();
        }
      });
    }

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  open() {
    this.modal.classList.add('modal--open');
    this.isOpen = true;
    
    if (this.options.onOpen) {
      this.options.onOpen();
    }
  }

  close() {
    this.modal.classList.remove('modal--open');
    this.isOpen = false;
    
    if (this.options.onClose) {
      this.options.onClose();
    }
  }

  setContent(content) {
    const contentEl = this.modal.querySelector('.modal__content');
    contentEl.innerHTML = content;
  }

  setTitle(title) {
    const titleEl = this.modal.querySelector('.modal__title');
    titleEl.textContent = title;
  }

  destroy() {
    if (this.modal && this.modal.parentNode) {
      this.modal.parentNode.removeChild(this.modal);
    }
  }
}