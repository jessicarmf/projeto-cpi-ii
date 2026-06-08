// Script principal do site
document.addEventListener('DOMContentLoaded', () => {
   const agendamentoSection = document.querySelector('.agendamento');
   const agendamentoForm = document.querySelector('.agendamento form');
   const headerAgendamentoBtn = document.querySelector('header .botoes-menu button');
   const botoesContato = document.querySelectorAll('.botoes-contato button');

   function scrollTo(el) {
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
   }

   // Botão principal do cabeçalho leva ao agendamento
   if (headerAgendamentoBtn && agendamentoSection) {
      headerAgendamentoBtn.addEventListener('click', (e) => {
         e.preventDefault();
         scrollTo(agendamentoSection);
         const firstInput = agendamentoForm?.querySelector('input, select, textarea');
         firstInput?.focus();
      });
   }

   // Função simples de toast
   function showToast(message, success = true) {
      const toast = document.createElement('div');
      toast.textContent = message;
      Object.assign(toast.style, {
         position: 'fixed',
         right: '20px',
         bottom: '20px',
         background: success ? 'rgba(0,150,136,0.95)' : 'rgba(220,53,69,0.95)',
         color: '#fff',
         padding: '12px 16px',
         borderRadius: '12px',
         boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
         zIndex: 9999,
         fontWeight: 600,
      });
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 4200);
   }

   // Validação simples de email
   function isValidEmail(email) {
      return /\S+@\S+\.\S+/.test(email);
   }

   // Tratamento do formulário de agendamento
   if (agendamentoForm) {
      agendamentoForm.addEventListener('submit', (e) => {
         e.preventDefault();

         const textInputs = agendamentoForm.querySelectorAll('input[type="text"]');
         const tutorInput = textInputs[0];
         const petInput = textInputs[1];
         const emailInput = agendamentoForm.querySelector('input[type="email"]');
         const serviceSelect = agendamentoForm.querySelector('select');
         const dateInput = agendamentoForm.querySelector('input[type="date"]');

         // validações
         if (!tutorInput?.value.trim()) return showToast('Por favor, informe o nome do(a) tutor(a).', false);
         if (!isValidEmail(emailInput?.value || '')) return showToast('Por favor, informe um e‑mail válido.', false);
         if (!petInput?.value.trim()) return showToast('Por favor, informe o nome do pet.', false);
         if (!serviceSelect || serviceSelect.selectedIndex === 0) return showToast('Selecione um serviço.', false);
         if (!dateInput?.value) return showToast('Selecione a data desejada.', false);

         // Aqui você pode enviar os dados para um servidor via fetch/ajax.
         // Por enquanto apenas simulamos sucesso.
         showToast('Agendamento enviado com sucesso!');
         agendamentoForm.reset();
      });
   }

   // Botões de contato: primeiro botão -> agendamento; segundo -> WhatsApp
   if (botoesContato.length) {
      botoesContato.forEach((btn, i) => {
         btn.addEventListener('click', (e) => {
            if (i === 0) {
               // Agendamento
               e.preventDefault();
               scrollTo(agendamentoSection);
               agendamentoForm?.querySelector('input')?.focus();
            } else if (i === 1) {
               // WhatsApp — usa número mostrado na página (ajuste se necessário)
               const waNumber = '5595999999999';
               window.open('https://wa.me/' + waNumber, '_blank');
            }
         });
      });
   }

});