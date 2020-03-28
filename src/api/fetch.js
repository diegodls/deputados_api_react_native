export async function fetchData(URL)  {    
    console.log("Inicio => fetchData")

    await fetch(URL)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Recuperando dados...");
        console.log(responseJson.dados); 
        console.log("Fim => fetchData")       
        return(responseJson.dados);
       
      })
      .catch(error => {
        setError(true);
        setErrorFetchData(error.toString());
        console.log("Erro ao recuperar os dados")
        console.log(error)
        console.log("Fim => fetchData")
      })
  }

