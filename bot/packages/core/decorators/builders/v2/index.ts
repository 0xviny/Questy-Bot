import 'reflect-metadata';
import {
  ButtonBuilder,
  SectionBuilder,
  TextDisplayBuilder,
  SeparatorBuilder,
  MediaGalleryBuilder,
  FileBuilder,
  StringSelectMenuBuilder,
  UserSelectMenuBuilder,
  RoleSelectMenuBuilder,
  MentionableSelectMenuBuilder,
  ChannelSelectMenuBuilder,
  ContainerBuilder
} from 'discord.js';

export const V2_FUNCS = Symbol('v2_funcs');
type V2Fn = (c: ContainerBuilder) => void;

function register(fn: V2Fn): MethodDecorator {
  return (target) => {
    const arr: V2Fn[] = Reflect.getMetadata(V2_FUNCS, target.constructor) || [];
    arr.push(fn);
    Reflect.defineMetadata(V2_FUNCS, arr, target.constructor);
  };
}

export function V2Message(): ClassDecorator {
  return () => {};
}

export function TextDisplay(opts: ConstructorParameters<typeof TextDisplayBuilder>[0]) {
  return register(c => c.addTextDisplayComponents(new TextDisplayBuilder(opts)));
}

export function Section(opts: ConstructorParameters<typeof SectionBuilder>[0]) {
  return register(c => c.addSectionComponents(new SectionBuilder(opts)));
}

export function Separator(opts: ConstructorParameters<typeof SeparatorBuilder>[0] = {}) {
  return register(c => c.addSeparatorComponents(new SeparatorBuilder(opts)));
}

export function MediaGallery(opts: ConstructorParameters<typeof MediaGalleryBuilder>[0]) {
  return register(c => c.addMediaGalleryComponents(new MediaGalleryBuilder(opts)));
}

export function File(opts: ConstructorParameters<typeof FileBuilder>[0]) {
  return register(c => c.addFileComponents(new FileBuilder(opts)));
}

export function Button(opts: ConstructorParameters<typeof ButtonBuilder>[0]) {
  return register(c =>
    c.addActionRowComponents(row => row.addComponents(new ButtonBuilder(opts)))
  );
}

export function StringSelect(opts: ConstructorParameters<typeof StringSelectMenuBuilder>[0]) {
  return register(c =>
    c.addActionRowComponents(row => row.addComponents(new StringSelectMenuBuilder(opts)))
  );
}

export function UserSelect(opts: ConstructorParameters<typeof UserSelectMenuBuilder>[0]) {
  return register(c =>
    c.addActionRowComponents(row => row.addComponents(new UserSelectMenuBuilder(opts)))
  );
}

export function RoleSelect(opts: ConstructorParameters<typeof RoleSelectMenuBuilder>[0]) {
  return register(c =>
    c.addActionRowComponents(row => row.addComponents(new RoleSelectMenuBuilder(opts)))
  );
}

export function MentionableSelect(opts: ConstructorParameters<typeof MentionableSelectMenuBuilder>[0]) {
  return register(c =>
    c.addActionRowComponents(row => row.addComponents(new MentionableSelectMenuBuilder(opts)))
  );
}

export function ChannelSelect(opts: ConstructorParameters<typeof ChannelSelectMenuBuilder>[0]) {
  return register(c =>
    c.addActionRowComponents(row => row.addComponents(new ChannelSelectMenuBuilder(opts)))
  );
}
