// import { isInteger } from "core-js/core/number";
// import { validate } from "webpack";
import validator from 'validator';

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
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
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let error = false;

        for(let errorText of this.form.querySelectorAll('.text-danger')) {
            errorText.remove();
          }

        if (!validator.isEmail(emailInput.value)) {
            this.writeErrorMessage(emailInput,'E-mail inválido');
            error = true;
        }

        if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            this.writeErrorMessage(passwordInput,'Senha precisa ter entre 3 e 50 caracteres');
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
