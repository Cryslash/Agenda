// import { isInteger } from "core-js/core/number";
// import { validate } from "webpack";
import validator from 'validator';

export default class Contato {
    constructor() {
        this.form = document.querySelector('.form-contato');
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const el = e.target;
        const nomeInput = el.querySelector('input[name="nome"]');
        const emailInput = el.querySelector('input[name="email"]');
        const telefoneInput = el.querySelector('input[name="telefone"]');        
        let error = false;

        for(let errorText of this.form.querySelectorAll('.text-danger')) {
            errorText.remove();
          }

        if (emailInput.value !== "" && !validator.isEmail(emailInput.value)) {
            this.writeErrorMessage(emailInput,'E-mail inválido');
            error = true;
        }

        if (nomeInput.value === "") {
            this.writeErrorMessage(nomeInput,'Nome é um campo obrigatório.');
            error = true;
        }
         
        if (emailInput.value === "" && telefoneInput.value === "") {
            this.writeErrorMessage(emailInput,'Pelo menos um contato precisa ser informado: e-mail ou telefone.');
            this.writeErrorMessage(telefoneInput,'Pelo menos um contato precisa ser informado: e-mail ou telefone.');
            error = true;
        }
        
        if (!error) el.submit();
    }

    writeErrorMessage(el, msg){
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('text-danger');
        el.insertAdjacentElement('afterend', div);
    }
}
