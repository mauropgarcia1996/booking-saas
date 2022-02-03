import { Box, Button, Group, Modal, Text, Title } from "@mantine/core";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import BookingForm from "../../components/Bookings/BookingForm";
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
  const [formOpened, setFormOpened] = useState<boolean>(false);

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
    setFormOpened(false)
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
          <Group position="right">
            <Button onClick={() => setFormOpened(true)}>Add Booking</Button>
          </Group>
          <TableFilters sendFilters={sendFilters} loading={loading} />
          <SimpleTable columns={COLUMNS} loading={loading}>
            {bookings &&
              bookings.map((e, i) => <TableRow key={i} booking={e} />)}
          </SimpleTable>
        </Box>
      </Group>
      {/* MODALES */}
      <Modal
        centered
        opened={formOpened}
        onClose={() => setFormOpened(false)}
        title="New Booking"
      >
        <BookingForm handleRefresh={sendFilters} />
      </Modal>
    </PageContainer>
  );
};

interface Column {
  label: string;
}

export default Guests;
