
// Route Planner JavaScript file

document.addEventListener('DOMContentLoaded', () => {
  // Initialize route planner
  initRoutePlanner();
});

// Initialize route planner
function initRoutePlanner() {
  const routePlanner = document.getElementById('route-planner');
  const routePlannerModal = document.getElementById('route-planner-modal');
  
  if (routePlanner) {
    // Page with embedded route planner
    updateRoutePlannerUI();
    initRoutePlannerControls();
  } else if (routePlannerModal) {
    // Page with modal route planner
    initRoutePlannerModal();
  }
}

// Initialize controls for embedded route planner
function initRoutePlannerControls() {
  const hideRouteBtn = document.getElementById('hide-route-btn');
  const clearRouteBtn = document.getElementById('clear-route-btn');
  const showMapBtn = document.getElementById('show-map-btn');
  const routeMapContainer = document.getElementById('route-map-container');
  
  if (hideRouteBtn) {
    hideRouteBtn.addEventListener('click', () => {
      const routePlanner = document.getElementById('route-planner');
      routePlanner.style.display = 'none';
    });
  }
  
  if (clearRouteBtn) {
    clearRouteBtn.addEventListener('click', clearRoute);
  }
  
  if (showMapBtn && routeMapContainer) {
    showMapBtn.addEventListener('click', () => {
      if (routeMapContainer.classList.contains('hidden')) {
        routeMapContainer.classList.remove('hidden');
        showMapBtn.textContent = 'Скрыть карту';
        initRouteMap('route-map');
      } else {
        routeMapContainer.classList.add('hidden');
        showMapBtn.textContent = 'Показать на карте';
      }
    });
  }
  
  // Initialize drag and drop for route items
  initDragAndDrop();
  
  // Update Yandex Maps link
  updateYandexMapsLink();
}

// Initialize route planner modal
function initRoutePlannerModal() {
  const routePlannerModal = document.getElementById('route-planner-modal');
  const closeModal = document.querySelector('.close-modal');
  const clearRouteBtn = document.getElementById('clear-route');
  const toggleMapBtn = document.getElementById('toggle-map');
  const routeMapContainer = document.getElementById('route-map-container');
  
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      routePlannerModal.classList.remove('open');
    });
  }
  
  if (clearRouteBtn) {
    clearRouteBtn.addEventListener('click', clearRoute);
  }
  
  if (toggleMapBtn && routeMapContainer) {
    toggleMapBtn.addEventListener('click', () => {
      if (routeMapContainer.classList.contains('hidden')) {
        routeMapContainer.classList.remove('hidden');
        toggleMapBtn.textContent = 'Скрыть карту';
        initRouteMap('route-map');
      } else {
        routeMapContainer.classList.add('hidden');
        toggleMapBtn.textContent = 'Показать на карте';
      }
    });
  }
  
  // Initialize drag and drop for route items
  initDragAndDrop();
  
  // Update Yandex Maps link
  updateYandexMapsLink();
}

// Update route planner UI with saved route
function updateRoutePlannerUI() {
  const selectedAttractionsList = document.getElementById('selected-attractions-list');
  const yandexMapsRouteLink = document.getElementById('yandex-maps-route-link');
  
  if (!selectedAttractionsList) return;
  
  const savedRoute = JSON.parse(localStorage.getItem('plannedRoute') || '[]');
  
  if (savedRoute.length === 0) {
    selectedAttractionsList.innerHTML = `
      <p class="empty-route-message">Маршрут не составлен. Выберите достопримечательности, которые хотите посетить.</p>
    `;
    if (yandexMapsRouteLink) {
      yandexMapsRouteLink.classList.add('hidden');
    }
    return;
  }
  
  if (yandexMapsRouteLink) {
    yandexMapsRouteLink.classList.remove('hidden');
  }
  
  selectedAttractionsList.innerHTML = '';
  
  savedRoute.forEach((attraction, index) => {
    const routeItem = document.createElement('div');
    routeItem.className = 'route-item';
    routeItem.setAttribute('draggable', 'true');
    routeItem.setAttribute('data-id', attraction.id);
    
    routeItem.innerHTML = `
      <div class="route-item-number">${index + 1}</div>
      <div class="route-item-content">
        <h4>${attraction.name}</h4>
        <p>${attraction.address || ''}</p>
      </div>
      <button class="route-item-remove" data-id="${attraction.id}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    `;
    
    selectedAttractionsList.appendChild(routeItem);
  });
  
  // Add event listeners for remove buttons
  document.querySelectorAll('.route-item-remove').forEach(button => {
    button.addEventListener('click', () => {
      const attractionId = parseInt(button.dataset.id);
      removeFromRoute(attractionId);
      updateRoutePlannerUI();
      
      // Update "Add to route" buttons on the page
      const addButton = document.querySelector(`.add-to-route[data-id="${attractionId}"]`);
      if (addButton) {
        updateAddButtonState(addButton, false);
      }
    });
  });
  
  // Update Yandex Maps link
  updateYandexMapsLink();
}

