document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar-hide");
    const toggleButton = document.getElementById("toggleSidebar");
    const showButton = document.getElementById("showSidebar");
    const miniSideBar = document.getElementById("sidebar-show")

    // Esconder o menu ao clicar no botão dentro do menu
    toggleButton.addEventListener("click", () => {
        sidebar.classList.add("hidden");
        miniSideBar.classList.add("active");
    });

    // Mostrar o menu ao clicar no botão externo
    showButton.addEventListener("click", () => {
        sidebar.classList.remove("hidden");
        miniSideBar.classList.remove("active");
    });
});