import { LitElement, customElement, css } from 'lit-element'
import { html } from 'lit-html'
import './fade-in-out'
import '../components/buttons'

// Using a component to demonstrate the functionality because storybook's built-in controls
// unmount and mount the component which means the animation cannot be shown. Probably not
// an ideal way to solve the problem so investigate better solutions next time something
// like this is needed.
@customElement('sp-sb-fade-in-out')
class FadeInOutStory extends LitElement {
  static properties = {
    shown: { type: Boolean }
  }
  shown = false

  handleToggle() {
    this.shown = !this.shown
  }

  render() {
    return html`
      <sp-button button-type="primary" @click=${this.handleToggle}>Toggle!</sp-button>
      <div style="width: 200px; height: 200px; display: flex; justify-content: center; align-items: center;">
        <sp-fade-in-out ?shown=${this.shown}>
          <div style="padding: var(--sp-spacing-8); background-color: red; color: white; border-radius: 5px">
            Contents
          </div>
        </sp-fade-in-out>
      </div>
    `
  }
}

export const FadeInAndOut = () => html`<sp-sb-fade-in-out></sp-sb-fade-in-out>`

export default {
  title: 'Animation/Fade in and out'
}
