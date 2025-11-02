//Seleciona a nossa UL com a lista de tarefas no HTML
const tarefas = document.getElementById("listaTarefas");
//Faz uma requisição GET para a API externa para buscar todas as tarefas
fetch("https://crudcrud.com/api/c391481d8a804fae8747e47e46e11036/tarefas")
.then(resposta => resposta.json())
.then((listaDeTarefas) => {
    //Itera sobre cada tarefa do array
    listaDeTarefas.forEach(tarefa => {
        //Cria um novo elemento da lista (<li>) para cada tarefa
        const item = document.createElement("li");
        //Define o conteúdo HTML do item, incluindo descrição e botão
        item.innerHTML = `${tarefa.descricao} <button class="remove">X</button>`;
        //Adiciona o novo item à lista de tarefas no HTML
        tarefas.appendChild(item);

    });
})