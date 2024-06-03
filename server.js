const express = require('express');

const app = express();

const cors = require('cors');

app.use(cors({
    origin: 'https://localhost:8000/', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
  }));
  

app.use(express.json());

let funcionarios = [
    {
        id: 1,
        nome: "Amos",
        cpf: "98978767567",
        idade: "30",
        cargo: "Desenvolvedor",
        setor: "TI",
        dataDeEntrada: "30/05/2024",
        dataDeAtt: "30/05/2024"
    },

    {
        id: 2,
        nome: "Abrão",
        cpf: "80870976757",
        idade: "28",
        cargo: "Desenvolvedor",
        setor: "TI",
        dataDeEntrada: "31/05/2024",
        dataDeAtt: "31/05/2024"
    },

    {
        id: 3,
        nome: "José Ivan",
        cpf: "98978767987",
        idade: " 45",
        cargo: "Desenvolvedor",
        setor: "TI",
        dataDeEntrada: "30/05/2024",
        dataDeAtt: "30/05/2024"
    }
];


app.get('/funcionarios', (req, res) => {
    res.json(funcionarios);
});


app.get('/funcionarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const funcionario = funcionarios.find(f => f.id === id);

    if (!funcionario) {
        return res.status(404).json({ mensagem: "Funcionário não encontrado" });
    }

    res.json(funcionario);
});


app.post('/funcionarios/cadastrar', (req, res) => {
    
    const now = new Date();

    const dia = String(now.getDate()).padStart(2, '0');
    const mes = String(now.getMonth() + 1).padStart(2, '0'); 
    const ano = String(now.getFullYear()).slice(-2); 

    const dataFormatada = `${dia}-${mes}-${ano}`;

    const novoFuncionario = {
        id: funcionarios.length ? funcionarios[funcionarios.length - 1].id + 1 : 1,
        nome: req.body.nome,
        cpf: req.body.cpf,
        idade: req.body.idade,
        cargo: req.body.cargo,
        setor: req.body.setor,
        dataDeEntrada: req.body.dataDeEntrada,
        dataDeAtt: dataFormatada
    };

    funcionarios.push(novoFuncionario);
    res.status(201).json({ mensagem: "Funcionario cadastrado com sucesso!" });
});



app.put('/funcionarios/atualizar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const funcionario = funcionarios.find(f => f.id === id);

    if (!funcionario) {
        return res.status(404).json({ mensagem: "Funcionário não encontrado" });
    }

    funcionario.nome = req.body.nome || funcionario.nome;
    funcionario.cpf = req.body.cpf || funcionario.cpf;
    funcionario.idade = req.body.idade || funcionario.idade;
    funcionario.cargo = req.body.cargo || funcionario.cargo;
    funcionario.setor = req.body.setor || funcionario.setor;

    const now = new Date();
  
    const dia = String(now.getDate()).padStart(2, '0');
    const mes = String(now.getMonth() + 1).padStart(2, '0'); 
    const ano = String(now.getFullYear()).slice(-2); 
    const dataFormatada = `${dia}-${mes}-${ano}`;
    funcionario.dataDeAtt = dataFormatada;

    res.json({ mensagem: "Funcionario atualizado com sucesso" });
});



app.delete('/funcionarios/deletar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = funcionarios.findIndex(f => f.id === id);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Funcionário não encontrado" });
    }

    const funcionarioRemovido = funcionarios.splice(index, 1);
    res.json({mensagem: "Funcionario removiso com sucesso"});
});


app.listen(8000, () => {
    console.log('Servidor iniciado na porta 8000');
});
