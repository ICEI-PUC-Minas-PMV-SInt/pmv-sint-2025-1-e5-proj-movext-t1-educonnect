# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>
<br/>
<br/>

## Técnicas e Ferramentas Utilizadas
Para a definição do projeto e a especificação das soluções, diversas técnicas e ferramentas foram utilizadas, como:
- Proto-personas desenvolvidas no Figma
- Matriz de Responsabilidade
<br/>
  

## Proto-Persona

![image](https://github.com/user-attachments/assets/5f4cb753-d31a-4c81-94b6-58d682d426d5)

![image](https://github.com/user-attachments/assets/ec31c99a-935e-43e1-bb71-beaf558685d2)

![image](https://github.com/user-attachments/assets/6f03dd98-ba19-4f0d-9bd2-fd7d239f8028)

![image](https://github.com/user-attachments/assets/aed9c64e-0619-4c1b-92a7-5fb876d25223)

![image](https://github.com/user-attachments/assets/b699b726-30fb-4920-9544-d0654a37a2df)

![image](https://github.com/user-attachments/assets/acce7ee3-4c25-4c2f-8d0f-25d24f5710f8)

## História de Usuários

| ID  | Perfil          | Descrição da História                               |
|-----|-----------------|----------------------------------------------------|
| 01  | Responsáveis   | Quero ter um canal de comunicação direto com os professores do meu filho para tirar dúvidas sobre o desenvolvimento e o comportamento dele.           |
| 02  | Responsáveis   | Quero receber notificações sobre as próximas atividades e reuniões da escola, para me organizar melhor.            |
| 03  | Responsáveis   | Quero poder acessar facilmente informações importantes sobre o desempenho do meu filho, como notas, faltas e ocorrências.            |
| 04  | Responsáveis   | Quero ter acesso a um calendário com todas as atividades escolares, para me planejar e não perder nenhum evento importante.            |
| 05  | Responsáveis   | Como responsável com mais de um filho na escola, quero visualizar as notas, faltas e informações de cada um deles no aplicativo sem precisar deslogar e alternar entre contas, para facilitar o acompanhamento.            |
| 06  | Coordenadores   | Quero uma ferramenta que me permita enviar comunicados importantes para todos os pais, garantindo que todos recebam a informação.            |
| 07  | Coordenadores   | Quero uma forma de confirmar a presença dos pais em reuniões e eventos escolares, para melhorar a organização e o planejamento das atividades.            |
| 08  | Professores   | Como professor, quero poder enviar mensagens para todos os pais de uma turma de forma rápida e eficiente, para garantir que eles estejam informados sobre eventos e prazos importantes.            |
| 09  | Professores   | Como professor, quero uma plataforma que reúna toda a comunicação com os pais em um só lugar, para evitar a dispersão de informações em diferentes canais de comunicação.           |
| 10  | Professores   | Como professor, quero criar grupos de discussão específicos para cada sala, para facilitar a interação entre os pais e permitir que troquem informações sobre atividades escolares.           |
| 11  | Professores   | Como professor, quero ter um sistema que me informe quais responsáveis visualizaram minhas mensagens, para garantir que todos receberam as informações importantes.           |
| 12  | Professores   | Como professor, quero um local onde possa disponibilizar materiais complementares, como textos, vídeos e atividades, para que os alunos e responsáveis possam acessá-los facilmente.          |
| 13  | Professores   | Como professor, quero poder enviar mensagens individuais para cada responsável sobre o progresso e comportamento do aluno, para oferecer um acompanhamento mais personalizado.          |

## Restrições do Projeto
1.	**Acessibilidade e Usabilidade**
.	O aplicativo deve ser intuitivo e acessível para usuários com diferentes níveis de familiaridade com tecnologia.
.	Deve oferecer suporte a recursos de acessibilidade, como contraste ajustável e leitura de tela.
2.	**Compatibilidade e Disponibilidade**
.	O aplicativo deve estar disponível para dispositivos Android e iOS.
.	Deve funcionar em diferentes tamanhos de tela e versões do sistema operacional dentro de um limite razoável.
3.	**Autenticação e Segurança**
.	Deve haver um sistema de login seguro para pais, professores e coordenadores.
.	O acesso às informações dos alunos deve ser restrito apenas aos responsáveis autorizados.
.	Dados sensíveis, como notas e frequência dos alunos, devem ser protegidos por criptografia.
4.	**Gerenciamento de Múltiplos Filhos**
.	O aplicativo deve permitir que responsáveis com mais de um filho na escola acessem as informações de todos os alunos em uma única conta, sem necessidade de login e logout repetitivos.
5.	**Notificações e Comunicação**
.	O sistema deve permitir o envio de notificações push para alertar os responsáveis sobre reuniões, eventos e comunicados importantes.
.	Deve ser possível confirmar a presença em eventos diretamente pelo aplicativo.
.	Professores e coordenadores devem ter um canal de comunicação eficiente para enviar mensagens direcionadas aos responsáveis.
6.	**Calendário Escolar e Organização**
.	O aplicativo deve incluir um calendário integrado com todas as atividades escolares, permitindo que os responsáveis se organizem melhor.
.	As informações do calendário devem ser atualizadas pela escola e sincronizadas em tempo real.
7.	**Escalabilidade e Desempenho**
.	O sistema deve suportar um grande número de usuários simultaneamente, sem comprometer o desempenho.
.	Deve ser desenvolvido utilizando boas práticas de otimização para evitar lentidão e falhas no envio de notificações.
8.	**Registro e Controle de Atividades**
.	O aplicativo deve permitir que os responsáveis acessem um histórico de comunicados e interações anteriores.
.	Os coordenadores e professores devem ter a possibilidade de monitorar a taxa de leitura dos comunicados para garantir que a informação está sendo recebida.


## Arquitetura e Tecnologias

o	Descreva brevemente a arquitetura definida para o projeto e as tecnologias a serem utilizadas. Sugere-se a criação de um diagrama de componentes da solução.

## Project Model Canvas

Colocar a imagem do modelo construído apresentando a proposta de solução.

## Requisitos  

Para garantir um desenvolvimento eficiente e focado nas necessidades dos usuários, foi utilizada a **Matriz de Esforço x Impacto** como técnica de priorização de requisitos.  

### Técnica Aplicada: Matriz de Esforço x Impacto

A **Matriz de Esforço x Impacto** é uma abordagem visual e estratégica que auxilia na priorização de requisitos ao avaliar dois fatores principais:  

- **Impacto:** O quão essencial o requisito é para a experiência do usuário e para o sucesso do projeto.  
- **Esforço:** O nível de complexidade e recursos necessários para implementar o requisito.  

### Como a técnica foi aplicada

1. **Levantamento dos requisitos:** Foram identificados os requisitos funcionais e não funcionais do projeto.  
2. **Avaliação de Impacto e Esforço:** Cada requisito foi analisado e recebeu uma pontuação de **1 a 5** para impacto e esforço.  
3. **Categorização:** Os requisitos foram distribuídos nos quadrantes da matriz, permitindo priorizar os que possuem **alto impacto e baixo esforço** primeiro.  
4. **Definição da Prioridade:** Com base nessa análise, os requisitos foram classificados como **Alta, Média ou Baixa prioridade**, auxiliando no planejamento das entregas.  

### Requisitos Funcionais

| ID   | História de Usuário Correspondente | Descrição | Impacto (1-5) | Esforço (1-5) | Prioridade | Justificativa |
|------|------------------------------------|-----------|--------------|--------------|------------|--------------|
| RF01 | 01 - Canal de comunicação com professores | Implementar um chat direto entre responsáveis e professores dentro do aplicativo. | 5 | 3 | ALTA | Comunicação essencial, esforço médio. |
| RF02 | 02 - Notificações sobre atividades e reuniões | Enviar notificações automáticas para os responsáveis sobre eventos e reuniões da escola. | 5 | 2 | ALTA | Notificações ajudam na organização, implementação simples. |
| RF03 | 03 - Acesso ao desempenho do aluno | Criar um painel para os responsáveis visualizarem notas, faltas e ocorrências. | 5 | 3 | ALTA | Impacto alto, mas exige integração com banco de dados. |
| RF04 | 04 - Acesso ao calendário escolar | Criar um calendário integrado com eventos e prazos escolares. | 4 | 3 | MÉDIA | Importante, mas exige sincronização com eventos dinâmicos. |
| RF05 | 05 - Acesso a múltiplos filhos sem logout | Implementar um sistema que permita alternar entre filhos sem precisar deslogar. | 4 | 4 | MÉDIA | Impacto alto, mas esforço de implementação complexo. |
| RF06 | 06 - Envio de comunicados por coordenadores | Criar funcionalidade para coordenadores enviarem mensagens para todos os responsáveis. | 5 | 2 | ALTA | Comunicação centralizada com esforço baixo. |
| RF07 | 07 - Confirmação de presença em eventos | Adicionar um sistema de RSVP para reuniões e eventos escolares. | 4 | 3 | MÉDIA | Impacto positivo, esforço moderado. |
| RF08 | 08 - Mensagens para toda a turma | Implementar envio de mensagens em massa para pais de uma turma. | 5 | 2 | ALTA | Facilita a comunicação e tem implementação simples. |
| RF09 | 09 - Centralização da comunicação | Criar um módulo único que unifique chat, notificações e comunicados. | 5 | 4 | MÉDIA | Evita dispersão de informações, mas exige esforço alto. |
| RF10 | 10 - Grupos de discussão por turma | Permitir a criação de grupos onde os pais possam trocar informações. | 4 | 4 | MÉDIA | Impacto moderado, requer moderação. |
| RF11 | 11 - Confirmação de leitura das mensagens | Implementar um sistema de "mensagem lida" para professores verificarem quem recebeu os comunicados. | 5 | 3 | ALTA | Garante comunicação efetiva, esforço moderado. |
| RF12 | 12 - Compartilhamento de materiais | Criar uma biblioteca onde professores possam disponibilizar materiais para os alunos e responsáveis. | 4 | 4 | MÉDIA | Importante, mas requer controle de armazenamento. |
| RF13 | 13 - Feedback individual sobre alunos | Criar um sistema para que professores enviem feedbacks personalizados aos responsáveis. | 5 | 3 | ALTA | Acompanhamento essencial, esforço moderado. |

### Requisitos não Funcionais

| ID    | Requisitos Funcionais Relacionados | Descrição                                                                                             | Impacto (1-5) | Esforço (1-5) | Prioridade |
| ----- | ---------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------- | ------------- | ---------- |
| RNF01 | Todas                              | Garantir que o app tenha tempos de resposta abaixo de 2 segundos para carregamento de telas.          | 5             | 3             | Alta       |
| RNF02 | RF03, RF05                         | Implementar criptografia para proteger os dados sensíveis dos alunos e responsáveis.                  | 5             | 4             | Alta       |
| RNF03 | RF09, RF10                         | Criar um sistema de permissões para controlar o acesso a funcionalidades específicas.                 | 4             | 3             | Média      |
| RNF04 | Todas                              | Garantir que o app seja acessível, seguindo diretrizes do WCAG para UX inclusiva.                     | 5             | 3             | Alta       |
| RNF05 | Todas                              | O app deve ser responsivo e adaptar-se a diferentes tamanhos de tela.                                 | 4             | 2             | Média      |
| RNF06 | RF12                               | Garantir que o app tenha um tempo de inatividade aceitável sem travamentos ou falhas.                 | 4             | 3             | Alta       |






## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |
|03| O aplicativo deve ser intuitivo e acessível para usuários com diferentes níveis de familiaridade com tecnologia |
|04| O aplicativo deve estar disponível para dispositivos Android e iOS |
|05| O acesso às informações dos alunos deve ser restrito apenas aos responsáveis autorizados |
|06| O sistema deve permitir o envio de notificações push para alertar os responsáveis sobre reuniões, eventos e comunicados importantes |
|07| O sistema deve suportar um grande número de usuários simultaneamente, sem comprometer o desempenho |
|08| O aplicativo deve ser responsivo e adaptar-se a diferentes tamanhos de tela |

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## Diagrama de Casos de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Casos de Uso”.

> **Links Úteis**:
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)

## Modelo ER (Projeto Conceitual)

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.

Sugestão de ferramentas para geração deste artefato: LucidChart e Draw.io.

A referência abaixo irá auxiliá-lo na geração do artefato “Modelo ER”.

> - [Como fazer um diagrama entidade relacionamento | Lucidchart](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

![Diagrama ER de banco de dados (pé de galinha) (2)](https://github.com/user-attachments/assets/31724c85-c495-49d7-b020-401c01ae7359)


## Projeto da Base de Dados

O projeto da base de dados corresponde à representação das entidades e relacionamentos identificadas no Modelo ER, no formato de tabelas, com colunas e chaves primárias/estrangeiras necessárias para representar corretamente as restrições de integridade.
