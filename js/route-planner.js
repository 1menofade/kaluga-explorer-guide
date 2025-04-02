
// Route Planner JavaScript

document.addEventListener('DOMContentLoaded', () => {
  initRoutePlanner();
});

// Initialize the route planner
function initRoutePlanner() {
  const routePlanner = document.getElementById('route-planner');
  const selectedAttractionsList = document.getElementById('selected-attractions-list');
  const clearRouteBtn = document.getElementById('clear-route-btn');
  const hideRouteBtn = document.getElementById('hide-route-btn');
  const showMapBtn = document.getElementById('show-map-btn');
  const routeMapContainer = document.getElementById('route-map-container');
  const yandexMapsRouteLink = document.getElementById('yandex-maps-route-link');
  
  if (!routePlanner) return;
  
  // Load selected attractions from localStorage
  const selectedAttractions = JSON.parse(localStorage.getItem('selectedAttractions') || '[]');
  
  // Render selected attractions
  renderSelectedAttractions();
  
  // Add event listeners
  if (clearRouteBtn) {
    clearRouteBtn.addEventListener('click', clearRoute);
  }
  
  if (hideRouteBtn) {
    hideRouteBtn.addEventListener('click', hideRoute);
  }
  
  if (showMapBtn) {
    showMapBtn.addEventListener('click', toggleMap);
  }
  
  // Function to render selected attractions
  function renderSelectedAttractions() {
    if (!selectedAttractionsList) return;
    
    if (selectedAttractions.length === 0) {
      selectedAttractionsList.innerHTML = '<p class="empty-route-message">Маршрут не составлен. Выберите достопримечательности, которые хотите посетить.</p>';
      if (showMapBtn) showMapBtn.disabled = true;
      if (yandexMapsRouteLink) yandexMapsRouteLink.classList.add('disabled');
      return;
    }
    
    selectedAttractionsList.innerHTML = '';
    
    // Enable buttons
    if (showMapBtn) showMapBtn.disabled = false;
    if (yandexMapsRouteLink) yandexMapsRouteLink.classList.remove('disabled');
    
    // Create sortable list of attractions
    selectedAttractions.forEach((attraction, index) => {
      const item = document.createElement('div');
      item.className = 'route-item';
      item.setAttribute('draggable', 'true');
      item.setAttribute('data-id', attraction.id);
      
      item.innerHTML = `
        <div class="route-item-number">${index + 1}</div>
        <div class="route-item-content">
          <h4>${attraction.name}</h4>
          <p>${attraction.address || 'Адрес не указан'}</p>
        </div>
        <button class="route-item-remove" data-id="${attraction.id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      `;
      
      selectedAttractionsList.appendChild(item);
    });
    
    // Add event listeners for remove buttons
    document.querySelectorAll('.route-item-remove').forEach(button => {
      button.addEventListener('click', function() {
        const id = parseInt(this.getAttribute('data-id'));
        removeAttraction(id);
      });
    });
    
    // Initialize drag and drop functionality
    initDragAndDrop();
    
    // Update Yandex Maps link
    updateYandexMapsLink();
  }
  
  // Function to initialize drag and drop for reordering
  function initDragAndDrop() {
    const items = document.querySelectorAll('.route-item');
    let draggedItem = null;
    
    items.forEach(item => {
      // Drag start
      item.addEventListener('dragstart', function() {
        draggedItem = this;
        setTimeout(() => {
          this.classList.add('dragging');
        }, 0);
      });
      
      // Drag end
      item.addEventListener('dragend', function() {
        this.classList.remove('dragging');
        draggedItem = null;
      });
      
      // Drag over
      item.addEventListener('dragover', function(e) {
        e.preventDefault();
      });
      
      // Drag enter
      item.addEventListener('dragenter', function(e) {
        e.preventDefault();
        if (this !== draggedItem) {
          this.classList.add('drag-over');
        }
      });
      
      // Drag leave
      item.addEventListener('dragleave', function() {
        this.classList.remove('drag-over');
      });
      
      // Drop
      item.addEventListener('drop', function(e) {
        e.preventDefault();
        if (this !== draggedItem) {
          const items = Array.from(document.querySelectorAll('.route-item'));
          const fromIndex = items.indexOf(draggedItem);
          const toIndex = items.indexOf(this);
          
          // Reorder the selectedAttractions array
          const movedItem = selectedAttractions[fromIndex];
          selectedAttractions.splice(fromIndex, 1);
          selectedAttractions.splice(toIndex, 0, movedItem);
          
          // Save to localStorage
          localStorage.setItem('selectedAttractions', JSON.stringify(selectedAttractions));
          
          // Re-render
          renderSelectedAttractions();
          
          // Update map if visible
          if (routeMapContainer && !routeMapContainer.classList.contains('hidden')) {
            initRouteMap();
          }
        }
        
        this.classList.remove('drag-over');
      });
    });
  }
  
  // Function to remove an attraction from the route
  function removeAttraction(id) {
    // Find attraction
    const attractionIndex = selectedAttractions.findIndex(a => a.id === id);
    if (attractionIndex === -1) return;
    
    // Get attraction for toast message
    const attraction = selectedAttractions[attractionIndex];
    
    // Remove from array
    selectedAttractions.splice(attractionIndex, 1);
    
    // Save to localStorage
    localStorage.setItem('selectedAttractions', JSON.stringify(selectedAttractions));
    
    // Show toast
    showToast(`"${attraction.name}" удалено из маршрута`);
    
    // Update UI
    renderSelectedAttractions();
    
    // Update all "Add to Route" buttons on the page
    document.querySelectorAll(`.add-to-route[data-id="${id}"]`).forEach(button => {
      button.classList.remove('added');
      button.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        В маршрут
      `;
    });
    
    // Update map if visible
    if (routeMapContainer && !routeMapContainer.classList.contains('hidden')) {
      if (selectedAttractions.length > 0) {
        initRouteMap();
      } else {
        routeMapContainer.classList.add('hidden');
        if (showMapBtn) showMapBtn.textContent = 'Показать на карте';
      }
    }
    
    // Update route button in the attractions page
    updateRoutePlannerButton();
  }
  
  // Function to clear the entire route
  function clearRoute() {
    if (selectedAttractions.length === 0) return;
    
    // Clear array
    selectedAttractions.length = 0;
    
    // Save to localStorage
    localStorage.setItem('selectedAttractions', JSON.stringify(selectedAttractions));
    
    // Show toast
    showToast('Маршрут очищен');
    
    // Update UI
    renderSelectedAttractions();
    
    // Hide map
    if (routeMapContainer) {
      routeMapContainer.classList.add('hidden');
      if (showMapBtn) showMapBtn.textContent = 'Показать на карте';
    }
    
    // Update all "Add to Route" buttons on the page
    document.querySelectorAll('.add-to-route').forEach(button => {
      button.classList.remove('added');
      button.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        В маршрут
      `;
    });
    
    // Update route button in the attractions page
    updateRoutePlannerButton();
  }
  
  // Function to hide the route planner
  function hideRoute() {
    if (routePlanner) {
      routePlanner.style.display = 'none';
    }
  }
  
  // Function to toggle the map display
  function toggleMap() {
    if (!routeMapContainer || !showMapBtn) return;
    
    if (routeMapContainer.classList.contains('hidden')) {
      routeMapContainer.classList.remove('hidden');
      showMapBtn.textContent = 'Скрыть карту';
      initRouteMap();
    } else {
      routeMapContainer.classList.add('hidden');
      showMapBtn.textContent = 'Показать на карте';
    }
  }
  
  // Function to initialize the route map
  function initRouteMap() {
    if (!routeMapContainer) return;
    
    const mapContainer = document.getElementById('route-map');
    if (!mapContainer) return;
    
    // For this example, we'll just show a placeholder
    // In a real application, you would use a mapping API like Yandex Maps
    mapContainer.innerHTML = `
      <div style="padding: 20px; text-align: center; background-color: #f3f3f3; height: 100%;">
        <p>Здесь будет отображаться карта с маршрутом по ${selectedAttractions.length} точкам.</p>
        <p>В реальном приложении используйте API карт, например, Яндекс.Карты.</p>
      </div>
    `;
  }
  
  // Function to update the Yandex Maps link
  function updateYandexMapsLink() {
    if (!yandexMapsRouteLink) return;
    
    if (selectedAttractions.length < 2) {
      yandexMapsRouteLink.href = '#';
      yandexMapsRouteLink.classList.add('disabled');
    } else {
      // In a real application, this would construct a proper Yandex Maps URL
      // For now, we'll just create a dummy URL
      yandexMapsRouteLink.href = `https://yandex.ru/maps/?rtext=${selectedAttractions.map(a => a.address || 'Калуга').join('~')}`;
      yandexMapsRouteLink.classList.remove('disabled');
    }
  }
  
  // Function to update the route planner button in the attractions page
  function updateRoutePlannerButton() {
    let routePlannerBtn = document.querySelector('.route-planner-btn');
    
    if (selectedAttractions.length === 0) {
      // Remove button if empty
      if (routePlannerBtn) {
        routePlannerBtn.remove();
      }
    } else {
      // Create or update button
      if (!routePlannerBtn) {
        routePlannerBtn = document.createElement('button');
        routePlannerBtn.className = 'btn-primary route-planner-btn';
        document.body.appendChild(routePlannerBtn);
        
        routePlannerBtn.addEventListener('click', () => {
          // Navigate to attractions page if not already there
          if (!window.location.href.includes('attractions.html')) {
            window.location.href = 'attractions.html';
          }
          
          // Show route planner
          if (routePlanner) {
            routePlanner.style.display = 'block';
          }
        });
      }
      
      // Update button text
      routePlannerBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 12H2M2 12L8 6M2 12L8 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Мой маршрут (${selectedAttractions.length})
      `;
    }
  }
}

// Helper function to show toast notification
function showToast(message) {
  // Create toast element if it doesn't exist
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  
  // Set message and show
  toast.textContent = message;
  toast.classList.remove('show');
  
  // Force repaint
  void toast.offsetWidth;
  
  // Show toast
  toast.classList.add('show');
  
  // Hide after delay
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Add a simple toast style to the page if it doesn't exist
if (!document.querySelector('style.toast-style')) {
  const style = document.createElement('style');
  style.className = 'toast-style';
  style.textContent = `
    .toast {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #333;
      color: white;
      padding: 12px 20px;
      border-radius: 4px;
      z-index: 1000;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.3s, transform 0.3s;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16);
    }
    
    .toast.show {
      opacity: 1;
      transform: translateY(0);
    }
    
    .disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);
}
