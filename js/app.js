/* Aplicação: navegação, correção das questões, progressão e relatório. */

let estado = carregar();
let moduloAtual = null;
let abaAtual = "aprenda";
let entradaTemp = {};   // respostas ainda não corrigidas da tela atual
let inicioModulo = null;

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ------------------------------------------------------------- utilidades */

function registroModulo(id) {
  if (!estado.modulos[id]) {
    estado.modulos[id] = { tentativas: 0, pontos: 0, maxPontos: 0, acertos: 0, total: 0, concluido: false, respostas: {}, segundos: 0 };
  }
  return estado.modulos[id];
}

function maxPontos(mod) {
  return mod.questoes.reduce((a, q) => a + q.pontos, 0);
}

function liberado(i) {
  if (i === 0) return true;
  const ant = MODULOS[i - 1];
  const r = estado.modulos[ant.id];
  return !!(r && r.concluido);
}

function pontosTotais() {
  return MODULOS.reduce((s, m) => s + (estado.modulos[m.id]?.pontos || 0), 0);
}

function nivelAlcancado() {
  let ultimo = null;
  for (const m of MODULOS) if (estado.modulos[m.id]?.concluido) ultimo = m.nivel;
  return ultimo ? NIVEIS[ultimo].rotulo : "—";
}

function conferirMedalhas() {
  const novas = [];
  for (const md of MEDALHAS) {
    if (!estado.medalhas.includes(md.id) && md.teste(estado)) {
      estado.medalhas.push(md.id);
      novas.push(md);
    }
  }
  return novas;
}

function aviso(texto, tipo = "ok") {
  const el = $("#aviso");
  el.className = "aviso-flutuante " + tipo;
  el.textContent = texto;
  el.hidden = false;
  clearTimeout(aviso._t);
  aviso._t = setTimeout(() => { el.hidden = true; }, 3800);
}

function persistir() {
  if (!salvar(estado)) aviso("Não consegui salvar neste navegador. Evite a janela anônima.", "erro");
}

/* ----------------------------------------------------------------- blocos */

function renderAprenda(mod) {
  return mod.aprenda.map((b) => {
    if (b.tipo === "texto") return `<div class="texto">${b.html}</div>`;
    if (b.tipo === "svg") return `<figure class="figura">${b.svg}</figure>`;
    if (b.tipo === "aviso") return `<div class="destaque"><span class="dica-ico" aria-hidden="true">!</span><p>${b.html}</p></div>`;
    if (b.tipo === "cartoes") {
      return `<div class="cartoes">${b.itens.map((i) =>
        `<div class="cartao"><h4>${esc(i.t)}</h4><p>${i.d}</p></div>`).join("")}</div>`;
    }
    return "";
  }).join("");
}

