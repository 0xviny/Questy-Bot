# Questy Structure

Uma **estrutura de bot para Discord** escrita em TypeScript, baseada em `discord.js`, com arquitetura dividida em duas packages:

- **core**: infraestrutura e abstrações (decorators, handlers, conexão com MongoDB, utilitários, builders personalizados).  
- **bot**: definição de comandos, eventos e interações, consumindo tudo do `core`.

Essa separação torna o código **limpo**, **testável**, **reutilizável** e **fácil de escalar**.

---

## 📋 Sumário

1. [Principais Recursos](#-principais-recursos)  
2. [Arquitetura](#-arquitetura)  
3. [Estrutura de Diretórios](#-estrutura-de-diretórios)  
4. [Instalação](#-instalação)  
5. [Configuração](#-configuração)  
6. [Uso](#-uso)  
   - [Comando Ping (v1)](#comando-ping-v1)  
   - [Comando Test (V2 Components)](#comando-test-v2-components)  
   - [Evento Ready](#evento-ready)  
   - [Handler de Botão](#handler-de-botão)  
7. [Como Contribuir](#-como-contribuir)  
8. [Licença](#-licença)

---

## ✨ Principais Recursos

- **Decorators** para comandos, eventos e components (v1 e V2)  
- **Builders customizados** (Embed, Button, SelectMenu, Modal, TextInput, V2 Components)  
- **Handlers automáticos**: scan de diretórios e registro de comandos/eventos/interações  
- **MongoDB** integrado via Mongoose  
- Organização **core** / **bot** para máxima reutilização  
- Suporte a **Object Calisthenics** e clean code  

---

## 🏗️ Arquitetura

1. **core**  
   - `decorators/`: marcações para comandos (`@Command`), eventos (`@Event`), components (`@EmbedConstructor`, `@ButtonConstructor`, `@TextInputConstructor`, V2 etc.)  
   - `handlers/`: scan e registro automático de comandos, eventos e interações  
   - `database/`: conexão e models Mongoose  
   - `utils/`: Logger, wrappers de operações comuns  

2. **bot**  
   - `commands/`: classes de comando que usam os decorators do core  
   - `events/`: classes de evento (ready, messageCreate etc.)  
   - `interactions/`: handlers de interações (botões, selects, modais)  

---

## 📂 Estrutura de Diretórios

```text
/my-discord-bot
├─ packages
│  ├─ core
│  │  ├─ decorators
│  │  │  ├─ builders
│  │  │  │  ├─ EmbedBuilder.ts
│  │  │  │  ├─ ButtonBuilder.ts
│  │  │  │  ├─ TextInputBuilder.ts
│  │  │  │  └─ v2/
│  │  │  │     ├─ BuilderConstructorV2.ts
│  │  │  │     ├─ TextDisplayBuilder.ts
│  │  │  │     └─ …  
│  │  │  ├─ Command.ts
│  │  │  ├─ Event.ts
│  │  │  └─ index.ts
│  │  ├─ handlers
│  │  │  ├─ CommandHandler.ts
│  │  │  ├─ EventHandler.ts
│  │  │  └─ InteractionHandler.ts
│  │  ├─ database
│  │  │  ├─ Database.ts
│  │  │  └─ models/User.ts
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
│        └─ ButtonInteractionHandler.ts
├─ package.json
├─ tsconfig.json
├─ .env
└─ index.ts           # Bootstrap principal
```

---

## ⚙️ Instalação

1. Clone o repositório:  
   ```bash
   git clone https://github.com/seu-usuario/questy-bot.git
   cd questy-bot
   ```
2. Instale dependências (Bun/Yarn/NPM):  
   ```bash
   bun install
   # ou
   yarn
   # ou
   npm install
   ```

---

## 🔧 Configuração

Crie um arquivo `.env` na raiz, com:

```env
DISCORD_TOKEN=seu_token_do_discord
MONGO_URI=seu_uri_do_mongodb
```

---

## 🚀 Uso

### Comando Ping (comando normal)

```ts
// packages/bot/commands/PingCommand.ts
import { ButtonBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { Command } from "@core/decorators/Command";
import type { ICommand } from "@core/handlers/CommandHandler";
import { EmbedConstructor } from "@core/decorators/builders/EmbedBuilder";
import { ButtonConstructor } from "@core/decorators/builders/ButtonBuilder";
import { buildComponentRows } from "@core/handlers/ComponentHandler";

@Command({
  name: "ping",
  description: "Responde com Pong!",
  aliases: ["p"]
})
export default class PingCommand implements ICommand {
  @EmbedConstructor({
    title: "🏓 Pong!",
    description: "Resposta via embed",
    color: 0x00ff00
  })
  embed!: EmbedBuilder;

  @ButtonConstructor({
    label: "Clique aqui!",
    custom_id: "btn_click",
    style: 1
  })
  button!: ButtonBuilder;

  public async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply({
      embeds: [this.embed],
      components: buildComponentRows(this.button)
    });
  }
}
```

### Comando Test (com V2 Components)

```ts
// packages/bot/commands/TestCommand.ts
import { Command } from "@core/decorators/Command";
import type { ICommand } from "@core/handlers/CommandHandler";
import {
  V2Message,
  TextDisplay,
  Separator,
  Button,
  StringSelect,
  UserSelect,
  RoleSelect,
  MentionableSelect,
  ChannelSelect
} from "@core/decorators/builders/v2";
import type { ChatInputCommandInteraction } from "discord.js";
import { responseV2 } from "@core/responses/v2";

@V2Message()
@Command({ name: "test", description: "Teste V2 com vários componentes" })
export default class TestCommand implements ICommand {
  @TextDisplay({ content: "🚀 Hello V2!" })
  @Separator()
  @Button({ customId: "btn_ok", label: "👍 OK", style: 1 })
  @StringSelect({
    customId: "sel_str",
    options: [
      { label: "One", value: "1" },
      { label: "Two", value: "2" }
    ]
  })
  @UserSelect({ customId: "sel_user" })
  @RoleSelect({ customId: "sel_role" })
  @MentionableSelect({ customId: "sel_mention" })
  @ChannelSelect({ customId: "sel_channel" })
  public async execute(interaction: ChatInputCommandInteraction) {
    await responseV2(this.constructor, interaction, "Aqui está o layout V2 completo!");
  }
}
```

### Evento Ready

```ts
// packages/bot/events/ReadyEvent.ts
import { Client } from "discord.js";
import { Event } from "@core/decorators/Event";
import type { IEvent } from "@core/handlers/EventHandler";
import { Logger } from "@core/utils/Logger";

@Event({ eventName: "ready", once: true })
export default class ReadyEvent implements IEvent {
  public async execute(client: Client): Promise<void> {
    Logger.info(`Bot online como ${client.user?.tag}`);
  }
}
```

### Handler de Botão

```ts
// packages/bot/interactions/ButtonInteractionHandler.ts
import { ButtonInteraction, MessageFlags } from "discord.js";
import { Button } from "@core/decorators/builders/ButtonBuilder";
import type { IComponentInteraction } from "@core/handlers/InteractionHandler";

@Button({ customId: "btn_click" })
export default class ButtonInteractionHandler implements IComponentInteraction {
  public async execute(interaction: ButtonInteraction): Promise<void> {
    await interaction.reply({
      content: "Você clicou no botão! 🎉",
      flags: MessageFlags.Ephemeral
    });
  }
}
```

---

## 🤝 Como Contribuir

1. Fork este repositório  
2. Crie uma branch `feature/nome-da-feature`  
3. Implemente sua feature e escreva testes  
4. Abra um Pull Request  
5. Siga as guidelines de estilo e mantenha o core separado conforme a arquitetura  

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.  