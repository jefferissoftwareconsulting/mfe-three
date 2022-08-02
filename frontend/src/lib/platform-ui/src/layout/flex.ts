import { LitElement, html, customElement, css } from 'lit-element'
import { JSXProps, SizeProperty } from '../types'

declare module 'csstype' {
  interface Properties {
    '--sp-row-spacing'?: SizeProperty
    '--sp-column-spacing'?: SizeProperty
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-row': JSXProps<Row, { 'vertical-align'?: 'top' | 'middle' | 'bottom' }>
      'sp-column': JSXProps<Column, { align?: 'left' | 'center' | 'right' }>
    }
  }

  interface HTMLElementTagNameMap {
    'sp-row': Row
    'sp-column': Column
  }
}

@customElement('sp-row')
export class Row extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      column-gap: var(--sp-row-spacing, var(--sp-spacing-4));
    }

    :host([vertical-align='top']) {
      align-items: flex-start;
    }

    :host([vertical-align='middle']) {
      align-items: center;
    }

    :host([vertical-align='bottom']) {
      align-items: flex-end;
    }
  `

  static properties = {
    verticalAlign: { type: String, attribute: 'vertical-align', reflect: true }
  }
  verticalAlign: 'top' | 'middle' | 'bottom' = 'top'

  render() {
    return html`<slot></slot>`
  }
}

@customElement('sp-column')
export class Column extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      row-gap: var(--sp-column-spacing, var(--sp-spacing-4));
    }

    :host([align='left']) {
      align-items: flex-start;
    }

    :host([align='center']) {
      align-items: center;
    }

    :host([align='right']) {
      align-items: flex-end;
    }
  `

  static properties = {
    align: { type: String }
  }
  align: 'left' | 'center' | 'right' = 'left'

  render() {
    return html`<slot></slot>`
  }
}
