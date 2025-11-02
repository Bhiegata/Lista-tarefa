// Seleção de elementos do DOM
const tarefas = document.getElementById("listaTarefas");
const inputTarefa = document.getElementById("tarefa");
const btnAdd = document.getElementById("add");

// URL base da API (use a sua chave/endpoint válido do crudcrud)
const API_URL = "https://crudcrud.com/api/ea72997d0cf740f085fb76fa30a2b3dc/tarefas";

// Carrega tarefas já existentes
fetch(API_URL)
    .then(resposta => resposta.json())
    .then((listaDeTarefas) => {
        listaDeTarefas.forEach(tarefa => {
            const item = document.createElement("li");
            item.classList.add("li-js")
            item.innerHTML = `${tarefa.descricao} <button class="remove" onClick="remove('${tarefa._id}')">X</button>`;
            tarefas.appendChild(item);
        });
    })
    .catch(err => console.error('Erro ao carregar tarefas:', err));

// Função mínima para adicionar tarefa (POST + inserir no DOM)
async function adicionarTarefa() {
    const descricao = inputTarefa.value.trim();
    if (!descricao) {
        // comportamento simples de ensino: avisar e não prosseguir
        alert('Digite uma tarefa antes de adicionar.');
        return;
    }

    try {
        const resposta = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ descricao })
        });

        if (!resposta.ok) {
            throw new Error('Resposta não OK: ' + resposta.status);
        }

        const novaTarefa = await resposta.json();

        // Inserir no DOM imediatamente
        const item = document.createElement('li');
        item.innerHTML = `${novaTarefa.descricao} <button class="remove" onClick="remove('${novaTarefa._id}')">X</button>`;
        tarefas.appendChild(item);

        // Limpar o input
        inputTarefa.value = '';
        inputTarefa.focus();

    } catch (erro) {
        console.error('Erro ao adicionar tarefa:', erro);
        alert('Não foi possível adicionar a tarefa. Veja o console para detalhes.');
    }
}

// Listener no botão "Adicionar" (implementação mínima para esta etapa)
btnAdd.addEventListener('click', adicionarTarefa);

function remove(id) {
  fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })
  .then(resposta => {
    if (!resposta.ok) {
      throw new Error('Erro ao remover tarefa: ' + resposta.status);
    }

    // Localiza o botão pelo seletor e remove o <li> pai
    const botao = document.querySelector(`button[onClick="remove('${id}')"]`);
    if (botao) {
      const item = botao.parentElement;
      item.remove();
    }
  })
  .catch(erro => {
    console.error('Erro ao remover tarefa:', erro);
    alert('Não foi possível remover a tarefa. Veja o console para detalhes.');
  });
}
