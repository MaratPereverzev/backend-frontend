import { Box, Input } from "@components";

const Default = (props) => {
  const { def } = props;

  return (
    <Box defFlex gap sx={{ py: 0.5 }}>
      <Box defFlex row gap>
        <Input {...def("caption")} variant="outlined" />
        <Input {...def("caption1")} variant="outlined" />
      </Box>
      <Box defFlex row gap>
        <Input {...def("caption2")} variant="outlined" />
        <Input {...def("caption3")} variant="outlined" />
      </Box>
    </Box>
  );
};

export default Default;
