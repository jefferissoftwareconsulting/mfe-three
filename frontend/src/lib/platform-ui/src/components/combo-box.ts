import { LitElement, customElement, css, html } from 'lit-element'
import { JSXProps } from '../types'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-combo-box': JSXProps<
        ComboBox,
        {
          'is-open'?: boolean
        }
      >
      'sp-combo-box-option': JSXProps<ComboBoxOption>
    }
  }

  interface HTMLElementTagNameMap {
    'sp-combo-box': ComboBox
    'sp-combo-box-option': ComboBoxOption
  }
}

@customElement('sp-combo-box')
export class ComboBox extends LitElement {
  static styles = css`
    .container {
      position: relative;
      display: inline-block;
    }

    .dropdown {
      display: none;
      position: absolute;
      margin-top: var(--sp-spacing-1);
      min-width: 144.4px;
      max-height: 232px;
      overflow-y: auto;
      box-shadow: var(--sp-box-shadow-menu);
      border: var(--sp-border-divider);
      border-radius: var(--sp-border-radius-medium);
      background-color: var(--sp-color-neutral-0);
      z-index: 1;
    }

    .container.open .dropdown {
      display: block;
    }
  `
  connectedCallback() {
    super.connectedCallback()
    document.addEventListener('click', this.outsideClick)
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.outsideClick)
    super.disconnectedCallback()
  }
  static properties = { isOpen: { type: Boolean, attribute: 'is-open', reflect: true } }

  isOpen = false

  private toggleMenu = (e: Event) => {
    this.isOpen = !this.isOpen
    e.stopPropagation()
  }

  private outsideClick = () => {
    this.isOpen = false
  }

  render() {
    /* eslint-disable lit-a11y/click-events-have-key-events -- Keyboard events are handled by a slotted button */
    return html`
      <div class="container ${this.isOpen ? 'open' : ''}">
        <div @click="${this.toggleMenu}"><slot></slot></div>
        <div class="dropdown"><slot name="options"></slot></div>
      </div>
    `
  }
}

@customElement('sp-combo-box-option')
export class ComboBoxOption extends LitElement {
  static styles = css`
    .item {
      height: 20px;
      cursor: pointer;
      font-size: var(--sp-font-size);
      color: var(--sp-color-text);
      text-decoration: none;
      display: block;
      margin: 6px 0;
      padding: 6px 5px 6px 11px;
    }

    .item:hover {
      background-color: var(--sp-color-neutral-250);
    }
  `
  render() {
    return html` <div class="item"><slot></slot></div> `
  }
}
