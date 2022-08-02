import { css, customElement, html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { makeScopedTagName } from '../utils/lit-utils';
import type { JSXProps } from '../types';
import type { IconKey } from './icon';

export const avatar = makeScopedTagName('avatar');
export const avatarGroup = makeScopedTagName('avatar-group');

enum AvatarSize {
  tiny,
  small,
  medium,
  large,
}

enum AvatarTheme {
  solid,
  subtle,
  border,
}

type Size = keyof typeof AvatarSize;
type Theme = keyof typeof AvatarTheme;

interface AvatarProps {
  'is-placeholder-hidden'?: boolean;
  'has-outer-border'?: boolean;
  icon?: IconKey;
  'image-src'?: string;
  label: string;
  size?: Size;
  theme?: Theme;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [avatar]: JSXProps<Avatar, AvatarProps>;
      [avatarGroup]: JSXProps<AvatarGroup>;
    }
  }

  interface HTMLElementTagNameMap {
    [avatar]: Avatar;
    [avatarGroup]: AvatarGroup;
  }
}

@customElement(avatar)
export class Avatar extends LitElement {
  static styles = css`
    :host {
      border-radius: 50%;
      display: inline-flex;
      font-weight: var(--sp-font-weight-bold);
      letter-spacing: 0.05px;
      line-height: 1.334;
      position: relative;
    }

    :host([size='tiny']) {
      height: 1rem;
      width: 1rem;
      font-size: var(--sp-font-size-2xs);
    }

    :host([size='small']) {
      height: 1.5rem;
      width: 1.5rem;
      font-size: var(--sp-font-size-xs);
    }

    :host([size='medium']) {
      height: 2rem;
      width: 2rem;
      font-size: var(--sp-font-size-xs);
    }

    :host([size='large']) {
      height: 4rem;
      width: 4rem;
      font-size: var(--sp-font-size-heading-2xl);
    }

    :host([theme='solid']) {
      background-color: var(--sp-color-neutral-700);
      color: var(--sp-color-text-on-color);
    }

    :host([theme='subtle']) {
      background-color: var(--sp-color-neutral-350);
      color: var(--sp-color-neutral-750);
    }

    :host([theme='border']) {
      background-color: var(--sp-color-blue-100);
      color: var(--sp-color-blue-600);
    }

    :host([theme='border']):after {
      background-color: transparent;
      border: 1px dashed var(--sp-color-blue-600);
      border-radius: inherit;
      content: '';
      display: block;
      inset: 0;
      pointer-events: none;
      position: absolute;
    }

    :host(:hover):before {
      background-color: var(--sp-color-neutral-750);
      border-radius: inherit;
      content: '';
      display: block;
      inset: 0;
      opacity: 0.25;
      pointer-events: none;
      position: absolute;
    }

    :host([image-src]) {
      background-color: transparent;
    }

    :host([has-outer-border]) {
      border: 2px solid var(--sp-color-white);
    }

    :host([has-outer-border][size='tiny']) {
      border-width: 1px;
    }

    .wrapper {
      align-items: center;
      border-radius: inherit;
      display: flex;
      height: inherit;
      justify-content: center;
      overflow: hidden;
      width: inherit;
    }

    .wrapper img {
      display: inline-block;
      height: auto;
      max-width: 100%;
      vertical-align: middle;
    }

    .wrapper sp-tooltip {
      line-height: 0;
    }

    .icon {
      line-height: 0;
    }

    .overflow {
      // TODO: Popover for nested avatars - ENG-20071 https://skedulo.atlassian.net/browse/ENG-20071
    }

    .hidden {
      display: none;
    }
  `;

  static properties = {
    hasOuterBorder: {
      type: Boolean,
      attribute: 'has-outer-border',
      reflect: true,
    },
    icon: { type: String, attribute: 'icon', reflect: true },
    imageSrc: { type: String, attribute: 'image-src', reflect: true },
    isPlaceholderHidden: {
      type: Boolean,
      attribute: 'is-placeholder-hidden',
      reflect: true,
    },
    label: { type: String, attribute: 'label', reflect: true },
    size: { type: String, attribute: 'size', reflect: true },
    theme: { type: String, attribute: 'theme', reflect: true },
    slottedElementsCount: { type: Number, state: true },
  };

  hasOuterBorder = false;
  icon?: IconKey;
  imageSrc?: string;
  isPlaceholderHidden = false;
  label = '';
  size: Size = 'medium';
  theme: Theme = 'solid';
  private slottedElementsCount = 0;

  /**
   * Sets the count of slotted elements on slot change
   */
  private handleSlotChange({ target }: Event) {
    const children = (target as HTMLSlotElement)?.assignedElements({
      flatten: true,
    });
    this.slottedElementsCount = children.length;
  }

  /**
   * Transforms a name-like string into an abbreviation of maximum 2 characters.
   * Returns the first characters of the first two words for avatar sizes of
   * medium and above, otherwise only the first word is used.
   */
  private get abbreviatedLabel() {
    if (!this.label || this.isPlaceholderHidden) return '';

    const sizeEnum = AvatarSize[this.size];
    const maxLength = sizeEnum < AvatarSize.medium ? 1 : 2;

    return this.label
      .split(' ')
      .slice(0, maxLength)
      .map(segment => segment.charAt(0))
      .join('')
      .toUpperCase();
  }

  private get iconTemplate() {
    const sizeEnum = AvatarSize[this.size];

    const iconSize = () => {
      switch (sizeEnum) {
        case AvatarSize.large:
          return 20;

        case AvatarSize.medium:
        case AvatarSize.small:
          return 10;

        case AvatarSize.tiny:
          return 6.5;
      }
    };

    return html`
      <span class="icon" aria-label=${this.label}>
        <sp-icon size=${iconSize()} icon=${this.icon}></sp-icon>
      </span>
    `;
  }

  private get textTemplate() {
    return html`
      <span aria-label=${this.label}>
        ${this.slottedElementsCount
          ? `+${this.slottedElementsCount}`
          : this.abbreviatedLabel}
      </span>
    `;
  }

  private get imageTemplate() {
    return html`<img src=${this.imageSrc} alt=${this.label} />`;
  }

  private get slotTemplate() {
    return html`
      <div
        class=${classMap({
          overflow: true,
          hidden: true, // TODO: Update to !this.slottedElementsCount - ENG-20071 https://skedulo.atlassian.net/browse/ENG-20071
        })}
      >
        <slot @slotchange=${this.handleSlotChange} />
      </div>
    `;
  }

  private get avatarTemplate() {
    switch (true) {
      case !!this.imageSrc:
        return this.imageTemplate;

      case !!this.icon:
        return this.iconTemplate;

      default:
        return this.textTemplate;
    }
  }

  render() {
    return html`
      <div class="wrapper">
        <sp-tooltip is-fixed content=${this.label}
          >${this.avatarTemplate}</sp-tooltip
        >
      </div>
      ${this.slotTemplate}
    `;
  }
}

@customElement(avatarGroup)
export class AvatarGroup extends LitElement {
  static styles = css`
    :host {
      align-items: center;
      display: flex;
    }

    ::slotted(sp-avatar:not(:first-child)) {
      margin-left: -0.6em;
    }
  `;

  render() {
    return html`<slot />`;
  }
}
