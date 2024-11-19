document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar-hide");
    const toggleButton = document.getElementById("toggleSidebar");
    const showButton = document.getElementById("showSidebar");
    const miniSideBar = document.getElementById("sidebar-show")
    const formContainer = document.getElementById("form-container");
    const submitButton = document.getElementById("submit-button");
    const addButton = document.getElementById("add-btn");
    const tableContainer = document.getElementById("table-container");

    // Esconder o menu ao clicar no botão dentro do menu
    toggleButton.addEventListener("click", () => {
        sidebar.classList.add("hidden");
        miniSideBar.classList.add("active");
        formContainer?.classList.add("active");
        submitButton?.classList.add("active");
        addButton?.classList.add("active");
        tableContainer?.classList.add("active");
    });

    // Mostrar o menu ao clicar no botão externo
    showButton.addEventListener("click", () => {
        sidebar.classList.remove("hidden");
        miniSideBar.classList.remove("active");
        formContainer?.classList.remove("active");
        submitButton?.classList.remove("active");
        addButton?.classList.remove("active");
        tableContainer?.classList.remove("active");
    });
});