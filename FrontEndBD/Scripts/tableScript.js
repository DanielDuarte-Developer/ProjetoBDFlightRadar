let taskApi = new TaskApi()
const tableContainer = document.getElementById('table-container');
const tableId = tableContainer.dataset.table;
const columns = JSON.parse(tableContainer.dataset.columns);
document.addEventListener("DOMContentLoaded", async () => {
    // Get the data by the correspondent tableId
    let data = await getDataByTableId(tableId);
    console.log(data)
    constructTable(data,columns)

    // Adicionar eventos de clique nos botões "Adicionar Registro"
    const addButtons = document.querySelectorAll('.add-btn');
    addButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            navigateToEditOrAddPage(columns, "", 'Add')
        });
    });
});

async function getDataByTableId(tableId){
    // Giving data for each table
    let data = [];

    switch (tableId) {
        case 'airlineTable':
            data = await taskApi.findAirlines();
            break;
        case 'airplaneTable':
            data = await taskApi.findAirplanes();
            break;
        case 'airportTable':
            data = await taskApi.findAirports();
            break;
        case 'brandTable':
            data = await taskApi.findBrands();
            break;
        case 'countryTable':
            data = await taskApi.findCountries();
            break;
        case 'flightTable':
            data = await taskApi.findFlights();
            break;
        case 'modelTable':
            data = await taskApi.findModels();
            break;
        case 'observationTable':
            data = await taskApi.findObservations();
            break;
        default:
            console.error('Unknown table ID');
    }

    return Promise.all(data);
}


function constructTable(data,columns){
    // Transform columns for Tabulator
    const transformedColumns = columns.map(column => {
        // Create a path function for nested properties (e.g., CountryObj.CountryName)
        const fieldParts = column.split('.'); // Split into an array (['CountryObj', 'CountryName'])

        return {
            title: fieldParts[1] || fieldParts[0],
            field: column
        };
    });
    // Add the "Actions" column
    transformedColumns.push({
        title: "Actions",
        formatter: (cell, formatterParams) => {
            return `
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            `;
        },
        width: 220,
        cellClick: (e, cell) => {
            const rowData = cell.getRow().getData(); // Get the row data
            if (e.target.classList.contains("edit-btn")) {
                navigateToEditOrAddPage(columns, rowData, 'Edit')
            } else if (e.target.classList.contains("delete-btn")) {
                // Handle delete logic
            }
        },
    });
    const table = new Tabulator("#table-container", {
        data: data,
        layout: "fitColumns",
        columns: transformedColumns,
        responsiveLayout: true,
    });
}


function navigateToEditOrAddPage(columns, rowData, type) {
    sessionStorage.setItem('columns',JSON.stringify(columns))
    sessionStorage.setItem('rowData',JSON.stringify(rowData))

    // Navigate to the edit page, passing tableId, columns, and row data as query params
    window.location.href = `../EditOrAddTable.html?type=${type}`;
}