function renderQuestao(q, i, resp) {
  const feito = resp !== undefined;
  let corpo = "";

  if (q.tipo === "uma" || q.tipo === "varias") {
    const multipla = q.tipo === "varias";
    corpo = `<ul class="opcoes" role="group">` + q.opcoes.map((o, k) => {
      const marcado = feito
        ? (multipla ? resp.escolha.includes(k) : resp.escolha === k)
        : (multipla ? (entradaTemp[q.id] || []).includes(k) : entradaTemp[q.id] === k);
      let cls = "";
      if (feito) {
        const certa = multipla ? q.corretas.includes(k) : q.correta === k;
        if (certa) cls = "certa";
        else if (marcado) cls = "errada";
      }
      return `<li><label class="opcao ${cls} ${marcado ? "marcada" : ""}">
        <input type="${multipla ? "checkbox" : "radio"}" name="${q.id}" value="${k}"
          ${marcado ? "checked" : ""} ${feito ? "disabled" : ""}>
        <span>${o}</span></label></li>`;
    }).join("") + `</ul>`;

  } else if (q.tipo === "vf") {
    corpo = `<table class="tab-vf"><thead><tr><th>Afirmação</th><th>V</th><th>F</th></tr></thead><tbody>` +
      q.itens.map((it, k) => {
        const val = feito ? resp.escolha[k] : (entradaTemp[q.id] || [])[k];
        const certo = feito && val === it.v;
        return `<tr class="${feito ? (certo ? "ok" : "nok") : ""}">
          <td>${it.t}${feito ? `<div class="porque">${certo ? "✓" : "✗"} ${esc(it.por)}</div>` : ""}</td>
          <td class="c"><input type="radio" name="${q.id}-${k}" value="1" ${val === true ? "checked" : ""} ${feito ? "disabled" : ""}></td>
          <td class="c"><input type="radio" name="${q.id}-${k}" value="0" ${val === false ? "checked" : ""} ${feito ? "disabled" : ""}></td>
        </tr>`;
      }).join("") + `</tbody></table>`;

  } else if (q.tipo === "associar") {
    const direitas = q.pares.map((p) => p[1]);
    const ordem = q._ordem || (q._ordem = embaralhar(direitas.map((_, k) => k), q.id));
    corpo = `<div class="associar">` + q.pares.map((p, k) => {
      const val = feito ? resp.escolha[k] : (entradaTemp[q.id] || {})[k];
      const certo = feito && val === k;
      return `<div class="par ${feito ? (certo ? "ok" : "nok") : ""}">
        <span class="esq">${esc(p[0])}</span>
        <select data-q="${q.id}" data-i="${k}" ${feito ? "disabled" : ""}>
          <option value="">escolha…</option>
          ${ordem.map((o) => `<option value="${o}" ${val === o ? "selected" : ""}>${esc(direitas[o])}</option>`).join("")}
        </select></div>`;
    }).join("") + `</div>`;

  } else if (q.tipo === "ordenar") {
    const ordem = q._ordem || (q._ordem = embaralhar(q.itens.map((_, k) => k), q.id));
    corpo = `<ol class="ordenar">` + ordem.map((idx) => {
      const val = feito ? resp.escolha[idx] : (entradaTemp[q.id] || {})[idx];
      const certo = feito && val === idx + 1;
      return `<li class="${feito ? (certo ? "ok" : "nok") : ""}">
        <input type="number" min="1" max="${q.itens.length}" data-q="${q.id}" data-i="${idx}"
          value="${val || ""}" ${feito ? "disabled" : ""} aria-label="posição">
        <span>${esc(q.itens[idx])}</span></li>`;
    }).join("") + `</ol>`;

  } else if (q.tipo === "numero") {
    const val = feito ? resp.escolha : (entradaTemp[q.id] ?? "");
    corpo = `<div class="numero"><input type="number" data-q="${q.id}" value="${val}" ${feito ? "disabled" : ""}
      aria-label="resposta numérica"><span class="un">${esc(q.unidade || "")}</span></div>`;

  } else if (q.tipo === "aberta") {
    const val = feito ? resp.texto : (entradaTemp[q.id]?.texto ?? "");
    const marcas = feito ? resp.rubrica : (entradaTemp[q.id]?.rubrica || []);
    corpo = `<p class="dica">${esc(q.dica || "")}</p>
      <textarea data-q="${q.id}" rows="7" ${feito ? "disabled" : ""}
        placeholder="Escreva aqui a sua proposta…">${esc(val)}</textarea>
      <p class="contador" id="cont-${q.id}"></p>
      <div class="rubrica"><h5>Autoavaliação — marque o que a sua proposta já tem:</h5>
      ${q.rubrica.map((r, k) => `<label class="criterio">
        <input type="checkbox" data-rub="${q.id}" data-i="${k}" ${marcas[k] ? "checked" : ""} ${feito ? "disabled" : ""}>
        <span>${esc(r)}</span></label>`).join("")}</div>`;
  }

  const estadoCls = feito ? (resp.pontos === q.pontos ? "acertou" : resp.pontos > 0 ? "parcial" : "errou") : "";
  const selo = feito
    ? `<span class="selo ${estadoCls}">${resp.pontos} / ${q.pontos} pts</span>`
    : `<span class="selo">${q.pontos} pts</span>`;
  const explic = feito && q.explicacao
    ? `<div class="explicacao"><b>Por quê:</b> ${q.explicacao}</div>` : "";

  return `<article class="questao ${estadoCls}" data-q="${q.id}">
    <header><span class="qn">${i + 1}</span><div class="enun">${q.enunciado}</div>${selo}</header>
    ${corpo}${explic}
    ${feito ? "" : `<button class="btn responder" data-q="${q.id}">Responder</button>`}
  </article>`;
}

