import {
  AppShell,
  Burger,
  Header,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import MainNavbar from "../components/Navbar/MainNavbar";

const LayoutContainer = ({ children }: LayoutContainer) => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          padding="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 300 }}
        >
          <MainNavbar />
        </Navbar>
      }
      header={
        <Header height={70} padding="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>Booking Dashboard</Text>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

interface LayoutContainer {
  children: React.ReactNode
}

export default LayoutContainer;
