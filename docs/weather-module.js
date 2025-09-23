/**
 * Weather Module for CKEditor
 * Provides weather map functionality with Turkish cities
 */

// Turkish cities with their coordinates
const TURKISH_CITIES = [
    { name: 'İstanbul', lat: 41.01, lon: 28.97 },
    { name: 'Ankara', lat: 39.93, lon: 32.86 },
    { name: 'İzmir', lat: 38.42, lon: 27.14 },
    { name: 'Bursa', lat: 40.18, lon: 29.06 },
    { name: 'Antalya', lat: 36.89, lon: 30.70 },
    { name: 'Adana', lat: 37.00, lon: 35.32 },
    { name: 'Konya', lat: 37.87, lon: 32.48 },
    { name: 'Gaziantep', lat: 37.07, lon: 37.38 },
    { name: 'Mersin', lat: 36.81, lon: 34.64 },
    { name: 'Diyarbakır', lat: 37.91, lon: 40.24 },
    { name: 'Samsun', lat: 41.29, lon: 36.33 },
    { name: 'Denizli', lat: 37.78, lon: 29.09 },
    { name: 'Eskişehir', lat: 39.78, lon: 30.52 },
    { name: 'Trabzon', lat: 41.00, lon: 39.72 },
    { name: 'Erzurum', lat: 39.90, lon: 41.27 },
    { name: 'Van', lat: 38.49, lon: 43.41 },
    { name: 'Kayseri', lat: 38.72, lon: 35.49 },
    { name: 'Malatya', lat: 38.36, lon: 38.32 },
    { name: 'Elazığ', lat: 38.68, lon: 39.23 },
    { name: 'Sivas', lat: 39.75, lon: 37.02 },
    { name: 'Manisa', lat: 38.62, lon: 27.43 },
    { name: 'Balıkesir', lat: 39.65, lon: 27.88 },
    { name: 'Kahramanmaraş', lat: 37.58, lon: 36.93 },
    { name: 'Aydın', lat: 37.86, lon: 27.84 },
    { name: 'Tekirdağ', lat: 40.98, lon: 27.51 },
    { name: 'Sakarya', lat: 40.76, lon: 30.40 },
    { name: 'Muğla', lat: 37.22, lon: 28.37 },
    { name: 'Afyonkarahisar', lat: 38.75, lon: 30.54 },
    { name: 'Kocaeli', lat: 40.85, lon: 29.88 },
    { name: 'Çanakkale', lat: 40.15, lon: 26.41 },
    { name: 'Edirne', lat: 41.68, lon: 26.56 },
    { name: 'Kırklareli', lat: 41.73, lon: 27.23 },
    { name: 'Yalova', lat: 40.65, lon: 29.27 },
    { name: 'Bilecik', lat: 40.15, lon: 29.98 },
    { name: 'Çankırı', lat: 40.60, lon: 33.62 },
    { name: 'Kastamonu', lat: 41.38, lon: 33.78 },
    { name: 'Sinop', lat: 42.03, lon: 35.15 },
    { name: 'Zonguldak', lat: 41.46, lon: 31.79 },
    { name: 'Bolu', lat: 40.74, lon: 31.61 },
    { name: 'Düzce', lat: 40.84, lon: 31.16 },
    { name: 'Bartın', lat: 41.63, lon: 32.34 },
    { name: 'Karabük', lat: 41.21, lon: 32.62 },
    { name: 'Kırıkkale', lat: 39.85, lon: 33.52 },
    { name: 'Kırşehir', lat: 39.14, lon: 34.17 },
    { name: 'Nevşehir', lat: 38.62, lon: 34.71 },
    { name: 'Niğde', lat: 37.97, lon: 34.68 },
    { name: 'Aksaray', lat: 38.37, lon: 34.03 },
    { name: 'Yozgat', lat: 39.82, lon: 34.81 },
    { name: 'Çorum', lat: 40.55, lon: 34.95 },
    { name: 'Amasya', lat: 40.65, lon: 35.83 },
    { name: 'Tokat', lat: 40.32, lon: 36.55 },
    { name: 'Ordu', lat: 40.98, lon: 37.88 },
    { name: 'Giresun', lat: 40.91, lon: 38.39 },
    { name: 'Rize', lat: 41.02, lon: 40.52 },
    { name: 'Artvin', lat: 41.18, lon: 41.82 },
    { name: 'Ardahan', lat: 41.11, lon: 42.70 },
    { name: 'Kars', lat: 40.62, lon: 43.10 },
    { name: 'Iğdır', lat: 39.92, lon: 44.04 },
    { name: 'Ağrı', lat: 39.72, lon: 43.05 },
    { name: 'Muş', lat: 38.74, lon: 41.49 },
    { name: 'Bitlis', lat: 38.40, lon: 42.11 },
    { name: 'Siirt', lat: 37.93, lon: 41.95 },
    { name: 'Şırnak', lat: 37.52, lon: 42.46 },
    { name: 'Hakkari', lat: 37.57, lon: 43.74 },
    { name: 'Mardin', lat: 37.32, lon: 40.72 },
    { name: 'Batman', lat: 37.88, lon: 41.13 },
    { name: 'Şanlıurfa', lat: 37.16, lon: 38.79 },
    { name: 'Kilis', lat: 36.72, lon: 37.12 },
    { name: 'Osmaniye', lat: 37.07, lon: 36.25 },
    { name: 'Hatay', lat: 36.20, lon: 36.16 },
    { name: 'Adıyaman', lat: 37.76, lon: 38.28 },
    { name: 'Tunceli', lat: 39.11, lon: 39.55 },
    { name: 'Bingöl', lat: 38.89, lon: 40.50 },
    { name: 'Erzincan', lat: 39.75, lon: 39.49 },
    { name: 'Bayburt', lat: 40.26, lon: 40.22 },
    { name: 'Gümüşhane', lat: 40.46, lon: 39.68 },
    { name: 'Uşak', lat: 38.68, lon: 29.40 },
    { name: 'Kütahya', lat: 39.42, lon: 29.98 },
    { name: 'Burdur', lat: 37.72, lon: 30.29 },
    { name: 'Isparta', lat: 37.76, lon: 30.56 },
    { name: 'Antakya', lat: 36.20, lon: 36.16 },
    { name: 'İskenderun', lat: 36.58, lon: 36.17 },
    { name: 'Tarsus', lat: 36.92, lon: 34.90 },
    { name: 'Alanya', lat: 36.54, lon: 31.99 },
    { name: 'Fethiye', lat: 36.62, lon: 29.12 },
    { name: 'Bodrum', lat: 37.03, lon: 27.43 },
    { name: 'Kuşadası', lat: 37.86, lon: 27.26 },
    { name: 'Çeşme', lat: 38.32, lon: 26.30 },
    { name: 'Ayvalık', lat: 39.32, lon: 26.69 },
    { name: 'Bandırma', lat: 40.35, lon: 27.97 },
    { name: 'Gelibolu', lat: 40.41, lon: 26.67 },
    { name: 'Lüleburgaz', lat: 41.40, lon: 27.36 },
    { name: 'Çorlu', lat: 41.15, lon: 27.80 },
    { name: 'Silivri', lat: 41.07, lon: 28.25 },
    { name: 'Gebze', lat: 40.80, lon: 29.43 },
    { name: 'İzmit', lat: 40.77, lon: 29.96 },
    { name: 'Sapanca', lat: 40.69, lon: 30.27 }
];

