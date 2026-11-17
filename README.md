# Linter - Aula de DevOps

Exercicio de integracao continua com HTMLHint e GitHub Actions.

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

A falha final do lint e intencional e faz parte do exercicio. Para recuperar a pipeline, restaurar o fechamento `</div>` e fazer um novo commit.