function embaralhar(arr, semente) {
  // embaralhamento estável por questão: a ordem não muda a cada render
  let s = 0;
  for (const c of String(semente)) s = (s * 31 + c.charCodeAt(0)) % 100000;
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) % 2147483648;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderCaderno(mod) {
  return `<div class="texto"><p>Estas tarefas são feitas <b>no caderno de papel</b>. Marque aqui quando terminar
    — o professor vai conferir o caderno.</p></div>` +
    mod.caderno.map((c) => {
      const k = mod.id + "-" + c.id;
      const reg = estado.caderno[k] || {};
      return `<div class="tarefa ${reg.feito ? "feita" : ""}">
        <label class="check"><input type="checkbox" data-cad="${k}" ${reg.feito ? "checked" : ""}>
          <span>Feito no caderno</span></label>
        <div class="enun">${c.enunciado}</div>
        <label class="campo"><span>${esc(c.campo)}</span>
          <input type="text" data-cadnota="${k}" value="${esc(reg.nota || "")}" placeholder="sua resposta curta"></label>
      </div>`;
    }).join("");
}

/* ------------------------------------------------------------- correção */

function corrigir(q) {
  const r = { pontos: 0 };
  if (q.tipo === "uma") {
    const e = entradaTemp[q.id];
    if (e === undefined) return null;
    r.escolha = e;
    r.pontos = e === q.correta ? q.pontos : 0;
  } else if (q.tipo === "varias") {
    const e = entradaTemp[q.id] || [];
    if (!e.length) return null;
    r.escolha = e;
    const certas = e.filter((k) => q.corretas.includes(k)).length;
    const erradas = e.filter((k) => !q.corretas.includes(k)).length;
    const frac = Math.max(0, (certas - erradas) / q.corretas.length);
    r.pontos = Math.round(frac * q.pontos);
  } else if (q.tipo === "vf") {
    const e = entradaTemp[q.id] || [];
    if (e.filter((v) => v !== undefined).length < q.itens.length) return null;
    r.escolha = e;
    const certas = q.itens.filter((it, k) => e[k] === it.v).length;
    r.pontos = Math.round((certas / q.itens.length) * q.pontos);
  } else if (q.tipo === "associar") {
    const e = entradaTemp[q.id] || {};
    if (Object.keys(e).length < q.pares.length) return null;
    r.escolha = e;
    const certas = q.pares.filter((_, k) => e[k] === k).length;
    r.pontos = Math.round((certas / q.pares.length) * q.pontos);
  } else if (q.tipo === "ordenar") {
    const e = entradaTemp[q.id] || {};
    if (Object.keys(e).length < q.itens.length) return null;
    r.escolha = e;
    const certas = q.itens.filter((_, k) => e[k] === k + 1).length;
    r.pontos = Math.round((certas / q.itens.length) * q.pontos);
  } else if (q.tipo === "numero") {
    const e = entradaTemp[q.id];
    if (e === undefined || e === "" || isNaN(e)) return null;
    r.escolha = Number(e);
    r.pontos = Math.abs(Number(e) - q.resposta) <= (q.tolerancia || 0) ? q.pontos : 0;
  } else if (q.tipo === "aberta") {
    const e = entradaTemp[q.id] || {};
    const txt = (e.texto || "").trim();
    if (txt.length < q.minimo) return null;
    const marcas = e.rubrica || [];
    r.texto = txt;
    r.rubrica = marcas;
    const marcados = marcas.filter(Boolean).length;
    r.pontos = Math.round((marcados / q.rubrica.length) * q.pontos);
    r.autoavaliada = true;
  }
  return r;
}

function responder(qid) {
  const mod = MODULOS.find((m) => m.id === moduloAtual);
  const q = mod.questoes.find((x) => x.id === qid);
  const r = corrigir(q);
  if (!r) {
    aviso(q.tipo === "aberta"
      ? `Escreva pelo menos ${q.minimo} caracteres antes de enviar.`
      : "Responda todos os itens desta questão antes de enviar.", "erro");
    return;
  }
  const reg = registroModulo(mod.id);
  reg.respostas[qid] = r;
  recalcular(mod);
  persistir();
  pintarModulo();
}

