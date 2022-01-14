import { Text } from "@mantine/core";

const TableRow = ({ booking }: any) => {
  return (
    <tr>
      <td>
        {booking.guest_id.given_name} {booking.guest_id.family_name}
      </td>
      <td>
        {booking.rooms.map((e, i) => (
          <Text key={i}>Num. {e}</Text>
        ))}
      </td>
      <td>{booking.from}</td>
      <td>{booking.to}</td>
    </tr>
  );
};

export default TableRow;
