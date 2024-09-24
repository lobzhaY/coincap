import { Link } from "react-router-dom";
import { DataTableType } from "../item-table";
import { getChangePercentColor } from "../../../../../utils";

export const showLink = (
  text: string,
  rowIndex: DataTableType,
  name: string
) => {
  return rowIndex.key === "Explorer" ? (
    <Link to={text}>{name}</Link>
  ) : (
    <div>{text}</div>
  );
};

export const getStyleById = (record: DataTableType) => ({
  style: {
    color:
      record.id == "changePercent24Hr"
        ? getChangePercentColor(record.value)
        : "",
    fontWeight: record.id == "priceUsd" ? "bold" : "",
  },
});
