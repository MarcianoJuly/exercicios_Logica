import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ListService } from './services/list.service';

import { dataClient } from './dataClient';

@Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrls: ['./first-component.component.css']
})

export class FirstComponentComponent implements OnInit{
  formulario = new FormGroup({
    name: new FormControl(''),
    cpfClient: new FormControl(''),
    bornIn: new FormControl(''),
    emailClient: new FormControl(''),
    telephones: new FormControl(''),
    cep: new FormControl(''),
    adress: new FormControl(''),
    houseNumber: new FormControl(''),
    complement: new FormControl(''),
    neighborhood: new FormControl(''),
    city: new FormControl(''),
    regionState: new FormControl(''),
  });

  dados: dataClient = {
    name: '',
    cpfClient: 0,
    bornIn: new Date(),
    emailClient: '',
    telephones: 0,
    cep: 0,
    adress: '',
    houseNumber: '',
    complement: '',
    neighborhood: '',
    city: '',
    regionState: '',
  };

  localDisabled: boolean = true;

  constructor(private listService: ListService){};

  // Validate CEP Input
  validarCEP(e: KeyboardEvent): void {
    const onlyNumbers = /[0-9]|\./; // expressão regular
    const key = String.fromCharCode(e.keyCode);

    // permitir somente números
    if (!onlyNumbers.test(key)) {
      e.preventDefault();
      return;
    }
  }

  // Evento para obter o endereço
  obterEndereco(e: KeyboardEvent): void {
    const inputValue = (e.target as HTMLInputElement).value;
    // verificar se temos um CEP válido
    if (inputValue.length === 8) {
      this.getEndereco();
    }else{
      this.clearLock()
    }
  }

  async getEndereco() {
    // código para obter o endereço a partir do CEP
    // if(!await this.listService.avaliaSe(this.dados.cep)){
    if(!await this.listService.getAddress(this.dados)){
      this.localDisabled = false;
    }else{
      this.toggleMessage("CEP invalido");
      this.clearLock()
    }
  }

  clearLock(): void{
    this.dados.adress = '',
    this.dados.houseNumber = '',
    this.dados.complement = '',
    this.dados.neighborhood = '',
    this.dados.city = '',
    this.dados.regionState= '';
    this.localDisabled = true;
  }

  clearForm(): void{
    this.dados.name= '',
    this.dados.cpfClient= 0,
    this.dados.bornIn= new Date(),
    this.dados.emailClient= '',
    this.dados.telephones= 0,
    this.dados.cep= 0;
    this.clearLock();
  }

  // toggleLoader() {
  //   const loaderElement = document.querySelector("#loader");
  //   const fadeElement = document.querySelector("#fade");

  //   fadeElement.classList.toggle("hide");
  //   loaderElement.classList.toggle("hide");
  // }

  toggleMessage = (msg: string | null = null) => {
    const messageElement = document.querySelector("#message");
    const messageTextElement = document.querySelector("#message p");
  
    if (messageElement && messageTextElement) {
      messageTextElement.textContent = msg || '';
      frameElement!.classList.toggle("hide");
      messageElement.classList.toggle("hide");
    }
  };

  //Close message modal
  closeButtonHandler() {
    this.toggleMessage("");
  }
  
  onSubmitHandler() {
    //this.toggleLoader();
    console.log("chegou")
  setTimeout(() => {
    //this.toggleLoader();
    
    this.toggleMessage("Cadastro concluido");

    this.clearForm();

    }, 1000);
  }


  ngOnInit(): void {
    const cepInput = document.getElementById('cepInput') as HTMLInputElement;
    const addressForm = document.querySelector('address-form') as HTMLFormElement;

    cepInput.addEventListener('keypress', this.validarCEP);
    cepInput.addEventListener('keyup', this.obterEndereco.bind(this));
  }
}