function recalcular(mod) {
  const reg = registroModulo(mod.id);
  const resp = reg.respostas;
  reg.maxPontos = maxPontos(mod);
  reg.pontos = Object.values(resp).reduce((a, r) => a + r.pontos, 0);
  reg.total = mod.questoes.length;
  reg.acertos = mod.questoes.filter((q) => resp[q.id] && resp[q.id].pontos === q.pontos).length;
  const todas = mod.questoes.every((q) => resp[q.id]);
  const aprovado = reg.pontos >= PASSAR * reg.maxPontos;
  if (todas && aprovado && !reg.concluido) {
    reg.concluido = true;
    reg.tentativas += 1;
    estado.historico.push({ data: new Date().toISOString(), modulo: mod.id, pontos: reg.pontos, max: reg.maxPontos });
    const novas = conferirMedalhas();
    setTimeout(() => {
      aviso(novas.length ? `Módulo concluído! Medalha: ${novas.map((m) => m.nome).join(", ")}` : "Módulo concluído!");
    }, 120);
  } else if (todas && !aprovado) {
    reg.concluido = false;
  }
  if (inicioModulo) {
    reg.segundos += Math.round((Date.now() - inicioModulo) / 1000);
    inicioModulo = Date.now();
  }
}

function refazerModulo(id) {
  if (!confirm("Isso apaga as suas respostas deste módulo. As tarefas de caderno continuam marcadas. Continuar?")) return;
  const reg = registroModulo(id);
  reg.respostas = {};
  reg.pontos = 0;
  reg.acertos = 0;
  reg.concluido = false;
  entradaTemp = {};
  persistir();
  pintarModulo();
  aviso("Módulo reiniciado.");
}

/* ------------------------------------------------------------- telas */

function pintarInicio() {
  moduloAtual = null;
  $("#tela").innerHTML = `
    <section class="capa-trilha">
      <div class="capa-txt">
        <p class="etiqueta">Educação Física · 9º ano · 3º trimestre</p>
        <h2>Saúde, qualidade de vida e atividade física</h2>
        <p class="sub">Seis módulos que vão do mais simples ao mais complexo. Cada um ensina, testa o que você
          entendeu e pede um registro no caderno. O seu progresso fica salvo neste navegador.</p>
        <p class="hab"><b>Habilidade central — EF89EF08P9:</b> ${esc(HABILIDADES.EF89EF08P9)}</p>
      </div>
      <img src="img/mascote.png" alt="" class="capa-img">
    </section>
    <div class="barra-geral">
      <div class="rotulos"><span>Progresso geral</span><span><b>${pontosTotais()}</b> de ${TOTAL_PONTOS} pontos</span></div>
      <div class="barra"><i style="width:${Math.round((pontosTotais() / TOTAL_PONTOS) * 100)}%"></i></div>
    </div>
    <h3 class="titulo-secao">A trilha</h3>
    <ol class="trilha">${MODULOS.map((m, i) => {
      const reg = estado.modulos[m.id];
      const lib = liberado(i);
      const pc = reg && reg.maxPontos ? Math.round((reg.pontos / reg.maxPontos) * 100) : 0;
      return `<li class="passo ${lib ? "" : "travado"} ${reg?.concluido ? "pronto" : ""}">
        <button class="cartao-mod" data-mod="${m.id}" ${lib ? "" : "disabled"}>
          <span class="nivel" style="background:${NIVEIS[m.nivel].cor}">${NIVEIS[m.nivel].rotulo}</span>
          <span class="num">${i + 1}</span>
          <h4>${esc(m.titulo)}</h4>
          <p>${esc(m.resumo)}</p>
          <span class="rodape-mod">
            ${lib ? (reg?.concluido ? `✓ concluído · ${pc}%` : reg?.pontos ? `em andamento · ${pc}%` : "começar")
                  : "conclua o módulo anterior"}
          </span>
        </button></li>`;
    }).join("")}</ol>`;
  $$("[data-mod]").forEach((b) => b.addEventListener("click", () => abrirModulo(b.dataset.mod)));
  $("#nav-inicio").classList.add("ativo");
  $("#nav-progresso").classList.remove("ativo");
}

