<h1>Implantação do Software</h1>
<p><b>EduConnect</b> é um aplicativo mobile desenvolvido com React Native e Expo Router, com o objetivo de facilitar a conexão entre estudantes, professores e instituições educacionais. O projeto integra funcionalidades modernas como autenticação via Supabase, navegação com React Navigation, componentes estilizados com React Native Paper e Material Core, além de suporte a testes com Jest e automações com scripts personalizados.

A estrutura foi pensada para garantir escalabilidade, boa performance e uma experiência fluida para o usuário final.</p>

<h2>🧭 Fluxo do app</h2>

<h3>Tela inicial</h3>
<ul>
  <li>Exibe a logo do aplicativo.</li>
</ul>
<br/>
<div style="display: flex; gap: 10px;">
  <img src="https://github.com/user-attachments/assets/0d7c33ca-8a21-45c5-818e-15d6ce01123e" width="200"/>
</div>


<h3>Onboarding (3 passos)</h3>
<ul>
  <li>Explica os principais benefícios e funcionalidades do EduConnect.</li>
  <li>Cada passo destaca um recurso essencial: organização dos estudos, comunicação com professores e integração de calendário.</li>
  <li>Possui opção de pular ou continuar.</li>
</ul>
<br/>
<div style="display: flex; gap: 24px;">
  <img src="https://github.com/user-attachments/assets/c743efe6-c585-4004-a0b9-f0029e8b567e" width="200"/>
  <img src="https://github.com/user-attachments/assets/737e8a52-9a9f-4981-88ca-2901d58ad7e8" width="200"/>
 <img src="https://github.com/user-attachments/assets/a8641732-ec20-404d-bb0e-959cc7fc4606" width="200"/>
</div>

<h3>Seleção de Perfil</h3>
<p>Tela intermediária onde o usuário escolhe entre:</p>
<ul>
  <li>Responsável</li>
  <li>Professor</li>
</ul>
<br/>
<div style="display: flex; gap: 24px;">
  <img src="https://github.com/user-attachments/assets/01f5ca13-c1e9-4d19-9a18-bd55cb301014" width="200"/>
</div>

<h3>Tela de Login</h3>
<ul>
  <li>Autenticação por e-mail e senha.</li>
  <li>Validações de entrada e mensagens de erro.</li>
  <li>Opção de troca de perfil</li>
</ul>
<br/>
<div style="display: flex; gap: 24px;">
  <img src="https://github.com/user-attachments/assets/d9ec5d47-d562-4de9-9a90-50698161036a" width="200"/>
</div>

<h3>Recuperar Acesso</h3>
<ul>
  <li>Permite redefinir senha via link enviado por e-mail.</li>
</ul>
<br/>
<div style="display: flex; gap: 24px;">
  <img src="https://github.com/user-attachments/assets/b5e8d770-fc12-46b4-9998-d50e591b32eb" width="200"/>
</div>

<h3>Tela inicial após Login</h3>
<p>A Home do EduConnect foi projetada para oferecer uma visão geral rápida e funcional do desempenho acadêmico. Ela centraliza informações importantes para o usuário (no exemplo, um responsável), apresentando:</p>
<ul>
  <li>Saudação personalizada: Exibe o nome do usuário e uma mensagem de boas-vindas dinâmica (ex: "Boa tarde, Usuário").</li>
  <li>Botão para acesso as informações do usuário</li>
  <li>Banner ilustrativo: Mostra um personagem acolhedor e uma mensagem motivacional, incentivando o acompanhamento escolar.</li>
  <li>Informações do aluno: Nome, série e RA (Registro Acadêmico) são exibidos de forma clara.</li>
  <li>Matérias: Cards com ícones e cores representando cada disciplina. O usuário pode clicar para ver mais detalhes.</li>
  <li>Agenda: Destaques da semana como provas, trabalhos ou compromissos escolares. Cada item apresenta: Data, Tipo de evento (ex: Prova, Reunião ou Passeio), Descrição e horário</li>
</ul>
<p>Na parte inferior, há uma barra de navegação com quatro seções principais:
<ul>
  <li>Início: Tela atual.</li>
  <li>Calendário: Exibe todos os eventos do aluno.</li>
  <li>Matérias: Lista completa das disciplinas com conteúdos, avaliações e progresso.</li>
  <li>Notificações: Central de avisos da escola, mensagens de professores e lembretes.</li>
</ul>
</p>
<br/>
<div style="display: flex; gap: 24px;">
  <img src="https://github.com/user-attachments/assets/c8e291d2-b959-46fb-bd82-0ad4eb6e120c" width="200"/>
</div>

<h3>Tela de Perfil</h3>
<p>A Tela de Perfil concentra as principais configurações e informações da conta do usuário, permitindo fácil gerenciamento de dados pessoais e acesso rápido a recursos administrativos. Essa tela é acessada através do botão azul na parte superior da Home.</p>

<h4>Informações do Usuário</h4>
<ul>
  <li>Nome</li>
  <li>Foto</li>
  <li>RA</li>
</ul>

<h4>Seções disponíveis</h4>
<ul>
  <li><strong>Conta:</strong> Exibe ou permite editar dados como nome, CPF, e-mail e senha.</li>
  <li><strong>Outras contas:</strong> Gerencia os estudantes sob responsabilidade do usuário (útil especialmente para responsáveis com mais de um filho).</li>
  <li><strong>Escolas:</strong> Lista as instituições às quais o usuário está vinculado.</li>
  <li><strong>Aplicativo:</strong> Acesso a configurações gerais, como notificações, idioma, entre outros.</li>
  <li><strong>Ajuda:</strong> Guias e perguntas frequentes para auxílio no uso da plataforma.</li>
  <li><strong>Sair:</strong> Encerra a sessão atual com segurança, retornando à tela de login.</li>
</ul>
<br/>
<div style="display: flex; gap: 24px;">
  <img src="https://github.com/user-attachments/assets/bf0a707f-af74-46e5-84ac-982b6c2faed6" width="200"/>
</div>



