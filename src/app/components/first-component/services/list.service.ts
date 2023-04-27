import { Injectable } from '@angular/core';

import { dataClient } from '../dataClient';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() {}

  // async avaliaSe(cepteste: number): Promise<boolean>{
  //   const apiUrl = `https://viacep.com.br/ws/${cepteste}/json/`; //duplicação de codigo
  
  //   const response = await fetch(apiUrl);
  
  //   const data = await response.json();
  //   if(data.erro===true){
  //     return true;
  //   }else{
  //     return false;
  //   }
  // }

  async getAddress(dados: dataClient){
    // toggleLoader();
    
    const apiUrl = `https://viacep.com.br/ws/${dados.cep}/json/`;
  
    const response = await fetch(apiUrl);
  
    const data = await response.json();
  
    // Show error and reset form
     if( data.erro === true) {
        // if (!addressInput.hasAttribute("disabled")) {
        //    toggleDisabled();
        // }
                   // Passar para o principal
        // addressForm.reset(); //  não possui erro caso global
        //  toggleLoader();
        //  toggleMessage("CEP Inválido, tente novamente.");
       return true;
     }

    dados.adress = data.logradouro; 
    dados.city = data.localidade;
    dados.neighborhood = data.bairro;
    dados.regionState = data.uf;
    return false;
  };
}


