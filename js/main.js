
// Main JavaScript file

document.addEventListener('DOMContentLoaded', () => {
  // Initialize components
  initNavbar();
  initSmoothScroll();
  initMobileMenu();
  initRoutePlanner();
  loadAttractions();
  
  // Apply animations
  animateOnScroll();
});

// Initialize navbar scroll effect
function initNavbar() {
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Initialize smooth scrolling for anchor links
function initSmoothScroll() {
  const exploreBtn = document.getElementById('explore-btn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      const attractionsSection = document.getElementById('attractions');
      if (attractionsSection) {
        attractionsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId !== '#' && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

// Initialize mobile menu toggle
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active') && 
          !navLinks.contains(e.target) && 
          !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  }
}

// Animate elements when they come into view
function animateOnScroll() {
  const elementsToAnimate = document.querySelectorAll('.section-title, .section-subtitle, .info-card, .attraction-card, .gallery-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  elementsToAnimate.forEach(element => {
    observer.observe(element);
  });
}

// Load attractions data and render to the page
function loadAttractions() {
  const attractionsGrid = document.getElementById('attractions-grid');
  if (!attractionsGrid) return;
  
  // Clear loading text
  attractionsGrid.innerHTML = '';
  
  // Sample attractions data - in a real application, this would come from an API
  const attractions = [
    {
      id: 1,
      name: 'Музей космонавтики',
      description: 'Один из крупнейших в России музеев космической тематики. Расположен в Калуге, считающейся родиной теоретической космонавтики.',
      image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e',
      category: 'Музей',
      address: 'ул. Академика Королёва, 2, Калуга'
    },
    {
      id: 2,
      name: 'Дом-музей К.Э. Циолковского',
      description: 'Мемориальный дом-музей, где жил и работал основоположник теоретической космонавтики Константин Эдуардович Циолковский.',
      image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716',
      category: 'Музей',
      address: 'ул. Циолковского, 79, Калуга'
    },
    {
      id: 3,
      name: 'Калужский областной драматический театр',
      description: 'Один из старейших драматических театров России, основанный в 1777 году.',
      image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be',
      category: 'Культура',
      address: 'пл. Театральная, 1, Калуга'
    },
    {
      id: 4,
      name: 'Каменный мост',
      description: 'Визитная карточка города, построенная в 1785 году по проекту П.Р. Никитина.',
      image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff',
      category: 'Архитектура',
      address: 'ул. Пушкина, Калуга'
    }
  ];
  
  // Render attractions
  attractions.forEach(attraction => {
    const card = document.createElement('div');
    card.className = 'attraction-card';
    card.innerHTML = `
      <div class="attraction-image">
        <img src="${attraction.image}" alt="${attraction.name}">
        <span class="attraction-category">${attraction.category}</span>
      </div>
      <div class="attraction-content">
        <h3>${attraction.name}</h3>
        <p>${attraction.description}</p>
        <div class="attraction-actions">
          <a href="attractions.html?id=${attraction.id}" class="btn-outline">Подробнее</a>
          <button class="add-to-route" data-id="${attraction.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            В маршрут
          </button>
        </div>
      </div>
    `;
    attractionsGrid.appendChild(card);
  });
  
  // Add event listeners to "Add to route" buttons
  document.querySelectorAll('.add-to-route').forEach(button => {
    button.addEventListener('click', function() {
      const attractionId = this.getAttribute('data-id');
      const attraction = attractions.find(a => a.id.toString() === attractionId);
      
      if (attraction) {
        addToRoute(attraction);
        this.classList.add('added');
        this.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12L10 17L19 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Добавлено
        `;
      }
    });
  });
}

// Initialize route planner functionality
function initRoutePlanner() {
  const selectedAttractions = JSON.parse(localStorage.getItem('selectedAttractions') || '[]');
  const routePlannerModal = document.getElementById('route-planner-modal');
  const closeModalBtn = document.querySelector('.close-modal');
  const selectedAttractionsContainer = document.getElementById('selected-attractions');
  const clearRouteBtn = document.getElementById('clear-route');
  const toggleMapBtn = document.getElementById('toggle-map');
  const routeMapContainer = document.getElementById('route-map-container');
  
  // Show route planner button if there are selected attractions
  if (selectedAttractions.length > 0) {
    const routePlannerBtn = document.createElement('button');
    routePlannerBtn.className = 'btn-primary route-planner-btn';
    routePlannerBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12H2M2 12L8 6M2 12L8 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Мой маршрут (${selectedAttractions.length})
    `;
    document.body.appendChild(routePlannerBtn);
    
    routePlannerBtn.addEventListener('click', () => {
      routePlannerModal.classList.add('open');
      renderSelectedAttractions();
    });
  }
  
  // Initialize close modal functionality
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      routePlannerModal.classList.remove('open');
    });
  }
  
  // Initialize clear route functionality
  if (clearRouteBtn) {
    clearRouteBtn.addEventListener('click', () => {
      localStorage.removeItem('selectedAttractions');
      selectedAttractionsContainer.innerHTML = '<p class="empty-route-message">Маршрут не составлен. Выберите достопримечательности, которые хотите посетить.</p>';
      document.querySelector('.route-planner-btn')?.remove();
    });
  }
  
  // Initialize toggle map functionality
  if (toggleMapBtn && routeMapContainer) {
    toggleMapBtn.addEventListener('click', () => {
      if (routeMapContainer.classList.contains('hidden')) {
        routeMapContainer.classList.remove('hidden');
        toggleMapBtn.textContent = 'Скрыть карту';
        // Here you would initialize your map with the selected attractions
        initMap(selectedAttractions);
      } else {
        routeMapContainer.classList.add('hidden');
        toggleMapBtn.textContent = 'Показать на карте';
      }
    });
  }
  
  // Function to render selected attractions in the route planner
  function renderSelectedAttractions() {
    if (!selectedAttractionsContainer) return;
    
    if (selectedAttractions.length === 0) {
      selectedAttractionsContainer.innerHTML = '<p class="empty-route-message">Маршрут не составлен. Выберите достопримечательности, которые хотите посетить.</p>';
      return;
    }
    
    selectedAttractionsContainer.innerHTML = '';
    
    selectedAttractions.forEach((attraction, index) => {
      const routeItem = document.createElement('div');
      routeItem.className = 'route-item';
      routeItem.setAttribute('draggable', 'true');
      routeItem.setAttribute('data-id', attraction.id);
      
      routeItem.innerHTML = `
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
      
      selectedAttractionsContainer.appendChild(routeItem);
    });
    
    // Add event listeners for drag and drop functionality
    initDragAndDrop();
    
    // Add event listeners for remove buttons
    document.querySelectorAll('.route-item-remove').forEach(button => {
      button.addEventListener('click', function() {
        const attractionId = parseInt(this.getAttribute('data-id'));
        removeFromRoute(attractionId);
        renderSelectedAttractions();
      });
    });
  }
  
  // Function to initialize drag and drop functionality
  function initDragAndDrop() {
    const routeItems = document.querySelectorAll('.route-item');
    let draggedItem = null;
    
    routeItems.forEach(item => {
      item.addEventListener('dragstart', function() {
        draggedItem = this;
        setTimeout(() => this.classList.add('dragging'), 0);
      });
      
      item.addEventListener('dragend', function() {
        this.classList.remove('dragging');
        draggedItem = null;
      });
      
      item.addEventListener('dragover', function(e) {
        e.preventDefault();
      });
      
      item.addEventListener('dragenter', function(e) {
        e.preventDefault();
        if (draggedItem !== this) {
          this.classList.add('drag-over');
        }
      });
      
      item.addEventListener('dragleave', function() {
        this.classList.remove('drag-over');
      });
      
      item.addEventListener('drop', function() {
        this.classList.remove('drag-over');
        if (draggedItem !== this) {
          const items = Array.from(document.querySelectorAll('.route-item'));
          const fromIndex = items.indexOf(draggedItem);
          const toIndex = items.indexOf(this);
          
          // Reorder the selected attractions array
          const temp = selectedAttractions[fromIndex];
          selectedAttractions.splice(fromIndex, 1);
          selectedAttractions.splice(toIndex, 0, temp);
          
          // Update local storage
          localStorage.setItem('selectedAttractions', JSON.stringify(selectedAttractions));
          
          // Re-render the list
          renderSelectedAttractions();
        }
      });
    });
  }
}

// Function to add an attraction to the route
function addToRoute(attraction) {
  let selectedAttractions = JSON.parse(localStorage.getItem('selectedAttractions') || '[]');
  
  // Check if the attraction is already in the route
  if (!selectedAttractions.some(a => a.id === attraction.id)) {
    selectedAttractions.push(attraction);
    localStorage.setItem('selectedAttractions', JSON.stringify(selectedAttractions));
    
    // Show a toast notification
    showToast(`"${attraction.name}" добавлено в маршрут`);
    
    // If this is the first attraction, create the route planner button
    if (selectedAttractions.length === 1 && !document.querySelector('.route-planner-btn')) {
      const routePlannerBtn = document.createElement('button');
      routePlannerBtn.className = 'btn-primary route-planner-btn';
      routePlannerBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 12H2M2 12L8 6M2 12L8 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Мой маршрут (1)
      `;
      document.body.appendChild(routePlannerBtn);
      
      routePlannerBtn.addEventListener('click', () => {
        document.getElementById('route-planner-modal').classList.add('open');
        initRoutePlanner();
      });
    } else {
      // Update the count in the route planner button
      const routePlannerBtn = document.querySelector('.route-planner-btn');
      if (routePlannerBtn) {
        routePlannerBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 12H2M2 12L8 6M2 12L8 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Мой маршрут (${selectedAttractions.length})
        `;
      }
    }
  }
}

// Function to remove an attraction from the route
function removeFromRoute(attractionId) {
  let selectedAttractions = JSON.parse(localStorage.getItem('selectedAttractions') || '[]');
  
  // Filter out the attraction with the given ID
  selectedAttractions = selectedAttractions.filter(a => a.id !== attractionId);
  
  // Update local storage
  localStorage.setItem('selectedAttractions', JSON.stringify(selectedAttractions));
  
  // Update the UI
  if (selectedAttractions.length === 0) {
    document.querySelector('.route-planner-btn')?.remove();
    document.getElementById('route-planner-modal')?.classList.remove('open');
  } else {
    const routePlannerBtn = document.querySelector('.route-planner-btn');
    if (routePlannerBtn) {
      routePlannerBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 12H2M2 12L8 6M2 12L8 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Мой маршрут (${selectedAttractions.length})
      `;
    }
  }
  
  // Update the "Add to route" buttons
  document.querySelectorAll('.add-to-route').forEach(button => {
    const id = parseInt(button.getAttribute('data-id'));
    if (id === attractionId) {
      button.classList.remove('added');
      button.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        В маршрут
      `;
    }
  });
}

// Function to show a toast notification
function showToast(message) {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  
  // Add to document
  document.body.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  // Remove after a delay
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// Function to initialize the map
function initMap(attractions) {
  const mapContainer = document.getElementById('route-map');
  if (!mapContainer) return;
  
  // This is a placeholder function. In a real application, you would use a mapping API like Yandex Maps
  mapContainer.innerHTML = `
    <div style="padding: 20px; text-align: center; background-color: #f3f3f3; height: 100%;">
      <p>Здесь будет отображаться карта с маршрутом.</p>
      <p>В реальном приложении используйте API карт, например, Яндекс.Карты.</p>
    </div>
  `;
  
  // For demonstration purposes only
  console.log('Map initialized with attractions:', attractions);
}

// Add a simple toast style to the page
const style = document.createElement('style');
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
  
  .route-planner-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 90;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
  }
  
  .drag-over {
    border: 2px dashed var(--color-primary-light);
    background-color: rgba(59, 113, 202, 0.05);
  }
`;
document.head.appendChild(style);
