import { html, customElement, css } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { makeScopedTagName } from '../../utils/lit-utils';
import {
  IInputSelectBaseAttributes,
  InputSelectBase,
  InputSelectOption,
  MenuItem,
} from './input-select-base';
import type { JSXProps } from '../../types';
import type {
  BaseInputChangeEventPayload,
  InputChangeEvent,
} from './input-base';
import type { InputSizes } from './labeled-input';

const inputMultiselect = makeScopedTagName('input-multiselect');

export type MultiSelectChangeEvent = InputChangeEvent<
  BaseInputChangeEventPayload<ValueType>
>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [inputMultiselect]: JSXProps<
        InputMultiselect,
        IInputMultiSelectAttributes
      >;
    }
  }

  interface HTMLElementTagNameMap {
    [inputMultiselect]: InputMultiselect;
  }
}

interface IInputMultiSelectAttributes
  extends IInputSelectBaseAttributes<ValueType> {
  size?: InputSizes;
  canSearch?: boolean;
}

type ValueType = unknown[];

const SELECT_ALL_ID = 'selectAll';

/**
 * Multi Select input component
 * Should be used with nested `sp-menu-items`, each with a value
 *
 * @emits sp-input-change
 * @consumes sp-select
 */
@customElement(inputMultiselect)
export class InputMultiselect extends InputSelectBase<ValueType> {
  static styles = [
    ...InputSelectBase.styles,
    css`
      .wrapper {
        position: relative;
        min-height: 36px;

        box-sizing: border-box;

        padding: var(--sp-spacing-1);
        border: var(--input-border);
        border-radius: var(--sp-border-radius-default);
        font-size: var(--sp-font-size);
        font-family: var(--input-font);
        color: var(--input-text-color);

        /** TODO: It would be nice if we could support this decorator behaviour on all input fields **/
        padding-right: var(--dropdown-decorator-offset);

        display: flex;
        grid-gap: var(--sp-spacing-1);
        flex-wrap: wrap;
      }

      .wrapper:hover {
        border-color: var(--input-hover-border-color);
      }

      :host([readonly]) .wrapper {
        background-color: var(--input-readonly-background-color);
        border: var(--input-readonly-border);
      }

      :host([invalid]) .wrapper {
        border-color: var(--input-invalid-border-color);
      }

      .wrapper:focus-within,
      .wrapper:focus {
        border-color: var(--input-focus-border-color);
        outline: none;
      }

      .search-area {
        border: none;
        display: inline;
        width: unset;
        min-width: 100px;
        flex-grow: 1;
        padding: var(--sp-spacing-1);
      }

      .placeholder {
        padding: var(--sp-spacing-1);
        color: var(--input-placeholder-font-color);
      }
    `,
  ];

  static properties = {
    ...InputSelectBase.properties,
    size: { type: String, reflect: true },
    value: { type: Array },
    canSearch: { attribute: 'can-search', type: Boolean, reflect: true },

    query: { type: String, state: true },
    selectedIndex: { type: Number, state: true },
    hasResults: { type: Boolean, state: true },
  };

  canSearch?: boolean;
  size: InputSizes = 'x-large';
  protected query? = '';
  protected hasResults = false;
  valueLabels: { label: string; value: ValueType }[] = [];
  options?: InputSelectOption[];

  connectedCallback() {
    super.connectedCallback();
    this.keyBindings['Backspace'] = e => {
      if (!e.target?.value && !this.readonly) this.removeLastValue();
    };

    this.keyBindings['Enter'] = () => {
      if (!this.isDropdownOpen()) {
        this.openDropdown();
        return;
      }

      const thisItem = this.getItems()[this.selectedIndex];

      if (thisItem.id === SELECT_ALL_ID) {
        this.toggleAllSelected();
        return;
      }

      if (thisItem && !thisItem.disabled) this.toggleSelection(thisItem.value);
      if (thisItem && thisItem.disabled) return;
    };
  }

  /**
   * Determines whether all items are selected
   */
  private get allSelected(): boolean {
    const { enabled, toggled } = this.getItems().reduce(
      (accumulator, current) => ({
        enabled:
          !current.disabled && current.id !== SELECT_ALL_ID
            ? accumulator.enabled + 1
            : accumulator.enabled,
        toggled: current.toggled
          ? accumulator.toggled + 1
          : accumulator.toggled,
      }),
      { enabled: 0, toggled: 0 }
    );

    return enabled === toggled;
  }

  /**
   * Dispatches a change event
   */
  dispatchChange() {
    this.dispatchEvent(
      new CustomEvent<BaseInputChangeEventPayload<ValueType>>(
        'sp-input-change',
        {
          detail: { value: [...(this.value || [])] },
        }
      )
    );
  }

