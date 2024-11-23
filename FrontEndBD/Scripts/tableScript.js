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
            navigateToEditOrAddPage(columns, "", 'Add', tableId)
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
        cellClick: async (e, cell)  => {
            const rowData = cell.getRow().getData(); // Get the row data
            const rowId = rowData.Id; 
            if (e.target.classList.contains("edit-btn")) {
                navigateToEditOrAddPage(columns, rowData, 'Edit', tableId)
            } else if (e.target.classList.contains("delete-btn")) {
                const response = await DeleteObject(rowId, tableId)
                if (response.ok) {
                    cell.getRow().delete()
                }
            }
        },
    });
    const table = new Tabulator("#table-container", {
        data: data,
        rowData: "Id",
        layout: "fitColumns",
        columns: transformedColumns,
        responsiveLayout: true,
        pagination: "local",     // Enables local pagination
        paginationSize: 10,      // Number of rows per page
        paginationButtonCount: 5,  // Number of pagination buttons to show
        paginationSizeSelector: [5, 10, 20], // Allows user to select the number of rows per page
        search: true,            // Enables the global search
        headerFilterPlaceholder: "Search...", // Placeholder text for search input
        tooltips: true,          // Enables tooltips on table cells
    });

    document.getElementById('search-input').addEventListener('keyup', function(e) {
        const searchValue = e.target.value.toLowerCase();  // Obtém o valor da barra de pesquisa (em minúsculas)

        if (searchValue) {
            // Se o valor de pesquisa não estiver vazio, faz o filtro
            table.setFilter([
                    //filters
                    {field: "CountryName", type: "like", value: searchValue}
            ]);
        } else {
            // Se o valor da pesquisa estiver vazio, remove o filtro e mostra todos os dados
            table.clearFilter();
        }
    });

}

async function DeleteObject(id, tableId) {
    switch (tableId) {
        case 'airlineTable':
            return taskApi.deleteAirline(id);
        case 'airplaneTable':
            return taskApi.deleteAirplane(id);
        case 'airportTable':
            return taskApi.deleteAirport(id);
        case 'brandTable':
            return taskApi.deleteBrand(id);
        case 'countryTable':
            return taskApi.deleteCountry(id)
        case 'flightTable':
            return taskApi.deleteFlight(id)
        case 'modelTable':
            return taskApi.deleteModel(id)
        case 'observationTable':
            return taskApi.deleteObservation(id)
        default: 
            console.log("Error Table Id ", tableId)
            return;
    }

}
function navigateToEditOrAddPage(columns, rowData, type, tableId) {
    sessionStorage.setItem('columns',JSON.stringify(columns))
    sessionStorage.setItem('rowData',JSON.stringify(rowData))
    sessionStorage.setItem('tableId', tableId)

    // Navigate to the edit page, passing type
    window.location.href = `../EditOrAddTable.html?type=${type}`;
}