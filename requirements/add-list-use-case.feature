Feature: Adicionar uma lista ao banco de dados

    Como um usuário da API
    Quero que, ao fazer uma requisição do tipo POST ao endpoint /api/lists, o sistema adicione uma nova lista
    Para que nela possam ser adicionados itens posteriormente

    Scenario: De sucesso

      Dado que o banco de dados e o servidor estejam operando normalmente
      Quando a requisição do tipo POST for feita ao endpoint /api/lists
      Então o sistema deve validar os dados recebidos no body da requisição 
      E os dados estando válidos, deve adicionar ao banco de dados uma nova lista
      E retornar um status code 200 contendo o id da lista adicionada

    Scenario: De exceção 1

      Dado que o banco de dados e o servidor estejam operando normalmente
      Quando a requisição do tipo POST for feita ao endpoint /api/lists
      Então o sistema deve validar os dados recebidos no body da requisição 
      E os dados estando inválidos, não deve realizar a operação
      E retornar um status code 400 contendo a mensagem de erro


    Scenario: De exceção 2

      Dado que o banco de dados e/ou o servidor não estejam operando normalmente
      Quando a requisição do tipo POST for feita ao endpoint /api/lists
      Então o sistema deve retornar um status code 500 contendo uma mensagem de Server Error
