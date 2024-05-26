import { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";

import CreateRecipe from "./CreateRecipe";
import RecipeList from "./RecipeList";

function BasicTabs() {
  const [value, setValue] = useState(0);

  return (
    <>
      <Box mt={8} pl={2} sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={(e, newValue) => {
            setValue(newValue);
          }}
        >
          <Tab value={0} label="レシピ作成" />
          <Tab value={1} label="レシピ一覧" />
          <Tab value={2} label="推論" />
        </Tabs>
      </Box>

      <Box sx={{ p: 2 }}>
        {value === 0 && <CreateRecipe />}
        {value === 1 && <RecipeList />}
        {value === 2 && <Typography>(TODO)推論画面を作成</Typography>}
      </Box>
    </>
  );
}

export default BasicTabs;
