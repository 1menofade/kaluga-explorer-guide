
// Yandex Maps JavaScript

document.addEventListener('DOMContentLoaded', () => {
  initYandexMap();
});

// Function to initialize Yandex Maps (placeholder)
function initYandexMap() {
  const mapContainer = document.getElementById('yandex-map');
  if (!mapContainer) return;
  
  // Remove loading message
  const loadingMessage = document.querySelector('.map-loading');
  if (loadingMessage) {
    loadingMessage.remove();
  }
  
  // In a real application, this would initialize Yandex Maps API
  // For this example, we'll just display a placeholder
  mapContainer.innerHTML = `
    <div style="padding: 20px; text-align: center; background-color: #f3f3f3; height: 100%;">
      <p>Здесь будет отображаться карта Калуги.</p>
      <p>В реальном приложении используйте API Яндекс.Карт.</p>
      <p>Для полной функциональности добавьте следующий скрипт в ваш HTML-файл:</p>
      <code style="display: block; margin-top: 10px; background: #e0e0e0; padding: 10px; text-align: left; border-radius: 4px;">
      &lt;script src="https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=ru_RU" type="text/javascript"&gt;&lt;/script&gt;
      </code>
      <p style="margin-top: 10px;">И инициализируйте карту с вашими достопримечательностями.</p>
    </div>
  `;
}

// Function to create a route map with multiple points (placeholder)
function createRouteMap(containerId, points) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // In a real application, this would create a route on Yandex Maps
  // For this example, we'll just display a placeholder
  container.innerHTML = `
    <div style="padding: 20px; text-align: center; background-color: #f3f3f3; height: 100%;">
      <p>Здесь будет отображаться маршрут по ${points.length} точкам.</p>
      <ul style="text-align: left; max-width: 300px; margin: 0 auto;">
        ${points.map((point, index) => `<li><b>${index + 1}.</b> ${point.name}</li>`).join('')}
      </ul>
      <p style="margin-top: 10px;">В реальном приложении используйте API Яндекс.Карт для построения маршрутов.</p>
    </div>
  `;
}

// Export functions for use in other scripts
window.YandexMapApi = {
  createRouteMap: createRouteMap
};
