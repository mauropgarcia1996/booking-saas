import { Text } from "@mantine/core";
import { formatDate } from "../../utils/date";

const TableRow = ({ room }: any) => {
  return (
    <tr>
      <td>Hab. {room.number}</td>
      <td>{room.size} personas.</td>
    </tr>
  );
};

export default TableRow;
