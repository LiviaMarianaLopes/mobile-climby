# Climby - Aplicativo Móvel 🌦️
## 🚀 Proposta de Solução Geral do Ecossistema Climby
**O Problema:**
Eventos climáticos extremos representam uma ameaça crescente, e a dificuldade em acessar informações centralizadas sobre abrigos, alertas e previsões agrava o impacto na população. A falta de uma ferramenta direta e acessível deixa os cidadãos vulneráveis e desinformados em momentos críticos.

**A Solução Climby (Ecossistema):**
O Climby é um ecossistema de soluções projetado para mitigar os impactos de eventos extremos. Ele é composto por:

**Aplicativo Móvel em React Native (Este Repositório):** A interface direta para o cidadão. Permite que usuários encontrem abrigos próximos, recebam alertas de risco em tempo real e consultem previsões meteorológicas para se prepararem para eventos adversos.

**API Backend em C# (Core da Solução):** O cérebro do sistema. Centraliza a lógica de negócios, processa dados da OpenWeather API, gerencia usuários, abrigos e serve como a principal fonte de dados para o aplicativo móvel.

**Aplicação Web Administrativa em Java Spring MVC:** Uma interface web para que administradores da plataforma gerenciem o cadastro de abrigos e usuários, garantindo que as informações no app estejam sempre atualizadas.

Este repositório foca no Aplicativo Móvel (Frontend) desenvolvido em React Native.

## ℹ️ Sobre o Projeto (Global Solution FIAP)
Este projeto refere-se à entrega do Aplicativo Móvel da Global Solution para as disciplinas de desenvolvimento mobile.

**Equipe:**

* Celeste Mayumi Pereira Tanaka - RM552865

* Lívia Mariana Lopes - RM552558

* Luana Vieira Santos da Silva - RM552994

## Vídeo Apresentação


## ✨ Funcionalidades Implementadas (Aplicativo Móvel)
* Autenticação de Usuário: Telas de Login e Cadastro para que os usuários acessem a plataforma de forma segura.

* Gerenciamento de Perfil: O usuário pode visualizar, editar suas informações cadastrais (nome, email, cidade, país e senha) e excluir o cadastro.

* Listagem de Abrigos: Exibição de uma lista de abrigos disponíveis, com informações de contato e endereço, consumindo dados diretamente da API C#.

* Interface Reativa e Navegável: Utilização de React Navigation para uma experiência de usuário fluida entre as diferentes telas do aplicativo.

* Persistência de Sessão Local: Uso de AsyncStorage para manter o usuário logado e armazenar dados essenciais no dispositivo, melhorando a usabilidade.

