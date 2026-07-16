import { useState } from "react"
import RecordItem from "./RecordItem"
import { Grid, type CellComponentProps } from "react-window"
import type { Record } from "../config/config"

type Props = {
  records: Record[]
  setRecords: React.Dispatch<React.SetStateAction<Record[]>>
}

type CellProps = {
  records: Record[]
  setRecords: React.Dispatch<React.SetStateAction<Record[]>>
  columnCount: number
}

const GAP = 16
const ROW_HEIGHT = 320

const getColumnCount = (width: number) => {
  if (width < 480) return 1
  if (width < 840) return 2
  return 3
}

const Cell = ({
  columnIndex,
  rowIndex,
  style,
  records,
  setRecords,
  columnCount,
}: CellComponentProps<CellProps>) => {
  const index = rowIndex * columnCount + columnIndex
  const record = records[index]

  if (!record) return null

  return (
    <div style={{ ...style, padding: GAP / 2, boxSizing: "border-box" }}>
      <RecordItem record={record} setRecords={setRecords} />
    </div>
  )
}

export default function RecordsGrid({ records, setRecords }: Props) {
  const [columnCount, setColumnCount] = useState(3)

  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border py-16 text-center">
        <p className="font-medium text-foreground">No records found</p>
        <p className="text-sm text-muted">
          Add a record above or try a different category filter
        </p>
      </div>
    )
  }

  const rowCount = Math.ceil(records.length / columnCount)

  return (
    <Grid
      cellComponent={Cell}
      cellProps={{
        records,
        setRecords,
        columnCount,
      }}
      columnCount={columnCount}
      columnWidth={`${100 / columnCount}%`}
      rowCount={rowCount}
      rowHeight={ROW_HEIGHT}
      style={{ width: "100%", height: 640 }}
      overscanCount={2}
      onResize={({ width }) => setColumnCount(getColumnCount(width))}
    />
  )
}
