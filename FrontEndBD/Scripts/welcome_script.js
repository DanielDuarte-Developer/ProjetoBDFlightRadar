// Seleciona o botão e o texto de boas-vindas
const button = document.getElementById('startButton');
const welcomeText = document.getElementById('welcomeText');

// Adiciona um evento de clique ao botão
button.addEventListener('click', () => {
    // Adiciona a classe de animação ao texto
    welcomeText.classList.add('animate-up');
    button.classList.add('animate-up');
    
    // Aguarda o término da animação antes de redirecionar
    setTimeout(() => {
        window.location.href = 'map_page.html'; // Substitua pelo link da nova página
    }, 1000); // Tempo da animação (1s)
});