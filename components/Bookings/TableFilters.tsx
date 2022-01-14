import {
  Accordion,
  Grid,
  Group,
  MultiSelect,
  Paper,
  TextInput,
} from "@mantine/core";
import { useState } from "react";

const FILTERS_INIT = {
  name: "",
  room: [],
};

const TableFilters = ({ sendFilters, loading }: any) => {
  const [filters, setFilters] = useState(
    JSON.parse(JSON.stringify(FILTERS_INIT))
  );
  const HABITACIONES = [
    { value: "1", label: "Habitacion 1" },
    { value: "2", label: "Habitacion 2" },
    { value: "3", label: "Habitacion 3" },
  ];

  const handleChange = (e) => {
    const state = JSON.parse(JSON.stringify(filters));
    state[e.target.name] = e.target.value;
    setFilters(state);
  };

  const handleSelectChange = (e) => {
    const state = JSON.parse(JSON.stringify(filters));
    state["room"] = e;
    setFilters(state);
  };
  return (
    <Paper withBorder sx={(theme) => ({ marginBlock: theme.spacing.md })}>
      <Accordion>
        <Accordion.Item label="Filtros">
          <Grid>
            <Grid.Col md={3} span={6}>
              <TextInput
                name="name"
                label="Nombre"
                type="text"
                value={filters["name"]}
                disabled={loading}
                onChange={handleChange}
                onBlur={() => sendFilters(filters)}
              />
            </Grid.Col>
            <Grid.Col md={3} span={6}>
              <MultiSelect
                name="room"
                data={HABITACIONES}
                label="Habitaciones"
                value={filters["room"]}
                disabled={loading}
                onChange={handleSelectChange}
                onBlur={() => sendFilters(filters)}
              />
            </Grid.Col>
          </Grid>
        </Accordion.Item>
      </Accordion>
    </Paper>
  );
};

export default TableFilters;
