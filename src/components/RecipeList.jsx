import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Radio,
  TableHead,
  Alert,
  Typography,
} from "@mui/material";

export default function RecipeList() {
  const [selected, setSelected] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 初回読込み時にレシピ一覧を取得
  useEffect(() => {
    (async () => {
      const res = await axios.get("http://127.0.0.1:3003/recipes");
      setRecipes(res.data);
      setLoading(false);
    })();
  }, []);

  // レシピ一覧の取得中はローディングメッセージを表示
  if (loading) {
    return <p>Loading...</p>;
  }

  // レシピ一覧の取得完了後にレシピ一覧画面を表示
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Box mt={1}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox"></TableCell>
                  <TableCell>レシピ名</TableCell>
                  <TableCell>データセット</TableCell>
                  <TableCell>epoch</TableCell>
                  <TableCell>作成日時</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recipes.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell padding="checkbox">
                      <Radio
                        checked={selected === item.name}
                        onChange={(e) => {
                          setSelected(e.target.name);
                        }}
                        name={item.name}
                      />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.dataset}</TableCell>
                    <TableCell>{item.epoch}</TableCell>
                    <TableCell>{item.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>

      <Grid item xs={6}>
        <Box mt={1}>
          {!selected && <Alert severity="info">レシピを選択してください</Alert>}
          {selected && (
            <>
              <Box>
                <Typography variant="h5">混同行列</Typography>
                <img src={selected + "/cm.png"} style={{ width: "400px" }} />
              </Box>
              <Box mt={5}>
                <Typography variant="h5">損失関数の推移</Typography>
                <img src={selected + "/loss.png"} style={{ width: "400px" }} />
              </Box>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
