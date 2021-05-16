# Trabalho de conclusão de curso.
No trabalho de conclusão de curso, foi proposto um sistema de agendamentos para laboratórios na Universidade Federal Do Ouro Preto, integrado com um arduino e sensor RFID. Nesse sistema é possível criar agendamentos para laboratórios, com isso obter acesso aos laboratórios de acordo com data e período marcado previamente, sendo o acesso ao laboratório feito pelo cartão ou tag rfid.

## Diagrama do sistema proposto.
<img alt='GitHub language count' src='./backend/.github/diagrama_sistema.png'>

## Configurando esses aplicativos de exemplo: 
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

Detro da pasta tanto front-end e back-end, possui um arquivo chamado .env.example, modelo contendo variáveis utilizadas no projeto.
