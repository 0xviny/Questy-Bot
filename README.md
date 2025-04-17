# Questy Bot - Structured Bot for Discord

Este projeto é uma aplicação profissional de bot para Discord, construída com TypeScript e [discord.js](https://discord.js.org/). A arquitetura está dividida em duas packages principais:

- **core**: Contém toda a infraestrutura do back-end, com decorators, handlers, conexão com MongoDB, utilitários e abstrações de Builders do discord.js (ex.: Embed, Button, SelectMenu, Modal, TextInput, etc).
- **bot**: Responsável pela integração com o Discord (comandos, eventos, interações) e utiliza a package core para registrar e executar as funcionalidades.

Esta organização torna o projeto altamente modular, testável, escalável e de fácil manutenção. Além disso, a utilização de abstrações de builders e wrappers funcionais contribui para um código mais limpo, em linha com práticas modernas como Object Calisthenics.

## Por Que Essa Arquitetura?

- **Organização Modular:**  
  Separa o código de infraestrutura (core) da lógica de aplicação (bot). Dessa forma, as funcionalidades transversais (como logging, conexão com o banco ou criação de componentes) ficam centralizadas e podem ser reutilizadas em diversas partes do projeto.
  
- **Facilidade de Manutenção e Escalabilidade:**  
  - **Core**: Centraliza os decorators, handlers e conexões com serviços (ex.: MongoDB).  
  - **Bot**: Cuida exclusivamente da integração com a API do Discord, permitindo o desenvolvimento de comandos, eventos e interações de maneira organizada.
  
- **Abstrações com Builders:**  
  Decorators para os Builders (por exemplo, `@EmbedConstructor`, `@ButtonConstructor`, `@SelectMenuConstructor`, `@ModalConstructor` e `@TextInputConstructor`) permitem a criação de componentes de UI do Discord de forma declarativa, centralizada e reutilizável.
  
- **Performance e Eficiência:**  
  - A separação de responsabilidades melhora a legibilidade e facilita o desenvolvimento de testes unitários.  
  - A injeção de comportamentos (por exemplo, wrappers funcionais para operações de usuário) garante que operações comuns (como logging ou tratamento de erros) sejam realizadas de forma consistente e com overhead mínimo.
  
- **Suporte a Object Calisthenics:**  
  O projeto adota padrões para um código mais modular e orientado a objetos, limitando complexidade e incentivando uma estrutura limpa (ex.: funções puras, poucas declarações por linha, sem utilização excessiva de condicionais, etc).

## Estrutura de Diretórios

```txt
/my-discord-bot
├─ package.json
├─ tsconfig.json
├─ .env
├─ packages
│  ├─ core
│  │  ├─ decorators
│  │  │  ├─ builders
│  │  │  │  ├─ BuilderConstructor.ts
│  │  │  │  ├─ EmbedBuilder.ts
│  │  │  │  ├─ ButtonBuilder.ts
│  │  │  │  ├─ StringSelectMenuBuilder.ts
│  │  │  │  ├─ UserSelectMenuBuilder.ts
│  │  │  │  ├─ RoleSelectMenuBuilder.ts
│  │  │  │  ├─ MentionableSelectMenuBuilder.ts
│  │  │  │  ├─ ModalBuilder.ts
│  │  │  │  └─ TextInputBuilder.ts
│  │  │  └─ index.ts              # Agrupa os builders
│  │  |  ├─ Button.ts
│  │  |  ├─ Embed.ts
│  │  |  ├─ Modal.ts
│  │  |  ├─ SelectMenu.ts
│  │  |  ├─ Command.ts
│  │  |  ├─ Event.ts
│  │  ├─ database
│  │  │  ├─ models
│  │  │  │  └─ User.ts
│  │  │  ├─ Database.ts
│  │  │  ├─ UserController.ts     # Ex.: userController.create(discordId, username)
│  │  │  ├─ UserService.ts
│  │  │  └─ userOperationWrapper.ts
│  │  ├─ handlers
│  │  │  ├─ CommandHandler.ts
│  │  │  ├─ EventHandler.ts
│  │  │  └─ InteractionHandler.ts
│  │  └─ utils
│  │     └─ Logger.ts
│  └─ bot
│     ├─ config.ts
│     ├─ DiscordBot.ts
│     ├─ commands
│     │  └─ PingCommand.ts
│     ├─ events
│     │  └─ ReadyEvent.ts
│     └─ interactions
│        └─ ExampleButton.ts
└─ index.ts                        # Bootstrap: conecta ao MongoDB e inicia o bot
```

## Configuração do Ambiente

1. Crie um arquivo `.env` na raiz do projeto e defina:
   ```env
   DISCORD_TOKEN=seu_token_do_discord
   MONGO_URI=seu_uri_mongodb
   ```

2. Instale as dependências:
   ```bash
   bun install
   ```

## Scripts do Projeto

- **Build:** `bun run build`  
- **Desenvolvimento:** `bun run dev` // utilizando nodemon para detectar alterações em arquivos .ts e reiniciar o bot automaticamente
- **Start:** `bun run start`

## Como Usar o Core

A package **core** contém:

- **Decorators de Builders:**  
  Permitem criar componentes do discord.js de forma declarativa:
  ```ts
  import { EmbedConstructor, ButtonConstructor, ModalConstructor, TextInputConstructor } from "@core/decorators/builders";

  class MyUI {
    @EmbedConstructor({ title: "Bem-vindo", description: "Mensagem de boas-vindas", color: 0x00ff00 })
    static welcomeEmbed!: EmbedBuilder;

    @ButtonConstructor({ label: "Clique aqui", custom_id: "btn_click", style: 1 })
    static welcomeButton!: ButtonBuilder;

    @ModalConstructor({ custom_id: "modal_test", title: "Teste Modal" })
    static testModal!: ModalBuilder;

    @TextInputConstructor({
      custom_id: "input_nome",
      label: "Seu nome",
      placeholder: "Digite seu nome",
      style: 1
    })
    static nomeInput!: TextInputBuilder;
  }
  ```
- **Handlers:**  
  - **CommandHandler.ts:** Faz o scan e registro automático de comandos com `@Command`.
  - **EventHandler.ts:** Registra eventos do Discord com `@Event`.
  - **InteractionHandler.ts:** Registra interações (botões, select menus, modals) usando os builders.

- **Database:**  
  - **Database.ts:** Conecta ao MongoDB usando [Mongoose](https://mongoosejs.com/).
  - **UserDecorators.ts ou HOFs:** Para operações comuns no usuário. Se os decorators de método causarem problemas, utilize higher order functions, como ilustrado no arquivo `userOperationWrapper.ts`.

- **Utilitários:**  
  - **Logger.ts:** Para um logging padronizado e centralizado.

## Como Usar o Bot

A package **bot** utiliza o core e contém:
- **DiscordBot.ts:** Classe principal que instancia o client do Discord, registra os handlers e inicializa o bot.
- **commands/**, **events/** e **interactions/**: Conjuntos de recursos que serão automaticamente carregados pelo sistema de handlers.

Exemplo de um comando simples:
```ts
// packages/bot/commands/PingCommand.ts
import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "@core/decorators/Command";
import { ICommand } from "@core/handlers/CommandHandler";

@Command({
  name: "ping",
  description: "Responde com Pong!",
  aliases: ["p"]
})
export default class PingCommand implements ICommand {
  public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply("Pong!");
  }
}
```

## Bootstrap da Aplicação

No arquivo `index.ts` na raiz, conectamos ao MongoDB e inicializamos o bot:
```ts
import "reflect-metadata";
import { config } from "dotenv";
import { DiscordBot } from "@bot/DiscordBot";
import { Database } from "@core/database/Database";
import { Logger } from "@core/utils/Logger";

config();

(async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    Logger.error("MONGO_URI não definido no .env");
    process.exit(1);
  }

  const database = new Database(mongoUri);
  await database.connect();

  const bot = new DiscordBot();
  await bot.init();
  bot.start();
})();
```

## Benefícios da Abordagem

- **Desempenho Otimizado:**  
  A separação entre *core* e *bot* permite isolar funcionalidades, facilitando otimizações e o uso de operações assíncronas (como conexão com o MongoDB e processamento de interações) sem afetar todo o sistema.
  
- **Fácil Manutenção e Escalabilidade:**  
  Cada módulo possui responsabilidade única, facilitando a localização de bugs, adição de novos recursos ou a refatoração de partes específicas sem impacto global.

- **Código Limpo e Testável:**  
  A utilização de decorators, higher order functions e a separação modular alinham o projeto às práticas de Object Calisthenics, incentivando código mais simples, legível e isolado para testes unitários.

- **Flexibilidade para o Futuro:**  
  Ao abstrair componentes comuns (como Builders do discord.js) em uma camada reutilizável, novas features ou mudanças na API do discord.js podem ser gerenciadas centralmente, sem a necessidade de alterações em cada comando ou evento.

## Conclusão

Esta arquitetura modular permite o desenvolvimento de um bot robusto para o Discord, com alto desempenho e manutenibilidade. Aproveite o poder dos decorators, higher order functions e uma separação de responsabilidades bem definida para construir soluções escaláveis e profissionais.

---

Sinta-se à vontade para adaptar ou expandir este template conforme suas necessidades e evoluir o projeto com novas features e integrações.

Happy coding!