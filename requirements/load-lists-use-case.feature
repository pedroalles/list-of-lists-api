Feature: Carregar todas as listas do banco de dados

    Como um usuário da API
    Quero que, ao fazer uma requisição do tipo GET ao endpoint /api/lists, o sistema retorne todas as listas
    Para que o front-end possa gerenciá-las

    Scenario: De sucesso

      Dado que o banco de dados e o servidor estejam operando normalmente
      Quando a requisição ao endpoint /api/lists for feita
      Então o sistema deve buscar no banco de dados todas as listas
      E retornar um status code 200 contendo um array de listas

    Scenario: De sucesso porém sem retorno

      Dado que o banco de dados e o servidor estejam operando normalmente
      E não exista nenhuma lista gravada no banco de dados
      Quando a requisição ao endpoint /api/lists for feita
      Então o sistema deve retornar um status code 204 sem conteúdo.

    Scenario: De exceção

      Dado que o banco de dados e/ou o servidor não estejam operando normalmente
      Quando a requisição ao endpoint /api/lists for feita
      Então o sistema deve retornar um status code 500 contendo uma mensagem de Server Error
