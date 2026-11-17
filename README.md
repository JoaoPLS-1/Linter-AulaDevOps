# Linter - Aula de DevOps

Exercicio de integracao continua com HTMLHint e GitHub Actions.

As respostas das questoes 2, 3 e 4 e os links das evidencias estao em [RESPOSTAS.md](RESPOSTAS.md).

## Executar localmente

Requisito: Node.js 22 e npm.

```sh
npm ci
npm run lint
npm run build
```

O Build copia o HTML para `dist/index.html`. Na pipeline, o job `build` depende de `lint` com `needs: lint`: se o Linter falhar, o Build sera ignorado (skipped).

## Questao 1

1. Partir de um HTML valido e confirmar que Linter e Build passam.
2. Remover intencionalmente o fechamento `</div>` no `index.html`.
3. Fazer commit e push para disparar a pipeline.
4. Conferir no GitHub Actions o erro da regra `tag-pair` do HTMLHint e o Build como `skipped`.

A falha do commit `7dab0fa` e intencional e faz parte da Questao 1. Na Questao 4, o fechamento `</div>` foi restaurado para recuperar a pipeline.
## Questao 2 - Diagnostico pelo GitHub Actions

- Arquivo: `index.html`.
- Linha: 10; coluna: 3, na abertura `<div>` indicada pelo marcador do log.
- Mensagem exata: `Tag must be paired, missing: [ </div> ], start tag match failed [ <div> ] on line 10. (tag-pair)`.
- [Execucao com a falha intencional](https://github.com/JoaoPLS-1/Linter-AulaDevOps/actions/runs/44190147140).

## Questao 3 - Jobs dependentes

O job Build usa `needs: lint` e, portanto, so executa quando o Linter termina com sucesso. Como o Linter falhou, o Build nao iniciou e recebeu o status `skipped`. O status `failed` indicaria que o job executou e falhou; neste caso, a dependencia impediu sua execucao. Este workflow nao possui job de Deploy.

## Questao 4 - Correcao

O fechamento `</div>` foi restaurado antes de `</body>`. A validacao local usa `npm run lint` e `npm run build`. O push da correcao dispara novamente os dois jobs no GitHub Actions; o resultado deve ser conferido na execucao associada ao commit mais recente.

O historico preserva a falha intencional como evidencia do exercicio. A correcao e feita em um novo commit.