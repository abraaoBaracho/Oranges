// Função para inserir um novo funcionário
const insertFuncionario = (cpf, nome, idade, cargo, setor, dataCriacao, dataAtualizacao) => {
    const query = `INSERT INTO funcionário (cpf, nome, idade, cargo, setor, dataCriacao, dataAtualizacao) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    connection.execute(query, [cpf, nome, idade, cargo, setor, dataCriacao, dataAtualizacao], (err, results) => {
      if (err) {
        console.error('Error inserting data: ' + err.stack);
        return;
      }
      console.log('Data inserted, ID:', results.insertId);
    });
};

// Função para remover um funcionário pelo ID
const deleteFuncionarioById = (id) => {
    const query = 'DELETE FROM funcionário WHERE id = ?';
    connection.execute(query, [id], (err, results) => {
      if (err) {
        console.error('Error deleting data: ' + err.stack);
        return;
      }
      if (results.affectedRows === 0) {
        console.log('No rows deleted');
      } else {
        console.log('Deleted Row(s):', results.affectedRows);
      }
    });
  };

  // Função para buscar todos os funcionários
  const getAllFuncionarios = () => {
    const query = 'SELECT * FROM funcionário';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data: ' + err.stack);
        return;
      }
      console.log('Funcionários:', results);
    });
  };

  // Função para atualizar os dados de um funcionário
const updateFuncionario = (id, cpf, nome, idade, cargo, setor, dataAtualizacao) => {
    const query = `UPDATE funcionário SET cpf = ?, nome = ?, idade = ?, cargo = ?, setor = ?, dataAtualizacao = ? WHERE id = ?`;
    connection.execute(query, [cpf, nome, idade, cargo, setor, dataAtualizacao, id], (err, results) => {
      if (err) {
        console.error('Error updating data: ' + err.stack);
        return;
      }
      if (results.affectedRows === 0) {
        console.log('No rows updated');
      } else {
        console.log('Updated Row(s):', results.affectedRows);
      }
    });
  };
  
  // Atualizar um funcionário com um ID específico
  updateFuncionario(1, '98765432100', 'Maria Oliveira', 35, 'Gerente', 'RH', '2024-06-05');
  