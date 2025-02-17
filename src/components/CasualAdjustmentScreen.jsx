import React from "react";
import { Container, Box, Typography} from "@mui/material";

function CasualAdjustmentScreen({ profileData, casualData }) {
  const photoPreviewUrl = profileData.photo
    ? URL.createObjectURL(profileData.photo)
    : null;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>

      {/* カジュアル画面の情報 */}
      <Box>
        <Typography variant="h5" gutterBottom>
          カジュアル
        </Typography>
        <Typography variant="body1">
          <strong>合否:</strong> {casualData.result || "未入力"}
        </Typography>
        <Typography variant="body1">
          <strong>誠実:</strong> {casualData.honesty || "未入力"}
        </Typography>
        <Typography variant="body1">
          <strong>チーム愛:</strong> {casualData.teamLove || "未入力"}
        </Typography>
        <Typography variant="body1">
          <strong>愛嬌:</strong> {casualData.charm || "未入力"}
        </Typography>
        <Typography variant="body1">
          <strong>謙虚さと責任感:</strong> {casualData.humility || "未入力"}
        </Typography>
        <Typography variant="body1">
          <strong>備考:</strong> {casualData.notes || "未入力"}
        </Typography>
      </Box>
    </Container>
  );
}

export default CasualAdjustmentScreen;
