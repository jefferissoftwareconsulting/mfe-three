import { css, customElement, html, LitElement } from 'lit-element'
import { makeScopedTagName } from '../utils/lit-utils'
import { JSXProps } from './../types'

interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error'
  clearable?: boolean
  title?: string
}

export const ALERT = makeScopedTagName('alert')

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [ALERT]: JSXProps<Alert, AlertProps>
    }
  }

  interface HTMLElementTagNameMap {
    [ALERT]: Alert
  }
}

class AlertEvent extends CustomEvent<never> {
  constructor(eventType: AlertEventType) {
    super(`${ALERT}-${eventType}`, { bubbles: true, composed: true })
  }
}

type AlertEventType = 'cleared'

@customElement(ALERT)
export class Alert extends LitElement {
  static properties = {
    type: {
      type: String,
      reflect: true
    },
    title: {
      type: String
    },
    clearable: {
      type: Boolean
    },
    cleared: {
      type: Boolean,
      attribute: false
    }
  }

  type = 'info'
  clearable = false
  title = ''
  cleared = false

  static styles = css`
    .alert-container {
      align-items: center;
      display: flex;
      border: 1px solid;
      border-radius: var(--sp-border-radius-medium);
      padding: 11px 13px;
    }

    :host([type='info']) .alert-container {
      border-color: var(--sp-color-blue-400);
      background-color: var(--sp-color-blue-100);
    }

    :host([type='info']) .type-icon {
      color: var(--sp-color-blue-600);
    }

    :host([type='success']) .alert-container {
      border-color: var(--sp-color-green-400);
      background-color: var(--sp-color-green-100);
    }

    :host([type='success']) .type-icon {
      color: var(--sp-color-green-600);
    }

    :host([type='warning']) .alert-container {
      border-color: var(--sp-color-orange-400);
      background-color: var(--sp-color-orange-100);
    }

    :host([type='warning']) .type-icon {
      color: var(--sp-color-orange-600);
    }

    :host([type='error']) .alert-container {
      border-color: var(--sp-color-red-400);
      background-color: var(--sp-color-red-100);
    }

    :host([type='error']) .type-icon {
      color: var(--sp-color-red-600);
    }

    .type-icon {
      align-self: flex-start;
      margin-right: 13px;
      padding-top: 1px;
    }

    .clear-button {
      align-self: start;
      background: none;
      border: 0;
      cursor: pointer;
      color: var(--sp-color-neutral-750);
      margin-left: auto;
      padding: 0;
      padding-top: 1px;
    }

    .clear-button sp-icon {
      vertical-align: middle;
    }
  `

  getIcon() {
    switch (this.type) {
      case 'success':
        return 'tickFill'
      case 'warning':
      case 'error':
        return 'exclamationFill'
      default:
        return 'infoFill'
    }
  }

  clear() {
    this.cleared = true
    this.dispatchEvent(new AlertEvent('cleared'))
  }

  render() {
    return !this.cleared
      ? html`<div class="alert-container">
          <sp-icon class="type-icon" icon="${this.getIcon()}"></sp-icon>
          <div role="alert">
            ${this.title ? html`<div><sp-heading>${this.title}</sp-heading></div>` : html``}
            <div><slot /></div>
          </div>
          ${this.clearable
            ? html`<button class="clear-button" @click=${this.clear}>
                <sp-icon class="close-icon" size="10" icon="close"></sp-icon>
              </button>`
            : ''}
        </div>`
      : null
  }
}
