# 🧪 Nomenclatura de Compostos Inorgânicos

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-online-brightgreen)](https://henriquecsj.github.io/NomenclaturaQuimica/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![Stack](https://img.shields.io/badge/Stack-HTML%2FCSS%2FJS-blue)
![Offline](https://img.shields.io/badge/Works-100%25%20Offline-8A2BE2)

Aplicativo didático em **HTML/CSS/JS** para treinar a **nomenclatura IUPAC** de espécies **inorgânicas**.  
Inclui **quiz interativo**, **flashcards**, **análise de desempenho**, **tema claro/escuro**, seleção de **categorias**, **níveis de dificuldade** e **modos de jogo** (Fórmula → Nome, Nome → Fórmula e Misto).  
Funciona **100% no navegador** – sem dependências externas.

**🔗 Demonstração:** https://henriquecsj.github.io/NomenclaturaQuimica/

---

## 📌 Sumário

- [Recursos](#recursos)
- [Como usar](#como-usar)
- [Executar localmente](#executar-localmente)
- [Como funciona](#como-funciona)
- [Exportação de resultados](#exportação-de-resultados)
- [Aparência e acessibilidade](#aparência-e-acessibilidade)
- [Estrutura dos dados (banco de questões)](#estrutura-dos-dados-banco-de-questões)
- [Como adicionar/editar conteúdo](#como-adicionareditar-conteúdo)
- [Publicar no GitHub Pages](#publicar-no-github-pages)
- [Compatibilidade](#compatibilidade)
- [Roadmap](#roadmap)
- [Contribuindo](#contribuindo)
- [Licença](#licença)
- [Créditos](#créditos)

---

## ✨ Recursos

- **Quiz Interativo**
  - Categorias: **cátions, ânions, sais, ácidos, bases, óxidos**
  - Dificuldades: **fácil, médio, difícil**
  - Modos: **Fórmula → Nome**, **Nome → Fórmula**, **Misto**
  - Pontuação, **% de acertos**, **streak** (sequência) e **barra de progresso**
  - **Explicações** após cada questão e botão **“Próxima Questão”**
  - **Exportar resultados** (planilha CSV)
- **Flashcards** com flip (frente ↔ verso) e navegação anterior/próximo
- **Análise de desempenho** por categoria/dificuldade + **Quiz de reforço**
- **Tabelas de referência** abrangentes e **regras IUPAC** resumidas
- **UI/UX**
  - **Tema claro/escuro**, layout responsivo e animações suaves
  - **Sem dependências**: apenas HTML/CSS/JS, executa offline

---

## 🚀 Como usar

1. Acesse a **[demonstração online](https://henriquecsj.github.io/NomenclaturaQuimica/)** ou abra `index.html` localmente.
2. Na aba **Quiz Interativo**, selecione **categorias**, **dificuldades** e **modo de jogo**.
3. Clique em **🚀 Iniciar Quiz** e responda às questões.
4. Leia a **explicação**, avance com **Próxima Questão** e acompanhe seu desempenho na barra de estatísticas.
5. Explore **Flashcards** e as **Tabelas** (regras, cátions, ânions, ácidos, bases, óxidos, sais).

---

## 🏠 Executar localmente

- **Opção rápida:** clique duas vezes em `index.html`.
- **Servidor local (opcional)** — ajuda com rotas e cache em alguns navegadores:

```bash
# Python 3
python -m http.server 8000
# Depois acesse: http://localhost:8000
```

---

## 🧠 Como funciona

A aplicação é uma **Single-Page App** estática:

- **Abas** trocam seções de conteúdo (quiz, flashcards, análise, regras e tabelas).
- O **quiz** é gerado a partir de um banco de dados JavaScript com itens padronizados (ver próxima seção).
- O **modo** define a direção do desafio:
  - *Fórmula → Nome*: mostra a fórmula e pede o nome.
  - *Nome → Fórmula*: mostra o nome e pede a fórmula.
  - *Misto*: alterna aleatoriamente.
- **Dificuldades** e **categorias** filtram o conjunto de questões.
- A **análise** usa os metadados (tipo, dificuldade, tags) para apontar pontos fortes/fracos e habilita um **Quiz de reforço** focado.

---

## 📤 Exportação de resultados

Clique em **📊 Exportar** para baixar um arquivo (CSV) com:
- Data/hora
- Pontuação total
- % de acertos
- Streak máximo
- Resumo por categoria/dificuldade

> Observação: o arquivo baixa localmente; nenhum dado é enviado a servidores.

---

## 🎨 Aparência e acessibilidade

- **Tema claro/escuro** (botão 🌙/☀️ no topo).
- **Layout responsivo** (desktop, tablet e mobile).
- **Tipografia** legível e alto contraste.
- **Teclado**: os controles são elementos nativos de formulário/botões, portanto navegáveis por `Tab` e acionáveis por `Enter/Espaço`.

---

## 🗂️ Estrutura dos dados (banco de questões)

Cada item do banco segue a estrutura abaixo (exemplo real):

```js
{
  formula: "Fe<sup>2+</sup>",         // Fórmula (suporta <sup>/<sub> para índices/exponentes)
  name: "Cátion ferro(II)",           // Nome exibido
  type: "cation",                     // cation | anion | salt | acid | base | oxide
  difficulty: "medio",                // facil | medio | dificil
  tags: ["transicao", "carga_variavel", "ferro"] // metadados livres para análise
}
```

**Tipos aceitos (`type`):** `cation`, `anion`, `salt`, `acid`, `base`, `oxide`.  
**Dificuldades:** `facil`, `medio`, `dificil`.  
**Observação:** a **fórmula** pode usar HTML (`<sup>`, `<sub>`) para melhor legibilidade química (ex.: `SO<sub>4</sub><sup>2-</sup>`).

---

## ✍️ Como adicionar/editar conteúdo

1. Abra o arquivo `index.html`.
2. Localize o array `const compounds = [ ... ]`.
3. **Adicione** novos objetos seguindo o padrão acima.
4. **Dicas:**
   - Use **tags** para facilitar análises (ex.: `"haleto"`, `"oxianion"`, `"transicao"`).
   - Garanta consistência nos **tipos** e **dificuldades**.
   - Prefira **nomes IUPAC**; pode incluir entre parênteses variantes históricas quando pertinente.

> As **tabelas de referência** (regras, cátions, ânions, ácidos, bases, óxidos, sais) ficam em seções HTML dedicadas dentro do mesmo arquivo.  
> Atualize-as conforme necessário para manter o material de apoio alinhado ao banco de questões.

---

## 🌐 Publicar no GitHub Pages

1. Faça push do repositório com `index.html` na raiz.
2. No GitHub, vá em **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch** e selecione a branch (**main/master**) e a pasta **/** (root).
4. Salve. O link será exibido (ex.: `https://<seu-usuário>.github.io/<seu-repo>/`).

---

## 🧭 Compatibilidade

- Navegadores modernos (Chromium, Firefox, Safari, Edge).
- Sem dependências externas, sem build – **apenas arquivos estáticos**.

---

## 🤝 Contribuindo

Contribuições são bem-vindas!

1. Faça um **fork** do projeto.
2. Crie uma branch: `git checkout -b feat/minha-melhoria`.
3. Commit: `git commit -m "feat: descreva sua melhoria"`.
4. Push: `git push origin feat/minha-melhoria`.
5. Abra um **Pull Request** explicando o que mudou e por quê.

**Padrões sugeridos:**
- Código claro e comentado quando necessário.
- Preferir semântica HTML e estilos consistentes.
- Manter nomes IUPAC e exemplos coerentes nas tabelas.

---

## 📄 Licença

Este projeto é licenciado sob a **MIT License**. Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 🙌 Créditos

Desenvolvimento e conteúdo:

**Universidade Federal Rural do Rio de Janeiro**  
**Instituto de Química, Departamento de Química Fundamental**  
