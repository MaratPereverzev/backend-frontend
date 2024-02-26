import { Tabs, tabsClasses } from "@mui/material";
import { Box } from "@components";
import Tab from "./tab";

const Default = (props) => {
  const { name = "tabs", items, tabs, onChange } = props;

  const handleChange = (event, newValue) => {
    if (typeof onChange === "function") {
      onChange(name)(newValue);
    }
  };

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}>
      <Tabs
        value={tabs}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            "&.Mui-disabled": { opacity: 0.3 },
          },
          minHeight: 20,
        }}
      >
        {items?.map((item, index) => (
          <Tab key={index} label={`${item?.name ?? `item ${index}`}`} />
        ))}
      </Tabs>
    </Box>
  );
};

export default Default;
