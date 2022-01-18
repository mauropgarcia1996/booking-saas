import {
  Autocomplete,
  Button,
  Group,
  Loader,
  MultiSelect,
  Text,
} from "@mantine/core";
import { DateRangePicker } from "@mantine/dates";
import { useEffect, useState } from "react";
import { addBooking, getBookingsByDate } from "../../db/apiCalls";
import { supabase } from "../../db/supabase";
import { dateToISO } from "../../utils/date";
import ErrorAlert from "../ErrorAlert";

const FORM_INIT = {
  guest: "",
  rooms: [],
  dates: [],
};

const BookingForm = ({ handleRefresh }: BookingFormProp) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<[] | Error[]>([]);
  const [guest, setGuest] = useState<string | undefined>("");
  const [guestList, setGuestList] = useState<[] | Guest[]>([]);
  const [guestLoading, setGuestLoading] = useState<boolean>(false);
  const [rooms, setRooms] = useState<Room[] | []>([]);
  const [form, setForm] = useState<FormState>(
    JSON.parse(JSON.stringify(FORM_INIT))
  );

  useEffect(() => {
    fetchRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchGuests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guest]);

  /**
   * Method to get all rooms
   */
  const fetchRooms = async () => {
    const { data, error } = await supabase.from("rooms").select("*");
    const formattedData = formatRoomObject(data);
    setRooms(formattedData ? formattedData : []);
  };

  /**
   * Method to get all guests
   */
  const fetchGuests = async () => {
    setGuestLoading(true);
    const { data, error } = await supabase
      .from("guests")
      .select("*")
      .ilike("name", `%${guest}%`);
    const formattedData = formatGuestObject(data);
    setGuestList(formattedData ? formattedData : []);
    setGuestLoading(false);
  };

  /**
   * Method to format a Guest object
   * @param data object
   * @returns object
   */
  const formatGuestObject = (data: Guest[] | null) => {
    const formattedData = data?.map((e) => ({
      ...e,
      value: `${e.given_name} ${e.family_name}`,
    }));
    return formattedData;
  };

  /**
   * Method to format a Room object
   * @param data object
   * @returns object
   */
  const formatRoomObject = (data: Room[] | null) => {
    const formattedData = data?.map((e) => ({
      ...e,
      value: `${e.number}`,
      label: `Habitacion ${e.number}`,
    }));
    return formattedData;
  };

  /**
   * Method to send the booking to the API
   */
  const submit = async () => {
    setLoading(true);
    const booking = {
      guest_id: form.guest.id,
      rooms: form.rooms,
      from: dateToISO(form.dates[0]),
      to: dateToISO(form.dates[1]),
    };
    const available = await checkAvailability(booking);
    if (!available) {
      showError(
        "Una o mas habitaciones no disponibles en las fechas seleccionadas."
      );
    } else {
      const { data, error } = await addBooking(booking);
      if (data) {
        handleRefresh(null);
      }
    }
    setLoading(false);
  };

  /**
   * Method to show an error message
   * @param message message to show
   */
  const showError = (message: string) => {
    let newError = [];
    newError.push({
      message: message,
    });
    setErrors(newError);
  };

  /**
   * Method to check if the booking is available
   * @param booking Booking object
   * @returns boolean
   */
  const checkAvailability = async (booking: Booking) => {
    // BUSCAR RESERVACIONES EN ESAS FECHAS
    const { data, error } = await getBookingsByDate(booking.from, booking.to);
    // CHEQUEAR CADA HABITACION SI YA EXISTE UNA RESERVACION EN ESA FECHA
    const overlapped = data?.filter((item) =>
      item.rooms.some((r: string) => booking.rooms.includes(r))
    );
    return overlapped?.length === 0;
  };

  /**
   * Method to handle the form change
   * @param name string name of the field
   * @param value string | object value of the field
   */
  const handleFormChange = (name: string, value: any) => {
    const formCopy = JSON.parse(JSON.stringify(form));
    formCopy[name] = value;
    setForm(formCopy);
  };

  return (
    <Group style={{ width: "100%" }} direction="column">
      {errors.map((e, i) => (
        <ErrorAlert key={i} message={e.message} />
      ))}
      <Autocomplete
        data={guestList}
        style={{ width: "100%" }}
        label="Cliente"
        nothingFound={<AddGuestError />}
        onChange={(e) => setGuest(e)}
        onItemSubmit={(e) => handleFormChange("guest", e)}
        value={guest}
        disabled={loading}
        icon={guestLoading && <Loader size="xs" />}
      />
      <MultiSelect
        style={{ width: "100%" }}
        data={rooms}
        label="Habitacion"
        value={form["rooms"]}
        onChange={(e) => handleFormChange("rooms", e)}
        disabled={loading}
      />
      <DateRangePicker
        style={{ width: "100%" }}
        label="Fechas"
        value={form["dates"]}
        onChange={(e) => handleFormChange("dates", e)}
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

interface Guest {
  id: string;
  name: string;
  given_name: string;
  family_name: string;
  email: string;
  value: string;
}

interface Room {
  id: number;
  number: number;
  size: number;
  value: string;
}

interface FormState {
  guest: Guest;
  rooms: string[];
  dates: [Date | null, Date | null];
}

interface Booking {
  guest_id: string;
  rooms: string[];
  from: Date | null | string;
  to: Date | null | string;
}

interface BookingFormProp {
  handleRefresh: (filters: any) => void;
}

export default BookingForm;