function abrirModulo(id) {
  moduloAtual = id;
  abaAtual = "aprenda";
  entradaTemp = {};
  inicioModulo = Date.now();
  pintarModulo();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function pintarModulo() {
  const i = MODULOS.findIndex((m) => m.id === moduloAtual);
  const mod = MODULOS[i];
  const reg = registroModulo(mod.id);
  const pc = reg.maxPontos ? Math.round((reg.pontos / reg.maxPontos) * 100) : 0;
  const respondidas = Object.keys(reg.respostas).length;
  const proximo = MODULOS[i + 1];

  let miolo = "";
  if (abaAtual === "aprenda") miolo = renderAprenda(mod);
  else if (abaAtual === "praticar") miolo = mod.questoes.map((q, k) => renderQuestao(q, k, reg.respostas[q.id])).join("");
  else miolo = renderCaderno(mod);

  $("#tela").innerHTML = `
    <button class="voltar" id="voltar">← Voltar para a trilha</button>
    <header class="cab-mod" style="--cor:${NIVEIS[mod.nivel].cor}">
      <span class="nivel">${NIVEIS[mod.nivel].rotulo}</span>
      <h2>${i + 1}. ${esc(mod.titulo)}</h2>
      <p class="hab-mod"><b>${mod.habilidade}</b> — ${esc(HABILIDADES[mod.habilidade])}</p>
      <div class="barra fina"><i style="width:${pc}%"></i></div>
      <p class="estado-mod">${respondidas} de ${mod.questoes.length} questões respondidas ·
        <b>${reg.pontos}</b>/${reg.maxPontos || maxPontos(mod)} pontos
        ${reg.concluido ? '<span class="ok-mini">✓ concluído</span>' : ""}</p>
    </header>
    <nav class="abas" role="tablist">
      <button role="tab" data-aba="aprenda" class="${abaAtual === "aprenda" ? "ativa" : ""}">1 · Aprenda</button>
      <button role="tab" data-aba="praticar" class="${abaAtual === "praticar" ? "ativa" : ""}">2 · Pratique</button>
      <button role="tab" data-aba="caderno" class="${abaAtual === "caderno" ? "ativa" : ""}">3 · No caderno</button>
    </nav>
    <div class="miolo">${miolo}</div>
    <footer class="pe-mod">
      ${abaAtual === "aprenda" ? '<button class="btn primario" id="ir-praticar">Ir para as questões →</button>' : ""}
      ${abaAtual === "praticar" ? '<button class="btn primario" id="ir-caderno">Ir para o caderno →</button>' : ""}
      ${abaAtual === "praticar" && respondidas ? '<button class="btn fraco" id="refazer">Refazer módulo</button>' : ""}
      ${reg.concluido && proximo ? `<button class="btn primario" id="proximo">Próximo módulo: ${esc(proximo.titulo)} →</button>` : ""}
      ${reg.concluido && !proximo ? '<button class="btn primario" id="ver-progresso">Ver meu relatório final →</button>' : ""}
    </footer>`;

  $("#voltar").addEventListener("click", pintarInicio);
  $$("[data-aba]").forEach((b) => b.addEventListener("click", () => { abaAtual = b.dataset.aba; pintarModulo(); }));
  $("#ir-praticar")?.addEventListener("click", () => { abaAtual = "praticar"; pintarModulo(); });
  $("#ir-caderno")?.addEventListener("click", () => { abaAtual = "caderno"; pintarModulo(); });
  $("#refazer")?.addEventListener("click", () => refazerModulo(mod.id));
  $("#proximo")?.addEventListener("click", () => abrirModulo(proximo.id));
  $("#ver-progresso")?.addEventListener("click", pintarProgresso);
  ligarEntradas(mod);
}

function ligarEntradas(mod) {
  $$(".responder").forEach((b) => b.addEventListener("click", () => responder(b.dataset.q)));

  $$('.opcoes input[type="radio"]').forEach((el) => el.addEventListener("change", () => {
    entradaTemp[el.name] = Number(el.value);
    el.closest(".opcoes").querySelectorAll(".opcao").forEach((o) => o.classList.remove("marcada"));
    el.closest(".opcao").classList.add("marcada");
  }));

  $$('.opcoes input[type="checkbox"]').forEach((el) => el.addEventListener("change", () => {
    const k = Number(el.value);
    const arr = entradaTemp[el.name] || (entradaTemp[el.name] = []);
    const p = arr.indexOf(k);
    if (el.checked && p < 0) arr.push(k); else if (!el.checked && p >= 0) arr.splice(p, 1);
    el.closest(".opcao").classList.toggle("marcada", el.checked);
  }));

  $$(".tab-vf input").forEach((el) => el.addEventListener("change", () => {
    const [qid, idx] = el.name.split("-");
    const arr = entradaTemp[qid] || (entradaTemp[qid] = []);
    arr[Number(idx)] = el.value === "1";
  }));

  $$(".associar select").forEach((el) => el.addEventListener("change", () => {
    const o = entradaTemp[el.dataset.q] || (entradaTemp[el.dataset.q] = {});
    if (el.value === "") delete o[Number(el.dataset.i)];
    else o[Number(el.dataset.i)] = Number(el.value);
  }));

  $$(".ordenar input").forEach((el) => el.addEventListener("input", () => {
    const o = entradaTemp[el.dataset.q] || (entradaTemp[el.dataset.q] = {});
    if (el.value === "") delete o[Number(el.dataset.i)];
    else o[Number(el.dataset.i)] = Number(el.value);
  }));

  $$(".numero input").forEach((el) => el.addEventListener("input", () => {
    entradaTemp[el.dataset.q] = el.value;
  }));

  $$(".miolo textarea").forEach((el) => {
    const q = mod.questoes.find((x) => x.id === el.dataset.q);
    const cont = $("#cont-" + el.dataset.q);
    const atualiza = () => {
      const o = entradaTemp[el.dataset.q] || (entradaTemp[el.dataset.q] = { texto: "", rubrica: [] });
      o.texto = el.value;
      if (cont) {
        const n = el.value.trim().length;
        cont.textContent = `${n} caracteres (mínimo ${q.minimo})`;
        cont.className = "contador " + (n >= q.minimo ? "ok" : "");
      }
    };
    el.addEventListener("input", atualiza);
    atualiza();
  });

  $$("[data-rub]").forEach((el) => el.addEventListener("change", () => {
    const o = entradaTemp[el.dataset.rub] || (entradaTemp[el.dataset.rub] = { texto: "", rubrica: [] });
    (o.rubrica = o.rubrica || [])[Number(el.dataset.i)] = el.checked;
  }));

  $$("[data-cad]").forEach((el) => el.addEventListener("change", () => {
    const k = el.dataset.cad;
    estado.caderno[k] = Object.assign({ nota: "" }, estado.caderno[k], { feito: el.checked });
    conferirMedalhas();
    persistir();
    el.closest(".tarefa").classList.toggle("feita", el.checked);
  }));

  $$("[data-cadnota]").forEach((el) => el.addEventListener("input", () => {
    const k = el.dataset.cadnota;
    estado.caderno[k] = Object.assign({ feito: false }, estado.caderno[k], { nota: el.value });
    persistir();
  }));
}

/* ---------------------------------------------------------- progresso */

function pintarProgresso() {
  moduloAtual = null;
  const total = pontosTotais();
  const pc = Math.round((total / TOTAL_PONTOS) * 100);
  const larg = 560, alt = 190, base = 150;
  const passo = larg / MODULOS.length;

  const barras = MODULOS.map((m, i) => {
    const reg = estado.modulos[m.id] || { pontos: 0 };
    const mx = maxPontos(m);
    const h = Math.round((reg.pontos / mx) * 110);
    const x = i * passo + passo * 0.22;
    const w = passo * 0.56;
    return `<rect x="${x}" y="${base - h}" width="${w}" height="${h || 2}" rx="5" fill="${NIVEIS[m.nivel].cor}"/>
      <text x="${x + w / 2}" y="${base - h - 7}" text-anchor="middle" style="font:800 13px Nunito;fill:#3D1766">${reg.pontos}</text>
      <text x="${x + w / 2}" y="${base + 20}" text-anchor="middle" style="font:700 13px Nunito;fill:#6B6680">M${i + 1}</text>
      <text x="${x + w / 2}" y="${base + 36}" text-anchor="middle" style="font:600 10px Nunito;fill:#9A92AC">${NIVEIS[m.nivel].rotulo}</text>`;
  }).join("");

  const tarefas = MODULOS.flatMap((m) => m.caderno.map((c) => ({ m, c })));
  const feitas = tarefas.filter((t) => estado.caderno[t.m.id + "-" + t.c.id]?.feito).length;

  $("#tela").innerHTML = `
    <h2 class="titulo-pagina">Meu progresso</h2>
    <div class="cartoes-num">
      <div class="num-card"><b>${pc}%</b><span>da trilha</span></div>
      <div class="num-card"><b>${total}</b><span>de ${TOTAL_PONTOS} pontos</span></div>
      <div class="num-card"><b>${MODULOS.filter((m) => estado.modulos[m.id]?.concluido).length}</b><span>de 6 módulos</span></div>
      <div class="num-card"><b>${feitas}</b><span>de ${tarefas.length} tarefas de caderno</span></div>
      <div class="num-card"><b>${nivelAlcancado()}</b><span>nível alcançado</span></div>
    </div>
    <h3 class="titulo-secao">Pontos por módulo</h3>
    <svg viewBox="0 0 ${larg} ${alt}" class="grafico" role="img" aria-label="Gráfico de pontos por módulo">
      <line x1="0" y1="${base}" x2="${larg}" y2="${base}" stroke="#D9D2E6" stroke-width="2"/>${barras}
    </svg>
    <h3 class="titulo-secao">Medalhas</h3>
    <div class="medalhas">${MEDALHAS.map((md) => {
      const tem = estado.medalhas.includes(md.id);
      return `<div class="medalha ${tem ? "tem" : ""}"><span class="ico">${tem ? "★" : "☆"}</span>
        <div><b>${esc(md.nome)}</b><p>${esc(md.desc)}</p></div></div>`;
    }).join("")}</div>
    <h3 class="titulo-secao">Respostas do caderno</h3>
    <table class="tab-relatorio"><thead><tr><th>Módulo</th><th>Tarefa</th><th>Feito</th><th>Minha resposta</th></tr></thead>
      <tbody>${tarefas.map((t) => {
        const r = estado.caderno[t.m.id + "-" + t.c.id] || {};
        return `<tr><td>${esc(t.m.titulo)}</td><td>${esc(t.c.campo)}</td>
          <td class="c">${r.feito ? "✓" : "—"}</td><td>${esc(r.nota || "")}</td></tr>`;
      }).join("")}</tbody></table>
    <div class="acoes">
      <button class="btn primario" id="imprimir">Imprimir / salvar em PDF</button>
      <button class="btn" id="exportar">Baixar meu progresso (.json)</button>
      <label class="btn arquivo">Carregar progresso<input type="file" id="importar" accept="application/json" hidden></label>
      <button class="btn perigo" id="zerar">Apagar tudo</button>
    </div>`;

  $("#nav-inicio").classList.remove("ativo");
  $("#nav-progresso").classList.add("ativo");
  $("#imprimir").addEventListener("click", () => window.print());
  $("#exportar").addEventListener("click", () => exportar(estado));
  $("#importar").addEventListener("change", async (ev) => {
    const f = ev.target.files[0];
    if (!f) return;
    try {
      estado = await importar(f);
      persistir();
      aviso("Progresso carregado.");
      pintarProgresso();
    } catch (e) { aviso(e.message, "erro"); }
  });
  $("#zerar").addEventListener("click", () => {
    if (!confirm("Isso apaga todo o seu progresso neste navegador. Não dá para desfazer. Continuar?")) return;
    apagar();
    estado = estadoVazio();
    aviso("Progresso apagado.");
    pintarInicio();
  });
}

/* ------------------------------------------------------------- partida */

function identificar() {
  const nome = $("#nome").value.trim();
  const turma = $("#turma").value.trim();
  estado.aluno = { nome, turma };
  persistir();
  $("#quem").textContent = nome ? `${nome}${turma ? " · " + turma : ""}` : "sem identificação";
  $("#porta").hidden = true;
  $("#app").hidden = false;
  pintarInicio();
}

window.addEventListener("DOMContentLoaded", () => {
  if (!disponivel()) {
    $("#sem-storage").hidden = false;
  }
  $("#nome").value = estado.aluno.nome || "";
  $("#turma").value = estado.aluno.turma || "";
  if (estado.aluno.nome) $("#btn-entrar").textContent = "Continuar de onde parei";
  $("#form-entrar").addEventListener("submit", (e) => { e.preventDefault(); identificar(); });
  $("#nav-inicio").addEventListener("click", pintarInicio);
  $("#nav-progresso").addEventListener("click", pintarProgresso);
});
