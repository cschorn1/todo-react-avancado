import { useState } from "react";
import type { Produto } from "../types/Produto";

interface ProdutoFormProps {
    adicionarProduto: (produto: Produto) => void;
}

function ProdutoForm({adicionarProduto}: ProdutoFormProps) {
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [descricao, setDescricao] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const novoProduto = {
            nome,
            preco: Number(preco),
            imagem: `https://placehold.co/300x200?text=${nome}`,
            descricao
        };

        adicionarProduto(novoProduto);

        setNome("");
        setPreco("");
        setDescricao("");
    }

    return (
        <form className="mx-auto flex max-w-2xl flex-col gap-4 rounded-2xl bg-white p-6 shadow-lg" onSubmit={handleSubmit}>
            <input className="rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200" type="text" placeholder="Nome do produto" value={nome}
                onChange={(e) => setNome(e.target.value)} required
            />

            <input className="rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200" type="number" placeholder="Preço" value={preco}
                onChange={(e) => setPreco(e.target.value)} required    
            />

            <textarea className="rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200" placeholder="Descrição" value={descricao}
                onChange={(e) => setDescricao(e.target.value)} required
            />

            <button className="rounded-lg bg-blue-500 px-4 py-3 font-semibold text-white transition hover:bg-blue-600" type="submit">Cadastrar produto</button>
        </form>
    );
}

export default ProdutoForm;