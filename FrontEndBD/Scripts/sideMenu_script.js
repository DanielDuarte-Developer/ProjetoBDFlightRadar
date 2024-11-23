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

     // Aplicar a classe 'active' ao link correspondente à página atual
     const currentPage = window.location.pathname; // Obtém o caminho da URL atual
     const sidebarLinks = document.querySelectorAll('.sidebar a');
 
     sidebarLinks.forEach(link => {
         const linkHref = link.getAttribute('href');  // Obtém o 'href' de cada link
         
         // Verifica se o 'href' corresponde ao caminho da URL atual
         if (currentPage.includes(linkHref)) {
             link.classList.add('active'); // Se corresponder, adiciona a classe 'active'
         } else {
             link.classList.remove('active'); // Caso contrário, remove a classe 'active'
         }
     });
 
     // Adicionar a funcionalidade de clicar para destacar o link (opcional)
     sidebarLinks.forEach(link => {
         link.addEventListener('click', function () {
             // Remove a classe 'active' de todos os links
             sidebarLinks.forEach(link => {
                 link.classList.remove('active');
             });
     
             // Adiciona a classe 'active' ao link clicado
             this.classList.add('active');
         });
     });
});