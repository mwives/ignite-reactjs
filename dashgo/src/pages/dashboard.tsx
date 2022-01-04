import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import dynamic from "next/dynamic";

import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: "datetime" as "datetime",
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      new Date("2021-09-14").toString(),
      new Date("2021-09-15").toString(),
      new Date("2021-09-16").toString(),
      new Date("2021-09-17").toString(),
      new Date("2021-09-18").toString(),
      new Date("2021-09-19").toString(),
      new Date("2021-09-20").toString(),
    ],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series = [{ name: "series1", data: [31, 120, 10, 28, 61, 18, 109] }];

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth="1480px" mx="auto" px="6">
        <Sidebar />
        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box p={["6", "8"]} pb="4" borderRadius="8" bg="gray.800">
            <Text fontSize="lg" mb="4">
              Inscritos da semana
            </Text>
            <Chart
              options={options}
              series={series}
              type="area"
              height="160px"
            />
          </Box>
          <Box p={["6", "8"]} borderRadius="8" bg="gray.800">
            <Text fontSize="lg" mb="4">
              Taxa de Abertura
            </Text>
            <Chart
              options={options}
              series={series}
              type="area"
              height="160px"
            />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
