type DataTableProps = { rows: string[][] };
export function DataTable({ rows }: DataTableProps) {
  return (
    <div className="panel data-table">
      {rows.map(([label, value]) => (
        <div key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}
