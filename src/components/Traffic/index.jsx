import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import { PieChart } from "@mui/x-charts/PieChart";
import Typography from "@mui/material/Typography";
import { Desktop as DesktopIcon } from "@phosphor-icons/react/dist/ssr/Desktop";
import { DeviceTablet as DeviceTabletIcon } from "@phosphor-icons/react/dist/ssr/DeviceTablet";
import { Phone as PhoneIcon } from "@phosphor-icons/react/dist/ssr/Phone";

const iconMapping = {
  Desktop: DesktopIcon,
  Tablet: DeviceTabletIcon,
  Phone: PhoneIcon,
};

export function Traffic({ chartSeries, labels, sx }) {
  return (
    <Card sx={sx}>
      <CardHeader title="Traffic source" />
      <CardContent>
        <Stack spacing={2}>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 63 },
                  { id: 1, value: 15 },
                  { id: 2, value: 22 },
                ],
              },
            ]}
            width={450}
            height={200}
          />
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            {chartSeries.map((item, index) => {
              const label = labels[index];
              const Icon = iconMapping[label];

              return (
                <Stack key={label} spacing={1} sx={{ alignItems: "center" }}>
                  {Icon ? <Icon fontSize="var(--icon-fontSize-lg)" /> : null}
                  <Typography variant="h6">{label}</Typography>
                  <Typography color="text.secondary" variant="subtitle2">
                    {item}%
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
