window.addEventListener("DOMContentLoaded", () => {
    // Get query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get("type")
    const columns = JSON.parse(sessionStorage.getItem('columns'));
    const rowData = JSON.parse(sessionStorage.getItem('rowData'));
    const submitButton = document.getElementById("submit-button")
    console.log(columns)
    // Construct the table
    constructForm(rowData, columns, type)

    submitButton.addEventListener('click', () => {
        const formData = {};

        // Obtenha todos os campos do formulário
        const formFields = document.querySelectorAll('#form-container input, #form-container select');

        formFields.forEach(field => {
            // Verifique o tipo de cada campo (input, select)
            if (field.type === 'text' || field.tagName.toLowerCase() === 'select') {
                formData[field.name] = field.value; // Adiciona o valor ao objeto
            }
        });

       
        console.log(formData);

        //submiting changes event logic here
        if (type == "Add") {
            //Add Logic
            //After the submiting clean the session
            cleanSession()
        } else if (type == "Edit") {
            //Edit Logic
            //After the submiting clean the session
            cleanSession()
        } else {
            //After the submiting clean the session
            console.log("Error")
            cleanSession()
        }
    });
});

function constructForm(rowData, columns, type) {
    const formContainer = document.getElementById('form-container');
    formContainer.innerHTML = ''; // Clear existing form if any

    columns.forEach(column => {
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
        if (shouldBeSelect(fieldParts[0])) {
            let input = document.createElement('select');
            input.id = column;
            input.name = column;

            // Fetch the options for the select
            const options = getSelectOptions(fieldParts[0]);

            options.forEach(option => {
                let optionElement = document.createElement('option');
                optionElement.value = option.id;
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
                input.id = rowData[column];
                input.name = column;
                formGroup.appendChild(input);
            }
        }

        // Append the form group to the form container
        formContainer.appendChild(formGroup);
    });
}


function shouldBeSelect(field) {
    // List of fields that should be rendered as select inputs
    const selectFields = [
        'CountryObj', 'ModelObj', 'AirlineObj', 'AirportObj',
        'FlightObj', 'ObservationObj', 'AirplaineObj', 'BrandObj'
    ];

    return selectFields.includes(field);
}

function getSelectOptions(field) {
    switch (field) {
        case 'IdCountry':
            return taskApi.findCountries();
        case 'IdModel':
            return taskApi.findModels();
        case 'IdAirline':
            return taskApi.findAirlines();
        case 'IdAirport':
            return taskApi.findAirports();
        case 'IdFlight':
            return taskApi.findFlights();
        case 'IdObservation':
            return taskApi.findObservations();
        case 'IdAirplane':
            return taskApi.findAirplanes();
        case 'IdBrand':
            return taskApi.findBrands();
        default:
            return [];
    }
}


function cleanSession() {
    // Removing the items from the session storage
    sessionStorage.removeItem('columns');
    sessionStorage.removeItem('rowData');
    // Clearing all data
    sessionStorage.clear();
}