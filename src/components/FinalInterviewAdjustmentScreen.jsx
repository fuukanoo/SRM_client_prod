import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Divider, Link, Grid } from "@mui/material";

function FinalInterviewAdjustmentScreen({
  profileData,
  casualData,
  firstInterviewData,
  secondInterviewData,
  finalInterviewData,
}) {
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState(null);
  const [resumePreviewUrl, setResumePreviewUrl] = useState(null);
  const [careerSheetPreviewUrl, setCareerSheetPreviewUrl] = useState(null);

  useEffect(() => {
    if (profileData.photo) {
      const url = URL.createObjectURL(profileData.photo);
      setPhotoPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [profileData.photo]);

  useEffect(() => {
    if (profileData.resume) {
      const url = URL.createObjectURL(profileData.resume);
      setResumePreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [profileData.resume]);

  useEffect(() => {
    if (profileData.careerSheet) {
      const url = URL.createObjectURL(profileData.careerSheet);
      setCareerSheetPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [profileData.careerSheet]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* カジュアル面談結果 */}
        <Grid item xs={12} sm={6} md={3}>
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
        </Grid>

        {/* 1次面接結果 */}
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h5" gutterBottom>
              1次面接
            </Typography>
              <Typography variant="body1">
                <strong>合否:</strong>{" "}
                {firstInterviewData.pass_fail || "未入力"}
              </Typography>
              <Typography variant="body1">
                <strong>意見主張:</strong>{" "}
                {firstInterviewData.assertion || "未入力"}
              </Typography>
              <Typography variant="body1">
                <strong>言い訳:</strong>{" "}
                {firstInterviewData.excuse || "未入力"}
              </Typography>
              <Typography variant="body1">
                <strong>誠実:</strong>{" "}
                {firstInterviewData.sincerity || "未入力"}
              </Typography>
              <Typography variant="body1">
                <strong>逃げ癖:</strong>{" "}
                {firstInterviewData.avoidance || "未入力"}
              </Typography>
              <Typography variant="body1">
                <strong>イニシアチブ:</strong>{" "}
                {firstInterviewData.initiative || "未入力"}
              </Typography>
              <Typography variant="body1">
                <strong>チーム愛:</strong>{" "}
                {firstInterviewData.teamLove || "未入力"}
              </Typography>
              <Typography variant="body1">
                <strong>愛嬌:</strong>{" "}
                {firstInterviewData.charm || "未入力"}
              </Typography>
              <Typography variant="body1">
                <strong>謙虚さと責任感:</strong>{" "}
                {firstInterviewData.humility || "未入力"}
              </Typography>
              <Typography variant="body1">
                <strong>事実と解釈:</strong>{" "}
                {firstInterviewData.factInterpretation || "未入力"}
              </Typography>
              <Typography variant="body1">
                <strong>備考:</strong>{" "}
                {firstInterviewData.notes || "未入力"}
              </Typography>
          </Box>
        </Grid>

        {/* 2次面接結果 */}
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h5" gutterBottom>
              2次面接
            </Typography>
            <Typography variant="body1">
              <strong>合否:</strong>{" "}
              {secondInterviewData.pass_fail || "未入力"}
            </Typography>
            <Typography variant="body1">
              <strong>誠実:</strong>{" "}
              {secondInterviewData.sincerity || "未入力"}
            </Typography>
            <Typography variant="body1">
              <strong>チーム愛:</strong>{" "}
              {secondInterviewData.team_love || "未入力"}
            </Typography>
            <Typography variant="body1">
              <strong>愛嬌:</strong>{" "}
              {secondInterviewData.charm || "未入力"}
            </Typography>
            <Typography variant="body1">
              <strong>謙虚さと責任感:</strong>{" "}
              {secondInterviewData.humility || "未入力"}
            </Typography>
            <Typography variant="body1">
              <strong>備考:</strong>{" "}
              {secondInterviewData.notes || "未入力"}
            </Typography>
          </Box>
        </Grid>

        {/* 最終面接結果 */}
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h5" gutterBottom>
              最終面接
            </Typography>
            <Typography variant="body1">
                <strong>合否:</strong>{" "}
                {finalInterviewData.pass_fail || "未入力"}
              </Typography>
              <Typography variant="body1">
                <strong>意見主張:</strong>{" "}
                {finalInterviewData.assertion || "未入力"}
              </Typography>
              <Typography variant="body1">
                <strong>言い訳:</strong>{" "}
                {finalInterviewData.excuse || "未入力"}
              </Typography>
              <Typography variant="body1">
                <strong>誠実:</strong>{" "}
                {finalInterviewData.sincerity || "未入力"}
              </Typography>
              <Typography variant="body1">
                <strong>逃げ癖:</strong>{" "}
                {finalInterviewData.avoidance || "未入力"}
              </Typography>
              <Typography variant="body1">
                <strong>イニシアチブ:</strong>{" "}
                {finalInterviewData.initiative || "未入力"}
              </Typography>
              <Typography variant="body1">
                <strong>チーム愛:</strong>{" "}
                {finalInterviewData.teamLove || "未入力"}
              </Typography>
              <Typography variant="body1">
                <strong>愛嬌:</strong>{" "}
                {finalInterviewData.charm || "未入力"}
              </Typography>
              <Typography variant="body1">
                <strong>謙虚さと責任感:</strong>{" "}
                {finalInterviewData.humility || "未入力"}
              </Typography>
              <Typography variant="body1">
                <strong>事実と解釈:</strong>{" "}
                {finalInterviewData.factInterpretation || "未入力"}
              </Typography>
              <Typography variant="body1">
                <strong>備考:</strong>{" "}
                {finalInterviewData.notes || "未入力"}
              </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default FinalInterviewAdjustmentScreen;
