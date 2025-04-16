import {
  ActionRowBuilder,
  ButtonBuilder,
  StringSelectMenuBuilder,
  type APIActionRowComponent,
  type APIMessageActionRowComponent,
  type JSONEncodable,
  type MessageActionRowComponentBuilder,
} from "discord.js";

function createComponentRows(
  ...components: (MessageActionRowComponentBuilder | null | undefined)[]
): ActionRowBuilder<MessageActionRowComponentBuilder>[] {
  const rows: ActionRowBuilder<MessageActionRowComponentBuilder>[] = [];

  for (const component of components) {
    if (!component) continue;

    const row = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(component);
    rows.push(row);
  }

  return rows;
}

export function buildComponentRows(
  ...components: (MessageActionRowComponentBuilder | null | undefined)[]
): (
  | APIActionRowComponent<APIMessageActionRowComponent>
  | JSONEncodable<APIActionRowComponent<APIMessageActionRowComponent>>
)[] {
  return createComponentRows(...components).map(row => row.toJSON());
}
