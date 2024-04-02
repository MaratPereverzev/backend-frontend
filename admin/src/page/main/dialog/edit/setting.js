import { Box, Input } from "@components";

const Default = (props) => {
  const { def } = props;

  return (
    <Box defFlex gap sx={{ py: 0.5 }}>
      <Box defFlex row gap>
        <Input {...def("title")} variant="outlined" />
        <Input {...def("category")} variant="outlined" />
      </Box>
      <Box defFlex row gap>
        <Input {...def("brand")} variant="outlined" />
      </Box>
      <Input {...def("description")} variant="outlined" rows={4} />
    </Box>
  );
};

export default Default;
