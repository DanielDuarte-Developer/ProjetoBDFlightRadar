document.addEventListener("DOMContentLoaded", () => {

    let data = [
        { "Id": 1, "IdCountry": 101, "AirlineName": "Airline A", "AirlineCode": "AA" },
        { "Id": 2, "IdCountry": 102, "AirlineName": "Airline B", "AirlineCode": "BB" }
    ];

    // Função para preencher dinamicamente a tabela
    function populateTable(tableId, data) {
        const table = document.getElementById(tableId);
        const columns = JSON.parse(table.getAttribute('data-columns'));
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = '';

        data.forEach((row, index) => {
            const tr = document.createElement('tr');
    
            // Preencher células com dados de acordo com as colunas
            columns.forEach((col) => {
                const td = document.createElement('td');
                td.textContent = row[col] || '—'; // Dados em minúsculas correspondem às chaves do objeto
                tr.appendChild(td);
            });

            // Adicionar botões de ações
            const actionsTd = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.className = 'edit-btn';
            editButton.setAttribute('data-index', index);

            const updateButton = document.createElement('button');
            updateButton.textContent = 'Atualizar';
            updateButton.className = 'update-btn';
            updateButton.setAttribute('data-index', index);

            actionsTd.appendChild(editButton);
            actionsTd.appendChild(updateButton);
            tr.appendChild(actionsTd);

            tbody.appendChild(tr);
        });
    }

    // Função para lidar com novos registros
    function addNewRecord(tableId) {
        const table = document.getElementById(tableId);
        const columns = JSON.parse(table.getAttribute('data-columns'));
        const tbody = table.querySelector('tbody');
        const newRow = document.createElement('tr');

        // Preencher nova linha com células vazias ou valores padrão
        columns.forEach((col) => {
            const td = document.createElement('td');
            td.textContent = `Novo ${col}`;
            newRow.appendChild(td);
        });

        // Adicionar ações na nova linha
        const actionsTd = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.className = 'edit-btn';

        const updateButton = document.createElement('button');
        updateButton.textContent = 'Atualizar';
        updateButton.className = 'update-btn';

        actionsTd.appendChild(editButton);
        actionsTd.appendChild(updateButton);
        newRow.appendChild(actionsTd);

        tbody.appendChild(newRow);
    }

    // Adicionar eventos de clique nos botões "Adicionar Registro"
    const addButtons = document.querySelectorAll('.add-btn');
    addButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const tableId = btn.getAttribute('data-table');
            addNewRecord(tableId);
        });
    });

    /*
    // Giving data for each table
    const tableId = document.querySelector('.data-table').id;
    let data = [];

    if (tableId === 'airlineTable') {
        data = [
           
        ];
    } else if (tableId === 'airplaneTable') {
        data = [
            
        ];
    } else if (tableId === 'airportTable'){

    } else if (tableId === 'brandTable'){

    } else if (tableId === 'countryTable'){

    } else if (tableId === 'flightsTable'){

    } else if (tableId === 'modelTable'){
 
    } else if (tableId === 'observationTable'){
     
    }
    */
    // Preencher tabela com os dados simulados
    populateTable(tableId, data);

    // Eventos de edição e atualização
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-btn')) {
            const row = event.target.closest('tr');
            const cells = row.querySelectorAll('td:not(:last-child)');
            cells.forEach(cell => cell.contentEditable = true);
        }

        if (event.target.classList.contains('update-btn')) {
            const row = event.target.closest('tr');
            const cells = row.querySelectorAll('td:not(:last-child)');
            cells.forEach(cell => cell.contentEditable = false);
            alert('Dados atualizados!'); // Aqui, você pode salvar os dados no banco ou API
        }
    });
});
