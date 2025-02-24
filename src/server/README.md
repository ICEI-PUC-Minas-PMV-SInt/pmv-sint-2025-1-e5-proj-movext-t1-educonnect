Este é o backend, o "núcleo" da API do serviço.

No momento é apenas um servidor HTTP simples feito em Go.

## Utilização

Se você possuir o Just instalado:

```sh
just run
```

Você pode também usar o comando `list` para ver os comandos disponíveis no `justfile`.

Caso não possua o Just instalado, utilize:

```sh
go run ./cmd/educonnect serve
```

## Rota de teste

Todas as rotas vivem em `/api/v1/*`. Existe uma rota bem "crua" de teste, `/health`.

Utilizando o cURL (Linux, macOS, WSL):

```sh
# GET /api/v1/health
curl http://localhost:8080/api/v1/health
  -H "Accept: application/json"
```

No Windows, pelo PowerShell:

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/v1/health"
```
