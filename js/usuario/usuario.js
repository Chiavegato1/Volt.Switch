// Alterna entre entrar e cadastrar uma conta de demonstração.
const botaoEntrar = document.getElementById("botao-entrar");
const botaoCadastrar = document.getElementById("botao-cadastrar");
const campoNome = document.getElementById("campo-nome");
const campoTipo = document.getElementById("campo-tipo");
const titulo = document.getElementById("titulo-autenticacao");
const botaoEnviar = document.getElementById("botao-enviar");
const formulario = document.getElementById("form-autenticacao");
const mensagem = document.getElementById("mensagem-autenticacao");
const campoSenha = document.getElementById("senha");
let modoCadastro = false;

function mostrarFormulario(cadastrar) {
    modoCadastro = cadastrar;
    campoNome.hidden = !cadastrar;
    campoTipo.hidden = !cadastrar;
    document.getElementById("nome").required = cadastrar;
    campoSenha.autocomplete = cadastrar ? "new-password" : "current-password";
    titulo.textContent = cadastrar ? "Crie sua conta" : "Entre na sua conta";
    botaoEnviar.textContent = cadastrar ? "Criar conta" : "Entrar";
    botaoEntrar.classList.toggle("ativa", !cadastrar);
    botaoCadastrar.classList.toggle("ativa", cadastrar);
    mensagem.textContent = "";
}
botaoEntrar.addEventListener("click", function () { mostrarFormulario(false); });
botaoCadastrar.addEventListener("click", function () { mostrarFormulario(true); });

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    if (!formulario.checkValidity()) { formulario.reportValidity(); return; }

    const email = document.getElementById("email").value.trim();
    const senha = campoSenha.value;
    let usuarios = JSON.parse(localStorage.getItem("voltUsuarios") || "[]");

    if (modoCadastro) {
        if (usuarios.some(usuario => usuario.email === email)) {
            mensagem.textContent = "Este e-mail já possui cadastro.";
            return;
        }
        const novoUsuario = {
            nome: document.getElementById("nome").value,
            email: email,
            senha: senha,
            tipo: document.getElementById("tipo").value
        };
        usuarios.push(novoUsuario);
        localStorage.setItem("voltUsuarios", JSON.stringify(usuarios));
        localStorage.setItem("voltUsuario", JSON.stringify(novoUsuario));
        mensagem.textContent = "Cadastro realizado! Redirecionando...";
        redirecionarUsuario(novoUsuario.tipo);
    } else {
        const usuario = usuarios.find(item => item.email === email && item.senha === senha);
        if (!usuario) { mensagem.textContent = "E-mail ou senha não encontrados. Confira os dados ou crie uma conta."; return; }
        localStorage.setItem("voltUsuario", JSON.stringify(usuario));
        mensagem.textContent = "Login realizado!";
        redirecionarUsuario(usuario.tipo);
    }
});
function redirecionarUsuario(tipo) {
    const destinos = {
        usuario: "../user/user.html",
        loja: "../fornecedor/fornecedor.html",
        entregador: "../entregadores/entregadores.html",
        admin: "../admin/admin.html"
    };
    setTimeout(function () { window.location.href = destinos[tipo] || "../user/user.html"; }, 700);
}
