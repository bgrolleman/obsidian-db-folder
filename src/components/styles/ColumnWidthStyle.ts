import { TableColumn } from "cdm/FolderModel";
import { ColumnWidthState } from "cdm/StyleModel";
import { MetadataColumns } from "helpers/Constants";
import { getNormalizedPath } from "helpers/VaultManagement";
import { Row } from "react-table";

const getColumnWidthStyle = (rows: Array<Row<object>>, accessor: string, headerText: string, customMaxWidth?: number): number => {
  const maxWidth = (customMaxWidth ?? 400)
  const IconsSpacing = 15;
  const magicSpacing = 10;

  const cellLength = Math.max(
    ...rows.map((row: any) => lengthOfNormalizeCellValue(row, accessor)),
    headerText.length, IconsSpacing
  )
  return Math.min(maxWidth, cellLength * magicSpacing)
}

const lengthOfNormalizeCellValue = (row: any, accessor: string): number => {
  const value = (`${row.original[accessor]}` || '');
  switch (accessor) {
    case MetadataColumns.FILE:
      return getNormalizedPath(value).alias.length
  }
  return value.length
}

const getColumnsWidthStyle = (rows: Array<Row<object>>, columns: TableColumn[]): ColumnWidthState => {
  const columnWidthStyle: ColumnWidthState = {
    widthRecord: {},
    totalWidth: 0
  }
  columns.forEach((column: TableColumn) => {
    columnWidthStyle.widthRecord[column.id] = getColumnWidthStyle(rows, column.key, column.label);
    columnWidthStyle.totalWidth += columnWidthStyle.widthRecord[column.id];
  })
  return columnWidthStyle
}
export default getColumnsWidthStyle;