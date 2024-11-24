const taskApi = new TaskApi();
const tableId = sessionStorage.getItem('tableId')
window.addEventListener("DOMContentLoaded", () => {
    // Get query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get("type")
    const columns = JSON.parse(sessionStorage.getItem('columns'));

    //Only on Edit
    const rowData = JSON.parse(sessionStorage.getItem('rowData'));
    const submitButton = document.getElementById("submit-button")
    // Construct the table
    constructForm(rowData, columns, type)

    submitButton.addEventListener('click', async () => {
        const formData = {};

        // Obtenha todos os campos do formulário
        const formFields = document.querySelectorAll('#form-container input, #form-container select');

        formFields.forEach(field => {
            // Verifique o tipo de cada campo (input, select)
            if (field.type === 'text' || field.tagName.toLowerCase() === 'select') {
                let fieldName = field.name // Adiciona o valor ao objeto
                if (isObject(fieldName.split('.')[0])) {

                    // Cria o nome do campo no formato Id(Nome de tabela), etc.
                    const objectName = fieldName.split('.')[0];
                    const newFieldName = `Id${objectName.replace('Obj', '')}`; // Remove 'Obj' e adiciona 'Id'

                    // Armazena o valor no novo nome de campo
                    formData[newFieldName] = field.value;
                } else {
                    // Se não for um objeto, simplesmente mantém o nome original
                    formData[fieldName] = field.value;
                }

            }
        });

        if (type === 'Edit') {
            const hiddenField = document.querySelector('input[type="hidden"][name="Id"]');
            if (hiddenField) {
                formData["Id"] = hiddenField.value; // Adiciona o valor do Id ao formData
            }
        }
        await AddOrUpdateObject(formData,tableId,type)
    });
});

function constructForm(rowData, columns, type) {
    const formContainer = document.getElementById('form-container');
    formContainer.innerHTML = ''; // Clear existing form if any

    columns.forEach(async column => {
        const fieldParts = column.split('.');

        // Create a form group for each field
        let formGroup = document.createElement('div');
        formGroup.classList.add('form-group');

        if (column != "Id") {
            // Create a label for the input
            let label = document.createElement('label');
            label.textContent = fieldParts[0];
            label.setAttribute('for', column);
            formGroup.appendChild(label);
        }

        // Check if the field should be a select

        if (isObject(fieldParts[0])) {
            let input = document.createElement('select');
            input.id = column;
            input.name = column;

            // Fetch the options for the select
            const data = await getSelectOptions(fieldParts[0]);
            const options = await getDataforOptions(fieldParts[0], tableId, data)

            options.forEach(async option => {
                let optionElement = document.createElement('option');
                optionElement.value = option.Id;
                optionElement.textContent = option.label;
                input.appendChild(optionElement);
            });

            // If it's an Edit operation, pre-fill the select with rowData
            if (type === 'Edit' && rowData && rowData[column]) {
                input.value = rowData[column];
            }

            formGroup.appendChild(input);
        } else {
            if (column != "Id") {
                // Default: Create an input field for text
                let input = document.createElement('input');
                input.type = 'text';
                input.id = column;
                input.name = column;

                // If it's an Edit operation, pre-fill with rowData values
                if (type === 'Edit' && rowData && rowData[column]) {
                    input.value = rowData[column];
                }

                formGroup.appendChild(input);
            } else {
                let input = document.createElement('input');
                input.type = 'hidden';
                input.name = column
                input.value = rowData[column];
                formGroup.appendChild(input);
            }
        }

        // Append the form group to the form container
        formContainer.appendChild(formGroup);
    });
}

