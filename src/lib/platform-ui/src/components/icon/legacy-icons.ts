import { SVGTemplateResult, svg } from 'lit-element'
import { TIcon } from './icons'

export interface ILegacyIcon {
  svg: SVGTemplateResult
  viewBox: string
}

export const isLegacyIcon = (icon: ILegacyIcon | TIcon): icon is ILegacyIcon =>
  (icon as ILegacyIcon).viewBox !== undefined

export const legacyIcons: Record<string, ILegacyIcon> = {
  arrowDown: {
    svg: svg`
      <title>Asset 36</title>
      <g data-name="Layer 2">
        <g data-name="Layer 1">
          <path d="M13.21,10.4a1.07,1.07,0,0,0-1.56,0L8,14.09v-13A1.06,1.06,0,0,0,6.84,0,1.06,1.06,0,0,0,5.72,1.12v13L2,10.4H2A1.16,1.16,0,0,0,1.19,10a1.19,1.19,0,0,0-.84,2h0l5.71,5.59a1.07,1.07,0,0,0,1.56,0L13.21,12A1.07,1.07,0,0,0,13.21,10.4Z"/>
        </g>
      </g>`,
    viewBox: '0 0 13.55 18'
  },

  arrowUp: {
    viewBox: '0 0 13.55 18',
    svg: svg`<g data-name="Layer 2">
    <g data-name="Layer 1">
      <path d="M.34,7.6a1.07,1.07,0,0,0,1.56,0L5.59,3.91v13A1.06,1.06,0,0,0,6.71,18a1.06,1.06,0,0,0,1.12-1.12v-13L11.52,7.6h0a1.16,1.16,0,0,0,.84.36,1.19,1.19,0,0,0,1.19-1.19,1.16,1.16,0,0,0-.36-.84h0L7.49.34a1.07,1.07,0,0,0-1.56,0L.34,6A1.07,1.07,0,0,0,.34,7.6Z"/>
    </g>`
  },

  attachmentMessaging: {
    viewBox: '0 0 20 20',
    svg: svg`
      <g stroke="none" stroke-width="1" fill-rule="evenodd">
          <g transform="translate(0.000000, 2.000000)" fill-rule="nonzero">
              <g>
                  <path d="M17.3678238,1.63921919 C16.3233424,0.589663818 14.9065102,0 13.4291415,0 C11.9517727,0 10.5349405,0.589663818 9.49045916,1.63921919 L1.18746407,9.97893335 C-0.401339682,11.5906429 -0.394999051,14.1890522 1.20165134,15.7929182 C2.79830173,17.3967841 5.38502126,17.4031534 6.98947991,15.8071696 L13.7331632,9.03140295 C14.4418756,8.37255455 14.7349841,7.37703064 14.4970423,6.43693745 C14.2591005,5.49684426 13.5282405,4.76283911 12.5923256,4.52402406 C11.6564106,4.285209 10.6654284,4.57985602 10.0096964,5.29191273 L5.85819883,9.45815328 C5.65582909,9.66115044 5.57664222,9.95717842 5.65046715,10.2347264 C5.72429207,10.5122743 5.93991303,10.729176 6.21610769,10.8037268 C6.49230235,10.8782776 6.78711018,10.7991513 6.98947991,10.5961542 L11.1409775,6.42428791 C11.5478846,6.03429098 12.1903203,6.04195224 12.5878959,6.4415429 C12.9854714,6.84113356 12.9927471,7.48647659 12.6042823,7.8950094 L5.85819883,14.670776 C4.88080568,15.6525861 3.29613833,15.6525861 2.31874521,14.670776 C1.34135208,13.6889658 1.34135206,12.0971371 2.31874515,11.1153269 L10.6217402,2.77561273 C12.1722251,1.21812093 14.6860578,1.21812093 16.2365427,2.77561273 C17.7870275,4.33310453 17.7870275,6.85829767 16.2365427,8.41578947 L10.0096964,14.670776 C9.80171621,14.8725578 9.71830542,15.1713661 9.79152302,15.4523538 C9.86474062,15.7333416 10.0831922,15.9527804 10.3629158,16.0263289 C10.6426394,16.0998774 10.9401035,16.0160896 11.1409775,15.8071696 L17.3678238,9.55137934 C18.4128535,8.50228241 19,7.07900813 19,5.59489743 C19,4.11078673 18.4128535,2.68751245 17.3678238,1.63841551 L17.3678238,1.63921919 Z"></path>
              </g>
          </g>
      </g>`
  },

  bellAlert: {
    viewBox: '0 0 16 18',
    svg: svg`
      <path class="st0" d="M5,15c0,1.6,1.3,3,3,3s3-1.4,3-3H5z"/>
      <circle cx="13" cy="3" r="2.6"/>
      <g>
        <path class="st0" d="M14.4,9V7.3C14,7.5,13.5,7.6,13,7.6c-2.5,0-4.6-2-4.6-4.6c0-1.1,0.4-2.1,1-2.8C9,0.1,8.5,0,7.9,0H7.7
          C4.3,0.1,1.5,2.9,1.5,6.2V9l-1.4,2.6C-0.2,12.2,0.3,13,1.2,13H15c0.8,0,1.3-0.8,1-1.4L14.4,9z"/>
      </g>`
  },

  bell: {
    viewBox: '0 0 16 18',
    svg: svg`
    <g stroke="none" stroke-width="1" fill-rule="evenodd" opacity="0.97">
        <g transform="translate(-1063.000000, -1433.000000)">
            <g transform="translate(0.000000, 1415.000000)">
                <g transform="translate(913.000000, 1.000000)">
                    <g transform="translate(150.000000, 8.000000)">
                        <g>
                            <g transform="translate(0.000000, 9.000000)">
                                <path d="M5,15 C5,16.65 6.35,18 8,18 C9.65,18 11,16.65 11,15 L5,15 Z"></path>
                                <path d="M7.94590329,0 L7.73104759,0 C4.28878496,0.101 1.49337513,2.923 1.49337513,6.248 L1.49337513,8.969 L0.0945273682,11.589 C-0.227756185,12.194 0.30938307,13 1.16994873,13 L14.9367136,13 C15.6887085,13 16.2269906,12.194 15.9047071,11.589 L14.3984314,8.969 L14.3984314,6.047 C14.3984314,2.62 11.6018788,0 7.94590329,0"></path>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </g>`
  },

  calendarNavLeft: {
    viewBox: '0 0 6.55 11',
    svg: svg`
      <g>
        <g>
          <path d="M2.53,5.5,6.24,1.79A1,1,0,0,0,4.76.31L.31,4.76a1,1,0,0,0,0,1.48l4.45,4.45A1,1,0,0,0,6.24,9.21Z"/>
        </g>
      </g>
  `
  },

  calendarNavRight: {
    viewBox: '0 0 6.55 11',
    svg: svg`
      <g>
        <g>
          <path d="M4,5.5.31,9.21a1,1,0,0,0,1.48,1.48L6.24,6.24a1,1,0,0,0,0-1.48L1.79.31A1,1,0,0,0,.31,1.79Z"/>
        </g>
      </g>`
  },

  chatFilled: {
    viewBox: '0 0 18 15.77',
    svg: svg`
      <g>
        <g>
          <path d="M7.18,14.37A12.09,12.09,0,0,0,9,14.5c5,0,9-3.24,9-7.25S14,0,9,0,0,3.25,0,7.25a7,7,0,0,0,3.92,6l-1,2.11a.3.3,0,0,0,.14.4.36.36,0,0,0,.23,0Z"/>
        </g>
      </g>`
  },

  chevronDownFilled: {
    viewBox: '0 0 18 9.36',
    svg: svg`
      <g>
        <g>
          <path d="M8.19,9.05.41,2.13A1.22,1.22,0,0,1,1.22,0H16.78a1.22,1.22,0,0,1,.81,2.13L9.81,9.05A1.22,1.22,0,0,1,8.19,9.05Z" fill-rule="evenodd"/>
        </g>
      </g>`
  },

  content: {
    viewBox: '0 0 18 14.33',
    svg: svg`
      <rect y="6.17" width="18" height="2" rx="1"/>
      <rect width="18" height="2" rx="1"/>
      <rect y="12.33" width="12.3" height="2" rx="1"/>`
  },

  edit: {
    viewBox: '0 0 12 14',
    svg: svg`
      <defs>
          <polygon points="0.0896 6.79564065e-05 9.8928 6.79564065e-05 9.8928 11.2426588 0.0896 11.2426588"></polygon>
          <polygon points="0 0.399823529 3.43728 0.399823529 3.43728 4.11732689 0 4.11732689"></polygon>
      </defs>
      <g stroke="none" stroke-width="1" fill-rule="evenodd">
        <g transform="translate(-243.000000, -133.000000)">
          <g transform="translate(243.000000, 133.000000)">
            <g transform="translate(1.600000, 0.000000)">
              <mask fill="white">
                <use xlink:href="#path-1"></use>
              </mask>
              <g></g>
                <path d="M9.5568,1.38830588 L8.2064,0.272423529 C7.688,-0.155811765 6.9208,-0.0693411765 6.5056,0.463482353 L5.4656,1.7976 L0.0896,8.76548235 L3.0872,11.2426588 L8.4816,4.28877647 L8.4816,4.2896 L9.6848,2.74630588 C10.0088,2.31065882 9.9456,1.70948235 9.5568,1.38830588" mask="url(#mask-2)"></path>
              </g>
            <g transform="translate(0.000000, 9.882353)">
              <mask fill="white">
                <use xlink:href="#path-3"></use>
              </mask>
              <g></g>
              <path d="M0.00208,3.76394118 C-0.02432,3.99288235 0.19808,4.17570588 0.40928,4.09994118 L3.43728,2.87782353 L0.45568,0.399823529 L0.00208,3.76394118 Z" mask="url(#mask-4)"></path>
            </g>
          </g>
        </g>
      </g>`
  },

  emoji: {
    viewBox: '0 0 20 20',
    svg: svg`
      <g stroke="none" stroke-width="1" fill-rule="evenodd">
          <path d="M10.325,2 C5.725,2 2,5.73333333 2,10.3333333 C2,14.9333333 5.725,18.6666667 10.325,18.6666667 C14.9333333,18.6666667 18.6666667,14.9333333 18.6666667,10.3333333 C18.6666667,5.73333333 14.9333333,2 10.325,2 Z M10.3333333,17 C6.65,17 3.66666667,14.0166667 3.66666667,10.3333333 C3.66666667,6.65 6.65,3.66666667 10.3333333,3.66666667 C14.0166667,3.66666667 17,6.65 17,10.3333333 C17,14.0166667 14.0166667,17 10.3333333,17 Z M13.25,9.5 C13.9416667,9.5 14.5,8.94166667 14.5,8.25 C14.5,7.55833333 13.9416667,7 13.25,7 C12.5583333,7 12,7.55833333 12,8.25 C12,8.94166667 12.5583333,9.5 13.25,9.5 Z M7.41666667,9.5 C8.10833333,9.5 8.66666667,8.94166667 8.66666667,8.25 C8.66666667,7.55833333 8.10833333,7 7.41666667,7 C6.725,7 6.16666667,7.55833333 6.16666667,8.25 C6.16666667,8.94166667 6.725,9.5 7.41666667,9.5 Z M10.3333333,14.9166667 C12.275,14.9166667 13.925,13.7 14.5916667,12 L6.075,12 C6.74166667,13.7 8.39166667,14.9166667 10.3333333,14.9166667 Z" fill-rule="nonzero"></path>
      </g>`
  },

  exclamation: {
    viewBox: '0 0 3.61 18',
    svg: svg`
      <g>
        <g>
          <g>
            <rect width="3.61" height="12.62" rx="1.8" ry="1.8" />
            <circle cx="1.8" cy="16.21" r="1.79" />
          </g>
        </g>
      </g>`
  },

  glasses: {
    viewBox: '0 0 70 30',
    svg: svg`
      <g transform="translate(-1063.000000, -447.000000)">
        <g transform="translate(988.000000, 447.000000)">
          <g transform="translate(75.000000, 0.000000)">
            <path d="M14.7058824,0 C6.58389585,0 0,6.58389585 0,14.7058824 C0,22.8278689 6.58389585,29.4117647 14.7058824,29.4117647 C22.8278689,29.4117647 29.4117647,22.8278689 29.4117647,14.7058824 C29.4117647,6.58389585 22.8278689,0 14.7058824,0 M14.7058824,3.37512054 C20.9537126,3.37512054 26.0366442,8.45805207 26.0366442,14.7058824 C26.0366442,20.9537126 20.9537126,26.0366442 14.7058824,26.0366442 C8.45805207,26.0366442 3.37512054,20.9537126 3.37512054,14.7058824 C3.37512054,8.45805207 8.45805207,3.37512054 14.7058824,3.37512054"></path>
            <path d="M54.7058824,0 C46.5838959,0 40,6.58389585 40,14.7058824 C40,22.8278689 46.5838959,29.4117647 54.7058824,29.4117647 C62.8278689,29.4117647 69.4117647,22.8278689 69.4117647,14.7058824 C69.4117647,6.58389585 62.8278689,0 54.7058824,0 M54.7058824,3.37512054 C60.9537126,3.37512054 66.0366442,8.45805207 66.0366442,14.7058824 C66.0366442,20.9537126 60.9537126,26.0366442 54.7058824,26.0366442 C48.4580521,26.0366442 43.3751205,20.9537126 43.3751205,14.7058824 C43.3751205,8.45805207 48.4580521,3.37512054 54.7058824,3.37512054"></path>
            <path d="M27,10.6806723 C27,10.6806723 29.8361345,9 34.0903361,9 C38.3445378,9 42.1260504,10.6806723 42.1260504,10.6806723"></path>
          </g>
        </g>
      </g>`
  },

  info: {
    viewBox: '0 0 3.61 18',
    svg: svg`
      <rect y="5.38" width="3.61" height="12.62" rx="1.8" ry="1.8"/>
      <circle cx="1.8" cy="1.79" r="1.79">`
  },

  jobDependency: {
    viewBox: '0 0 24 24',
    svg: svg`
    <path d="M20,13H10c-0.55,0-1,0.45-1,1v2H6.94C6.39,16,6,15.66,6,15.35V11h8c0.55,0,1-0.45,1-1V4c0-0.55-0.45-1-1-1H4
      C3.45,3,3,3.45,3,4v6c0,0.55,0.45,1,1,1v4.35C4,16.81,5.32,18,6.94,18H9v2c0,0.55,0.45,1,1,1h10c0.55,0,1-0.45,1-1v-6
      C21,13.45,20.55,13,20,13z M5,5h8v4H5V5z M19,19h-8v-4h8V19z"/>`
  },

  location: {
    viewBox: '0 0 18 17.6',
    svg: svg`
    <path class="st0" d="M17,1.5L13,0.1C12.7,0,12.3,0,12,0c-0.3,0-0.7,0-0.9,0.1L6.9,1.5C6.7,1.6,6.3,1.6,6,1.6c-0.3,0-0.7,0-1-0.1
      L0.9,0.1c-0.1,0-0.2,0-0.3,0C0.3,0.1,0,0.4,0,0.8v14c0,0.6,0.4,1.1,1,1.3l4,1.4c0.3,0.1,0.6,0.1,1,0.1c0.3,0,0.7,0,0.9-0.1l4.3-1.4
      c0.3-0.1,0.6-0.1,0.9-0.1c0.4,0,0.7,0,1,0.1l4,1.4c0.1,0,0.2,0.1,0.3,0.1c0.4,0,0.7-0.3,0.7-0.7v-14C18,2.3,17.6,1.7,17,1.5z
      M2,14.4V2.6l2.4,0.8C4.6,3.5,4.8,3.5,5,3.5v11.8L2,14.4z M7,15.4V3.5c0.2,0,0.4-0.1,0.5-0.1L11,2.3v11.9c-0.1,0-0.3,0.1-0.4,0.1
      L7,15.4z M16,15l-2.3-0.8c-0.2-0.1-0.5-0.1-0.7-0.2V2.3l3,1V15z"/>
  `
  },

  locked: {
    viewBox: '0 0 11 14',
    svg: svg`
    <g transform="translate(-860.000000, -816.000000)">
      <path d="M869.428571,818.955556 C869.428571,817.382114 868.041149,816.0487 866.377289,816.001304 C866.346855,816.000437 865.530613,816 865.5,816 C865.471911,816 864.65818,816.000368 864.630241,816.001098 C862.963039,816.044679 861.571429,817.379741 861.571429,818.955556 L861.571429,821.444444 L863.142857,821.444444 L863.142857,818.955556 C863.142857,818.251966 863.831925,817.609931 864.614241,817.558828 C864.647436,817.55666 865.466514,817.555556 865.5,817.555556 C865.541427,817.555556 866.368382,817.557246 866.409348,817.56055 C867.181874,817.622859 867.857143,818.259046 867.857143,818.955556 L867.857143,821.444444 L861.571429,821.444444 C860.707143,821.444444 860,822.144444 860,823 L860,828.444444 C860,829.3 860.707143,830 861.571429,830 L869.428571,830 C870.292857,830 871,829.3 871,828.444444 L871,823 C871,822.144444 870.292857,821.444444 869.428571,821.444444 L869.428571,818.955556 Z"></path>
    </g>`
  },

  mention: {
    viewBox: '0 0 20 20',
    svg: svg`
      <path d="M10.3333333,2 C5.73333333,2 2,5.73333333 2,10.3333333 C2,14.9333333 5.73333333,18.6666667 10.3333333,18.6666667 L14.5,18.6666667 L14.5,17 L10.3333333,17 C6.71666667,17 3.66666667,13.95 3.66666667,10.3333333 C3.66666667,6.71666667 6.71666667,3.66666667 10.3333333,3.66666667 C13.95,3.66666667 17,6.71666667 17,10.3333333 L17,11.525 C17,12.1833333 16.4083333,12.8333333 15.75,12.8333333 C15.0916667,12.8333333 14.5,12.1833333 14.5,11.525 L14.5,10.3333333 C14.5,8.03333333 12.6333333,6.16666667 10.3333333,6.16666667 C8.03333333,6.16666667 6.16666667,8.03333333 6.16666667,10.3333333 C6.16666667,12.6333333 8.03333333,14.5 10.3333333,14.5 C11.4833333,14.5 12.5333333,14.0333333 13.2833333,13.275 C13.825,14.0166667 14.7583333,14.5 15.75,14.5 C17.3916667,14.5 18.6666667,13.1666667 18.6666667,11.525 L18.6666667,10.3333333 C18.6666667,5.73333333 14.9333333,2 10.3333333,2 Z M10.3333333,12.8333333 C8.95,12.8333333 7.83333333,11.7166667 7.83333333,10.3333333 C7.83333333,8.95 8.95,7.83333333 10.3333333,7.83333333 C11.7166667,7.83333333 12.8333333,8.95 12.8333333,10.3333333 C12.8333333,11.7166667 11.7166667,12.8333333 10.3333333,12.8333333 Z" fill-rule="nonzero"></path>`
  },

  optimiseFill: {
    viewBox: '0 0 7 10',
    svg: svg`<path d="M3.00837375,9.0254834 C2.95830943,9.0254834 2.9082451,9.0254834 2.85818078,9.0254834 C2.65792348,8.92534203 2.50773051,8.72505928 2.50773051,8.52477653 L2.50773051,6.02124217 L0.50515754,6.02124217 C0.304900243,6.02124217 0.15470727,5.9211008 0.0545786215,5.77088874 C-0.0455500269,5.62067667 0.0045142973,5.42039393 0.104642946,5.27018186 L3.55908132,0.263113149 C3.65920997,0.0628304004 3.90953159,-0.0373109739 4.10978889,0.0127597133 C4.31004618,0.0628304004 4.46023916,0.263113149 4.46023916,0.513466585 L4.46023916,3.06707163 L6.51287645,3.06707163 C6.71313375,3.06707163 6.86332672,3.167213 6.96345537,3.31742506 C7.06358402,3.46763713 7.01351969,3.66791987 6.91339104,3.81813194 L3.40888835,8.77512996 C3.3087597,8.92534203 3.15856672,9.0254834 3.00837375,9.0254834 Z"></path>`
  },

  pin: {
    viewBox: '0 0 48 60',
    svg: svg`
      <g stroke="none" stroke-width="1" fill-rule="evenodd">
        <path d="M47.9343051,25.5003397 C47.9777831,25.5182179 48,25.5274551 48,25.5274551 C48,45.4845306 24.8401003,59.7689962 24.8401003,59.7689962 C24.3769827,60.0753098 23.6301271,60.075534 23.1738657,59.7783581 C23.1738657,59.7783581 0,45.4845306 0,25.5274551 C1.53712829e-17,25.2731115 0.00779630727,25.0252509 0.0231902012,24.7837494 C0.00778358739,24.4347562 0,24.0838066 0,23.7310594 C0,10.6247572 10.745166,5.68434189e-14 24,5.68434189e-14 C37.254834,5.68434189e-14 48,10.6247572 48,23.7310594 C48,24.3261903 47.9778447,24.9162046 47.9343051,25.5003397 Z"></path>
      </g>`
  },

  planeLandingWithGround: {
    viewBox: '0 0 15 15',
    svg: svg`
    <g stroke="none" stroke-width="1" fill-rule="evenodd">
        <g transform="translate(-113.000000, -1615.000000)">
            <g transform="translate(105.000000, 1611.000000)">
                <g>
                    <g transform="translate(8.000000, 3.000000)">
                        <g transform="translate(0.000000, 0.480500)">
                            <path d="M5.6149,9.4171 L9.1499,10.3331 L13.4649,11.4531 C14.1149,11.6191 14.7809,11.2481 14.9599,10.6171 C15.1309,9.9851 14.7489,9.3381 14.0979,9.1641 L9.7839,8.0431 L7.6409,1.2411 C7.5789,1.0431 7.4149,0.8901 7.2089,0.8371 L5.9729,0.5201 L5.9729,7.0571 L1.9339,6.0061 L1.2929,4.4531 C1.2209,4.2771 1.0679,4.1461 0.8809,4.0971 L-0.0001,3.8671 L-0.0001,7.9481 L1.2999,8.2881 L5.6149,9.4171 Z"></path>
                        </g>
                        <g transform="translate(1.000000, 13.480500)">
                            <g>
                                <g>
                                    <path d="M0.5119,0.2355 L12.4889,0.2355 C12.5929,0.2355 12.6769,0.3315 12.6769,0.4505 L12.6769,1.7855 C12.6769,1.9035 12.5929,2.0005 12.4889,2.0005 L0.5119,2.0005 C0.4079,2.0005 0.3239,1.9035 0.3239,1.7855 L0.3239,0.4505 C0.3239,0.3315 0.4079,0.2355 0.5119,0.2355"></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </g>`
  },

  planeLanding: {
    viewBox: '0 0 11 9',
    svg: svg`
    <g stroke="none" stroke-width="1" fill-rule="evenodd">
        <g transform="translate(-119.000000, -3267.000000)">
            <g transform="translate(106.000000, 3253.000000)">
                <g>
                    <g transform="translate(7.000000, 8.000000)">
                        <path d="M10.2435275,12.7599784 L12.6000724,13.3706135 L15.4765904,14.1172415 C15.9099013,14.2279025 16.3538783,13.9805819 16.4732055,13.559937 C16.5871996,13.1386255 16.3325461,12.7073144 15.8985685,12.5913204 L13.0227172,11.8440257 L11.5941244,7.30959344 C11.5527932,7.17760027 11.4434655,7.07560554 11.3061393,7.04027403 L10.4821819,6.82895162 L10.4821819,11.1867264 L7.78965439,10.4860959 L7.36234314,9.45081609 C7.31434562,9.33348882 7.2123509,9.24616 7.08769067,9.21349502 L6.5003877,9.06016962 L6.5003877,11.7806957 L7.36700957,12.0073506 L10.2435275,12.7599784 Z"></path>
                    </g>
                </g>
            </g>
        </g>
    </g>
  `
  },

  planeTakeOff: {
    viewBox: '0 0 16 15',
    svg: svg`
      <defs>
          <polygon points="0 0.254864359 16 0.254864359 16 10.0688 0 10.0688"></polygon>
      </defs>
      <g stroke="none" stroke-width="1" fill-rule="evenodd">
          <g transform="translate(-113.000000, -822.000000)">
              <g transform="translate(105.000000, 819.000000)">
                  <g>
                      <g transform="translate(8.000000, 3.000000)">
                          <g>
                              <path d="M1.96728889,13.0784 L14.0321778,13.0784 C14.1370667,13.0784 14.2224,13.1752889 14.2224,13.2952889 L14.2224,14.6401778 C14.2224,14.7601778 14.1370667,14.8561778 14.0321778,14.8561778 L1.96728889,14.8561778 C1.8624,14.8561778 1.77795556,14.7601778 1.77795556,14.6401778 L1.77795556,13.2952889 C1.77795556,13.1752889 1.8624,13.0784 1.96728889,13.0784"></path>
                              <g transform="translate(0.000000, 0.634311)">
                                  <g></g>
                                  <path d="M15.9608,5.04568889 C15.7945778,4.4048 15.1403556,4.02168889 14.5092444,4.19768889 L10.3199111,5.3328 L5.11635556,0.417244444 C4.96702222,0.275911111 4.75546667,0.221688889 4.55724444,0.275022222 L3.3528,0.597688889 L6.61946667,6.3328 L2.69857778,7.39768889 L1.38035556,6.35235556 C1.23102222,6.23502222 1.03635556,6.19502222 0.855022222,6.2448 L-8.88888889e-05,6.4768 L1.43635556,9.00568889 L2.04346667,10.0688 L3.30568889,9.72568889 L7.49502222,8.5888 L10.9270222,7.6608 L15.1163556,6.52568889 C15.7554667,6.34168889 16.1261333,5.68568889 15.9608,5.04568889" mask="url(#mask-2)"></path>
                              </g>
                          </g>
                      </g>
                  </g>
              </g>
          </g>
      </g>`
  },

  resourcePlaceholder: {
    viewBox: '0 0 96 70',
    svg: svg`
    <g clip-path="url(#clip0_2190_85012)">
    <rect width="96" height="70" fill="white"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M57.6197 21.2084C57.6197 12.7277 62.1858 9.68918 67.7892 9.68918C73.4079 9.68918 77.9588 12.7431 77.9588 21.2084C77.9588 29.6917 73.3952 32.7277 67.7892 32.7277C62.1731 32.7277 57.6197 29.6763 57.6197 21.2084ZM53.559 40.1512C56.3429 39.0863 61.2497 37.6297 67.8065 37.6297C73.7481 37.6297 79.2523 39.0223 82.2091 40.1512C87.2126 42.0659 89.6838 45.6548 90.6168 49.3666C91.1202 51.3888 90.2889 53.5621 88.7812 54.2584C86.9278 55.116 77.3506 55.5486 67.7938 55.5486C58.2878 55.5486 48.7971 55.1211 46.9691 54.2661C45.4716 53.5647 44.6453 51.3965 45.1487 49.3794C46.0742 45.6625 48.5479 42.0685 53.559 40.1512Z" fill="white"/>
    <mask id="mask0_2190_85012" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="45" y="9" width="46" height="47">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M57.6197 21.2084C57.6197 12.7277 62.1858 9.68918 67.7892 9.68918C73.4079 9.68918 77.9588 12.7431 77.9588 21.2084C77.9588 29.6917 73.3952 32.7277 67.7892 32.7277C62.1731 32.7277 57.6197 29.6763 57.6197 21.2084ZM53.559 40.1512C56.3429 39.0863 61.2497 37.6297 67.8065 37.6297C73.7481 37.6297 79.2523 39.0223 82.2091 40.1512C87.2126 42.0659 89.6838 45.6548 90.6168 49.3666C91.1202 51.3888 90.2889 53.5621 88.7812 54.2584C86.9278 55.116 77.3506 55.5486 67.7938 55.5486C58.2878 55.5486 48.7971 55.1211 46.9691 54.2661C45.4716 53.5647 44.6453 51.3965 45.1487 49.3794C46.0742 45.6625 48.5479 42.0685 53.559 40.1512Z" fill="white"/>
    </mask>
    <g mask="url(#mask0_2190_85012)">
    <rect x="27.2032" y="-8.22964" width="81.3565" height="81.9146" fill="#ECEEF3"/>
    </g>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M28.1065 16.4035C28.1065 4.31396 34.6579 -0.0175476 42.6976 -0.0175476C50.7592 -0.0175476 57.2887 4.33586 57.2887 16.4035C57.2887 28.4967 50.7409 32.8246 42.6976 32.8246C34.6396 32.8246 28.1065 28.4748 28.1065 16.4035ZM22.2802 43.407C26.2746 41.889 33.3148 39.8126 42.7224 39.8126C51.2472 39.8126 59.1447 41.7978 63.387 43.407C70.5659 46.1366 74.1115 51.2526 75.4502 56.5439C76.1725 59.4267 74.9797 62.5248 72.8166 63.5173C70.1573 64.7398 56.4161 65.3565 42.7041 65.3565C29.0651 65.3565 15.4479 64.7471 12.8252 63.5283C10.6767 62.5284 9.49113 59.4376 10.2134 56.5621C11.5412 51.2636 15.0905 46.1402 22.2802 43.407Z" fill="white"/>
    <mask id="mask1_2190_85012" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="10" y="-1" width="66" height="67">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M28.1065 16.4035C28.1065 4.31396 34.6579 -0.0175476 42.6976 -0.0175476C50.7592 -0.0175476 57.2887 4.33586 57.2887 16.4035C57.2887 28.4967 50.7409 32.8246 42.6976 32.8246C34.6396 32.8246 28.1065 28.4748 28.1065 16.4035ZM22.2802 43.407C26.2746 41.889 33.3148 39.8126 42.7224 39.8126C51.2472 39.8126 59.1447 41.7978 63.387 43.407C70.5659 46.1366 74.1115 51.2526 75.4502 56.5439C76.1725 59.4267 74.9797 62.5248 72.8166 63.5173C70.1573 64.7398 56.4161 65.3565 42.7041 65.3565C29.0651 65.3565 15.4479 64.7471 12.8252 63.5283C10.6767 62.5284 9.49113 59.4376 10.2134 56.5621C11.5412 51.2636 15.0905 46.1402 22.2802 43.407Z" fill="white"/>
    </mask>
    <g mask="url(#mask1_2190_85012)">
    <rect x="-15.5344" y="-25.5614" width="116.729" height="116.772" fill="white"/>
    </g>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.1065 19.4035C24.1065 7.31396 30.6579 2.98245 38.6976 2.98245C46.7592 2.98245 53.2887 7.33586 53.2887 19.4035C53.2887 31.4967 46.7409 35.8246 38.6976 35.8246C30.6396 35.8246 24.1065 31.4748 24.1065 19.4035ZM18.2802 46.407C22.2746 44.889 29.3148 42.8126 38.7224 42.8126C47.2472 42.8126 55.1447 44.7978 59.387 46.407C66.5659 49.1366 70.1115 54.2526 71.4502 59.5439C72.1725 62.4267 70.9797 65.5248 68.8166 66.5173C66.1573 67.7398 52.4161 68.3565 38.7041 68.3565C25.0651 68.3565 11.4479 67.7471 8.8252 66.5283C6.67666 65.5284 5.49113 62.4376 6.21339 59.5621C7.54118 54.2636 11.0905 49.1402 18.2802 46.407Z" fill="white"/>
    <mask id="mask2_2190_85012" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="6" y="2" width="66" height="67">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.1065 19.4035C24.1065 7.31396 30.6579 2.98245 38.6976 2.98245C46.7592 2.98245 53.2887 7.33586 53.2887 19.4035C53.2887 31.4967 46.7409 35.8246 38.6976 35.8246C30.6396 35.8246 24.1065 31.4748 24.1065 19.4035ZM18.2802 46.407C22.2746 44.889 29.3148 42.8126 38.7224 42.8126C47.2472 42.8126 55.1447 44.7978 59.387 46.407C66.5659 49.1366 70.1115 54.2526 71.4502 59.5439C72.1725 62.4267 70.9797 65.5248 68.8166 66.5173C66.1573 67.7398 52.4161 68.3565 38.7041 68.3565C25.0651 68.3565 11.4479 67.7471 8.8252 66.5283C6.67666 65.5284 5.49113 62.4376 6.21339 59.5621C7.54118 54.2636 11.0905 49.1402 18.2802 46.407Z" fill="white"/>
    </mask>
    <g mask="url(#mask2_2190_85012)">
    <rect x="-19.5344" y="-22.5614" width="116.729" height="116.772" fill="#CACFD9"/>
    </g>
    </g>
    <defs>
    <clipPath id="clip0_2190_85012">
    <rect width="96" height="70" fill="white"/>
    </clipPath>
    </defs>
    `
  },

  remove: {
    viewBox: '0 0 8 8',
    svg: svg`<path d="M6.94801223,0 C7.23615358,0 7.48352022,0.102040816 7.69011213,0.306122449 C7.89670404,0.510204082 8,0.756462585 8,1.04489796 C8,1.33333333 7.89670404,1.58095238 7.69011213,1.7877551 L5.47196738,4.00816327 L7.69011213,6.22040816 C7.89670404,6.42721088 8,6.67210884 8,6.95510204 C8,7.24353741 7.89670404,7.48979592 7.69011213,7.69387755 C7.48352022,7.89795918 7.23615358,8 6.94801223,8 C6.65987088,8 6.41522256,7.89931973 6.21406728,7.69795918 L3.99592253,5.48571429 L1.78593272,7.69795918 C1.58477744,7.89931973 1.33741081,8 1.04383282,8 C0.755691471,8 0.509683996,7.89931973 0.305810398,7.69795918 C0.101936799,7.49659864 0,7.25170068 0,6.96326531 C0,6.66938776 0.100577642,6.42176871 0.301732926,6.22040816 L2.51987768,4.00816327 L0.301732926,1.7877551 C0.100577642,1.58639456 0,1.3414966 0,1.05306122 C0,0.76462585 0.101936799,0.517006803 0.305810398,0.310204082 C0.509683996,0.103401361 0.755691471,0 1.04383282,0 C1.33197418,0 1.57934081,0.103401361 1.78593272,0.310204082 L3.99592253,2.53061224 L6.21406728,0.310204082 C6.42065919,0.103401361 6.66530751,0 6.94801223,0 L6.94801223,0 Z"></path>`
  },

  send: {
    viewBox: '0 0 20 20',
    svg: svg`<path d="M5.03704635,10.7541907 L7.42180053,10.5252487 C7.69667911,10.4988597 7.89811972,10.2546341 7.87173073,9.97975549 C7.84925662,9.74565598 7.66667952,9.55886065 7.4331543,9.53104628 L5.03704635,9.24565424 L5.03704635,9.24565424 C4.72354994,9.20132367 4.46176429,8.98902014 4.35901009,8.69577882 L2.04589833,2.0945898 C1.89460363,1.66282299 2.12958701,1.19277007 2.57074839,1.04469721 C2.79489852,0.969462724 3.04103331,0.9898631 3.249064,1.100918 L18.5597508,9.27436031 C18.9691867,9.49293317 19.1200564,9.99496674 18.8967278,10.3956837 C18.8190834,10.5350003 18.7020988,10.6494937 18.5597508,10.7254846 L3.249064,18.8989269 C2.83962811,19.1174998 2.32667107,18.9698429 2.1033424,18.569126 C1.98987111,18.3655253 1.96902686,18.124632 2.04589833,17.9052551 L4.35901009,11.3040661 C4.46176429,11.0108248 4.72354994,10.7985213 5.03704635,10.7541907 Z"></path>`
  },

  shiftOvernight: {
    viewBox: '0 0 14.045 13.82',
    svg: svg`
    <path class="cls-1" d="M12.8425,8.1523A.9241.9241,0,0,1,13.93,9.4158a7.255,7.255,0,0,1-7.3557,4.3734A7.17,7.17,0,0,1,.0311,6.0212,7.1536,7.1536,0,0,1,4.4956.07a.9235.9235,0,0,1,1.2387,1.12A5.513,5.513,0,0,0,7.7564,7.3361a5.6967,5.6967,0,0,0,5.0861.8162"/>`
  },

  skeduloText: {
    viewBox: '0 0 4004.9 1000',
    svg: svg`
     <g>
      <path class="st0" d="M900,0H100C44.8,0,0,44.8,0,100v800c0,55.2,44.8,100,100,100h800c55.2,0,100-44.8,100-100V100
        C1000,44.8,955.2,0,900,0z M306.9,175c131.9,0,386.3,0,386.3,0s131.9,0,131.9,131.5H482.8H175C175,306.5,175,175,306.9,175z
        M517.6,434.3c0,0,44.6,0,176,0S825,565.7,825,565.7H693.6H307c0,0-132,0-132-131.5H517.6z M693.6,825c-132,0-386.6,0-386.6,0
        s-132,0-132-131.5h342.6h308C825.6,693.5,825.6,825,693.6,825z"/>
      <path class="st0" d="M1757,562.9l146.7-222.7l3.1-4.6l-5.5-0.8c-8.6-1.2-17.1-2.2-25.4-2.8c-8.3-0.6-17.1-0.9-26.4-0.9
        c-8.6,0-17,0.3-25,0.9c-8,0.6-16.1,1.5-24.1,2.8l-1.5,0.2l-0.9,1.3l-140,212.3V126.5h-103V818h103V579.9l164.8,230.9l0.9,1.2
        l1.5,0.2c8.6,1.2,17.3,2.2,25.9,2.8c8.6,0.6,17.3,0.9,25.9,0.9c8.6,0,17-0.3,25-0.9c8-0.6,16.3-1.5,25-2.8l5.6-0.8l-3.3-4.7
        L1757,562.9z"/>
      <path class="st0" d="M1455.9,577.3c-9.8-10.4-21.4-19-34.9-25.9c-13.3-6.8-27.4-12.7-42.2-17.6l-40.3-13.7
        c-11-3.7-21.2-7.3-30.6-11c-9.2-3.6-17.4-7.9-24.5-12.9c-6.9-4.9-12.4-10.8-16.4-17.7c-3.9-6.8-5.9-15-5.9-24.8
        c0-18.8,7.9-31.6,24.1-39c16.9-7.7,36.5-11.6,58.6-11.6c21.1,0,40.9,2.3,59.2,6.8c18.5,4.6,34.5,9.3,47.8,14.1l3,1.1l1.4-2.9
        c5-10.6,9.2-22.1,12.6-34.5s5.7-24.8,7-37.3l0.3-2.7l-2.6-0.9c-17.3-6.2-37.5-11.6-60.5-16.2c-23.1-4.6-46.8-6.9-70.8-6.9
        c-58.2,0-102.5,12.4-132.9,37.5c-30.5,25.1-45.7,59.2-45.7,101.8c0,32,9.2,57.7,27.6,76.7c18.1,18.8,47,35.5,86.6,50.4l32.1,11.9
        c11.7,3.7,22.5,7.5,32.5,11.4c9.8,3.9,18.4,8.5,25.8,13.8c7.2,5.2,13,11.6,17.4,19.1c4.3,7.4,6.4,16.9,6.4,28.5
        c0,10.3-2.7,19.6-8.1,27.9c-5.5,8.4-12.8,15.6-21.9,21.4c-9.1,5.9-19.9,10.3-32.4,13.3c-12.6,3-25.7,4.5-39.5,4.5
        c-19.3,0-38.8-2-58.5-5.9c-19.7-3.9-37.6-9.2-53.9-15.9l-3.3-1.3l-1.3,3.3c-4.9,12.3-9.4,24.8-13.4,37.4c-4,12.8-6.7,25.4-7.9,37.9
        l-0.3,2.7l2.6,0.9c19.1,6.8,39.8,12.2,62,16.2c22.2,4,48.1,6,77.6,6c29.1,0,55.7-3.7,79.9-11.2c24.2-7.5,44.9-17.9,62.1-31.3
        c17.2-13.5,30.5-29.8,40-48.9c9.4-19.1,14.1-40.3,14.1-63.5c0-20.6-3-38.3-9-53.1C1473.6,600.3,1465.7,587.7,1455.9,577.3z"/>
      <path class="st0" d="M2287.7,386.6c-16.8-19.7-37.7-35.1-62.6-46.3c-24.9-11.2-53.8-16.8-86.7-16.8c-38.4,0-71.8,6.7-100.1,20.1
        c-28.3,13.4-51.8,31.4-70.4,54.1c-18.6,22.7-32.5,49.4-41.5,80.1c-9,30.6-13.4,63.5-13.4,98.7c0,35.8,4.6,68.7,13.9,98.7
        c9.3,30.1,24.1,56.3,44.3,78.4c20.2,22.1,45.9,39.2,77,51.3c31,12.1,68.1,18.1,111.3,18.1c29.5,0,56.5-2.2,80.8-6.5
        c24.4-4.3,46.8-10.8,67.2-19.5l2.2-1l-0.1-2.4c-0.6-13.1-2.5-26.3-5.6-39.6c-3.1-13.4-7.2-24.9-12.2-34.3l-1.5-2.7l-2.9,1.1
        c-38.7,15.1-79.5,22.7-122.5,22.7c-48.7,0-85.3-11.7-109.9-34.8c-24.6-23.1-37.6-56.3-38.8-106.8h316.5h3.2l0.3-3.2
        c0.6-6.8,1.2-14.9,1.8-24.4c0.6-9.6,0.9-18.6,0.9-27.3c0-31.5-4.3-60.8-13-87.7C2317.3,429.6,2304.5,406.3,2287.7,386.6z
        M2249.5,531.5h-3.5h-232h-3.9l0.4-3.9c4.4-41.1,16.7-73.2,37.1-96.5c20.6-23.4,50.1-35.2,88.4-35.2c19.5,0,36.4,3.6,50.7,10.9
        c14.2,7.3,25.9,16.9,35.1,29c9.1,12,16,26,20.7,42c4.7,15.9,7,32.6,7,50.1V531.5z"/>
      <path class="st0" d="M2776.3,129.9c-8.3-0.6-15.9-0.9-22.7-0.9c-6.2,0-13.6,0.3-22.2,0.9c-8.7,0.6-16.4,1.6-23.3,2.8l-2.9,0.5v2.9
        v200.1c-12.4-3.7-22.2-5.7-38.6-8.2c-16.4-2.5-32.6-3.7-48.6-3.7c-35.9,0-68.6,6.2-98,18.6c-29.5,12.4-54.8,30-75.9,52.7
        c-21.1,22.7-37.4,49.8-48.8,81.4c-11.4,31.6-17.2,66.5-17.2,104.8c0,44.5,6.5,81.9,19.5,112.4c13,30.4,30.8,55.3,53.2,74.7
        c22.4,19.3,48.7,33.1,78.8,41.5c29.9,8.3,61.6,12.5,94.9,12.5c35.6,0,67.9-2.3,96.8-6.9c28.9-4.6,55-10.3,78.3-17.1l2.5-0.7v-2.6
        V136.2v-2.9l-2.9-0.5C2792.3,131.5,2784.7,130.5,2776.3,129.9z M2709,734.8c-10.4,3.1-22.3,5.3-35.8,6.9c-13.4,1.5-28.1,2.3-44,2.3
        c-46.4,0-83.1-12.5-110-37.6c-26.9-25.1-40.6-66.6-41.2-124.7c0-25.7,2.9-49.3,8.7-71c5.8-21.7,14.7-40.5,26.6-56.4
        c11.9-15.9,27-28.4,45.4-37.6c18.3-9.2,40-13.8,65.1-13.8c16.5,0,31.8,1.2,45.8,3.7c14.1,2.4,27.2,6.1,39.4,11V734.8z"/>
      <path class="st0" d="M3237.3,331.9c-8.3-0.6-15.9-0.9-22.7-0.9c-6.8,0-14.4,0.3-22.7,0.9c-8.4,0.6-16,1.6-22.8,2.8l-2.9,0.5v2.9
        v392.5c-21.2,6.1-46.6,9.2-76.3,9.2c-20.5,0-38.6-2.1-54.1-6.3c-15.3-4.1-28.2-11.5-38.8-22c-10.6-10.6-18.5-25.2-23.9-43.9
        c-5.4-18.9-8.1-42.9-8.1-71.9V338.2v-2.9l-2.9-0.5c-6.9-1.2-14.6-2.2-23.3-2.8c-8.6-0.6-16.4-0.9-23.2-0.9
        c-6.2,0-13.6,0.3-22.3,0.9c-8.7,0.6-16.5,1.6-23.3,2.8l-2.9,0.5v2.9v261.3c0,47.5,5.9,85.8,17.7,115c11.8,29.3,28.1,52.1,48.8,68.4
        c20.6,16.2,44.5,27,71.7,32.3c26.8,5.2,55.3,7.9,85.5,7.9c32,0,63-2.8,92.8-8.3c29.8-5.5,55.4-11.4,76.9-17.5l2.5-0.7v-2.6V338.2
        v-2.9l-2.9-0.5C3253.3,333.5,3245.7,332.5,3237.3,331.9z"/>
      <path class="st0" d="M3522.3,733.7l-3.4,0.8c-4.7,1.2-10.5,2.1-17.3,2.7c-6.9,0.6-13.1,0.9-18.5,0.9c-7.7,0-14.9-0.7-21.7-2.2
        c-6.4-1.4-11.9-4.4-16.6-9.1c-4.8-4.8-8.6-11.8-11.5-21c-2.9-9.4-4.4-22.5-4.4-39.3V136.2v-2.9l-2.9-0.5
        c-6.9-1.2-14.5-2.2-22.8-2.8c-8.3-0.6-15.9-0.9-22.7-0.9c-6.8,0-14.4,0.3-22.7,0.9c-8.4,0.6-16,1.6-22.8,2.8l-2.9,0.5v2.9v550.4
        c0,24.9,3.4,45.8,10.3,62.8c6.9,17,16.4,30.6,28.5,40.8c12,10.1,25.9,17.4,41.6,21.8c15.6,4.4,32.4,6.6,50.4,6.6
        c10.5,0,21.9-0.5,34.2-1.4c12.5-0.9,23.2-3,32.1-6.2l2.3-0.8v-2.5c0-25.4-2.8-48.9-8.4-70.6L3522.3,733.7z"/>
      <path class="st0" d="M3953.6,475.5c-9-30.4-22.8-56.8-41.5-79.2c-18.7-22.4-42-40.2-70-53.2c-28-13.1-60.6-19.6-97.8-19.6
        s-69.8,6.5-97.8,19.6c-28,13.1-51.3,30.8-70,53.2c-18.7,22.4-32.5,48.8-41.5,79.2c-9,30.3-13.4,63-13.4,98.2
        c0,35.2,4.5,67.9,13.4,98.2c9,30.4,22.8,56.8,41.5,79.2c18.7,22.4,42,40,70,52.8c28,12.8,60.6,19.1,97.8,19.1s69.8-6.4,97.8-19.1
        c28-12.7,51.4-30.3,70-52.8c18.7-22.4,32.5-48.8,41.5-79.2c9-30.3,13.4-63,13.4-98.2C3967,538.5,3962.5,505.8,3953.6,475.5z
        M3834.8,699.2c-19.5,29.6-49.5,44.3-90.5,44.3c-41,0-70.9-14.7-90.1-44.3c-19.4-30-29.2-71.8-29.2-125.7
        c0-53.8,9.8-95.5,29.2-125.2c19.2-29.3,49.1-43.8,90.1-43.8c41,0,71.1,14.6,90.6,43.9c19.7,29.6,29.7,71.4,29.7,125.2
        C3864.5,627.4,3854.6,669.2,3834.8,699.2z"/>
    </g>`
  },

  skedulo: {
    viewBox: '0 0 30 30',
    svg: svg`
      <g stroke="none" stroke-width="1" fill-rule="evenodd">
          <path d="M0,3.9992748 C0,1.79053632 1.78679466,0 3.9992748,0 L26.0007252,0 C28.2094637,0 30,1.78679466 30,3.9992748 L30,26.0007252 C30,28.2094637 28.2132053,30 26.0007252,30 L3.9992748,30 C1.79053632,30 0,28.2132053 0,26.0007252 L0,3.9992748 Z M9.21,24.75 C9.21,24.75 5.25,24.75 5.25,20.8058401 C5.25,20.8058401 15.5266992,20.80584 15.5266992,20.80584 C15.5266992,20.80584 24.7666992,20.80584 24.7666992,20.80584 C24.7666992,20.80584 24.7666992,24.7499999 20.8066992,24.7499999 C16.8466992,24.7499999 9.21,24.75 9.21,24.75 Z M9.21,16.97208 C9.21,16.97208 5.25,16.97208 5.25,13.0279201 C5.25,13.0279201 15.5266992,13.02792 15.5266992,13.02792 C15.5266992,13.02792 16.8633984,13.02792 20.8066992,13.02792 C24.75,13.02792 24.75,16.9720799 24.75,16.97208 C24.75,16.97208 20.8066992,16.97208 20.8066992,16.9720799 C20.8066992,16.9720798 9.21,16.97208 9.21,16.97208 Z M20.7947034,5.24999989 C20.7947034,5.24999989 24.7516498,5.24999989 24.7516498,9.19415977 C24.7516498,9.19415977 14.482875,9.19415989 14.482875,9.19415989 C14.482875,9.19415989 5.25,9.19415987 5.25,9.19415989 C5.25,9.19415991 5.25,5.25 9.20694642,5.25 C13.1638928,5.25 20.7947034,5.24999989 20.7947034,5.24999989 Z"></path>
      </g>`
  },

  tag: {
    viewBox: '0 0 24 24',
    svg: svg`
    <path class="st0" d="M15.3,6.3C15.1,6.1,14.9,6,14.6,6H4.7C3.8,6,3,6.8,3,7.7v8.6c0,0.4,0.2,0.9,0.5,1.2C3.8,17.8,4.2,18,4.7,18h9.9
      c0.3,0,0.5-0.1,0.7-0.3l5-5c0.4-0.4,0.4-1,0-1.4L15.3,6.3z M15,13.2c-0.7,0-1.2-0.5-1.2-1.2c0-0.7,0.5-1.2,1.2-1.2
      c0.7,0,1.2,0.5,1.2,1.2S15.7,13.2,15,13.2C15,13.2,15,13.2,15,13.2z"/>
  `
  },

  tick: {
    viewBox: '0 0 17.99 14.390',
    svg: svg`<path d="M7.39,13.84,17.46,3.3a2,2,0,0,0,0-2.73A1.77,1.77,0,0,0,16.16,0h0a1.75,1.75,0,0,0-1.29.57L6.21,9.63l-.11.12L6,9.63l-2.87-3a1.8,1.8,0,0,0-2.59,0,2,2,0,0,0,0,2.73l4.08,4.32.1.11h0l.14.15.05,0a1.83,1.83,0,0,0,1.22.46A1.73,1.73,0,0,0,7.39,13.84Z"/>`
  },

  unschedule: {
    viewBox: '0 0 20 20',
    svg: svg`
      <path d="M7,14.1c-0.2,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-0.9,0-1.3l2.4-2.4L6.3,7.6C6,7.3,6,6.7,6.3,6.3
        C6.5,6.2,6.7,6.1,7,6.1c0.3,0,0.5,0.1,0.7,0.3l2.4,2.4l2.4-2.4c0.4-0.4,0.9-0.4,1.3,0c0.4,0.4,0.4,0.9,0,1.3l-2.4,2.4l2.4,2.4
        c0.4,0.4,0.4,0.9,0,1.3c-0.2,0.2-0.4,0.3-0.7,0.3c0,0,0,0,0,0c-0.2,0-0.5-0.1-0.7-0.3l-2.4-2.4l-2.4,2.4C7.5,14,7.2,14.1,7,14.1
        C7,14.1,7,14.1,7,14.1z"/>
      <path d="M10,20c-1.5,0-3-0.3-4.4-1c-2.4-1.2-4.2-3.2-5.1-5.7C-1.2,8,1.5,2.3,6.7,0.5c5.2-1.8,10.9,1,12.7,6.2
        c1.8,5.2-1,10.9-6.2,12.7l0,0C12.2,19.8,11.1,20,10,20z M12.9,18.5L12.9,18.5L12.9,18.5z M10,2C9.1,2,8.3,2.1,7.4,2.4
        c-4.2,1.4-6.4,6-5,10.2c0.7,2,2.1,3.6,4.1,4.6c1.9,0.9,4.1,1.1,6.1,0.4c4.2-1.4,6.4-6,5-10.2C16.4,4.1,13.3,2,10,2z"/>`
  },

  upDown: {
    viewBox: '0 0 10 18',
    svg: svg`<path d="M8.74818914,5.57757178 C9.10122662,5.22949983 9.09992902,4.66388436 8.74089535,4.30990056 L5.65231403,1.26476075 C5.29524829,0.912717214 4.71829829,0.910776954 4.35926462,1.26476075 L1.2706833,4.30990056 C0.913617563,4.6619441 0.908617118,5.22778933 1.26338951,5.57757178 L1.32624321,5.63954142 C1.67928069,5.98761337 2.24605009,5.99315182 2.61024678,5.63407763 L5.00578932,3.27222886 L7.40133187,5.63407763 C7.75742997,5.98516714 8.33056305,5.98932387 8.68533544,5.63954142 L8.74818914,5.57757178 Z M1.26338951,12.4302063 C0.910352023,12.7782783 0.911649623,13.3438938 1.2706833,13.6978776 L4.35926462,16.7430174 C4.71633035,17.0950609 5.29328035,17.0970012 5.65231403,16.7430174 L8.74089535,13.6978776 C9.09796108,13.345834 9.10296153,12.7799888 8.74818914,12.4302063 L8.68533544,12.3682367 C8.33229795,12.0201647 7.76552856,12.0146263 7.40133187,12.3737005 L5.00578932,14.7355492 L2.61024678,12.3737005 C2.25414867,12.022611 1.6810156,12.0184542 1.32624321,12.3682367 L1.26338951,12.4302063 Z"></path>`
  },

  warningFill: {
    viewBox: '0 0 19 17',
    svg: svg`<path class="cls-1" d="M18.84,15.8,11.36,1.67a2.17,2.17,0,0,0-.84-.85A2,2,0,0,0,9.47.5a2.22,2.22,0,0,0-1.9,1.17L.09,15.8A1.21,1.21,0,0,0,1,17.5H17.89a.94.94,0,0,0,.53-.11A1.18,1.18,0,0,0,18.84,15.8Zm-9.35-.72a1,1,0,1,1,1-1A1,1,0,0,1,9.49,15.08Zm1-4a1,1,0,0,1-2,0v-5a1,1,0,1,1,2,0Z" transform="translate(0.01 -0.5)"/>`
  }
}
