import {useEffect, useState} from "react";
import type {Produto} from './types/Produto';
import ProdutoCard from './components/ProdutoCard';
import ProdutoForm from "./components/ProdutoForm";
import {buscarProdutos, criarProduto, removerProduto} from "./services/api";


function App() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState("");

  const adicionarProduto = async (produto: Produto) => {
    try{
      setErro("");

      const novoProduto =await criarProduto(produto);

      setProdutos((produtosAtuais) => [...produtosAtuais, novoProduto]);

    } catch (erro) {
      console.error("Erro ao cadastrar produto", erro);
      setErro("Não foi possível cadastrar o produto");
    }
  };

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const dados = await buscarProdutos();
        setProdutos(dados);

      } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
        setErro("Não foi possível carregar os produtos.");

      } finally {
        setCarregando(false);
      }
    };

    carregarProdutos();
  }, []);

  const excluirProduto = async (id: string) => {
    try {
        setErro("");

        await removerProduto(id);

        setProdutos((produtosAtuais) => produtosAtuais.filter((produto) => produto._id !== id)
    );
    } catch (erro) {
        console.error("Erro ao excluir produto:", erro);
        setErro("Não foi possível excluir o produto.");
    }
};

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="bg-slate-800 text-white shadow-md">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <h1 className="text-2xl font-bold">VirtualStore</h1>
        </div>
      </header>

      <main>
        <section className="mb-10 rounded-xl bg-slate-200 px-6 py-8 text-center shadow-sm">
          <h2 className="text-3xl font-bold">Catálogo de Produtos</h2>
          <p className="mt-2 text-slate-600">Confira nossos produtos disponíveis</p>
        </section>

        <ProdutoForm adicionarProduto={adicionarProduto} />

        {erro && <p className="py-10 text-center font-medium text-red-600">{erro}</p>}

        {carregando ? (
          <h3 className="py-10 text-center text-lg text-slate-600">Carregando produtos...</h3>
        ) : (
          <section className="mt-10 grid grid-cols-1 px-4 gap-6 sm:grid-cols-2 md:px-6 lg:grid-cols-4 lg:px-8">
            {produtos.map((produto) => (
              <ProdutoCard
                key={produto._id}
                produto= {produto}
                excluirProduto= {excluirProduto}
              />
            ))}
          </section>
        )}
      </main>

      <footer className="bg-slate-800 py-6 text-center text-white">
        <p className="font-bold text-2xl">VirtualStore</p>
      </footer>

    </div>
    );
}
export default App
