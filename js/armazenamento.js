/* Persistência no localStorage do próprio navegador.
   Nada sai do aparelho do estudante: não há servidor, conta nem envio de dados. */

const CHAVE = "ded-ef9-saude-v1";

function estadoVazio() {
  return {
    versao: 1,
    aluno: { nome: "", turma: "" },
    criadoEm: new Date().toISOString(),
    atualizadoEm: new Date().toISOString(),
    modulos: {},     // id -> {tentativas, pontos, maxPontos, acertos, total, concluido, respostas, segundos}
    caderno: {},     // "m1-c1" -> {feito, nota}
    historico: [],   // {data, modulo, pontos, max}
    medalhas: [],    // ids já conquistadas
  };
}

function disponivel() {
  try {
    const t = "__teste__";
    localStorage.setItem(t, "1");
    localStorage.removeItem(t);
    return true;
  } catch (e) {
    return false;
  }
}

function carregar() {
  if (!disponivel()) return estadoVazio();
  try {
    const bruto = localStorage.getItem(CHAVE);
    if (!bruto) return estadoVazio();
    const e = JSON.parse(bruto);
    return Object.assign(estadoVazio(), e);
  } catch (err) {
    console.warn("Progresso salvo ilegível; começando do zero.", err);
    return estadoVazio();
  }
}

function salvar(estado) {
  estado.atualizadoEm = new Date().toISOString();
  if (!disponivel()) return false;
  try {
    localStorage.setItem(CHAVE, JSON.stringify(estado));
    return true;
  } catch (err) {
    console.warn("Não foi possível salvar o progresso.", err);
    return false;
  }
}

function apagar() {
  try { localStorage.removeItem(CHAVE); } catch (e) { /* nada a fazer */ }
}

function exportar(estado) {
  const nome = (estado.aluno.nome || "aluno").trim().replace(/[^\wÀ-ÿ -]/g, "").replace(/\s+/g, "-");
  const blob = new Blob([JSON.stringify(estado, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `progresso-${nome || "aluno"}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function importar(arquivo) {
  return new Promise((ok, erro) => {
    const leitor = new FileReader();
    leitor.onload = () => {
      try {
        const e = JSON.parse(leitor.result);
        if (!e || typeof e !== "object" || !("modulos" in e)) throw new Error("formato");
        ok(Object.assign(estadoVazio(), e));
      } catch (err) {
        erro(new Error("Este arquivo não é um progresso válido do sistema."));
      }
    };
    leitor.onerror = () => erro(new Error("Não consegui ler o arquivo."));
    leitor.readAsText(arquivo);
  });
}
