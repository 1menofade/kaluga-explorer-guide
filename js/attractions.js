
// Attractions JavaScript file

document.addEventListener('DOMContentLoaded', () => {
  // Initialize attractions
  loadAttractions();
  
  // Initialize filters
  initFilters();
});

// Sample attraction data (this would typically come from a backend API)
const attractionsData = [
  {
    id: 1,
    name: 'Государственный музей космонавтики',
    description: 'Первый в мире и крупнейший в России музей космической тематики. Здесь представлены образцы космической техники, личные вещи космонавтов и многое другое.',
    image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80',
    category: 'museum',
    address: 'ул. Академика Королёва, 2, Калуга',
    coordinates: [54.526226, 36.270928]
  },
  {
    id: 2,
    name: 'Дом-музей К.Э. Циолковского',
    description: 'Мемориальный дом-музей, где долгие годы жил и работал великий учёный, основоположник теоретической космонавтики Константин Эдуардович Циолковский.',
    image: 'https://images.unsplash.com/photo-1516515516654-dfb5c7117508?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80',
    category: 'museum',
    address: 'ул. Циолковского, 79, Калуга',
    coordinates: [54.514289, 36.261842]
  },
  {
    id: 3,
    name: 'Калужский областной драматический театр',
    description: 'Один из старейших драматических театров России, основанный в 1777 году. Здание театра является памятником архитектуры XIX века.',
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80',
    category: 'cultural',
    address: 'пл. Театральная, 1, Калуга',
    coordinates: [54.513543, 36.261686]
  },
  {
    id: 4,
    name: 'Свято-Троицкий кафедральный собор',
    description: 'Главный православный храм Калуги, построенный в XVIII веке в стиле барокко. Собор является историческим и архитектурным памятником.',
    image: 'https://images.unsplash.com/photo-1585083969600-495ee7e3604b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80',
    category: 'religious',
    address: 'ул. Ленина, 106, Калуга',
    coordinates: [54.514156, 36.232843]
  },
  {
    id: 5,
    name: 'Калужский областной художественный музей',
    description: 'Один из старейших художественных музеев России, основанный в 1918 году. В коллекции представлены произведения русского и западноевропейского искусства.',
    image: 'https://images.unsplash.com/photo-1566346962706-0548d2511445?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80',
    category: 'museum',
    address: 'ул. Ленина, 104, Калуга',
    coordinates: [54.514396, 36.231793]
  },
  {
    id: 6,
    name: 'Калужский Гостиный двор',
    description: 'Памятник архитектуры XVIII века, построенный в стиле классицизма. Сегодня это торговый центр с множеством магазинов и кафе.',
    image: 'https://images.unsplash.com/photo-1565329921943-7e537b7a2ea9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80',
    category: 'historical',
    address: 'ул. Ленина, 73, Калуга',
    coordinates: [54.512794, 36.252839]
  },
  {
    id: 7,
    name: 'Парк культуры и отдыха',
    description: 'Центральный городской парк Калуги с аттракционами, прогулочными аллеями и площадками для отдыха. Идеальное место для семейного отдыха.',
    image: 'https://images.unsplash.com/photo-1564951434112-64d74cc2a2d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80',
    category: 'nature',
    address: 'ул. Марата, 2, Калуга',
    coordinates: [54.513866, 36.270295]
  },
  {
    id: 8,
    name: 'Усадьба Золотарёвых',
    description: 'Памятник архитектуры XIX века, яркий образец городской усадьбы в стиле классицизма. Сегодня здесь располагается краеведческий музей.',
    image: 'https://images.unsplash.com/photo-1531746244600-5ca18a801108?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80',
    category: 'historical',
    address: 'ул. Пушкина, 14, Калуга',
    coordinates: [54.511589, 36.245748]
  }
];

