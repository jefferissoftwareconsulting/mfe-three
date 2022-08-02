import { html, customElement } from 'lit-element'
import moment from 'moment'
import { makeScopedTagName } from '../../utils/lit-utils'
import { InputSelect, IInputSelectAttributes } from './input-select'
import { InputSelectOption, MENU_ITEM, MenuItem } from './input-select-base'
import type { JSXProps } from '../../types'

export const INPUT_TIME = makeScopedTagName('input-time')

export const TIME_FORMAT = 'h:mma'

export const TIME_REGEX_LOOSE = /^([1-9]|1[0-9]|2[0-3]):([0-5])([0-9])?(am?|pm?)?$/
export const TIME_REGEX_24H = /^(1[3-9]|2[0-3]).*/
export const TIME_REGEX_12H = /^(\d\d?)(am?|pm?)/

export type InputSelectQueryHandler = (query: string, item: MenuItem) => boolean

export type TimeSuffix = 'UTC' | 'AEST'

export interface IInputTimeAttributes extends IInputSelectAttributes {
  increment?: number
  suffix?: TimeSuffix
  'is-freeform'?: boolean
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [INPUT_TIME]: JSXProps<InputTime, IInputTimeAttributes>
    }
  }

  interface HTMLElementTagNameMap {
    [INPUT_TIME]: InputTime
  }
}

/**
 * Creates a new time option object
 *
 * @param time The time value as `h:mma` e.g. '3:15pm'
 * @param suffix Optional timezone suffix to be appended to the label
 */
const timeOption = (time: string, suffix?: TimeSuffix): InputSelectOption => ({
  label: `${time}${suffix ? ` (${suffix})` : ''}`,
  value: time
})

/**
 * Constructs an array of options objects to populate a select input with time
 * presets based on an incremental value.
 *
 * @param increment Minutes between each option
 * @param suffix Optional timezone suffix to be appended to labels
 */
const buildTimeOptions = (increment: number, suffix?: TimeSuffix): InputSelectOption[] => {
  const minutesInDay = 24 * 60
  const optionsCount = Math.ceil(minutesInDay / increment)
  const baseTime = moment().startOf('day')

  return Array(optionsCount)
    .fill(null)
    .map((_, index) => {
      const incrementalTime = index > 0 ? baseTime.add(increment, 'minutes') : baseTime
      const time = incrementalTime.format(TIME_FORMAT)

      return timeOption(time, suffix)
    })
}

/**
 * Validates a query string against a loose time format. Builds a list of valid
 * options to be rendered.
 *
 * @param query Searched value to validate
 * @param suffix Optional time suffix to append to labels
 */
const buildFreeformTimeOptions = (query: string, suffix?: TimeSuffix) => {
  const trimmedQuery = query.trim()
  const matchLooseTime = query.match(TIME_REGEX_LOOSE)

  if (!trimmedQuery || !matchLooseTime) return []

  const [, hours, tensOfMinutes, singleMinutes] = matchLooseTime

  const numHours = parseInt(hours, 10)
  const formattedHours = numHours > 12 ? `${numHours - 12}` : `${numHours}`
  const formattedMinutes = `${tensOfMinutes}${singleMinutes || 0}`
  const formattedTime = `${formattedHours}:${formattedMinutes}`

  return ['am', 'pm'].map(amPm => timeOption(`${formattedTime}${amPm}`, suffix))
}

/**
 * Validates a menu item against a query string matching a loose 24-hour time
 * format. Returns true when a matching 12-hour formatted time option is found.
 *
 * @example Valid queries
 * '20' -> [...all8pmOptions]
 * '2015' -> '8:15pm'
 */
const is24HourTimeQuery: InputSelectQueryHandler = (query, { value }) => {
  const match24HourTime = query.match(TIME_REGEX_24H)

  if (!match24HourTime) return false

  const [, hours] = match24HourTime

  const formattedHours = `${parseInt(hours, 10) - 12}`
  const formattedMinutes = query.substring(hours.length).replace(':', '')
  const formattedTime = `${formattedHours}:${formattedMinutes}`

  return !!(value?.startsWith(formattedTime) && value?.endsWith('pm'))
}

