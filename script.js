// 1. Banco de dados simulado (Horários que já estão ocupados)
const agendaOcupada = {
  "2026-06-15": ["08:00", "10:00", "14:00"],
  "2026-06-16": ["15:00", "16:00", "18:00"]
};

// 2. Todos os horários que a empresa oferece
const horariosFuncionamento = ["08:00", "10:00", "14:00", "16:00", "18:00"];

// 3. Variáveis de controle
const adminCredenciais = { usuario: "admin", senha: "1234" };
let horarioSelecionado = null;
let agendamentos = [];

// 4. Variáveis dos elementos (inicializadas no DOMContentLoaded)
let campoData, containerHorarios, formulario;
let btnAdmin, adminLoginSection, painelAdmin, adminRelatorio, btnLoginAdmin, btnCancelarAdmin, btnLogoutAdmin;

// 5. Definir data mínima (hoje)
function definirDataMinima() {
  const hoje = new Date().toISOString().split('T')[0];
  campoData.setAttribute("min", hoje);
}

// 6. Função que desenha os horários na tela
function atualizarTela(listaDeHorarios) {
  containerHorarios.innerHTML = "";

  if (listaDeHorarios.length === 0) {
    containerHorarios.innerHTML = "<p>Desculpe, não há horários disponíveis para este dia.</p>";
    return;
  }

  // Criar título
  const titulo = document.createElement("p");
  titulo.textContent = "Horários disponíveis:";
  titulo.style.fontWeight = "bold";
  titulo.style.marginBottom = "10px";
  containerHorarios.appendChild(titulo);

  // Criar botões de horário
  listaDeHorarios.forEach(horario => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = horario;
    botao.classList.add("botao-horario");

    botao.addEventListener("click", function(e) {
      e.preventDefault();
      selecionarHorario(horario, botao);
    });

    containerHorarios.appendChild(botao);
  });
}

// 7. Função para selecionar horário
function selecionarHorario(horario, botao) {
  // Remover classe ativa de outros botões
  const botoesAtivos = containerHorarios.querySelectorAll(".botao-horario.ativo");
  botoesAtivos.forEach(btn => btn.classList.remove("ativo"));

  // Marcar o botão como selecionado
  botao.classList.add("ativo");
  horarioSelecionado = horario;

  console.log(`Horário selecionado: ${horario}`);
}

// 8. Inicializar quando a página carrega
document.addEventListener("DOMContentLoaded", function() {
  // Mapear elementos do HTML
  campoData = document.getElementById("data-selecionada");
  containerHorarios = document.getElementById("container-horarios");
  formulario = document.querySelector("form");
  btnAdmin = document.getElementById("btn-admin");
  adminLoginSection = document.getElementById("admin-login");
  painelAdmin = document.getElementById("painel-admin");
  adminRelatorio = document.getElementById("admin-relatorio");
  btnLoginAdmin = document.getElementById("login-admin");
  btnCancelarAdmin = document.getElementById("cancelar-admin");
  btnLogoutAdmin = document.getElementById("logout-admin");

  // Definir data mínima
  definirDataMinima();

  // Escutar mudança de data
  campoData.addEventListener("change", function() {
    const dataEscolhida = campoData.value;

    if (!dataEscolhida) {
      containerHorarios.innerHTML = "<p>Selecione uma data válida.</p>";
      horarioSelecionado = null;
      return;
    }

    // Verificar se é sábado ou domingo
    const data = new Date(dataEscolhida + "T00:00:00");
    const diaSemana = data.getDay();

    if (diaSemana === 0 || diaSemana === 6) {
      alert("Desculpe, não estamos atendendo aos finais de semana. Por favor, escolha um dia entre segunda e sexta-feira.");
      campoData.value = "";
      containerHorarios.innerHTML = "<p>Selecione uma data para ver os horários disponíveis.</p>";
      horarioSelecionado = null;
      return;
    }

    // Limpar horário selecionado ao mudar a data
    horarioSelecionado = null;

    // Filtrar horários livres
    let horariosOcupados = agendaOcupada[dataEscolhida] || [];
    let horariosLivres = horariosFuncionamento.filter(horario => !horariosOcupados.includes(horario));

    atualizarTela(horariosLivres);
  });

  // Validar e enviar formulário
  formulario.addEventListener("submit", function(e) {
    e.preventDefault();

    // Capturar dados do formulário
    const tutor = document.getElementById("tutor").value.trim();
    const email = document.getElementById("email").value.trim();
    const pet = document.getElementById("pet").value.trim();
    const servico = document.getElementById("servico").value;
    const data = campoData.value;
    const observacoes = document.getElementById("observacoes").value.trim();

    // Validações
    if (!tutor) {
      alert("Por favor, preencha o nome do tutor.");
      return;
    }

    if (!email) {
      alert("Por favor, preencha o email.");
      return;
    }

    if (!validarEmail(email)) {
      alert("Por favor, insira um email válido.");
      return;
    }

    if (!pet) {
      alert("Por favor, preencha o nome do pet.");
      return;
    }

    if (servico === "Selecione o serviço") {
      alert("Por favor, selecione um serviço.");
      return;
    }

    if (!data) {
      alert("Por favor, selecione uma data.");
      return;
    }

    if (!horarioSelecionado) {
      alert("Por favor, selecione um horário.");
      return;
    }

    // Se passou em todas as validações
    const agendamento = {
      tutor,
      email,
      pet,
      servico,
      data,
      horario: horarioSelecionado,
      observacoes,
      dataAgendamento: new Date().toLocaleString("pt-BR")
    };

    console.log("Agendamento confirmado:", agendamento);
    alert(`✓ Agendamento confirmado!\n\nTutor: ${tutor}\nPet: ${pet}\nData: ${data}\nHorário: ${horarioSelecionado}\n\nUm email de confirmação será enviado para ${email}`);

    // Salvar agendamento para o painel admin
    agendamentos.push(agendamento);

    // Limpar formulário
    formulario.reset();
    containerHorarios.innerHTML = "<p>Selecione uma data para ver os horários disponíveis.</p>";
    horarioSelecionado = null;
  });
});

// 9. Função auxiliar para validar email
function validarEmail(email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
}