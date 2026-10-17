import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

import { lightPalette } from '@/theme/palette';

export interface ExcelColumn<T> {
  header: string;
  key: keyof T & string;
  width?: number;
  /** تبدیل مقدار قبل از نوشتن در سلول */
  format?: (value: T[keyof T], row: T) => string | number | Date | null;
}

export interface ExportExcelOptions<T> {
  fileName: string;
  sheetName?: string;
  columns: ExcelColumn<T>[];
  rows: T[];
}

const toArgb = (hex: string) => `FF${hex.replace('#', '').toUpperCase()}`;

const thinBorder: Partial<ExcelJS.Borders> = {
  top: { style: 'thin', color: { argb: toArgb(lightPalette.line) } },
  bottom: { style: 'thin', color: { argb: toArgb(lightPalette.line) } },
  left: { style: 'thin', color: { argb: toArgb(lightPalette.line) } },
  right: { style: 'thin', color: { argb: toArgb(lightPalette.line) } },
};

/** ساخت فایل اکسل راست‌به‌چپ با هدر استایل‌دار و دانلود آن */
export const exportToExcel = async <T extends object>({
  fileName,
  sheetName = 'Sheet1',
  columns,
  rows,
}: ExportExcelOptions<T>) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(sheetName, { views: [{ rightToLeft: true }] });

  sheet.columns = columns.map((col) => ({
    header: col.header,
    key: col.key,
    width: col.width ?? 20,
  }));

  rows.forEach((row) => {
    const record: Record<string, unknown> = {};
    columns.forEach((col) => {
      const value = row[col.key];
      record[col.key] = col.format ? col.format(value, row) : value;
    });
    sheet.addRow(record);
  });

  const header = sheet.getRow(1);
  header.height = 24;
  header.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, name: 'Tahoma' };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: toArgb(lightPalette.primary) },
    };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = thinBorder;
  });

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    row.eachCell((cell) => {
      cell.font = { name: 'Tahoma' };
      cell.alignment = { vertical: 'middle', horizontal: 'right' };
      cell.border = thinBorder;
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const name = fileName.endsWith('.xlsx') ? fileName : `${fileName}.xlsx`;
  saveAs(
    new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }),
    name,
  );
};

const cellToPrimitive = (value: ExcelJS.CellValue): unknown => {
  if (value && typeof value === 'object') {
    if (value instanceof Date) return value;
    if ('result' in value) return value.result;
    if ('text' in value) return value.text;
    if ('richText' in value) return value.richText.map((part) => part.text).join('');
  }
  return value;
};

/**
 * خواندن اولین شیت فایل اکسل. ردیف اول به‌عنوان هدر در نظر گرفته می‌شود
 * و خروجی آرایه‌ای از آبجکت‌ها با کلیدِ عنوان ستون است.
 */
export const readExcel = async <T = Record<string, unknown>>(file: File | Blob): Promise<T[]> => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(await file.arrayBuffer());
  const sheet = workbook.worksheets[0];
  if (!sheet) return [];

  const headers: string[] = [];
  sheet.getRow(1).eachCell((cell, col) => {
    headers[col] = String(cellToPrimitive(cell.value) ?? '').trim();
  });

  const result: T[] = [];
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const record: Record<string, unknown> = {};
    row.eachCell({ includeEmpty: true }, (cell, col) => {
      const key = headers[col];
      if (key) record[key] = cellToPrimitive(cell.value);
    });
    result.push(record as T);
  });
  return result;
};