  /**
   * Side effects when dropdown closes
   * Search cleared and selected item cleared
   */
  protected handleCloseDropdown() {
    window.setTimeout(() => {
      this.clearKeySelectedItem();
      this.resetSearch();
      this.selectedIndex = -1;
    }, 200); // 200ms so that the search change results don't flicker
  }

  /**
   * Side effect handler when value changes
   * Value label is synchronised with the new value and the search is reset to the value label
   */
  protected handleValueChange() {
    this.syncValueLabels();
  }

  /**
   * Handles clicking a value in the dropdown
   */
  protected handleSelect(event: CustomEvent) {
    const target = event.target as MenuItem;

    if (target.id === SELECT_ALL_ID) {
      this.toggleAllSelected();
      return;
    }

    this.toggleSelection(event.detail.item.value);
  }

  toggleAllSelected() {
    const value: ValueType = [];

    if (!this.allSelected) {
      this.getItems().forEach(item => {
        if (!item.disabled && item.id !== SELECT_ALL_ID) value.push(item.value);
      });
    }

    this.setValue(value);
  }

  /**
   * Adds/removes the value from the value array
   */
  toggleSelection(value: unknown) {
    const payload = this.value ? [...this.value] : [];

    const index = payload.indexOf(value);
    if (index > -1) payload.splice(index, 1);
    if (index === -1) payload.push(value);

    this.setValue(payload);
  }

  /**
   * Finds and sets the toggled status on child menu options where they are toggled in the value array
   * This needs to run on every render to ensure the elements have the correct status
   */
  private applyToggleStatusToChildren() {
    let toggleCount = 0;

    this.getItems().forEach(item => {
      item.toggleable = true;
      const isToggled = this.value && this.value.includes(item.value);
      if (isToggled) toggleCount += 1;
      item.toggled = isToggled;
    });
  }

  private onQueryChange({ target }: { target: HTMLInputElement }) {
    if (!this.isDropdownOpen()) this.openDropdown();
    this.query = target?.value;
  }

  protected renderReferenceElement() {
    this.applyToggleStatusToChildren();
    this.search();

    return html` <div
      class="wrapper"
      @keydown="${this.handleKeydown}"
      tabindex="0"
    >
      ${!this.canSearch && this.valueLabels.length === 0
        ? html`<div class="placeholder">${this.placeholder}</div>`
        : undefined}
      ${this.valueLabels.map(
        ({ value, label }) =>
          html`<sp-lozenge
            size="small"
            color="neutral"
            theme="subtle"
            @sp-lozenge-delete="${() => {
              if (!this.readonly) this.toggleSelection(value);
            }}"
            can-delete
            >${label}</sp-lozenge
          >`
      )}
      ${!this.readonly && this.canSearch
        ? html`<input
            value=${this.query}
            @input=${this.onQueryChange}
            placeholder="${ifDefined(this.placeholder)}"
            class="search-area"
          />`
        : null}
    </div>`;
  }

  protected renderDropdownContent() {
    return html`
      ${!this.hasQueryResults ? this.renderNoResultsMessage() : null}
      <sp-menu-item
        id="${SELECT_ALL_ID}"
        toggleable
        ?toggled="${this.allSelected}"
        >Select All</sp-menu-item
      >
      ${this.options?.length ? this.renderOptionsData() : html`<slot></slot>`}
    `;
  }

  removeLastValue() {
    this.value?.pop();
    this.handleValueChange();
  }

  /**
   * Clears the search query
   **/
  resetSearch() {
    this.query = '';
  }

  /**
   * Marks anything that's text value doesn't match the search query as hidden
   */
  protected search() {
    this.hasResults = false;
    const lowerQuery = this.query?.toLowerCase();

    this.getItems().forEach(item => {
      // If no query display all items
      if (!lowerQuery) {
        item.hidden = false;
        this.hasResults = true;
        return;
      }

      const found = this.isQueryMatch(item);
      if (found) this.hasResults = true;
      item.hidden = !found;
    });
  }

  /**
   * Multi select has a select all menu item, so we need to include that when getting items
   */
  getItems() {
    return [
      this.shadowRoot?.querySelector(`sp-menu-item#${SELECT_ALL_ID}`) || [],
      ...super.getItems(),
    ] as MenuItem<ValueType>[];
  }

  /**
   * Synchronises the lozenges with the selected items
   */
  private syncValueLabels() {
    const items = this.getItems();

    this.valueLabels = this.value
      ? this.value.map(value => {
          return {
            label: this.getItemLabel(items.find(item => item.value === value)),
            value: value as ValueType,
          };
        })
      : [];

    this.render();
  }
}