/**
 * Creates a weather button and adds it to the CKEditor toolbar
 */
function addWeatherButton() {
    const ckEditorToolbar = document.getElementsByClassName('ck-toolbar__items')[0];
    const weatherDiv = document.createElement("div");
    weatherDiv.className = 'ck ck-dropdown';

    // Create weather button
    const weatherButton = document.createElement("button");
    weatherButton.className = 'ck ck-button ck-off ck-button';
    weatherButton.innerHTML = '🌤️'; // Weather emoji as icon
    weatherButton.style.fontSize = "18px";
    weatherButton.style.padding = "4px 8px";
    weatherButton.title = "İstanbul Hava Durumu";

    weatherButton.onclick = showWeatherModal;
    weatherDiv.appendChild(weatherButton);

    ckEditorToolbar.appendChild(weatherDiv);
}

/**
 * Creates and displays the weather modal with interactive map
 */
function showWeatherModal() {
    // Create modal container
    const modalContainer = createModalContainer();
    const modalContent = createModalContent();
    const header = createModalHeader();
    const iframeContainer = createIframeContainer();
    const iframe = createWeatherIframe();

    // Create city selector
    const citySelector = createCitySelector();
    const title = createModalTitle();
    const closeButton = createCloseButton(modalContainer);

    // City change handler
    citySelector.onchange = function () {
        const [lat, lon] = this.value.split(',');
        const selectedCity = TURKISH_CITIES.find(city => city.lat == lat && city.lon == lon);
        if (selectedCity) {
            title.textContent = `${selectedCity.name} Hava Durumu Haritası`;
            iframe.src = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&zoom=8&overlay=wind&level=surface&marker=true&menu=&message=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1`;
        }
    };

    // Assemble modal
    header.appendChild(title);
    header.appendChild(citySelector);
    header.appendChild(closeButton);
    iframeContainer.appendChild(iframe);
    modalContent.appendChild(header);
    modalContent.appendChild(iframeContainer);
    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);

    // Add overlays to hide Windy.com branding
    addBrandingOverlays(iframeContainer);
}

/**
 * Creates the modal container element
 */
function createModalContainer() {
    const modalContainer = document.createElement('div');
    modalContainer.style.position = 'fixed';
    modalContainer.style.top = '0';
    modalContainer.style.left = '0';
    modalContainer.style.width = '100%';
    modalContainer.style.height = '100%';
    modalContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modalContainer.style.display = 'flex';
    modalContainer.style.justifyContent = 'center';
    modalContainer.style.alignItems = 'center';
    modalContainer.style.zIndex = '9999';
    return modalContainer;
}

/**
 * Creates the modal content element
 */
function createModalContent() {
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'white';
    modalContent.style.borderRadius = '8px';
    modalContent.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    modalContent.style.width = '90%';
    modalContent.style.height = '80%';
    modalContent.style.position = 'relative';
    return modalContent;
}

/**
 * Creates the modal header element
 */
function createModalHeader() {
    const header = document.createElement('div');
    header.style.padding = '15px 20px';
    header.style.borderBottom = '1px solid #e0e0e0';
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    return header;
}

/**
 * Creates the modal title element
 */
function createModalTitle() {
    const title = document.createElement('h3');
    title.textContent = 'İstanbul Hava Durumu Haritası';
    title.style.margin = '0';
    title.style.color = '#333';
    return title;
}

/**
 * Creates the close button element
 */
function createCloseButton(modalContainer) {
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '✕';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '20px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = '#666';
    closeButton.style.padding = '5px';
    closeButton.style.borderRadius = '3px';

    closeButton.onmouseover = () => {
        closeButton.style.backgroundColor = '#f0f0f0';
    };
    closeButton.onmouseout = () => {
        closeButton.style.backgroundColor = 'transparent';
    };
    closeButton.onclick = () => {
        document.body.removeChild(modalContainer);
    };
    return closeButton;
}

/**
 * Creates the city selector dropdown
 */
function createCitySelector() {
    const citySelector = document.createElement('select');
    citySelector.style.padding = '8px 12px';
    citySelector.style.borderRadius = '6px';
    citySelector.style.border = '1px solid #ddd';
    citySelector.style.fontSize = '14px';
    citySelector.style.marginRight = '15px';
    citySelector.style.backgroundColor = 'white';
    citySelector.style.cursor = 'pointer';

    // Add cities to select box
    TURKISH_CITIES.forEach(city => {
        const option = document.createElement('option');
        option.value = `${city.lat},${city.lon}`;
        option.textContent = city.name;
        citySelector.appendChild(option);
    });

    // Set Istanbul as default
    citySelector.value = '41.01,28.97';
    return citySelector;
}

/**
 * Creates the iframe container element
 */
function createIframeContainer() {
    const iframeContainer = document.createElement('div');
    iframeContainer.style.padding = '20px';
    iframeContainer.style.height = 'calc(100% - 80px)';
    iframeContainer.style.overflow = 'hidden';
    return iframeContainer;
}

/**
 * Creates the weather iframe element
 */
function createWeatherIframe() {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://embed.windy.com/embed2.html?lat=41.01&lon=28.97&zoom=8&overlay=wind&level=surface&marker=true&menu=&message=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '4px';
    return iframe;
}

/**
 * Adds overlays to hide Windy.com branding
 */
function addBrandingOverlays(iframeContainer) {
    // Top overlay to hide logo
    const logoOverlay = document.createElement('div');
    logoOverlay.style.position = 'absolute';
    logoOverlay.style.top = '20px';
    logoOverlay.style.left = '50%';
    logoOverlay.style.transform = 'translateX(-50%)';
    logoOverlay.style.width = '100%';
    logoOverlay.style.height = '35px';
    logoOverlay.style.backgroundColor = 'white';
    logoOverlay.style.zIndex = '1000';
    logoOverlay.style.borderRadius = '4px';
    logoOverlay.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';

    // Bottom overlay to hide attribution
    const bottomOverlay = document.createElement('div');
    bottomOverlay.style.position = 'absolute';
    bottomOverlay.style.bottom = '20px';
    bottomOverlay.style.left = '50%';
    bottomOverlay.style.transform = 'translateX(-50%)';
    bottomOverlay.style.width = '100%';
    bottomOverlay.style.height = '65px';
    bottomOverlay.style.backgroundColor = 'white';
    bottomOverlay.style.zIndex = '1000';
    bottomOverlay.style.borderRadius = '4px';
    bottomOverlay.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';

    // Add overlays to the iframe container
    iframeContainer.style.position = 'relative';
    iframeContainer.appendChild(logoOverlay);
    iframeContainer.appendChild(bottomOverlay);
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addWeatherButton,
        showWeatherModal,
        TURKISH_CITIES
    };
}
