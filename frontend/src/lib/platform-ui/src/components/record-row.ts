import { html, LitElement, css, customElement } from 'lit-element'
import { JSXProps } from '../types'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-record-row': JSXProps<RecordRow>
      'sp-record-row-label': JSXProps<RecordRowLabel>
    }
  }

  interface HTMLElementTagNameMap {
    'sp-record-row': RecordRow
    'sp-record-row-label': RecordRowLabel
  }
}

@customElement('sp-record-row')
export class RecordRow extends LitElement {
  static styles = css`
    #row {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
    }

    :host(:not(:last-child)) #row {
      margin-bottom: var(--sp-spacing-4);
    }

    sp-record-row-label {
      margin-right: var(--sp-spacing-8);
    }

    ::slotted(sp-lozenge) {
      /* Bit of a hack, but means lozenges nicely align with the label */
      margin-top: -2px;
    }
  `

  render() {
    return html`
      <div id="row">
        <sp-record-row-label><slot name="label"></slot></sp-record-row-label>
        <div id="value"><slot></slot></div>
      </div>
    `
  }
}

@customElement('sp-record-row-label')
export class RecordRowLabel extends LitElement {
  static styles = css`
    #label {
      width: 10rem;
      color: var(--sp-color-label-text);
      font-size: var(--sp-font-size);
      line-height: var(--sp-line-height);
    }
  `

  render() {
    return html`<div id="label"><slot></slot></div>`
  }
}
