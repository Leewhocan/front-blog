import React, { useState } from "react";
import Button from "@mui/material/Button";
import {
  Budget,
  TotalCustomers,
  TasksProgress,
  TotalProfit,
  Sales,
  Traffic,
} from "../components";
import { Grid } from "@mui/material";
export const AdminPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item lg={3} sm={6} xs={12}>
        <Budget
          diff={12}
          trend="up"
          sx={{ height: "100%", borderRadius: 7 }}
          value="$24k"
        />
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <TotalCustomers
          diff={16}
          trend="down"
          sx={{ height: "100%", borderRadius: 7 }}
          value="1.6k"
        />
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <TasksProgress sx={{ height: "100%", borderRadius: 7 }} value={75.5} />
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <TotalProfit sx={{ height: "100%", borderRadius: 7 }} value="$15k" />
      </Grid>
      <Grid item lg={8} xs={12}>
        <Sales sx={{ height: "100%", borderRadius: 7 }} />
      </Grid>
      <Grid item lg={4} md={6} xs={12}>
        <Traffic
          chartSeries={[63, 15, 22]}
          labels={["Desktop", "Tablet", "Phone"]}
          sx={{ height: "100%", borderRadius: 7 }}
        />
      </Grid>
    </Grid>
  );
};
