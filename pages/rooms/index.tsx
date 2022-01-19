import { Box, Group, Title } from "@mantine/core";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import TableRow from "../../components/Rooms/TableRow";
import SimpleTable from "../../components/SimpleTable";
import PageContainer from "../../containers/PageContainer";
import { getAllRooms } from "../../db/apiCalls";

const COLUMNS = [{ label: "Numero" }, { label: "Espacio" }];

const Rooms: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [rooms, setRooms] = useState<object[] | null>(null);

  useEffect(() => {
    getRooms();
  }, []);

  /**
   * Method for fetching all bookings
   */
  const getRooms = async () => {
    setLoading(true);
    const { data, error } = await getAllRooms();

    if (error) {
      // TODO: show notification
      setLoading(false);
      return;
    }
    setRooms(data);
    setLoading(false);
  };
  return (
    <PageContainer>
      <Group direction="column" style={{ width: "100%" }}>
        <Title>Habitaciones</Title>
        <Box
          sx={(theme) => ({
            height: "100%",
            width: "100%",
            paddingInline: theme.spacing.lg,
          })}
        >
          <SimpleTable columns={COLUMNS} loading={loading}>
            {rooms && rooms.map((e, i) => <TableRow key={i} room={e} />)}
          </SimpleTable>
        </Box>
      </Group>
    </PageContainer>
  );
};

interface Column {
  label: string;
}

export default Rooms;
