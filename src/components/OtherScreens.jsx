import React from "react";
import { Container, Card, Typography, TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";

function OtherScreens({ profileData, followupData, setFollowupData }) {
  // URLから followupId を取得（例: "followUp1", "followUp2" など）
  const { followupId } = useParams();

  // 現在のフォロー面談のメモ（存在しなければ空文字）
  const currentNotes = followupData[followupId] || "";

  const handleFollowupInputChange = (e) => {
    const { value } = e.target;
    setFollowupData((prevData) => ({
      ...prevData,
      [followupId]: value,
    }));
  };

  // 「保存」ボタン押下時の処理
  const handleSaveFollowup = async () => {
    // profileData.id に候補者登録後のIDがセットされている前提
    const followupPayload = {
      candidate_id: profileData.id,
      notes: currentNotes,
      // interview_date を入力する場合はここで追加（例: interview_date: "2025-02-14"）
    };

    console.log("送信前のフォロー面談データ:", followupPayload);
    try {
      const response = await fetch("http://localhost:3001/followup_interviews/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(followupPayload),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("フォロー面談データ登録成功", data);
        // 必要に応じて、成功時の通知表示や画面遷移の処理を追加
      } else {
        console.error("フォロー面談データ登録エラー:", response.statusText);
      }
    } catch (error) {
      console.error("ネットワークエラー:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ p: 3, boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom>
          備考記入欄
        </Typography>
        <TextField
          fullWidth
          name="notes"
          value={currentNotes}
          onChange={handleFollowupInputChange}
          multiline
          rows={5}
          variant="outlined"
        />
        <Button
          variant="contained"
          onClick={handleSaveFollowup}
          sx={{ mt: 2, fontSize: "0.8rem" }}
        >
          保存
        </Button>
      </Card>
    </Container>
  );
}

export default OtherScreens;
