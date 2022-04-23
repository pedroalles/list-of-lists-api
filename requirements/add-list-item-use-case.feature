Feature: Adicionar um item à uma lista existente no banco de dados

    Como um usuário da API
    Quero que, ao fazer uma requisição do tipo POST ao endpoint /api/lists/:id/item, o sistema adicione um item à uma lista específica
    Para que eu possa agrupar e gerenciar itens classificados por listas

    Scenario: De sucesso

      Dado que o banco de dados e o servidor estejam operando normalmente
      Quando a requisição do tipo POST for feita ao endpoint /api/lists/:id/item
      Então o sistema deve validar o id dos params e os dados do body recebidos na requisição
      E caso o id e os dados forem válidos, deve adicionar à uma lista específica do banco de dados um novo item
      E retornar um status code 200 contendo o id do item adicionado

    Scenario: De exceção 1 (id inválido)

      Dado que o banco de dados e o servidor estejam operando normalmente
      Quando a requisição do tipo POST for feita ao endpoint /api/lists/:id/item
      Então o sistema deve validar o id dos params e os dados do body recebidos na requisição
      E caso o id for inválido, deve retornar um status code 403 contendo a mensagem de erro

    Scenario: De exceção 2 (dados inválidos)

      Dado que o banco de dados e o servidor estejam operando normalmente
      Quando a requisição do tipo POST for feita ao endpoint /api/lists/:id/item
      Então o sistema deve validar o id dos params e os dados do body recebidos na requisição
      E caso os dados forem inválidos, deve retornar um status code 400 contendo a mensagem de erro

    Scenario: De exceção 3 

      Dado que o banco de dados e/ou o servidor não estejam operando normalmente
      Quando a requisição do tipo POST for feita ao endpoint /api/lists/:id/item
      Então o sistema deve retornar um status code 500 contendo uma mensagem de Server Error
