import type {Produto} from '../types/Produto';

export const produtosMock: Produto[] = [
    {
        nome: "Notebook",
        preco: 2500,
        imagem: "https://placehold.co/300x200?text=Notebook",
        descricao: "Notebook para estudos e trabalho."
    },
    {
        nome: "Smartphone",
        preco: 1800,
        imagem: "https://placehold.co/300x200?text=Smartphone",
        descricao: "Smartphone com excelente desempenho."
    },
    {
        nome: "Fone de Ouvido",
        preco: 250,
        imagem: "https://placehold.co/300x200?text=Fone",
        descricao: "Fone de ouvido confortável e de alta qualidade."
    }
];