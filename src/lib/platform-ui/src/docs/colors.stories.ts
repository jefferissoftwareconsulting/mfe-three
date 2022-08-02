import { LitElement, customElement, property, css } from 'lit-element'
import { html } from 'lit-html'

/**
 * Story component to render a colour swatch.
 * Will extract the hex code from a supplied color var and use it as the background.
 */
@customElement('sp-sb-color-swatch')
class ColorSwatch extends LitElement {
  @property({ type: String })
  colorVar = ''

  @property({ type: Boolean, attribute: 'light-text' })
  lightText = false

  static styles = css`
    :host {
      border: 1px solid var(--sp-color-neutral-300);
      border-bottom-left-radius: var(--sp-border-radius-medium);
      display: inline-block;
      width: 300px;
      font-family: monospace;
      text-align: center;
    }

    :host([light-text]) {
      color: var(--sp-color-text-on-color);
    }

    .label {
      padding: var(--sp-spacing-2) 0;
    }

    .label > div {
      padding: var(--sp-spacing-1);
    }
  `

  render() {
    if (!this.shadowRoot) return null
    const hexCode = getComputedStyle(this.shadowRoot?.host).getPropertyValue(this.colorVar)

    return html` <section class="label" style="background-color: var(${this.colorVar})">
      <div>${this.colorVar}</div>
      <div>${hexCode}</div>
    </section>`
  }
}

/**
 * Story component for laying out a group of swatches
 */
@customElement('sp-sb-color-swatch-group')
class ColorSwatchGroup extends LitElement {
  @property({ type: Boolean })
  stacked = false

  static styles = css`
    :host {
      display: flex;
      flex-wrap: wrap;
      gap: var(--sp-spacing-5);
    }

    :host([stacked]) {
      width: 300px;
      gap: 0;
      margin-bottom: 20px;
    }
  `

  render() {
    return html`<slot></slot>`
  }
}
