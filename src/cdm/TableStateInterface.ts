import { ColumnSort, SortingState } from "@tanstack/react-table";
import { InitialType, RowDataType, TableColumn } from "cdm/FolderModel";
import { GlobalSettings, LocalSettings } from "cdm/SettingsModel";
import { StoreApi, UseBoundStore } from "zustand";

export interface ConfigState {
    ddbbConfig: LocalSettings;
    global: GlobalSettings;
    alterConfig: (config: Partial<LocalSettings>) => void;
}
export interface InitialState {
    state: InitialType;
    alterSortBy: (sortBy: ColumnSort[]) => void;
}
export interface DataState {
    rows: RowDataType[];
    add: (row: RowDataType) => void;
    remove: (row: RowDataType) => void;
    removeDataOfColumn: (column: TableColumn) => void;
}

export interface ColumnsState {
    state: TableColumn[];
    add: (column: TableColumn, position: number) => void;
    remove: (column: TableColumn) => void;
    alterSorting: (column: TableColumn) => void;
}
export interface ColumnSortingState {
    state: SortingState;
    modify: (alternativeSorting: SortingState) => void;
    generateSorting: (currentCol: TableColumn, isSortedDesc: boolean) => SortingState;
}
export interface RowTemplateState {
    template: string;
    folder: string;
    options: { value: string, label: string }[],
    clear: () => void;
    update: (template: string) => void;
}

export interface TableStateInterface {
    initialState: UseBoundStore<StoreApi<InitialState>>;
    configState: UseBoundStore<StoreApi<ConfigState>>;
    rowTemplate: UseBoundStore<StoreApi<RowTemplateState>>;
    data: UseBoundStore<StoreApi<DataState>>;
    sorting: UseBoundStore<StoreApi<ColumnSortingState>>;
    columns: UseBoundStore<StoreApi<ColumnsState>>;
}