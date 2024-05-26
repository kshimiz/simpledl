import { useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField, MenuItem, Grid, Button } from "@mui/material";

export default function BasicTextFields() {
  const DEFAULT_EPOCH = 10;

  const [recipename, setRecipename] = useState("");
  const [modelname, setModelname] = useState("vgg16"); // モデル名は固定[VGG16]
  const [dataset, setDataset] = useState("");
  const [epoch, setEpoch] = useState(DEFAULT_EPOCH);
  const [datasetlist, setDatasetlist] = useState("");
  const [loading, setLoading] = useState(true);

  // 初回読込み時にデータセットを取得
  useEffect(() => {
    (async () => {
      const res = await axios.get("http://127.0.0.1:3003/dataset");
      const names = res.data.map((item) => item.name);
      setDatasetlist(names);
      setLoading(false);
    })();
  }, []);

  // データセットの取得中はローディングメッセージを表示
  if (loading) {
    return <p>Loading...</p>;
  }

  // データセットの取得完了後にレシピ作成画面を表示
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} mt={1}>
        <Box mb={3}>
          <TextField
            name="recipename"
            label="レシピ名"
            fullWidth
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            value={recipename}
            onChange={(e) => {
              setRecipename(e.target.value);
            }}
          />
        </Box>
        <Box mb={3}>
          <TextField
            name="modelname"
            select
            label="モデル"
            fullWidth
            value={modelname}
            size="small"
            disabled
          >
            <MenuItem value="vgg16">VGG16</MenuItem>
          </TextField>
        </Box>
        <Box mb={3}>
          <TextField
            name="dataset"
            select
            label="データセット"
            fullWidth
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            value={dataset}
            onChange={(e) => {
              setDataset(e.target.value);
            }}
          >
            {datasetlist &&
              datasetlist.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
          </TextField>
        </Box>
        <Box mb={3}>
          <TextField
            name="epoch"
            size="small"
            label="エポック数"
            fullWidth
            type="number"
            value={epoch}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setEpoch(e.target.value);
            }}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            onClick={async (e) => {
              // フォームの情報を送信する
              try {
                console.log(recipename, modelname, dataset, epoch);
                const response = await axios.post(
                  "http://127.0.0.1:3003/startTraining",
                  {
                    name: recipename,
                    model: modelname,
                    dataset: dataset,
                    epoch: epoch,
                  }
                );
                console.log(response.data);
              } catch (error) {
                console.error(error);
              }
            }}
          >
            学習開始
          </Button>
          <Button
            variant="outlined"
            onClick={(e) => {
              setRecipename("");
              setDataset("");
              setEpoch(DEFAULT_EPOCH);
            }}
          >
            クリア
          </Button>
        </Box>
      </Grid>

      <Grid item xs={6}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img src="ai_dance_character.png" style={{ width: "250px" }} />
        </Box>
      </Grid>
    </Grid>
  );
}
