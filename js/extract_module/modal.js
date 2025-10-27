export class ModalManager {
  constructor() {
    this.init();
    
  }

  init() {
    // Event listeners globales
    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('modal')) {
        this.close(event.target.id);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.closeAll();
      }
    });
  }

  open(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  }

  close(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  }

  closeAll() {
    const openModals = document.querySelectorAll('.modal[style*="display: block"]');
    openModals.forEach(modal => {
      this.close(modal.id);
    });
  }

  // Método para crear modales dinámicamente
  createModal(id, content) {
    const modalHTML = `
      <div id="${id}" class="modal">
        <div class="modal-content">
          <span class="close-button" onclick="modalManager.close('${id}')">&times;</span>
          ${content}
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }
}


// Inicializar
// const modalManager = new ModalManager();

// Uso:
// modalManager.open('miModal');
// modalManager.close('miModal');
// modalManager.createModal('nuevoModal', '<h2>Contenido</h2><p>Texto...</p>');