/**
 * Validates a menu item against a query string matching a loose 12-hour time
 * format without minutes. Returns true for a match.
 *
 * @example Valid queries
 * '10am', '1pm'
 */
const isShortTimeQuery: InputSelectQueryHandler = (query, { value }) => {
  const matchShortTime = query.match(TIME_REGEX_12H)

  if (!matchShortTime) return false

  const [, hour, amPm] = matchShortTime

  return !!value?.replace(':00', '').startsWith(`${hour}${amPm}`)
}

/**
 * Runs a series of custom time queries
 */
const isValidTimeQuery: InputSelectQueryHandler = (...args) => {
  return isShortTimeQuery(...args) || is24HourTimeQuery(...args)
}

/**
 * InputTime is a convenient time-based preset of InputSelect.
 *
 * Renders a select field containing a list of incremental time options in 12hr
 * format starting at 12:00am. Optionally allows freeform entry of non-preset
 * options, if valid.
 *
 * Applies custom query matchers to handle fuzzy times, returning 12hr formatted
 * options for 24hr queries (e.g. 2145, 21:45) and short times (e.g. 10am).
 *
 * @attr increment Number of minutes between each option, Defaults to 15.
 * @attr suffix Optional timezone suffix
 * @attr is-freeform Enables freeform entry of options not in the list
 */
@customElement(INPUT_TIME)
export class InputTime extends InputSelect {
  static properties = {
    ...InputSelect.properties,
    increment: { type: Number, reflect: true },
    suffix: { type: String, reflect: true },
    mode: { type: String, reflect: true },
    isFreeform: { type: Boolean, attribute: 'is-freeform', reflect: true },
    freeformOptions: { type: Array, state: true }
  }

  increment = 15
  suffix?: TimeSuffix
  isFreeform = false
  placeholder = 'Select time'
  trailingIcon = 'time'
  options: InputSelectOption[] = []
  private freeformOptions: InputSelectOption[] = []

  /**
   * Builds time presets and assigns to the options on mount
   */
  connectedCallback() {
    super.connectedCallback()
    this.options = buildTimeOptions(this.increment, this.suffix)
  }

  /**
   * Empties the freeform options state
   */
  resetFreeformOptions() {
    this.freeformOptions = []
  }

  /**
   * Resets freeform options when the dropdown is closed
   */
  handleCloseDropdown() {
    super.handleCloseDropdown()
    this.resetFreeformOptions()
  }

  /**
   * Gets menu items from shadowRoot. This method override is necessary as this
   * component is data-driven so does not use slotted content.
   */
  getItems() {
    return Array.from(this.shadowRoot?.querySelectorAll(MENU_ITEM) || []) as MenuItem[]
  }

  /**
   * Applies custom query logic to handle fuzzy time formatting.
   */
  protected isCustomQueryMatch(item: MenuItem): boolean {
    return this.query ? isValidTimeQuery(this.query, item) : false
  }

  /**
   * Intercepts the "no results" state to handle freeform options if the feature
   * is enabled. Attempts to build a new list of options based on the current
   * query value, and toggles the state based on that result.
   */
  private handleNoResults() {
    if (this.hasQueryResults) return null
    if (!this.isFreeform) return this.renderNoResultsMessage()

    this.freeformOptions = buildFreeformTimeOptions(this.query as string, this.suffix)
    this.hasResults = !!this.freeformOptions.length
  }

  /**
   * Renders a list of freeform options, if any, or a no results message if the
   * freeform query doesn't evaluate to a valid time.
   */
  private renderFreeformOptions() {
    if (!this.isFreeform) return null
    if (!this.hasQueryResults) return this.renderNoResultsMessage()

    return this.renderOptionsData(this.freeformOptions)
  }

  /**
   * Overrides the default select dropdown to include a list of freeform options
   * if the feature is enabled.
   */
  protected renderDropdownContent() {
    return html` ${this.handleNoResults()} ${this.renderOptionsData()} ${this.renderFreeformOptions()} `
  }
}
