window.addEventListener("DOMContentLoaded", () => {
    // Get query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const tableId = urlParams.get('tableId');  // Get tableId
    const columns = JSON.parse(decodeURIComponent(urlParams.get('columns')));  // Decode and parse columns
    const rowData = JSON.parse(decodeURIComponent(urlParams.get('rowData')));  // Decode and parse rowData

    // Construct the table
    constructTable(tableId, columns, rowData);
});

function constructTable(tableId, columns, rowData) {
    const tableContainer = document.getElementById('table-container');  // Get the table container by ID
    tableContainer.innerHTML = '';  // Clear existing content

    // Construct the table element
    const table = document.createElement('table');
    table.setAttribute('id', tableId);
    table.classList.add('data-table');

    // Construct the table header (thead)
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    // Create table headers from the columns array
    columns.forEach(col => {
        const th = document.createElement('th');
        th.textContent = col;  // Use column name as header text
        headerRow.appendChild(th);
    });

    // Append the header row to the table head
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Construct the table body (tbody)
    const tbody = document.createElement('tbody');
    const bodyRow = document.createElement('tr');

    // Populate the table body with rowData
    columns.forEach(col => {
        const td = document.createElement('td');
        td.textContent = rowData[col] || '—';  // Use rowData to populate each cell
        bodyRow.appendChild(td);
    });

    // Append the body row to the table body
    tbody.appendChild(bodyRow);
    table.appendChild(tbody);

    // Add the table to the container
    tableContainer.appendChild(table);

    // Add a button for editing the data (optional, depending on your use case)
    addEditButton(tableContainer, rowData);
}

function addEditButton(tableContainer, rowData) {
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit Row';
    editButton.addEventListener('click', () => {
        // This is where you can redirect to another page or show an editable form
        console.log('Editing row:', rowData);
    });
    tableContainer.appendChild(editButton);
}