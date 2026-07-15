import { Record } from "../config/config"
import RecordItem from "./RecordItem"

type Props = {
  records: Record[]
}

export default function RecordsGrid({ records }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {records.length === 0
        ? "No record found"
        : records.map((record) => (
            <RecordItem key={record.id} record={record} />
          ))}
    </div>
  )
}
