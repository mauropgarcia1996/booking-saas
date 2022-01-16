import {
  Autocomplete,
  Button,
  Group,
  Loader,
  MultiSelect,
  Text
} from "@mantine/core";
import { DateRangePicker } from "@mantine/dates";
import { useState } from "react";
import { getBookingsByDate } from "../../db/apiCalls";
import { supabase } from "../../db/supabase";
import { dateToISO } from "../../utils/date";
import ErrorAlert from "../ErrorAlert";

const HABITACIONES = [
  { value: "1", label: "Habitacion 1" },
  { value: "2", label: "Habitacion 2" },
  { value: "3", label: "Habitacion 3" },
];
const BookingForm = ({ handleRefresh }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<[] | Error[]>([]);
  const [guest, setGuest] = useState<string | object | undefined>("");
  const [guestLoading, setGuestLoading] = useState(false);
  const [guests, setGuests] = useState([]);
  const [chosen, setChosen] = useState(null);
  const [room, setRoom] = useState([]);
  const [date, setDate] = useState([]);

  const handleSelectChange = async (e) => {
    setGuestLoading(true)
    setGuest(e);
    const res = await fetchGuests(e);
    setGuestLoading(false)
    setGuests(res);
  };

  const fetchGuests = async (name) => {
    const { data, error } = await supabase
      .from("guests")
      .select("*")
      .ilike("name", `%${name}%`);
    const formattedData = formatData(data);
    return formattedData;
  };

  const formatData = (data) => {
    const formattedData = data.map((e) => ({
      ...e,
      value: `${e.given_name} ${e.family_name}`,
    }));
    return formattedData;
  };

  const submit = async () => {
    setLoading(true);
    const booking = {
      guest_id: chosen.id,
      rooms: room,
      from: dateToISO(date[0]),
      to: dateToISO(date[1]),
    };
    const available = await checkAvailability(booking);
    if (!available) {
      let newError = [];
      newError.push({
        message:
          "Una o mas habitaciones no disponibles en las fechas seleccionadas.",
      });
      setErrors(newError);
    } else {
      const { data, error } = await supabase
        .from("bookings")
        .insert([{ ...booking }]);

      if (data) {
        handleRefresh();
      }
    }
    setLoading(false);
  };

  const checkAvailability = async (booking) => {
    // BUSCAR RESERVACIONES EN ESAS FECHAS
    const { data, error } = await getBookingsByDate(booking.from, booking.to);
    // CHEQUEAR CADA HABITACION SI YA EXISTE UNA RESERVACION EN ESA FECHA
    const overlapped = data?.filter((item) =>
      item.rooms.some((r) => booking.rooms.includes(r))
    );
    return overlapped?.length === 0;
  };
  return (
    <Group style={{ width: "100%" }} direction="column">
      {errors.map((e, i) => (
        <ErrorAlert key={i} message={e.message} />
      ))}
      <Autocomplete
        data={guests}
        style={{ width: "100%" }}
        label="Cliente"
        nothingFound={<AddGuestError />}
        onChange={handleSelectChange}
        value={guest}
        onItemSubmit={(e) => setChosen(e)}
        disabled={loading}
        icon={guestLoading && <Loader size="xs" />}
      />
      <MultiSelect
        style={{ width: "100%" }}
        data={HABITACIONES}
        label="Habitacion"
        value={room}
        onChange={(e) => setRoom(e)}
        disabled={loading}
      />
      <DateRangePicker
        style={{ width: "100%" }}
        label="Fechas"
        value={date}
        onChange={(e) => setDate(e)}
        disabled={loading}
      />
      <Button style={{ width: "100%" }} onClick={submit} disabled={loading}>
        Agregar
      </Button>
      {loading && (
        <Group style={{ width: "100%" }} position="center">
          <Loader />
        </Group>
      )}
    </Group>
  );
};

const AddGuestError = () => {
  return (
    <Group position="center">
      <Text
        size="sm"
        weight={400}
        sx={(theme) => ({ color: theme.colors.gray[6] })}
      >
        No se encontro, desea agregar un invitado?
      </Text>
      <Button size="xs">Agregar</Button>
    </Group>
  );
};

interface Error {
  message: string;
}

export default BookingForm;
