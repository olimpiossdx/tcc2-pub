## 💻 Projeto
No trabalho de conclusão de curso, foi proposto um sistema de agendamentos para laboratórios na Universidade Federal Do Ouro Preto, integrado com um arduino e sensor RFID. Nesse sistema é possível criar agendamentos para laboratórios, com isso obter acesso aos laboratórios de acordo com data e período marcado previamente, sendo o acesso ao laboratório feito pelo cartão ou tag rfid.

## :rocket: Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [React](https://reactjs.org)
- [NodeJs](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)

## Diagrama do sistema proposto.
<img alt='GitHub language count' src='./backend/.github/diagrama_sistema.png'>

## Layout base da aplicação web
Link do [figma](https://www.figma.com/file/dXeV9pfWaGDbJZrJC4ctyw/TCC-2?node-id=0%3A1).

## Configurando esse aplicativo de exemplo: 
```tsx
var firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  databaseURL: "https://PROJECT_ID.firebaseio.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  measurementId: "G-MEASUREMENT_ID",
};
```
[Link](https://firebase.google.com/docs/web/setup#default-hosting-site) oficial do firebase contendo os passos a serem seguidos para configura seu projeto.

Dentro da pasta tanto front-end e back-end, possui um arquivo chamado .env.example, modelo contendo variáveis utilizadas no projeto.

## 🤔 Como contribuir

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.
