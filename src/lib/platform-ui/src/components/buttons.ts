import { LitElement, customElement, css, html } from 'lit-element'
import { classMap } from 'lit-html/directives/class-map'
import { makeScopedTagName } from '../utils/lit-utils'
import type { JSXProps } from '../types'
import type { IconKey } from './icon'
import '../layout/flex'
import './loading'

export const BUTTON = makeScopedTagName('button')

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [BUTTON]: JSXProps<
        Button,
        {
          'button-type'?: ButtonTypes
          loading?: boolean
          compact?: boolean
          disabled?: boolean
          'leading-icon'?: IconKey
          'trailing-icon'?: IconKey
          'icon-size'?: string
        }
      >
      'sp-button-group': JSXProps<
        ButtonGroup,
        {
          compact?: boolean
        }
      >
    }
  }

  interface HTMLElementTagNameMap {
    [BUTTON]: Button
    'sp-button-group': ButtonGroup
  }
}

class ButtonEvent extends CustomEvent<never> {
  constructor(eventType: ButtonEventType) {
    super(`${BUTTON}-${eventType}`, { bubbles: true, composed: true })
  }
}

type ButtonEventType = 'click'

type ButtonTypes = 'primary' | 'secondary' | 'transparent' | 'transparent-primary'

@customElement(BUTTON)
export class Button extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    button {
      cursor: pointer;
      font-family: inherit;
      font-size: var(--sp-font-size);
      font-weight: var(--sp-font-weight-normal);
      line-height: var(--sp-line-height);
      color: var(--sp-color-neutral-750);
      background: transparent;
      position: relative;
      box-sizing: border-box;
      padding: var(--sp-spacing-2) var(--sp-spacing-4);
      border-width: var(--sp-spacing-px);
      border-right-width: var(--sp-border-r-width, var(--sp-spacing-px));
      border-style: solid;
      border-top-left-radius: var(--sp-button-l-radius, var(--sp-border-radius-medium));
      border-bottom-left-radius: var(--sp-button-l-radius, var(--sp-border-radius-medium));
      border-top-right-radius: var(--sp-button-r-radius, var(--sp-border-radius-medium));
      border-bottom-right-radius: var(--sp-button-r-radius, var(--sp-border-radius-medium));
      vertical-align: top;
    }

    :host(:empty):host([leading-icon]) button {
      padding-left: 6px;
      padding-right: 6px;
    }

    button:focus {
      outline: 0;
    }

    :host([compact]) button {
      padding: 6px var(--sp-spacing-3);
    }

    :host([compact]) button.transparent {
      padding: 6px var(--sp-spacing-2);
    }

    :host([leading-icon]) button {
      padding-left: var(--sp-spacing-2);
    }

    :host([trailing-icon]) button {
      padding-right: var(--sp-spacing-2);
    }

    :host([leading-icon]) button.transparent,
    :host([trailing-icon]) button.transparent {
      padding-left: var(--sp-spacing-2);
      padding-right: var(--sp-spacing-2);
    }

    button.primary {
      font-weight: var(--sp-font-weight-semibold);
      color: var(--sp-color-text-on-color);
      background-color: var(--sp-color-primary-600);
      border-color: var(--sp-color-primary-600);
    }

    button.primary:hover {
      background-color: var(--sp-color-primary-700);
      border-color: var(--sp-color-primary-700);
    }

    button.secondary {
      border-color: var(--sp-color-neutral-400);
    }

    button.secondary:hover {
      background-color: var(--sp-color-neutral-200);
    }

    button.transparent {
      border-color: transparent;
    }

    button.transparent:hover:not([disabled]) {
      background-color: var(--sp-color-neutral-200);
      border-color: var(--sp-color-neutral-200);
    }

    button.transparentPrimary {
      color: var(--sp-color-primary-600);
    }

    button.transparentPrimary:hover:not([disabled]) {
      background-color: unset;
      border-color: transparent;
      text-decoration: underline;
    }

    button[disabled].transparentPrimary {
      color: var(--sp-color-blue-200);
    }

    button[disabled] {
      color: var(--sp-color-neutral-550);
      cursor: default;
    }

    button[disabled]:not(.transparent) {
      background-color: var(--sp-color-neutral-250);
      border-color: var(--sp-color-neutral-250);
    }

    .loading .contents {
      visibility: hidden;
    }

    sp-loading-spinner {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .contents {
      align-items: center;
      display: flex;
      gap: var(--sp-spacing-2);
    }
  `

  static properties = {
    buttonType: { type: String, reflect: true, attribute: 'button-type', noAccessor: true },
    leadingIcon: { type: String, reflect: true, attribute: 'leading-icon' },
    trailingIcon: { type: String, reflect: true, attribute: 'trailing-icon' },
    iconSize: { type: String, attribute: 'icon-size' },
    loading: { type: Boolean, reflect: true },
    compact: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true }
  }

  buttonType: ButtonTypes = 'primary'
  leadingIcon?: IconKey
  trailingIcon?: IconKey
  iconSize? = 18
  loading = false
  compact = false
  disabled = false

  protected emit(eventType: ButtonEventType) {
    this.dispatchEvent(new ButtonEvent(eventType))
  }

  render() {
    return html`
      <button
        @click=${() => {
          if (!this.disabled) this.emit('click')
        }}
        type="button"
        ?disabled=${this.disabled}
        class=${classMap({
          primary: this.buttonType === 'primary' && !this.disabled,
          secondary: this.buttonType === 'secondary' && !this.disabled,
          transparent: this.buttonType === 'transparent' || this.buttonType === 'transparent-primary',
          transparentPrimary: this.buttonType === 'transparent-primary',
          compact: this.compact,
          loading: this.loading
        })}
      >
        <div class="contents">
          ${this.leadingIcon
            ? html`<sp-icon class="pre-icon" size=${this.iconSize} icon="${this.leadingIcon}"></sp-icon>`
            : null}
          <slot></slot>
          ${this.trailingIcon
            ? html`<sp-icon class="post-icon" size=${this.iconSize} icon="${this.trailingIcon}"></sp-icon>`
            : null}
        </div>

        ${this.loading ? html`<sp-loading-spinner size="18"></sp-loading-spinner>` : null}
      </button>
    `
  }
}

// TODO: a compact button group with primary buttons next to secondary buttons should use the primary button border - a grey border against the primary button looks weird
@customElement('sp-button-group')
export class ButtonGroup extends LitElement {
  static styles = css`
    sp-row {
      --sp-row-spacing: var(--sp-spacing-1);
    }

    sp-row.compact {
      --sp-row-spacing: 0;
    }

    .compact ::slotted(*:not(:first-child)) {
      --sp-button-l-radius: 0;
    }

    .compact ::slotted(*:not(:last-child)) {
      --sp-button-r-radius: 0;
      --sp-border-r-width: 0;
    }
  `

  static properties = {
    compact: { type: Boolean }
  }
  compact = false

  render() {
    return html`<sp-row class=${classMap({ compact: this.compact })}><slot></slot></sp-row>`
  }
}
