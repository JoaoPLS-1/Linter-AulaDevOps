# Respostas — Questões 2, 3 e 4

## Questão 2 — Investigação do job que falhou

As informações abaixo foram extraídas do log do job **Linter (HTMLHint)** no GitHub Actions, sem consultar o código no VS Code.

1. **Arquivo que causou a falha:** `index.html`.
2. **Local do erro:** linha **10**, coluna **3**, na abertura da tag `<div>` indicada pelo marcador `^` no log.
3. **Mensagem exata retornada pelo linter:**

```text
Tag must be paired, missing: [ </div> ], start tag match failed [ <div> ] on line 10. (tag-pair)
```

A regra `tag-pair` detectou uma tag `<div>` sem seu fechamento correspondente `</div>`. O processo terminou com código de saída 1.

[Evidência: log do job que falhou](https://github.com/JoaoPLS-1/Linter-AulaDevOps/actions/runs/44190147140/job/134417052265).

## Questão 3 — Por que o Build ficou como Skipped?

O workflow estabelece a seguinte dependência:

```yaml
build:
  needs: lint
```

Por padrão, um job com `needs` somente executa se os jobs dos quais depende terminarem com sucesso. Como o Linter falhou, o GitHub Actions não iniciou o Build e atribuiu a ele o status **Skipped** (pulado).

O status **Failed** indicaria uma falha na execução do próprio job. O Build não executou e, portanto, não falhou: sua execução foi impedida pela falha da dependência.

Neste repositório, o único job dependente do Linter é o **Build**. O workflow não possui job de Deploy.

[Evidência: workflow com Linter em failure e Build em skipped](https://github.com/JoaoPLS-1/Linter-AulaDevOps/actions/runs/44190147140).

## Questão 4 — Correção e recuperação da pipeline

Com base no diagnóstico da Questão 2, o fechamento `</div>` foi restaurado no `index.html`, antes de `</body>`.

A correção foi validada localmente com:

```sh
npm run lint
npm run build
```

O Linter terminou sem erros e o Build gerou `dist/index.html`. A correção foi registrada no commit [`32899c3`](https://github.com/JoaoPLS-1/Linter-AulaDevOps/commit/32899c3913eed28a3feee0a7775cddc73348c6ed) e enviada para a branch `main`.

Na execução desse commit no GitHub Actions, os resultados confirmados foram:

| Item | Resultado |
| --- | --- |
| Linter (HTMLHint) | Success |
| Build | Success |
| Workflow completo | Success |
| Artefato do Build | `site` gerado |

[Evidência: pipeline verde após a correção](https://github.com/JoaoPLS-1/Linter-AulaDevOps/actions/runs/44190886233).

O estado corrigido não apresenta o erro de sintaxe do exercício. O commit anterior com a falha intencional permanece no histórico como evidência da atividade; a correção foi feita em um novo commit.