// Dados dos produtos usados nas vitrines, pesquisa e páginas individuais.
const produtos = [
    { id: "processador", nome: "Processador AMD Ryzen 7 5700X3D 3.0GHz", categoria: "Processadores", preco: 1249.90, antigo: 1899.00, imagem: "../../img/produtos/Ryzen 7 5700X3D 3.0GHz.png", pagina: "processador.html", loja: "VOLT SWITCH", descricao: "Ótimo desempenho para jogos, com 8 núcleos e cache extra." },
    { id: "placa", nome: "Placa de Vídeo RTX 4060 8GB GDDR6", categoria: "Placas de vídeo", preco: 1799.00, antigo: 2499.00, imagem: "../../img/produtos/geforce rtx 4060.jpg", pagina: "placa-de-video.html", loja: "VOLT SWITCH", descricao: "Gráficos de última geração com Ray Tracing e DLSS 3." },
    { id: "ssd", nome: "SSD 1TB Kingston NVMe M.2 3500MB/s", categoria: "SSDs", preco: 389.90, antigo: 650.00, imagem: "../../img/produtos/SSD 1TB Kingston NVMe M.2 3500MBs.png", pagina: "memoria.html", loja: "VOLT SWITCH", descricao: "Armazenamento rápido para sistema, programas e jogos." },
    { id: "monitor", nome: "Monitor Gamer Curved 24 180Hz 1ms", categoria: "Monitores", preco: 899.00, antigo: 1199.00, imagem: "../../img/produtos/Monitor Gamer Curved 24 180Hz 1ms.png", pagina: "monitor.html", loja: "VOLT SWITCH", descricao: "Tela curva de 24 polegadas com alta taxa de atualização." }
];

// Funções simples para guardar e recuperar informações no navegador.
function lerDados(chave, valorInicial) {
    const dados = localStorage.getItem(chave);
    return dados ? JSON.parse(dados) : valorInicial;
}

function salvarDados(chave, dados) {
    localStorage.setItem(chave, JSON.stringify(dados));
}

function adicionarCarrinho(id) {
    let carrinho = lerDados("voltCarrinho", []);
    let item = carrinho.find(produto => produto.id === id);

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({ id: id, quantidade: 1 });
    }

    salvarDados("voltCarrinho", carrinho);
    atualizarContadorCarrinho();
    alert("Produto adicionado ao carrinho!");
}

function atualizarContadorCarrinho() {
    const links = document.querySelectorAll(".link-carrinho");
    let carrinho = lerDados("voltCarrinho", []);
    let quantidade = 0;

    carrinho.forEach(item => quantidade += item.quantidade);
    links.forEach(link => link.textContent = "Carrinho (" + quantidade + ")");
}

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

document.addEventListener("DOMContentLoaded", atualizarContadorCarrinho);
