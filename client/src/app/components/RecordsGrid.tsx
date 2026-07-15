import { Record } from "../config/config"
import RecordItem from "./RecordItem"

type Props = {
  records: Record[]
  setRecords: React.Dispatch<React.SetStateAction<Record[]>>
}

export default function RecordsGrid({ records, setRecords }: Props) {
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

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {records.map((record) => (
        <RecordItem key={record.id} record={record} setRecords={setRecords} />
      ))}
    </div>
  )
}
