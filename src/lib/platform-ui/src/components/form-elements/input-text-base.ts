import { css, html } from 'lit-element'
import { LabeledInput, ILabeledInputAttributes } from './labeled-input'
import type { IconKey } from '../icon'

const inputTextBaseStyles = css`
  :host {
    --input-text-color: var(--sp-color-neutral-850);
    --input-font: var(--sp-font-family);
    --input-font-size: var(--sp-font-size);
    --input-placeholder-font-color: var(--sp-color-text-placeholder);
    --input-border: solid 1px var(--sp-color-neutral-450);
    --input-border-radius: var(--sp-border-radius-default);
    --input-padding: var(--sp-spacing-2);
    --input-readonly-border: none;
    --input-readonly-background-color: var(--sp-color-neutral-250);
    --input-invalid-border-color: var(--sp-color-error);
    --input-focus-border-color: var(--sp-color-primary-600);
    --input-hover-border-color: var(--sp-sp-color-neutral-500);

    /** 18px for icon itself, 2*spacing-2 for standard input padding around the icon **/
    --input-icon-offset: calc(18px + (2 * var(--input-padding)));
  }

  input,
  textarea {
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
    padding: var(--input-padding);
    border: var(--input-border);
    border-radius: var(--input-border-radius);
    font-size: var(--input-font-size);
    font-family: var(--input-font);
    color: var(--input-text-color);
  }

  input::placeholder,
  input[readonly]::placeholder,
  textarea::placeholder,
  textarea[readonly]::placeholder {
    color: var(--input-placeholder-font-color);
  }

  input[aria-invalid],
  textarea[aria-invalid] {
    border-color: var(--input-invalid-border-color);
  }

  input:hover,
  textarea:hover {
    border-color: var(--input-hover-border-color);
  }

  input:focus,
  textarea:focus {
    border-color: var(--input-focus-border-color);
    outline: none;
  }

  input[readonly],
  textarea[readonly] {
    background-color: var(--input-readonly-background-color);
    border: var(--input-readonly-border);
  }

  .input-container {
    position: relative;
  }

  sp-icon.leading,
  sp-icon.trailing {
    color: var(--input-placeholder-font-color);
    pointer-events: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }

  sp-icon.leading {
    left: var(--input-padding);
  }

  sp-icon.trailing {
    right: var(--input-padding);
  }

  :host([leading-icon]) input {
    padding-left: var(--input-icon-offset);
  }

  :host([trailing-icon]) input {
    padding-right: var(--input-icon-offset);
  }
`

export interface IInputTextBaseAttributes<T> extends ILabeledInputAttributes<T> {
  placeholder?: string
  'leading-icon'?: IconKey
  'trailing-icon'?: IconKey
}

/**
 * Base class for text-like fields (text, textarea, number). Applies base styling to the element
 * and sets up common properties.
 */
export class InputTextBase<T> extends LabeledInput<T> {
  static styles = [...LabeledInput.styles, inputTextBaseStyles]

  static properties = {
    ...LabeledInput.properties,
    placeholder: { type: String },
    leadingIcon: { type: String, reflect: true, attribute: 'leading-icon' },
    trailingIcon: { type: String, reflect: true, attribute: 'trailing-icon' }
  }

  placeholder?: string
  leadingIcon?: IconKey
  trailingIcon?: IconKey

  /**
   * Creates a container to handle layout of optional leading/trailing icons.
   */
  renderInputContainer() {
    return html`
      <div class="input-container">
        ${this.leadingIcon ? html`<sp-icon icon=${this.leadingIcon} class="leading"></sp-icon>` : null}
        ${this.renderInput()}
        ${this.trailingIcon ? html`<sp-icon icon=${this.trailingIcon} class="trailing"></sp-icon>` : null}
      </div>
    `
  }
}
