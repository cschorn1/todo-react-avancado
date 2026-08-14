import { createContext, useContext, useMemo, useState, useEffect, type ReactNode } from "react";
import type { Todo } from "../types/Todo";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { buscarTarefas, criarTarefa, atualizarTarefa, removerTarefa } from "../services/api";


type TodoFilter = "todas" | "concluidas" | "pendentes";
type SyncStatus = "sincronizando" | "sincronizado" | "offline";

interface TodoContextType {
  tarefas: Todo[];
  filtro: TodoFilter;
  tarefasFiltradas: Todo[];
  syncStatus: SyncStatus;
  adicionarTarefa: (tarefa: Todo) => Promise<void>;
  concluirTarefa: (id: string) => Promise<void>;
  excluirTarefa: (id: string) => Promise<void>;
  alterarFiltro: (novoFiltro: TodoFilter) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [tarefas, setTarefas] = useLocalStorage<Todo[]>("tarefas", []);
  const [filtro, setFiltro] = useState<TodoFilter>("todas");
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("sincronizando");

  const refreshFromServer = async () => {
    try {
      setSyncStatus("sincronizando");
      const dadosApi = await buscarTarefas();
      setTarefas(dadosApi);
      setSyncStatus("sincronizado");
      return dadosApi;
    } catch (err) {
      setSyncStatus("offline");
      return null;
    }
  };

  const adicionarTarefa = async (tarefa: Todo) => {
    const tempId = `temp-${Date.now()}`;
    const temporario: Todo = { ...tarefa, _id: tempId };
    setTarefas((prev) => [...prev, temporario]);

    const { _id: _, ...payload } = tarefa;

    try {
      await criarTarefa(payload as Todo);
      await refreshFromServer();
    } catch (err) {
      console.error("Criar falhou:", err);
      setSyncStatus("offline");
    }
  };

  const concluirTarefa = async (id: string) => {
    const tarefaAtual = tarefas.find((t) => t._id === id);
    if (!tarefaAtual || String(id).startsWith("temp-")) {
      return;
    }

    const tarefaAtualizada: Todo = {
      ...tarefaAtual,
      concluida: !tarefaAtual.concluida,
    };

    setTarefas((prev) => prev.map((t) => (t._id === id ? tarefaAtualizada : t)));

    const { _id: _, ...payload } = tarefaAtualizada;

    try {
      await atualizarTarefa(id, payload as Todo);
      await refreshFromServer();
    } catch (err) {
      console.error("Atualizar falhou:", err);
      setSyncStatus("offline");
    }
  };

  const excluirTarefa = async (id: string) => {
    const tarefaParaExcluir = tarefas.find((tarefa) => tarefa._id === id);
    if (!tarefaParaExcluir || String(id).startsWith("temp-")) {
      return;
    }

    setTarefas((prev) => prev.filter((tarefa) => tarefa._id !== id));

    try {
      await removerTarefa(id);
      await refreshFromServer();
    } catch (err) {
      console.error("Remover falhou:", err);
      setSyncStatus("offline");
    }
  };

  useEffect(() => {
    let cancel = false;

    (async () => {
      setSyncStatus("sincronizando");
      try {
        const dadosApi = await buscarTarefas();
        if (cancel) return;

        setTarefas(dadosApi);
        setSyncStatus("sincronizado");
      } catch (err) {
        if (!cancel) {
          setSyncStatus("offline");
        }
      }
    })();

    return () => {
      cancel = true;
    };
  }, []);

  const tarefasFiltradas = useMemo(() => {
    if (filtro === "concluidas") {
      return tarefas.filter((tarefa) => tarefa.concluida);
    }

    if (filtro === "pendentes") {
      return tarefas.filter((tarefa) => !tarefa.concluida);
    }

    return tarefas;
  }, [filtro, tarefas]);

  const value = useMemo(
    () => ({
      tarefas,
      filtro,
      tarefasFiltradas,
      syncStatus,
      adicionarTarefa,
      concluirTarefa,
      excluirTarefa,
      alterarFiltro: setFiltro,
    }),
    [tarefas, filtro, tarefasFiltradas, syncStatus],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodos() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodos deve ser usado dentro de TodoProvider");
  }

  return context;
}
