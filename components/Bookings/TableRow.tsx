import { Text } from "@mantine/core";
import { formatDate } from "../../utils/date";

const TableRow = ({ booking }: any) => {
  return (
    <tr>
      <td>
        {booking.guest_id.given_name} {booking.guest_id.family_name}
      </td>
      <td>
        {booking.rooms.map((e: string, i: number) => (
          <Text key={i}>Num. {e}</Text>
        ))}
      </td>
      <td>{formatDate(booking.from)}</td>
      <td>{formatDate(booking.to)}</td>
    </tr>
  );
};

export default TableRow;
