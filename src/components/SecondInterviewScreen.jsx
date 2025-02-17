import React from "react";
import { Container, Box, Typography, TextField, Button, Grid, Card } from "@mui/material";

function SecondInterviewScreen({ profileData, secondInterviewData, setSecondInterviewData }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSecondInterviewData((prev) => ({
      ...prev,
      [name]: value || "",
    }));
  };

  // 「保存」ボタン押下時の処理
  const handleSaveSecondInterview = async () => {
    // profileData.id が候補者登録後にセットされている前提
    const secondInterviewPayload = {
      candidate_id: profileData.id,
      pass_fail: secondInterviewData.pass_fail,
      sincerity: secondInterviewData.sincerity,
      team_love: secondInterviewData.team_love,
      charm: secondInterviewData.charm,
      humility: secondInterviewData.humility,
      notes: secondInterviewData.notes,
    };

    console.log("送信前の二次面接データ:", secondInterviewPayload);
    try {
      const response = await fetch("http://localhost:3001/second_interviews/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(secondInterviewPayload),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("二次面接データ登録成功", data);
        // 必要に応じて、成功時のフィードバック（通知表示や画面遷移）を追加
      } else {
        console.error("二次面接データ登録エラー:", response.statusText);
      }
    } catch (error) {
      console.error("ネットワークエラー:", error);
    }
  };

  // 各評価項目の入力欄のスタイルを「追加の項目群」の例に合わせる
  const fieldSx = {
    '& .MuiInputBase-input': {
      fontSize: { xs: '0.8rem', md: '0.8rem' },
      padding: { xs: '6px 8px', md: '6px 8px' },
    },
    '& .MuiInputLabel-root': {
      fontSize: { xs: '0.8rem', md: '0.8rem' },
    },
    '& .MuiOutlinedInput-root': {
      height: { xs: '40px', md: '40px' },
    },
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* 左側セクション: 評価項目（1列表示） */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <TextField
                fullWidth
                label="合否"
                name="pass_fail"
                value={secondInterviewData.pass_fail || ""}
                onChange={handleInputChange}
                variant="outlined"
                sx={fieldSx}
              />
              <TextField
                fullWidth
                label="誠実"
                name="sincerity"
                value={secondInterviewData.sincerity || ""}
                onChange={handleInputChange}
                variant="outlined"
                sx={fieldSx}
              />
              <TextField
                fullWidth
                label="チーム愛"
                name="team_love"
                value={secondInterviewData.team_love || ""}
                onChange={handleInputChange}
                variant="outlined"
                sx={fieldSx}
              />
              <TextField
                fullWidth
                label="愛嬌"
                name="charm"
                value={secondInterviewData.charm || ""}
                onChange={handleInputChange}
                variant="outlined"
                sx={fieldSx}
              />
              <TextField
                fullWidth
                label="謙虚さと責任感"
                name="humility"
                value={secondInterviewData.humility || ""}
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
              value={secondInterviewData.notes || ""}
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
            <Button variant="contained" onClick={handleSaveSecondInterview} sx={{ fontSize: '0.8rem' }}>
              保存
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SecondInterviewScreen;
