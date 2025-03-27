
/**
 * Utility functions for loading the Yandex Maps API
 */

// API key for Yandex Maps
const YANDEX_MAPS_API_KEY = 'd00a65f6-ace0-4359-bfec-61603bf77861';

/**
 * Loads the Yandex Maps API script if not already loaded
 * @returns Promise that resolves when the API is loaded
 */
export const loadYandexMapsApi = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if ymaps already exists in window
    if (typeof window.ymaps !== 'undefined') {
      console.log("Yandex Maps API already loaded");
      resolve();
      return;
    }
    
    console.log("Loading Yandex Maps API script...");
    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_MAPS_API_KEY}&lang=ru_RU`;
    script.async = true;
    
    script.onload = () => {
      console.log("Yandex Maps API script loaded");
      resolve();
    };
    
    script.onerror = (e) => {
      console.error("Error loading Yandex Maps API:", e);
      reject(new Error("Failed to load Yandex Maps API"));
    };
    
    document.body.appendChild(script);
  });
};

/**
 * Waits for the Yandex Maps API to be ready for use
 * @returns Promise that resolves when ymaps is ready
 */
export const waitForYandexMapsReady = (): Promise<void> => {
  return new Promise((resolve) => {
    if (typeof window.ymaps === 'undefined') {
      console.error("Yandex Maps API not available");
      resolve();
      return;
    }
    
    window.ymaps.ready(() => {
      console.log("Yandex Maps API ready");
      resolve();
    });
  });
};
