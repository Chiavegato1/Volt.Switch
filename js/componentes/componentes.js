// Monta os cards da pesquisa e aplica os filtros escolhidos.
function criarCard(produto) {
    return `
    <div class="card-produto">
        <a href="${produto.pagina}">
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
        </a>
        <div><p class="preco-atual">${formatarPreco(produto.preco)}</p><p class="texto-pix">à vista no PIX</p></div>
        <button class="btn-comprar" onclick="adicionarCarrinho('${produto.id}')">Adicionar ao carrinho</button>
    </div>`;
}

function pesquisarProdutos() {
    const campo = document.getElementById("campo-pesquisa");
    const categoria = document.getElementById("filtro-categoria");
    const ordem = document.getElementById("filtro-ordem");
    const resultados = document.getElementById("resultados-produtos");
    if (!resultados) return;

    let lista = produtos.filter(produto => {
        const nomeCombina = produto.nome.toLowerCase().includes(campo.value.toLowerCase());
        const categoriaCombina = categoria.value === "" || produto.categoria === categoria.value;
        return nomeCombina && categoriaCombina;
    });

    if (ordem.value === "menor") lista.sort((a, b) => a.preco - b.preco);
    if (ordem.value === "maior") lista.sort((a, b) => b.preco - a.preco);
    if (ordem.value === "nome") lista.sort((a, b) => a.nome.localeCompare(b.nome));

    document.getElementById("quantidade-resultados").textContent = lista.length + " produto(s) encontrado(s)";
    resultados.innerHTML = lista.length ? lista.map(criarCard).join("") : "<p>Nenhum produto encontrado.</p>";
}

document.addEventListener("DOMContentLoaded", function () {
    const campo = document.getElementById("campo-pesquisa");
    if (!campo) return;
    const parametros = new URLSearchParams(window.location.search);
    campo.value = parametros.get("busca") || "";
    document.getElementById("busca-topo").value = campo.value;
    const categoriaInicial = parametros.get("categoria");
    if (categoriaInicial) document.getElementById("filtro-categoria").value = categoriaInicial;
    campo.addEventListener("input", pesquisarProdutos);
    document.getElementById("filtro-categoria").addEventListener("change", pesquisarProdutos);
    document.getElementById("filtro-ordem").addEventListener("change", pesquisarProdutos);
    pesquisarProdutos();
});
