import { IconKey } from './icon'
import { LitElement, customElement, css, html } from 'lit-element'
import { JSXProps } from '../types'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-lozenge': JSXProps<
        Lozenge,
        {
          color?: LozengeColors
          theme?: LozengeThemes
          size?: LozengeSizes
          'leading-icon'?: IconKey
          'can-delete'?: boolean
          disabled?: boolean
        }
      >
    }
  }

  interface HTMLElementTagNameMap {
    'sp-lozenge': Lozenge
  }
}

type LozengeColors = 'neutral' | 'green' | 'orange' | 'red' | 'cyan' | 'purple' | 'sapphire'
type LozengeThemes = 'solid' | 'subtle' | 'border'
type LozengeSizes = 'small' | 'medium' | 'large'

export class DeleteLozengeEvent extends CustomEvent<never> {
  constructor() {
    super('sp-lozenge-delete', { bubbles: true })
  }
}

@customElement('sp-lozenge')
export class Lozenge extends LitElement {
  static styles = css`
    :host {
      align-items: center;
      box-sizing: border-box;
      display: inline-flex;
      color: var(--sp-color-white);
      font-size: var(--sp-font-size-sm);
      line-height: var(--sp-line-height-sm);
    }

    :host .lozenge {
      align-items: center;
      box-sizing: border-box;
      display: inline-flex;
      padding-left: var(--sp-spacing-2);
      padding-right: var(--sp-spacing-2);
      border-radius: var(--sp-border-radius-default);
    }

    :host([color='green']) .lozenge {
      --primary: var(--sp-color-green-600);
      --muted: var(--sp-color-green-100);
    }

    :host([color='orange']) .lozenge {
      --primary: var(--sp-color-orange-600);
      --muted: var(--sp-color-orange-100);
    }

    :host([color='red']) .lozenge {
      --primary: var(--sp-color-red-600);
      --muted: var(--sp-color-red-100);
    }

    :host([color='cyan']) .lozenge {
      --primary: var(--sp-color-cyan-600);
      --muted: var(--sp-color-cyan-100);
    }

    :host([color='sapphire']) .lozenge {
      --primary: var(--sp-color-sapphire-600);
      --muted: var(--sp-color-sapphire-100);
    }

    :host([color='purple']) .lozenge {
      --primary: var(--sp-color-purple-600);
      --muted: var(--sp-color-purple-100);
    }

    :host([color='neutral']) .lozenge {
      --primary: var(--sp-color-neutral-750);
      --muted: var(--sp-color-neutral-250);
    }

    :host([can-delete]) .lozenge {
      --primary: var(--sp-color-neutral-750);
    }

    :host([theme='subtle']) .lozenge,
    :host([can-delete]) + :host([theme='subtle']) .lozenge {
      color: var(--primary);
      background-color: var(--muted);
    }

    :host([theme='subtle']) .lozenge .close {
      color: var(--sp-color-neutral-550);
    }

    :host([theme='subtle']) .lozenge .close:hover {
      color: var(--sp-color-neutral-700);
    }

    :host([theme='border']) .lozenge {
      border: 1px solid var(--primary);
      color: var(--primary);
    }

    :host([theme='solid']) .lozenge,
    :host([can-delete]) + :host([theme='solid']) .lozenge {
      background-color: var(--primary);
      color: var(--sp-color-white);
    }

    :host([theme='solid']):host(:not([disabled])) .lozenge .close {
      color: var(--sp-color-neutral-350);
    }

    :host([theme='solid']):host(:not([disabled])) .lozenge .close:hover {
      color: var(--sp-color-neutral-0);
    }

    :host([size='small']) .lozenge {
      padding-top: var(--sp-spacing-1);
      padding-bottom: var(--sp-spacing-1);
    }

    :host([size='medium']) .lozenge {
      /** TODO: the design uses spacing outside of the spacing tokens for this variant - speak to UX about standardising */
      padding-top: 6px;
      padding-bottom: 6px;
    }

    :host([size='large']) .lozenge {
      font-size: var(--sp-font-size);
      padding: var(--sp-spacing-2) var(--sp-spacing-3);
    }

    .message {
      vertical-align: center;
    }

    .leading {
      margin-right: var(--sp-spacing-2);
    }

    .close {
      display: inline-flex;
      margin-left: var(--sp-spacing-2);
      background: none;
      color: var(--sp-color-neutral-450);
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;
    }

    :host([disabled]) .lozenge {
      background-color: var(--sp-color-neutral-250);
      color: var(--sp-color-neutral-650);
    }

    :host(:not([disabled])).close:hover {
      color: var(--sp-color-white);
    }
  `

  static properties = {
    size: { type: String, attribute: 'size', reflect: true },
    theme: { type: String, attribute: 'theme', reflect: true },
    color: { type: String, attribute: 'color', reflect: true },
    leadingIcon: { type: String, attribute: 'leading-icon', reflect: true },
    canDelete: { type: Boolean, attribute: 'can-delete', reflect: true },
    disabled: { type: Boolean, attribute: 'disabled', reflect: true }
  }

  size: LozengeSizes = 'medium'
  theme: LozengeThemes = 'solid'
  color: LozengeColors = 'neutral'
  leadingIcon?: IconKey
  canDelete = false
  disabled = false

  private _handleDeleteClick(event: MouseEvent) {
    event.stopPropagation()
    this.dispatchEvent(new DeleteLozengeEvent())
  }

  render() {
    return html`<span class="lozenge"
      >${this.leadingIcon && html`<sp-icon class="leading" size="12" icon="${this.leadingIcon}"></sp-icon>`}
      <div class="message">
        <slot></slot>
      </div>

      ${this.canDelete
        ? html`<button
            class="close"
            ?disabled=${this.disabled}
            @click=${!this.disabled ? this._handleDeleteClick : null}
          >
            <sp-icon size="8" icon="remove"></sp-icon>
          </button>`
        : null}
    </span>`
  }
}
