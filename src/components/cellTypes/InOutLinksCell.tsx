import { CellComponentProps } from "cdm/ComponentsModel";
import { renderMarkdown } from "components/obsidianArq/MarkdownRenderer";
import { c } from "helpers/StylesHelper";
import { Link } from "obsidian-dataview";
import React, { useEffect, useRef } from "react";

const InOutLinksCell = (mdProps: CellComponentProps) => {
  const { defaultCell } = mdProps;
  const { table, row, column } = defaultCell;
  const { tableState } = table.options.meta;
  const markdownRow = tableState.data((state) => state.rows[row.index]);
  const mdRef = useRef<HTMLDivElement>();
  useEffect(() => {
    if (mdRef.current !== null) {
      mdRef.current.innerHTML = "";
      const links = markdownRow[column.id] as Link[];
      const markdownLinks: string[] = [];
      links.forEach((link) => {
        markdownLinks.push(`- ${link.markdown()}`);
      });
      renderMarkdown(defaultCell, markdownLinks.join("\n"), mdRef.current, 5);
    }
  });
  return <span ref={mdRef} className={c("md_cell text-align-left")}></span>;
};

export default InOutLinksCell;
