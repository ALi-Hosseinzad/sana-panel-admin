import { useRef } from 'react';
import { useReactToPrint, type UseReactToPrintOptions } from 'react-to-print';

const RTL_PAGE_STYLE = `
  @page { size: auto; margin: 12mm; }
  @media print {
    html, body { direction: rtl; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .sana-no-print { display: none !important; }
  }
`;

/**
 * پرینت بخشی از صفحه.
 * `ref` را روی المان مورد نظر بگذارید و `print()` را صدا بزنید.
 */
export const usePrint = <T extends HTMLElement = HTMLDivElement>(
  options: Omit<UseReactToPrintOptions, 'contentRef'> = {},
) => {
  const ref = useRef<T>(null);
  const print = useReactToPrint({ pageStyle: RTL_PAGE_STYLE, ...options, contentRef: ref });
  return { ref, print };
};
