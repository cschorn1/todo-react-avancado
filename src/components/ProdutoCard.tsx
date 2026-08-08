import type { Produto } from "../types/Produto";

interface ProdutoCardProps {
    produto: Produto;
    excluirProduto: (id: string) => void;
}

function ProdutoCard({ produto, excluirProduto }: ProdutoCardProps) {
    return (
        <article className="overflow-hidden rounded-xl bg-white/70 shadow-md backdrop-blur-sm transition duration-300 hover:scale-105 hover:shadow-xl">
            <img className="h-48 w-full object-cover"
                src={produto.imagem} alt={produto.nome}    
            />

            <div className="flex min-h-56 flex-col p-5">
                <h2 className="text-xl font-bold text-slate-800">{produto.nome}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{produto.descricao}</p>

                <strong className="mt-4 text-xl text-blue-600">R$ {produto.preco.toFixed(2)}</strong>

                <button onClick={() => excluirProduto(produto._id!)}className="mt-4 rounded-lg bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600">Excluir</button>
            </div>
        </article>
    );
}

export default ProdutoCard;