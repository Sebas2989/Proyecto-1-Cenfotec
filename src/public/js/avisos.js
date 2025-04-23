function toggleText(id) {
    const active = document.querySelector('.serviciosMenu .opcion-container.active');
    const current = document.getElementById(id).parentElement;
  
    // Cierra cualquier otra abierta
    if (active && active !== current) {
      active.classList.remove('active');
    }
  
    // Alternar la actual
    current.classList.toggle('active');
  }
  