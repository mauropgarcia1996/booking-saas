import { Box, Group, Text, Title } from "@mantine/core";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import TableFilters from "../../components/Bookings/TableFilters";
import TableRow from "../../components/Bookings/TableRow";
import SimpleTable from "../../components/SimpleTable";
import PageContainer from "../../containers/PageContainer";
import { getAllBookings } from "../../db/apiCalls";

const COLUMNS = [
  { label: "Cliente" },
  { label: "Habitacion" },
  { label: "Desde" },
  { label: "Hasta" },
];

const Guests: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [bookings, setBookings] = useState<object[] | null>(null);

  useEffect(() => {
    getBookings(null);
  }, []);

  /**
   * Method for fetching all bookings
   */
  const getBookings = async (filters: any) => {
    setLoading(true);
    const { data, error } = await getAllBookings(filters);
    console.log(data);

    if (error) {
      // TODO: show notification
      setLoading(false);
      return;
    }
    setBookings(data);
    setLoading(false);
  };

  /**
   * Method used to send filters to API
   * @param filters object containing filters applied
   */
  const sendFilters = (filters: any) => {
    getBookings(filters);
  };
  return (
    <PageContainer>
      <Group direction="column" style={{ width: "100%" }}>
        <Title>Reservas</Title>
        <Box
          sx={(theme) => ({
            height: "100%",
            width: "100%",
            paddingInline: theme.spacing.lg,
          })}
        >
          <TableFilters sendFilters={sendFilters} loading={loading} />
          <SimpleTable columns={COLUMNS} loading={loading}>
            {bookings &&
              bookings.map((e, i) => <TableRow key={i} booking={e} />)}
          </SimpleTable>
        </Box>
      </Group>
    </PageContainer>
  );
};

export default Guests;
