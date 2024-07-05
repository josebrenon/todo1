/**
 * * Esse é um site feito com React que é simplesmente uma lista de tarefas muito simples.
 * TODO Comentar esse código
 * ! Para visualizar as cores dos comentários necessário usar a extensão Better Comments
 * ! (ID: aaron-bond.better-comments, Link do Marketplace do VS: https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)
 */
//? Aqui fazemos a importação do React e dos hooks useState e useRef.
import React, { useState, useRef } from "react";

//? Esta é a exportação do componente App.
export default function App() {
  //? Criação da lista de tarefas usando o useState passando uma arrow function que retorna uma lista vazia.
  const [listaTarefas, setListaTarefas] = useState(() => {
    return [];
  });

  //? Criando a tarefa com o useState passando também uma arrow function que retorna uma string vazia.
  const [tarefa, setTarefa] = useState(() => {
    return "";
  });

  /*
    ? Criando duas variáveis usando o useRef,
    ? a primeira para o id da tarefa e a 
    ? segunda para o ref do input.
  */
  const idTarefa = useRef(0); //? idTarefa inicia em 0
  const inputRef = useRef(); //? inicia vazia

  //* Funções

  //? Essa função é responsável por adicionar as tarefas
  function adicionarTarefa() {
    //? O setListaTarefas retorna uma arrow function que usa o parâmetro old fazendo referência a uma lista antiga, que retorna uma lista com tudo que tinha anteriormente na old + um array com o id usando a variável criada anteriormente e um texto que usa a variável tarefa.
    setListaTarefas((old) => {
      return [...old, { id: idTarefa.current, texto: tarefa }];
    });
    idTarefa.current++; //? Aqui está incrementando o idTarefa para que ele não seja o mesmo e cada tarefa tenha um id diferente.
    setTarefa(""); //? Limpa o input que esta a tarefa usando o setTarefa para alterar o estado.
    inputRef.current.focus(); //? Aqui usando o inputRef para retornar o foco para o input.
  }

  //? Essa função é responsável por limpar todas as tarefas, ela simplesmente retorna uma arrow function passando a old como parâmetro e retorna uma lista vazia.
  function limparTudo() {
    setListaTarefas((old) => {
      return [];
    });
    idTarefa.current = 0; //? Aqui como todas as tarefas são limpas nós retornamos o idTarefa para 0 novamente.
  }

  //? Essa função é responsável por remover uma das tarefas, ela cria uma const temporária que recebe a listaTarefas com um filtro que ira separar apenas a tarefa cujo o id da tarefa seja diferente do passado.
  function removerTarefa(id) {
    const tmp = listaTarefas.filter((tarefa) => tarefa.id !== id);
    setListaTarefas(tmp); //? atribui o tmp ao setListaTarefas.
  }

  //? Essa função é responsável por mudar o estado de incompleto para completo, ela cria uma listaAux com tudo que tem na listaTarefas
  function clicou(index) {
    const listaAux = [...listaTarefas];
    listaAux[index].isCompleted = !listaAux[index].isCompleted;
    setListaTarefas(listaAux);
  }

  return (
    <>
      <h1>GESTOR DE TAREFAS</h1>
      <input
        ref={inputRef}
        type="text"
        value={tarefa}
        placeholder="Adicione uma tarefa"
        onChange={(e) => {
          setTarefa(e.target.value);
        }}
      />{" "}
      <br />
      {tarefa === "" ? (
        <button className="add-disable" disabled>
          Adicionar
        </button>
      ) : (
        <button className="add" onClick={adicionarTarefa}>
          Adicionar
        </button>
      )}{" "}
      <br />
      <p className="titulo-tarefas">Tarefas: </p>
      <div>
        {listaTarefas.length < 1 ? (
          <img
            src="https://cdn-icons-png.flaticon.com/512/1612/1612656.png"
            alt="img todo"
          />
        ) : (
          listaTarefas.map((t, index) => {
            return (
              <div
                key={t.id}
                //className="item"
                className={t.isCompleted ? "itemcompleto" : "item"}
              >
                <span
                  onClick={() => {
                    clicou(index);
                  }}
                >
                  {t.texto}{" "}
                </span>
                <button
                  className="remover"
                  onClick={() => {
                    removerTarefa(t.id);
                  }}
                >
                  REMOVER
                </button>
              </div>
            );
          })
        )}
      </div>
      {}
      {listaTarefas.length < 1 ? (
        <p></p>
      ) : (
        <button className="apaga-tudo" onClick={limparTudo}>
          Limpar tudo
        </button>
      )}
    </>
  );
}
