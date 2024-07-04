import React, { useState, useRef } from "react";

export default function App() {
  const [listaTarefas, setListaTarefas] = useState(() => {
    return [];
  });
  const [tarefa, setTarefa] = useState(() => {
    return "";
  });

  const idTarefa = useRef(0);
  const inputRef = useRef();

  function adicionarTarefa() {
    setListaTarefas((old) => {
      return [...old, { id: idTarefa.current, texto: tarefa }];
    });
    idTarefa.current++;
    setTarefa("");
    inputRef.current.focus();
  }
  function limparTudo() {
    setListaTarefas((old) => {
      return [];
    });
    idTarefa.current = 0;
  }

  function removerTarefa(id) {
    const tmp = listaTarefas.filter((tarefa) => tarefa.id !== id);
    setListaTarefas(tmp);
  }
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
