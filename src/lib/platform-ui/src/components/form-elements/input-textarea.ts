import { IInputTextBaseAttributes, InputTextBase } from './input-text-base'
import { ifDefined } from 'lit-html/directives/if-defined'
import { html, customElement, css } from 'lit-element'
import { JSXProps } from '../../types'
import { InputSizes } from './labeled-input'
import { BaseInputChangeEventPayload, InputChangeEvent } from './input-base'

export type TextareaChangeEvent = InputChangeEvent<BaseInputChangeEventPayload<string>>

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-input-textarea': JSXProps<InputTextarea, IInputTextareaAttributes>
    }
  }

  interface HTMLElementTagNameMap {
    'sp-input-textarea': InputTextarea
  }
}

interface IInputTextareaAttributes extends IInputTextBaseAttributes<string> {
  maxlength?: number
}

@customElement('sp-input-textarea')
export class InputTextarea extends InputTextBase<string> {
  static styles = [
    ...InputTextBase.styles,
    css`
      textarea {
        height: 100px;
        resize: none;
      }
    `
  ]

  static properties = {
    ...InputTextBase.properties,
    value: { type: String },
    maxlength: { type: Number, reflect: true, attribute: 'maxlength' }
  }

  size: InputSizes = 'x-large'
  maxlength?: number

  renderGuide() {
    if (!this.maxlength) return null

    const length = this.value?.length || 0

    const template = html`${length} of ${this.maxlength}`

    return length >= this.maxlength
      ? html`<sp-input-error>${template}</sp-input-error>`
      : html`<sp-input-guide>${template}</sp-input-guide>`
  }

  renderInput() {
    return html`
      <textarea
        @input=${this.onInput}
        .value=${this.value ?? ''}
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
