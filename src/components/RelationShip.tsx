import React from "react";
import { RelationshipProps } from "cdm/FolderModel";
import { c } from "helpers/StylesHelper";

export default function Relationship(relationShipProps: RelationshipProps) {
  const { value, backgroundColor } = relationShipProps;
  return (
    <span
      className={c("relationship")}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      {value && value.toString()}
    </span>
  );
}
