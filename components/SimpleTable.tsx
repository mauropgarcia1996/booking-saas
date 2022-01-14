import { Card, Table, Text } from "@mantine/core";

/**
 * Renders a Table
 * @param columns columns to include in the table 
 * @param loading boolean indicating the loading state 
 * @param children rows to include in the table 
 * @returns SimpleTable Component
 */
const SimpleTable = ({ columns, loading, children }: any) => {
  return (
    <Card withBorder shadow="lg">
      <Table highlightOnHover>
        <thead>
          <tr>
            {columns.map((e: Column, i: number) => (
              <th key={i}>{e.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length}>Cargando...</td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </Table>
    </Card>
  );
};

interface Column {
  label: string
}

export default SimpleTable;
