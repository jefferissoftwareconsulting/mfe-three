import { customElement, LitElement, html } from 'lit-element'
import { JSXProps } from '../types'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-confirmation-dialog': JSXProps<ConfirmationDialog, IConfirmationDialogAttributes>
    }
  }

  interface HTMLElementTagNameMap {
    'sp-confirmation-dialog': ConfirmationDialog
  }
}

export class ConfirmationDialogCancel extends CustomEvent<never> {
  constructor() {
    super('sp-dialog-cancel', { bubbles: true })
  }
}
export class ConfirmationDialogConfirm extends CustomEvent<never> {
  constructor() {
    super('sp-dialog-confirm', { bubbles: true })
  }
}

interface IConfirmationDialogAttributes {
  open: boolean
}

@customElement('sp-confirmation-dialog')
export class ConfirmationDialog extends LitElement {
  static properties = {
    open: { type: Boolean }
  }
  open = false

  private handleCancel() {
    this.dispatchEvent(new ConfirmationDialogCancel())
  }

  private handleConfirm() {
    this.dispatchEvent(new ConfirmationDialogConfirm())
  }

  render() {
    return html`<sp-modal size="small" ?open=${this.open} noClose>
      <sp-modal-body>
        <slot name="body"></slot>
      </sp-modal-body>
      <sp-modal-footer>
        <sp-button-group slot="right">
          <sp-button @click=${this.handleCancel} button-type="transparent">Cancel</sp-button>
          <sp-button @click=${this.handleConfirm} button-type="primary">
            <slot name="confirmLabel"></slot>
          </sp-button>
        </sp-button-group>
      </sp-modal-footer>
    </sp-modal>`
  }
}