// Load attractions on the page
function loadAttractions() {
  const attractionsGrid = document.getElementById('attractions-grid');
  if (!attractionsGrid) return;
  
  // Clear loading message
  attractionsGrid.innerHTML = '';
  
  // Get filter values (if on attractions page)
  const categoryFilter = document.getElementById('category-filter');
  let selectedCategory = categoryFilter ? categoryFilter.value : 'all';
  
  // Filter attractions if needed
  let filteredAttractions = attractionsData;
  if (selectedCategory !== 'all') {
    filteredAttractions = attractionsData.filter(attraction => attraction.category === selectedCategory);
  }
  
  // Limit number of attractions on home page
  const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
  if (isHomePage) {
    filteredAttractions = filteredAttractions.slice(0, 4);
  }
  
  // Display attractions
  filteredAttractions.forEach(attraction => {
    const categoryLabel = getCategoryLabel(attraction.category);
    
    const attractionCard = document.createElement('div');
    attractionCard.className = 'attraction-card';
    attractionCard.innerHTML = `
      <div class="attraction-image">
        <img src="${attraction.image}" alt="${attraction.name}">
        <span class="attraction-category">${categoryLabel}</span>
      </div>
      <div class="attraction-content">
        <h3>${attraction.name}</h3>
        <p>${attraction.description}</p>
        <div class="attraction-actions">
          <a href="/attraction-details.html?id=${attraction.id}" class="btn-outline">Подробнее</a>
          <button class="add-to-route" data-id="${attraction.id}" data-name="${attraction.name}" data-address="${attraction.address}" data-coordinates="${attraction.coordinates}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12H15M12 9V15M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Добавить
          </button>
        </div>
      </div>
    `;
    
    attractionsGrid.appendChild(attractionCard);
  });
  
  // Initialize "Add to route" buttons
  initAddToRouteButtons();
}

// Initialize filter functionality
function initFilters() {
  const filterButton = document.getElementById('filter-button');
  if (filterButton) {
    filterButton.addEventListener('click', () => {
      loadAttractions();
    });
  }
}

// Helper function to get readable category labels
function getCategoryLabel(category) {
  const labels = {
    'historical': 'Историческое',
    'museum': 'Музей',
    'cultural': 'Культурное',
    'religious': 'Религиозное',
    'nature': 'Природное'
  };
  
  return labels[category] || category;
}

// Initialize "Add to route" buttons
function initAddToRouteButtons() {
  const addToRouteButtons = document.querySelectorAll('.add-to-route');
  
  addToRouteButtons.forEach(button => {
    const attractionId = parseInt(button.dataset.id);
    const isInRoute = isAttractionInRoute(attractionId);
    
    if (isInRoute) {
      updateAddButtonState(button, true);
    }
    
    button.addEventListener('click', () => {
      const inRoute = isAttractionInRoute(attractionId);
      
      if (inRoute) {
        removeFromRoute(attractionId);
        updateAddButtonState(button, false);
      } else {
        const attraction = {
          id: attractionId,
          name: button.dataset.name,
          address: button.dataset.address,
          coordinates: button.dataset.coordinates.split(',').map(coord => parseFloat(coord))
        };
        
        addToRoute(attraction);
        updateAddButtonState(button, true);
      }
      
      // Update route planner if it's visible
      const routePlanner = document.getElementById('route-planner');
      if (routePlanner && window.getComputedStyle(routePlanner).display !== 'none') {
        updateRoutePlannerUI();
      }
    });
  });
}

// Check if attraction is already in route
function isAttractionInRoute(attractionId) {
  const savedRoute = JSON.parse(localStorage.getItem('plannedRoute') || '[]');
  return savedRoute.some(item => item.id === attractionId);
}

// Add attraction to route
function addToRoute(attraction) {
  const savedRoute = JSON.parse(localStorage.getItem('plannedRoute') || '[]');
  savedRoute.push(attraction);
  localStorage.setItem('plannedRoute', JSON.stringify(savedRoute));
}

// Remove attraction from route
function removeFromRoute(attractionId) {
  const savedRoute = JSON.parse(localStorage.getItem('plannedRoute') || '[]');
  const updatedRoute = savedRoute.filter(item => item.id !== attractionId);
  localStorage.setItem('plannedRoute', JSON.stringify(updatedRoute));
}

// Update "Add to route" button state
function updateAddButtonState(button, isAdded) {
  if (isAdded) {
    button.classList.add('added');
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12L10 17L19 8M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Добавлено
    `;
  } else {
    button.classList.remove('added');
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12H15M12 9V15M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Добавить
    `;
  }
}
