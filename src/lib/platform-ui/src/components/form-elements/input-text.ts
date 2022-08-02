import { BaseInputChangeEventPayload, InputChangeEvent } from './input-base'
import { IInputTextBaseAttributes, InputTextBase } from './input-text-base'
import { ifDefined } from 'lit-html/directives/if-defined'
import { html, customElement, css } from 'lit-element'
import { JSXProps } from '../../types'
import { InputSizes } from './labeled-input'

export type TextChangeEvent = InputChangeEvent<BaseInputChangeEventPayload<string>>

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-input-text': JSXProps<InputText, IInputTextAttributes>
    }
  }

  interface HTMLElementTagNameMap {
    'sp-input-text': InputText
  }
}

interface IInputTextAttributes extends IInputTextBaseAttributes<string> {
  maxlength?: number
}

@customElement('sp-input-text')
export class InputText extends InputTextBase<string> {
  static styles = [
    ...InputTextBase.styles,
    css`
      input {
        height: 36px;
      }
    `
  ]

  static properties = {
    ...InputTextBase.properties,
    value: { type: String },
    maxlength: { type: Number, reflect: true }
  }

  size: InputSizes = 'medium'
  maxlength?: number

  renderInput() {
    return html`
      <input
        @input=${this.onInput}
        .value=${ifDefined(this.value)}
        id=${this.id}
        type="text"
        placeholder=${ifDefined(this.placeholder)}
        aria-invalid=${ifDefined(this.invalid ? this.invalid : undefined)}
        maxlength=${ifDefined(this.maxlength)}
        ?readonly=${this.readonly}
      />
    `
  }
}
