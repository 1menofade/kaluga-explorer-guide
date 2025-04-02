
// Load attractions data
document.addEventListener('DOMContentLoaded', () => {
  loadAttractionsData();
  initFilterFunctionality();
});

// Sample attractions data - in a real application, this would come from a server/API
const attractionsData = [
  {
    id: 1,
    name: 'Музей космонавтики',
    description: 'Один из крупнейших в России музеев космической тематики. Расположен в Калуге, считающейся родиной теоретической космонавтики.',
    image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e',
    category: 'Музей',
    address: 'ул. Академика Королёва, 2, Калуга',
    popularity: 95
  },
  {
    id: 2,
    name: 'Дом-музей К.Э. Циолковского',
    description: 'Мемориальный дом-музей, где жил и работал основоположник теоретической космонавтики Константин Эдуардович Циолковский.',
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716',
    category: 'Музей',
    address: 'ул. Циолковского, 79, Калуга',
    popularity: 88
  },
  {
    id: 3,
    name: 'Калужский областной драматический театр',
    description: 'Один из старейших драматических театров России, основанный в 1777 году.',
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be',
    category: 'Культура',
    address: 'пл. Театральная, 1, Калуга',
    popularity: 82
  },
  {
    id: 4,
    name: 'Каменный мост',
    description: 'Визитная карточка города, построенная в 1785 году по проекту П.Р. Никитина.',
    image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff',
    category: 'Архитектура',
    address: 'ул. Пушкина, Калуга',
    popularity: 90
  },
  {
    id: 5,
    name: 'Гостиный двор',
    description: 'Историческое здание XVIII века, памятник архитектуры федерального значения.',
    image: 'https://images.unsplash.com/photo-1551038247-3d9af20df552',
    category: 'Архитектура',
    address: 'ул. Ленина, 126, Калуга',
    popularity: 75
  },
  {
    id: 6,
    name: 'Палаты Коробовых',
    description: 'Старейшее гражданское здание Калуги, построенное в XVII веке.',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
    category: 'Архитектура',
    address: 'ул. Плеханова, 88, Калуга',
    popularity: 68
  },
  {
    id: 7,
    name: 'Государственный музей истории космонавтики',
    description: 'Крупнейший в России музей космической тематики, открытый при участии С.П. Королёва и Ю.А. Гагарина.',
    image: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031',
    category: 'Музей',
    address: 'ул. Академика Королёва, 2, Калуга',
    popularity: 96
  },
  {
    id: 8,
    name: 'Дом Губернатора',
    description: 'Историческое здание XIX века, в котором сейчас располагается художественный музей.',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    category: 'Музей',
    address: 'ул. Ленина, 74, Калуга',
    popularity: 72
  },
  {
    id: 9,
    name: 'Парк культуры и отдыха',
    description: 'Центральный городской парк с аттракционами, тенистыми аллеями и спортивными площадками.',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1',
    category: 'Отдых',
    address: 'ул. Марата, 2, Калуга',
    popularity: 85
  }
];

