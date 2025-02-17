import React from "react";
import { Container, Box, Typography, TextField, Button, Grid, Card } from "@mui/material";

function FinalInterviewScreen({ profileData, finalInterviewData, setFinalInterviewData }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFinalInterviewData((prev) => ({
      ...prev,
      [name]: value || "",
    }));
  };

  const handleSaveFinalInterview = async () => {
    // profileData.id に候補者登録時のIDがセットされている前提
    const finalInterviewPayload = {
      candidate_id: profileData.id,
      pass_fail: finalInterviewData.pass_fail,
      assertion: finalInterviewData.assertion,
      excuse: finalInterviewData.excuse,
      sincerity: finalInterviewData.sincerity,
      avoidance: finalInterviewData.avoidance,
      initiative: finalInterviewData.initiative,
      team_love: finalInterviewData.team_love,
      charm: finalInterviewData.charm,
      humility: finalInterviewData.humility,
      fact_interpretation: finalInterviewData.fact_interpretation,
      notes: finalInterviewData.notes,
    };

    console.log("送信前の最終面接データ:", finalInterviewPayload);
    try {
      const response = await fetch("http://localhost:3001/final_interviews/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalInterviewPayload),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("最終面接データ登録成功", data);
        // 必要に応じて、成功時の通知表示や画面遷移の処理を追加
      } else {
        console.error("最終面接データ登録エラー:", response.statusText);
      }
    } catch (error) {
      console.error("ネットワークエラー:", error);
    }
  };

  // 各評価項目の入力欄のスタイル（例：入力部分の高さを xs:40px, md:40px に固定）
  const fieldSx = {
    '& .MuiInputBase-input': {
      fontSize: { xs: '0.8rem', md: '0.8rem' },
      padding: { xs: '6px 8px', md: '6px 8px' },
    },
    '& .MuiInputLabel-root': {
      fontSize: { xs: '0.8rem', md: '0.8rem' },
    },
    '& .MuiOutlinedInput-root': {
      height: { xs: '40px', md: '30px' },
    },
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* 左側セクション: 評価項目を1列表示 */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <TextField
                fullWidth
                label="合否"
                name="pass_fail"
                value={finalInterviewData.pass_fail || ""}
                onChange={handleInputChange}
                variant="outlined"
                sx={fieldSx}
              />
              <TextField
                fullWidth
                label="意見主張"
                name="assertion"
                value={finalInterviewData.assertion || ""}
                onChange={handleInputChange}
                variant="outlined"
                sx={fieldSx}
              />
              <TextField
                fullWidth
                label="言い訳"
                name="excuse"
                value={finalInterviewData.excuse || ""}
                onChange={handleInputChange}
                variant="outlined"
                sx={fieldSx}
              />
              <TextField
                fullWidth
                label="誠実"
                name="sincerity"
                value={finalInterviewData.sincerity || ""}
                onChange={handleInputChange}
                variant="outlined"
                sx={fieldSx}
              />
              <TextField
                fullWidth
                label="逃げ癖"
                name="avoidance"
                value={finalInterviewData.avoidance || ""}
                onChange={handleInputChange}
                variant="outlined"
                sx={fieldSx}
              />
              <TextField
                fullWidth
                label="イニシアチブ"
                name="initiative"
                value={finalInterviewData.initiative || ""}
                onChange={handleInputChange}
                variant="outlined"
                sx={fieldSx}
              />
              <TextField
                fullWidth
                label="チーム愛"
                name="team_love"
                value={finalInterviewData.team_love || ""}
                onChange={handleInputChange}
                variant="outlined"
                sx={fieldSx}
              />
              <TextField
                fullWidth
                label="愛嬌"
                name="charm"
                value={finalInterviewData.charm || ""}
                onChange={handleInputChange}
                variant="outlined"
                sx={fieldSx}
              />
              <TextField
                fullWidth
                label="謙虚さと責任感"
                name="humility"
                value={finalInterviewData.humility || ""}
                onChange={handleInputChange}
                variant="outlined"
                sx={fieldSx}
              />
              <TextField
                fullWidth
                label="事実と解釈"
                name="fact_interpretation"
                value={finalInterviewData.fact_interpretation || ""}
                onChange={handleInputChange}
                variant="outlined"
                sx={fieldSx}
              />
            </Box>
          </Card>
        </Grid>

        {/* 右側セクション: 備考 */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 3 }}>
            <Typography variant="h6" gutterBottom>
              備考
            </Typography>
            <TextField
              fullWidth
              name="notes"
              value={finalInterviewData.notes || ""}
              onChange={handleInputChange}
              multiline
              rows={10}
              variant="outlined"
            />
          </Card>
        </Grid>

        {/* 下部: 保存ボタン */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="contained" onClick={handleSaveFinalInterview} sx={{ fontSize: '0.8rem' }}>
              保存
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default FinalInterviewScreen;
