import { Box, Input } from "@components";

const Default = (props) => {
  const { def } = props;

  return (
    <Box defFlex gap sx={{ py: 0.5 }}>
      <Input {...def("price")} variant="outlined" />
    </Box>
  );
};

export default Default;
