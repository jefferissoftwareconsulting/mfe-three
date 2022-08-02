import { LitElement, css, html, customElement } from 'lit-element'
import { classMap } from 'lit-html/directives/class-map'
import { JSXProps } from '../types'
import { makeScopedTagName } from '../utils/lit-utils'

export const badge = makeScopedTagName('badge')

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [badge]: JSXProps<Badge, { content: string | number; limit?: number; theme?: Theme }>
    }
  }

  interface HTMLElementTagNameMap {
    [badge]: Badge
  }
}

enum BadgeTheme {
  subtle,
  primary,
  important
}

type Theme = keyof typeof BadgeTheme

@customElement(badge)
export class Badge extends LitElement {
  static styles = css`
    :host {
      min-width: 19px;
      height: 20px;
      align-items: center;
      display: inline-flex;
      justify-content: center;
      line-height: var(--sp-line-height);
      font-size: var(--sp-font-size-xs);
      font-weight: var(--sp-font-weight-normal);
      border-radius: 100px;
      background-color: var(--sp-color-neutral-250);
      color: var(--sp-color-neutral-750);
    }

    :host([theme='subtle']) {
      background-color: var(--sp-color-blue-100);
      color: var(--sp-color-blue-600);
    }

    :host([theme='primary']) {
      background-color: var(--sp-color-blue-600);
      color: var(--sp-color-white);
    }

    :host([theme='important']) {
      background-color: var(--sp-color-red-600);
      color: var(--sp-color-white);
    }

    .extra-wide {
      padding: 0 6px;
    }
  `
  static properties = {
    theme: { type: String, reflect: true },
    content: { type: String || Number, reflect: true },
    limit: { type: Number, reflect: true }
  }

  connectedCallback() {
    super.connectedCallback()

    if (this.limit) return

    if (typeof this.content === 'number' || this.isNumeric(this.content)) {
      this.limit = this.deafultNumberLimit
    } else {
      this.limit = this.deafultCharacterLimit
    }
  }

  limit = 0
  content = ''
  private deafultCharacterLimit = 5
  private deafultNumberLimit = 99

  private isNumeric(value: string) {
    return /^-?\d+$/.test(value)
  }

  private generateContent() {
    if (typeof this.content === 'number' || this.isNumeric(this.content)) {
      return parseInt(this.content) > this.limit ? `${this.limit}+` : this.content
    }

    return this.content.length > this.limit ? `${this.content.slice(0, this.limit)}...` : this.content
  }

  render() {
    return html`<span
      class=${classMap({
        'extra-wide': this.content.length > 1
      })}
      >${this.generateContent()}</span
    >`
  }
}
