document.addEventListener("DOMContentLoaded", () => {
    // Dados para cada tabela (poderiam vir de uma API ou banco de dados)
    const dataTable1 = [
        { id: 1, nome: 'João Silva', email: 'joao@example.com' },
        { id: 2, nome: 'Ana Costa', email: 'ana@example.com' }
    ];

    const dataTable2 = [
        { id: 1, nome: 'Carlos Pereira', email: 'carlos@example.com' },
        { id: 2, nome: 'Mariana Lima', email: 'mariana@example.com' }
    ];

    // Função para preencher uma tabela com dados
    function populateTable(tableId, data) {
        const table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
        table.innerHTML = '';  // Limpar qualquer conteúdo existente na tabela

        data.forEach(item => {
            const row = table.insertRow();

            // Adiciona células com dados
            const cell1 = row.insertCell(0);
            cell1.textContent = item.id;

            const cell2 = row.insertCell(1);
            cell2.textContent = item.nome;

            const cell3 = row.insertCell(2);
            cell3.textContent = item.email;

            const cell4 = row.insertCell(3);
            const editButton = document.createElement('button');
            editButton.classList.add('edit-btn');
            editButton.textContent = 'Editar';
            editButton.setAttribute('data-row-id', item.id); // Armazena o ID da linha para editar
            cell4.appendChild(editButton);

            const updateButton = document.createElement('button');
            updateButton.classList.add('update-btn');
            updateButton.textContent = 'Atualizar';
            updateButton.setAttribute('data-row-id', item.id); // Armazena o ID da linha para atualizar
            cell4.appendChild(updateButton);
        });
    }

    // Detectar o ID da tabela e carregar dados correspondentes
    const tableId = document.querySelector(".data-table").id;
    if (tableId === "table1") {
        populateTable('table1', dataTable1);
    } else if (tableId === "table2") {
        populateTable('table2', dataTable2);
    }

    // Adicionar um novo registro na tabela
    const addButton = document.querySelector('.add-btn');
    addButton.addEventListener('click', (event) => {
        const tableId = event.target.getAttribute('data-table');
        const table = document.getElementById(tableId);
        const newRow = table.insertRow();
        
        // Dados do novo registro (aqui, você pode adicionar lógica para capturar dados do usuário)
        const newData = {
            id: table.rows.length,  // ID gerado com base no número de linhas
            nome: 'Novo Nome',
            email: 'novo@example.com'
        };

        // Preenche a nova linha
        const cell1 = newRow.insertCell(0);
        cell1.textContent = newData.id;

        const cell2 = newRow.insertCell(1);
        cell2.textContent = newData.nome;

        const cell3 = newRow.insertCell(2);
        cell3.textContent = newData.email;

        const cell4 = newRow.insertCell(3);
        const editButton = document.createElement('button');
        editButton.classList.add('edit-btn');
        editButton.textContent = 'Editar';
        editButton.setAttribute('data-row-id', newData.id); // Armazena o ID da linha para editar
        cell4.appendChild(editButton);

        const updateButton = document.createElement('button');
        updateButton.classList.add('update-btn');
        updateButton.textContent = 'Atualizar';
        updateButton.setAttribute('data-row-id', newData.id); // Armazena o ID da linha para atualizar
        cell4.appendChild(updateButton);
    });

    // Editar um registro
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const rowId = event.target.getAttribute('data-row-id'); // Recupera o ID da linha
            const row = event.target.closest('tr'); // Encontrar a linha em que o botão foi clicado
            const cells = row.querySelectorAll('td');

            // Torna as células de nome e email editáveis
            cells[1].contentEditable = true;
            cells[2].contentEditable = true;

            // Altera o texto do botão para 'Salvar'
            const updateButton = row.querySelector('.update-btn');
            updateButton.textContent = 'Salvar';
        });
    });

    // Atualizar (ou salvar) um registro
    const updateButtons = document.querySelectorAll('.update-btn');
    updateButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const rowId = event.target.getAttribute('data-row-id'); // Recupera o ID da linha
            const row = event.target.closest('tr'); // Encontrar a linha em que o botão foi clicado
            const cells = row.querySelectorAll('td');

            // Desabilita a edição das células de nome e email
            cells[1].contentEditable = false;
            cells[2].contentEditable = false;

            // Altera o texto do botão de volta para 'Atualizar'
            event.target.textContent = 'Atualizar';

            // Aqui você pode adicionar lógica para salvar os dados alterados no banco de dados
            // ou em algum lugar, se necessário.
        });
    });
});
