function validateForm() {
    let isValid = true;

    // Validar nome
    const nome = document.getElementById('nome');
    const nomeError = document.getElementById('nomeError');
    if (nome.value.length < 15) {
        nomeError.textContent = "O nome completo deve ter pelo menos 15 caracteres.";
        nomeError.style.display = "block";
        nome.focus();
        isValid = false;
    } else {
        nomeError.style.display = "none";
    }

    // Validar email
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value) || email.value.length < 10) {
        emailError.textContent = "Por favor, insira um e-mail válido com pelo menos 10 caracteres.";
        emailError.style.display = "block";
        email.focus();
        isValid = false;
    } else {
        emailError.style.display = "none";
    }

    // Validar data de nascimento
    const dataNascimento = document.getElementById('dataNascimento');
    const dataNascimentoError = document.getElementById('dataNascimentoError');
    const today = new Date();
    const birthDate = new Date(dataNascimento.value);
    if (birthDate >= today || isNaN(birthDate)) {
        dataNascimentoError.textContent = "Por favor, insira uma data de nascimento válida.";
        dataNascimentoError.style.display = "block";
        dataNascimento.focus();
        isValid = false;
    } else {
        dataNascimentoError.style.display = "none";
    }

    // Validar sexo
    const sexo = document.querySelector('input[name="sexo"]:checked');
    const sexoError = document.getElementById('sexoError');
    if (!sexo) {
        sexoError.textContent = "Por favor, selecione o sexo.";
        sexoError.style.display = "block";
        isValid = false;
    } else {
        sexoError.style.display = "none";
    }

    // Validar estado civil
    const estadoCivil = document.getElementById('estadoCivil');
    const estadoCivilError = document.getElementById('estadoCivilError');
    if (estadoCivil.value === "") {
        estadoCivilError.textContent = "Por favor, selecione o estado civil.";
        estadoCivilError.style.display = "block";
        estadoCivil.focus();
        isValid = false;
    } else if (estadoCivil.value === "Solteiro(a)" && !validateAge(birthDate, 15)) {
        estadoCivilError.textContent = "Para ser solteiro(a), você deve ter pelo menos 15 anos.";
        estadoCivilError.style.display = "block";
        estadoCivil.focus();
        isValid = false;
    } else {
        estadoCivilError.style.display = "none";
    }

    // Validar áreas de interesse
    const interesses = document.querySelectorAll('input[name="interesse"]:checked');
    const interesseError = document.getElementById('interesseError');
    if (interesses.length === 0) {
        interesseError.textContent = "Por favor, selecione pelo menos uma área de interesse.";
        interesseError.style.display = "block";
        isValid = false;
    } else {
        interesseError.style.display = "none";
    }

    // Exibir os dados se forem válidos
    if (isValid) {
        const dados = {
            nome: nome.value,
            email: email.value,
            dataNascimento: dataNascimento.value,
            sexo: sexo ? sexo.value : "",
            estadoCivil: estadoCivil.value,
            interesses: Array.from(interesses).map(i => i.value)
        };

        alert("Dados enviados com sucesso:\n" + JSON.stringify(dados, null, 2));
    }
}

function validateAge(birthDate, minAge) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= minAge;
}

