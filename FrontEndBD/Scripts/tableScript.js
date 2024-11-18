let taskApi = new TaskApi()
const tableId = document.querySelector('.data-table').id;
document.addEventListener("DOMContentLoaded", () => {
    // Get the data by the correspondent tableId
    //let data = getDataByTableId(tableId);
    data = [
        { "Id": 1, "IdCountry": 101, "AirlineName": "Airline A", "AirlineCode": "AA" },
        { "Id": 2, "IdCountry": 102, "AirlineName": "Airline B", "AirlineCode": "BB" }
    ]
    // Fill the table with the correspondent data 
    populateTable(tableId, data);

    // Adicionar eventos de clique nos botões "Adicionar Registro"
    const addButtons = document.querySelectorAll('.add-btn');
    addButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const tableId = btn.getAttribute('data-table');
            addNewRecord(tableId);
        });
    });

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

function getDataByTableId(tableId){
    // Giving data for each table
    let data = [];

    switch (tableId) {
        case 'airlineTable':
            data = taskApi.findAirlines();
            break;
        case 'airplaneTable':
            data = taskApi.findAirplanes();
            break;
        case 'airportTable':
            data = taskApi.findAirports();
            break;
        case 'brandTable':
            data = taskApi.findBrands();
            break;
        case 'countryTable':
            data = taskApi.findCountries();
            break;
        case 'flightsTable':
            data = taskApi.findFlights();
            break;
        case 'modelTable':
            data = taskApi.findModels();
            break;
        case 'observationTable':
            data = taskApi.findObservations();
            break;
        default:
            console.error('Unknown table ID');
    }

    return data;
}


// Função para preencher dinamicamente a tabela
function populateTable(tableId, data) {
    const table = document.getElementById(tableId);
    const columns = JSON.parse(table.getAttribute('data-columns'));
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';

    data.forEach((tableData, index) => {
        const tr = document.createElement('tr');
        
        // Preencher células com dados de acordo com as colunas
        columns.forEach((col) => {
            const td = document.createElement('td');
            td.textContent = tableData[col] || '—'; // Dados em minúsculas correspondem às chaves do objeto
            tr.appendChild(td);
        });
        
        // Adicionar botões de ações
        const actionsTd = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-btn';
        editButton.setAttribute('data-index', index);
        editButton.addEventListener('click', (event) => {
            // Pass row data, tableId, and data-columns to the edit page via query params
            navigateToEditPage(tableId, columns, tableData);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.setAttribute('data-index', index);

        actionsTd.appendChild(editButton);
        actionsTd.appendChild(deleteButton);
        tr.appendChild(actionsTd);

        tbody.appendChild(tr);
    });
}

function navigateToEditPage(tableId, columns, rowData) {
    // Convert the columns array and rowData to query strings
    const columnsStr = encodeURIComponent(JSON.stringify(columns));
    const rowDataStr = encodeURIComponent(JSON.stringify(rowData));

    // Navigate to the edit page, passing tableId, columns, and row data as query params
    window.location.href = `../editTable.html?tableId=${tableId}&columns=${columnsStr}&rowData=${rowDataStr}`;
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
