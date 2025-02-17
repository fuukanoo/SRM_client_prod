import React from "react";
import {Box, Container, Grid, Card, Typography, Divider, TextField, Button, Link} from "@mui/material";

function CasualScreen({ profileData, casualData, setCasualData }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCasualData((prev) => ({ ...prev, [name]: value }));
  };


  // 「保存」ボタン押下時の処理
  const handleSaveCasual = async () => {
    // candidate_id はprofileData.idがセットされている前提
    const casualInterviewData = {
      candidate_id: profileData.id, // 必須フィールド。候補者登録後に得たIDを使う
      result: casualData.result,
      honesty: casualData.honesty,
      team_love: casualData.teamLove,
      charm: casualData.charm,
      humility: casualData.humility,
      notes: casualData.notes,
    };

    console.log("送信前のカジュアル面接データ:", casualInterviewData);
    try {
      const response = await fetch("http://localhost:3001/casual_interviews/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(casualInterviewData)
      });
      if (response.ok) {
        const data = await response.json();
        console.log("カジュアル面接データ登録成功", data);
        // 必要に応じて、成功時のフィードバック（例：通知表示など）を追加
      } else {
        console.error("カジュアル面接データ登録エラー:", response.statusText);
      }
    } catch (error) {
      console.error("ネットワークエラー:", error);
    }
  };


  const photoPreviewUrl = profileData.photo
    ? URL.createObjectURL(profileData.photo)
    : null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* 中央セクション: 評価項目 */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="合否"
                name="result"
                value={casualData.result || ""}
                onChange={handleInputChange}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="誠実"
                name="honesty"
                value={casualData.honesty || ""}
                onChange={handleInputChange}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="チーム愛"
                name="teamLove"
                value={casualData.teamLove || ""}
                onChange={handleInputChange}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="愛嬌"
                name="charm"
                value={casualData.charm || ""}
                onChange={handleInputChange}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="謙虚さと責任感"
                name="humility"
                value={casualData.humility || ""}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Box>
          </Card>
        </Grid>
  
        {/* 右側セクション: 備考入力欄 */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 3 }}>
            <Typography variant="h6" gutterBottom>
              備考
            </Typography>
            <TextField
              fullWidth
              name="notes"
              value={casualData.notes || ""}
              onChange={handleInputChange}
              multiline
              rows={5}
              variant="outlined"
            />
          </Card>
        </Grid>
  
        {/* 下部: 保存ボタン */}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" onClick={handleSaveCasual} sx={{ fontSize: "0.8rem" }}>
              保存
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CasualScreen;
