// data e hora 
document.addEventListener("DOMContentLoaded", function () {
    const campoData = document.getElementById("data-selecionada");
    const campoHorario = document.getElementById("horario-selecionado");

    // Lista de horários que você quer oferecer no consultório da Dra. Juliana
    const horariosDisponiveis = ["08:00", "09:00", "10:00", "11:00",
        "14:00", "15:00", "16:00", "17:00" ];

    // Configuração do Calendário Flatpickr
    flatpickr(campoData, {
        locale: "pt",
        dateFormat: "d/m/Y",
        minDate: "today",
        // Função que roda para cada dia do calendário. Retorna "true" para bloquear.
        disable: [
            function(date) {
                // date.getDay() retorna 0 para Domingo e 6 para Sábado
                return (date.getDay() === 0 || date.getDay() === 6);
            }
        ],
        // Quando o tutor escolhe uma data válida, liberamos os horários
        onChange: function(selectedDates, dateStr, instance) {
            if (selectedDates.length > 0) {
                carregarHorarios();
            }
        }
    });

    // Função para preencher o select de horários dinamicamente
    function carregarHorarios() {
        campoHorario.disabled = false; // Ativa o campo
        campoHorario.innerHTML = '<option value="" disabled selected>Escolha o horário...</option>';

        horariosDisponiveis.forEach(hora => {
            const option = document.createElement("option");
            option.value = hora;
            option.textContent = hora;
            campoHorario.appendChild(option);
        });
    }

    // Controle de envio do formulário
    const formulario = document.querySelector(".agendamento form");
    if (formulario) {
        formulario.addEventListener("submit", function (event) {
            event.preventDefault();

            const data = campoData.value;
            const horario = campoHorario.value;
            const pet = document.getElementById("pet").value;
            const servico = document.getElementById("servico").value;

            if (servico === "Selecione o serviço" || !servico) {
                alert("Por favor, selecione um serviço.");
                return;
            }

            alert(`Agendamento solicitado!\n\nPet: ${pet}\nServiço: ${servico}\nData: ${data}\nHorário: ${horario}h`);
            
            formulario.reset();
            campoHorario.disabled = true;
            campoHorario.innerHTML = '<option value="" disabled selected>Selecione a data primeiro</option>';
        });
    }
});


// --- CÓDIGO DO LOGIN ---
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const emailDigitado = document.getElementById('email').value.trim();
    const senhaDigitada = document.getElementById('senha').value.trim();

    const emailCorreto = "teste@tutor.com";
    const senhaCorreta = "vet123";
    const paginaDestino = "acesso.html"; 

    if (emailDigitado === emailCorreto && senhaDigitada === senhaCorreta) {
        window.location.href = paginaDestino; 
    } else {
        alert("E-mail ou senha incorretos. Verifique os dados inseridos e tente novamente.");
    }
});