// Function to load and display attractions
function loadAttractionsData() {
  const attractionsGrid = document.getElementById('attractions-grid');
  if (!attractionsGrid) return;
  
  // Clear loading message
  attractionsGrid.innerHTML = '';
  
  // Get selected attractions from local storage
  const selectedAttractions = JSON.parse(localStorage.getItem('selectedAttractions') || '[]');
  const selectedIds = selectedAttractions.map(a => a.id);
  
  // Render attractions
  attractionsData.forEach(attraction => {
    const isSelected = selectedIds.includes(attraction.id);
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
          <a href="attraction-detail.html?id=${attraction.id}" class="btn-outline">Подробнее</a>
          <button class="add-to-route ${isSelected ? 'added' : ''}" data-id="${attraction.id}">
            ${isSelected ? `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12L10 17L19 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              В маршруте
            ` : `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              В маршрут
            `}
          </button>
        </div>
      </div>
    `;
    attractionsGrid.appendChild(card);
  });
  
  // Add event listeners to "Add to route" buttons
  document.querySelectorAll('.add-to-route').forEach(button => {
    button.addEventListener('click', function() {
      const attractionId = parseInt(this.getAttribute('data-id'));
      const attraction = attractionsData.find(a => a.id === attractionId);
      
      if (attraction) {
        const selectedAttractions = JSON.parse(localStorage.getItem('selectedAttractions') || '[]');
        const isAlreadySelected = selectedAttractions.some(a => a.id === attractionId);
        
        if (isAlreadySelected) {
          // Remove from route
          const updatedAttractions = selectedAttractions.filter(a => a.id !== attractionId);
          localStorage.setItem('selectedAttractions', JSON.stringify(updatedAttractions));
          
          this.classList.remove('added');
          this.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            В маршрут
          `;
          
          showToast(`"${attraction.name}" удалено из маршрута`);
          
          // Update route planner button or remove it if empty
          updateRoutePlannerButton(updatedAttractions.length);
        } else {
          // Add to route
          selectedAttractions.push(attraction);
          localStorage.setItem('selectedAttractions', JSON.stringify(selectedAttractions));
          
          this.classList.add('added');
          this.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12L10 17L19 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            В маршруте
          `;
          
          showToast(`"${attraction.name}" добавлено в маршрут`);
          
          // Update route planner button or create it if first item
          updateRoutePlannerButton(selectedAttractions.length);
        }
      }
    });
  });
}

// Function to initialize filter functionality
function initFilterFunctionality() {
  const categoryFilter = document.getElementById('category-filter');
  const sortFilter = document.getElementById('sort-filter');
  const filterButton = document.getElementById('filter-button');
  
  if (!categoryFilter || !sortFilter || !filterButton) return;
  
  // Populate category filter with unique categories
  const categories = ['all', ...new Set(attractionsData.map(a => a.category.toLowerCase()))];
  
  categoryFilter.innerHTML = '';
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category === 'all' ? 'Все категории' : capitalizeFirstLetter(category);
    categoryFilter.appendChild(option);
  });
  
  // Add event listener to filter button
  filterButton.addEventListener('click', applyFilters);
  
  // Function to apply filters
  function applyFilters() {
    const selectedCategory = categoryFilter.value;
    const sortBy = sortFilter.value;
    
    // Filter by category
    let filteredAttractions = selectedCategory === 'all' 
      ? [...attractionsData] 
      : attractionsData.filter(a => a.category.toLowerCase() === selectedCategory);
    
    // Sort attractions
    if (sortBy === 'name') {
      filteredAttractions.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'popular') {
      filteredAttractions.sort((a, b) => b.popularity - a.popularity);
    }
    
    // Update the attractions grid
    const attractionsGrid = document.getElementById('attractions-grid');
    if (!attractionsGrid) return;
    
    // Clear grid
    attractionsGrid.innerHTML = '';
    
    // Get selected attractions from local storage
    const selectedAttractions = JSON.parse(localStorage.getItem('selectedAttractions') || '[]');
    const selectedIds = selectedAttractions.map(a => a.id);
    
    // Render filtered attractions
    filteredAttractions.forEach(attraction => {
      const isSelected = selectedIds.includes(attraction.id);
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
            <a href="attraction-detail.html?id=${attraction.id}" class="btn-outline">Подробнее</a>
            <button class="add-to-route ${isSelected ? 'added' : ''}" data-id="${attraction.id}">
              ${isSelected ? `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12L10 17L19 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                В маршруте
              ` : `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                В маршрут
              `}
            </button>
          </div>
        </div>
      `;
      attractionsGrid.appendChild(card);
    });
    
    // Re-add event listeners to "Add to route" buttons
    document.querySelectorAll('.add-to-route').forEach(button => {
      button.addEventListener('click', function() {
        const attractionId = parseInt(this.getAttribute('data-id'));
        const attraction = attractionsData.find(a => a.id === attractionId);
        
        if (attraction) {
          const selectedAttractions = JSON.parse(localStorage.getItem('selectedAttractions') || '[]');
          const isAlreadySelected = selectedAttractions.some(a => a.id === attractionId);
          
          if (isAlreadySelected) {
            // Remove from route
            const updatedAttractions = selectedAttractions.filter(a => a.id !== attractionId);
            localStorage.setItem('selectedAttractions', JSON.stringify(updatedAttractions));
            
            this.classList.remove('added');
            this.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              В маршрут
            `;
            
            showToast(`"${attraction.name}" удалено из маршрута`);
            
            // Update route planner button or remove it if empty
            updateRoutePlannerButton(updatedAttractions.length);
          } else {
            // Add to route
            selectedAttractions.push(attraction);
            localStorage.setItem('selectedAttractions', JSON.stringify(selectedAttractions));
            
            this.classList.add('added');
            this.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12L10 17L19 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              В маршруте
            `;
            
            showToast(`"${attraction.name}" добавлено в маршрут`);
            
            // Update route planner button or create it if first item
            updateRoutePlannerButton(selectedAttractions.length);
          }
        }
      });
    });
  }
}

// Helper function to update the route planner button
function updateRoutePlannerButton(count) {
  let routePlannerBtn = document.querySelector('.route-planner-btn');
  
  if (count === 0) {
    // Remove button if there are no selected attractions
    if (routePlannerBtn) {
      routePlannerBtn.remove();
    }
  } else {
    if (!routePlannerBtn) {
      // Create button if it doesn't exist
      routePlannerBtn = document.createElement('button');
      routePlannerBtn.className = 'btn-primary route-planner-btn';
      document.body.appendChild(routePlannerBtn);
      
      routePlannerBtn.addEventListener('click', () => {
        document.getElementById('route-planner-modal').classList.add('open');
      });
    }
    
    // Update button text
    routePlannerBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12H2M2 12L8 6M2 12L8 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Мой маршрут (${count})
    `;
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

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
