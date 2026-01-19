# App

Help desk app

## RF's (Requisitos funcionais)
- [ ] Deve ser possível cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível criar um chamado;
- [ ] Deve ser possível validar o chamado;
- [ ] Deve ser possível listar os chamados criados dos clients;
- [ ] Deve ser possível atender o chamado;
- [ ] Deve ser possível validar o atendimento do técnico;



## RN's (Regas de negócio)
- [ ] O usuário não poderia cadastrar com um e-mail duplicado;
- [ ] O client poderá acessar somente os chamados criados;
- [ ] O client poderá validar o seu chamado, se o mesmo for atendido.;
- [ ] O chamado só poderá ser atendido pelos técnicos;
- [ ] Os técnicos terão acesso a todos os chamados dos clientes;
- [ ] O Técnico poderá designar os chamados para outros técnicos;


## RN's (Requisitos não-funcionais)

- [ ] A senha do usuário prcisar estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas as listas de chamados precisam estar paginadas com 20 itens por página
- [ ] O usuário deve ser identificado por um JWT(Json Web Token);