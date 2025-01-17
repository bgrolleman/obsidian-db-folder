import React, { useState } from "react";
import { DateTime } from "luxon";
import DatePicker from "react-datepicker";
import { Portal } from "@mui/material";
import { CellComponentProps } from "cdm/ComponentsModel";
import { TableColumn } from "cdm/FolderModel";

const CalendarTimePortal = (calendarTimeProps: CellComponentProps) => {
  const { defaultCell } = calendarTimeProps;
  const { row, table, column } = defaultCell;
  const { tableState, view } = table.options.meta;
  const tableColumn = column.columnDef as TableColumn;
  const dataActions = tableState.data((state) => state.actions);

  const calendatTimeRow = tableState.data((state) => state.rows[row.index]);

  const columnsInfo = tableState.columns((state) => state.info);

  const configInfo = tableState.configState((state) => state.info);

  // Calendar state
  const calendarTimeState = calendatTimeRow[tableColumn.key];

  /** state of cell value */
  const [showDatePicker, setShowDatePicker] = useState(false);

  function handleSpanOnClick(event: any) {
    event.preventDefault();
    setShowDatePicker(true);
  }

  function handleCalendarChange(date: Date) {
    const changed = date !== null ? DateTime.fromJSDate(date) : null;
    dataActions.updateCell(
      row.index,
      tableColumn,
      changed,
      columnsInfo.getAllColumns(),
      configInfo.getLocalSettings()
    );
    setShowDatePicker(false);
  }

  const CalendarContainer = (containerProps: any) => {
    return (
      <Portal container={activeDocument.body}>{containerProps.children}</Portal>
    );
  };

  return showDatePicker &&
    (tableColumn.isMetadata === undefined || !tableColumn.isMetadata) ? (
    <div className="calendar-time">
      <DatePicker
        dateFormat={configInfo.getLocalSettings().datetime_format}
        selected={
          DateTime.isDateTime(calendarTimeState)
            ? (calendarTimeState as unknown as DateTime).toJSDate()
            : null
        }
        onChange={handleCalendarChange}
        popperContainer={CalendarContainer}
        onBlur={() => setShowDatePicker(false)}
        timeFormat="HH:mm"
        timeCaption="time"
        showTimeSelect
        autoFocus
        isClearable
        clearButtonTitle="Clear"
        placeholderText="Pick a moment..."
      />
    </div>
  ) : (
    <div onClick={handleSpanOnClick}>
      <span className="calendar-time" style={{ width: column.getSize() }}>
        {DateTime.isDateTime(calendarTimeState)
          ? (calendarTimeState as DateTime).toFormat(
              configInfo.getLocalSettings().datetime_format
            )
          : null}
      </span>
    </div>
  );
};

export default CalendarTimePortal;