async function AddOrUpdateObject(item, tableId, type) {
    switch (tableId) {
        case 'airlineTable':
            if (type == "Add") {
                try{
                    await taskApi.createAirline(item)
                }catch(error){
                    console.log(error)
                }
                cleanSession()
            } else if (type == "Edit") {
                //Edit Logic
                await taskApi.updateAirline(item)
            } else {
                //After the submiting clean the session
                console.log("Error")
            }
            cleanSession()
            break;
        case 'airplaneTable':
            if (type == "Add") {
                try{
                    //Add logic
                    await taskApi.createAirplane(item)
                }catch(error){
                    console.log(error)
                }
                cleanSession()
            } else if (type == "Edit") {
                //Edit Logic
                await taskApi.updateAirplane(item)
                cleanSession()
            } else {
                //After the submiting clean the session
                console.log("Error")
                cleanSession()
            }
            break;
        case 'airportTable':
            if (type == "Add") {
                //Add logic
                try{
                    await taskApi.createAirport(item)
                }catch(error){
                    console.log(error)
                }
                cleanSession()
            } else if (type == "Edit") {
                //Edit Logic
                await taskApi.updateAirport(item)
            } else {
                //After the submiting clean the session
                console.log("Error")
            }
            cleanSession()
            break;
        case 'brandTable':
            if (type == "Add") {
                //Add logic
                try{
                    await taskApi.createBrand(item)
                }catch(error){
                    console.log(error)
                }
                cleanSession()
            } else if (type == "Edit") {
                //Edit Logic
                await taskApi.updateBrand(item)
                cleanSession()
            } else {
                //After the submiting clean the session
                console.log("Error")
                cleanSession()
            }
            break;
        case 'countryTable':
            if (type == "Add") {
                //Add logic
                try{
                    await taskApi.createCountry(item)
                }catch(error){
                    console.log(error)
                }
                cleanSession()
            } else if (type == "Edit") {
                //Edit Logic
                taskApi.updateCountry(item)
                cleanSession()
            } else {
                //After the submiting clean the session
                console.log("Error")
                cleanSession()
            }
            break;
        case 'flightTable':
            if (type == "Add") {
                //Add logic
                try{
                    await taskApi.createFlight(item)
                }catch(error){
                    console.log(error)
                }
                cleanSession()
            } else if (type == "Edit") {
                //Edit Logic
                taskApi.updateFlight(item)
                cleanSession()
            } else {
                //After the submiting clean the session
                console.log("Error")
                cleanSession()
            }
            break;
        case 'modelTable':
            if (type == "Add") {
                //Add logic
                try{
                    await taskApi.createModel(item)
                }catch(error){
                    console.Console.log(error)
                }
                cleanSession()
            } else if (type == "Edit") {
                //Edit Logic
                await taskApi.updateModel(item)
                cleanSession()
            } else {
                //After the submiting clean the session
                console.log("Error")
                cleanSession()
            }
            break;
        case 'observationTable':
            if (type == "Add") {
                //Add logic
                try{    
                    await taskApi.createObservation(item)
                }catch(error){
                    console.log(error)
                }
                cleanSession()
            } else if (type == "Edit") {
                //Edit Logic
                await taskApi.updateObservation(item)
                cleanSession()
            } else {
                //After the submiting clean the session
                console.log("Error")
                cleanSession()
            }
            break;
        default: []
    }

}

function isObject(field) {
    // List of fields that should be rendered as select inputs
    const selectFields = [
        'CountryObj', 'ModelObj', 'AirlineObj', 'AirportObj',
        'FlightObj', 'ObservationObj', 'AirplaineObj', 'BrandObj'
    ];

    return selectFields.includes(field);
}

async function getSelectOptions(field) {
    switch (field) {
        case 'CountryObj':
            return await taskApi.findCountries();
        case 'ModelObj':
            return await taskApi.findModels();
        case 'AirlineObj':
            return await taskApi.findAirlines();
        case 'AirportObj':
            return await taskApi.findAirports();
        case 'FlightObj':
            return await taskApi.findFlights();
        case 'ObservationObj':
            return await taskApi.findObservations();
        case 'AirplaneObj':
            return await taskApi.findAirplanes();
        case 'BrandObj':
            return await taskApi.findBrands();
        default:
            return [];
    }
}
async function getDataforOptions(field, tableId, data) {
    switch (tableId) {
        case 'airlineTable':
        case 'airportTable':
        case 'brandTable':
            // Para a tabela de países, deve retornar a lista de países com a propriedade CountryName
            if (field === 'CountryObj') {
                return data.map(item => ({
                    Id: item.Id,
                    label: item.CountryName // ou a propriedade que você precisar
                }));
            }
            break;
        case 'airplaneTable':
            if (field === 'ModelObj') {
                return data.map(item => ({
                    Id: item.Id,
                    label: item.ModelName // ou a propriedade que você precisar
                }));
            }
            if (field === 'AirlineObj') {
                return data.map(item => ({
                    Id: item.Id,
                    label: item.AirlineName // ou a propriedade que você precisar
                }));
            }
            break;
        case 'modelTable':
            if (field === 'BrandObj') {
                return data.map(item => ({
                    Id: item.Id,
                    label: item.BrandName // ou a propriedade que você precisar
                }));
            }
            break;
        case 'flightTable':
            // Para a tabela de companhias aéreas, deve retornar a lista de companhias com a propriedade AirlineName
            if (field === 'AirplaneObj') {
                return data.map(item => ({
                    Id: item.Id,
                    label: item.AirplaneName // ou a propriedade que você precisar
                }));
            }
            if (field === 'ObservationObj') {
                return data.map(item => ({
                    Id: item.Id,
                    label: item.ObservationText // ou a propriedade que você precisar
                }));
            }
            break;
        default:
            return [];
    }

    // Fallback para outros campos que não têm opções personalizadas
    return [];
}


function cleanSession() {
    // Removing the items from the session storage
    sessionStorage.removeItem('columns');
    sessionStorage.removeItem('rowData');
    // Clearing all data
    sessionStorage.clear();
}