import React, { FC } from "react";
import { Box, Tab, Tabs } from "@mui/material";

import { UserTableContainer } from "components/Home/Users/containers";

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface IHomeViewProps {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export const HomeView: FC<IHomeViewProps> = ({ value, handleChange }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs
          TabIndicatorProps={{
            style: {
              height: "0",
            },
          }}
          sx={{
            "& .MuiTab-root": {
              color: "grey.600",
              textTransform: "initial",
              fontSize: 22,
            },
            "& .MuiTab-root.Mui-selected": {
              color: "black",
              fontWeight: "fontWeightBold",
            },
          }}
          value={value}
          onChange={handleChange}
        >
          <Tab label="All Users" />
          <Tab label="Blocked" />
          <Tab label="Deleted" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <UserTableContainer status="" />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <UserTableContainer status="blocked" />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <UserTableContainer status="deleted" />
      </TabPanel>
    </Box>
  );
};
