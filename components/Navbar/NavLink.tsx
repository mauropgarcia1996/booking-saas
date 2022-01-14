import { Button, Group, Text } from "@mantine/core";
import Link from "next/link";

const NavLink = ({ path, label, icon }: any) => {
  return (
    <Link href={path} passHref>
      <Group
        sx={(theme) => ({
          cursor: "pointer",
          padding: theme.spacing.sm,
          borderRadius: theme.radius.sm,
          "&:hover": {
            backgroundColor: theme.colors.gray[1],
          },
        })}
        style={{ width: "100%" }}
      >
        {icon}
        <Text>{label}</Text>
      </Group>
    </Link>
  );
};

export default NavLink;
