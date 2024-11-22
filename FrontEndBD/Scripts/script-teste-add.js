const taskApi = new TaskApi();
const button = document.getElementById('submit-btn');

// Adicionar um ouvinte de evento para o clique
button.addEventListener('click', function() {
    try{
        /* 
            Working
            taskApi.createCountry({
                CountryName: "Mongol"
            })
        */
        /*
            Working
            taskApi.updateCountry({
                Id: "7af13b6b-a8e9-11ef-9670-0800277a15ae",
                CountryName: "MongolV2"
            })
        */
       /* 
            Working
            taskApi.deleteCountry("7af13b6b-a8e9-11ef-9670-0800277a15ae")
        */
    }catch(error){
        console.log(error)
    }
    
});