// Initialize drag and drop for route items
function initDragAndDrop() {
  let draggedItem = null;
  
  document.addEventListener('dragstart', e => {
    if (e.target.classList.contains('route-item')) {
      draggedItem = e.target;
      e.target.classList.add('dragging');
    }
  });
  
  document.addEventListener('dragend', e => {
    if (e.target.classList.contains('route-item')) {
      e.target.classList.remove('dragging');
    }
  });
  
  document.addEventListener('dragover', e => {
    e.preventDefault();
    
    if (draggedItem) {
      const selectedAttractionsList = document.getElementById('selected-attractions-list');
      const routeItems = Array.from(selectedAttractionsList.querySelectorAll('.route-item'));
      
      if (routeItems.length <= 1) return;
      
      const targetItem = e.target.closest('.route-item');
      if (targetItem && targetItem !== draggedItem) {
        // Determine if dragging upward or downward
        const targetRect = targetItem.getBoundingClientRect();
        const targetCenter = targetRect.top + targetRect.height / 2;
        const isAfter = e.clientY > targetCenter;
        
        if (isAfter) {
          selectedAttractionsList.insertBefore(draggedItem, targetItem.nextSibling);
        } else {
          selectedAttractionsList.insertBefore(draggedItem, targetItem);
        }
        
        // Update route order in localStorage
        updateRouteOrder();
      }
    }
  });
}

// Update route order after drag and drop
function updateRouteOrder() {
  const selectedAttractionsList = document.getElementById('selected-attractions-list');
  const routeItems = Array.from(selectedAttractionsList.querySelectorAll('.route-item'));
  
  // Get current route from localStorage
  const currentRoute = JSON.parse(localStorage.getItem('plannedRoute') || '[]');
  
  // Create new ordered route based on DOM order
  const newOrderedRoute = routeItems.map(item => {
    const attractionId = parseInt(item.dataset.id);
    return currentRoute.find(attraction => attraction.id === attractionId);
  });
  
  // Save new order to localStorage
  localStorage.setItem('plannedRoute', JSON.stringify(newOrderedRoute));
  
  // Update UI to reflect new order
  updateRoutePlannerUI();
  
  // If map is visible, reinitialize it
  const routeMapContainer = document.getElementById('route-map-container');
  if (routeMapContainer && !routeMapContainer.classList.contains('hidden')) {
    initRouteMap('route-map');
  }
}

// Clear entire route
function clearRoute() {
  localStorage.removeItem('plannedRoute');
  updateRoutePlannerUI();
  
  // Update all "Add to route" buttons on the page
  document.querySelectorAll('.add-to-route').forEach(button => {
    updateAddButtonState(button, false);
  });
}

// Update Yandex Maps link
function updateYandexMapsLink() {
  const yandexMapsLink = document.getElementById('yandex-maps-link') || document.getElementById('yandex-maps-route-link');
  if (!yandexMapsLink) return;
  
  const savedRoute = JSON.parse(localStorage.getItem('plannedRoute') || '[]');
  
  if (savedRoute.length === 0) {
    yandexMapsLink.href = '#';
    yandexMapsLink.classList.add('hidden');
    return;
  }
  
  yandexMapsLink.classList.remove('hidden');
  
  // Create Yandex Maps route URL
  const routePoints = savedRoute.map(attraction => {
    // Use coordinates if available, otherwise use address
    if (attraction.coordinates && attraction.coordinates.length === 2) {
      return attraction.coordinates.join(',');
    }
    return attraction.address;
  }).join('~');
  
  yandexMapsLink.href = `https://yandex.ru/maps/?mode=routes&rtext=${routePoints}&rtt=auto`;
}
