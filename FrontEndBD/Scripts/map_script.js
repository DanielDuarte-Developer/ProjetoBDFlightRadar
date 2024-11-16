  // Inicializando o mapa e definindo o ponto central e o nível de zoom
  map = L.map('map', {
    zoomControl: false,
    center: [20, 0],  // Centro inicial
    zoom: 2,  // Nível de zoom inicial
    minZoom: 2,  // Nível de zoom mínimo permitido
    maxZoom: 10,  // Nível de zoom máximo permitido
    worldCopyJump: true  // Permite um efeito de "cópia do mundo"
});

  // Adicionando a camada de mapa do OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
  }).addTo(map);

    // Impedir que o usuário vá além dos limites de coordenadas
    map.setMaxBounds([[-90, -180], [90, 180]]);  // Limite do mundo


        // Evento para evitar que o mapa se mova para fora dos limites
        map.on('dragend', function() {
            var bounds = map.getBounds();
            var maxBounds = L.latLngBounds([[-90, -180], [90, 180]]);
            if (!maxBounds.contains(bounds)) {
                map.setView(map.getCenter());
            }
        });