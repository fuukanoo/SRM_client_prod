// App.jsx

import React, { useState, useEffect, useRef } from "react";
import StepNavigator from "./components/StepNavigator";
import ProfileScreen from "./components/ProfileScreen";
import EntryAdjustmentScreen from "./components/EntryAdjustmentScreen";
import CasualScreen from "./components/CasualScreen";
import CasualAdjustmentScreen from "./components/CasualAdjustmentScreen";
import FirstInterviewScreen from "./components/FirstInterviewScreen";
import FirstInterviewAdjustmentScreen from "./components/FirstInterviewAdjustmentScreen";
import SecondInterviewScreen from "./components/SecondInterviewScreen";
import SecondInterviewAdjustmentScreen from "./components/SecondInterviewAdjustmentScreen";
import FinalInterviewScreen from "./components/FinalInterviewScreen";
import FinalInterviewAdjustmentScreen from "./components/FinalInterviewAdjustmentScreen";
import OtherScreens from "./components/OtherScreens";

// import "./components/ProfileScreen.css";
import { TextField, Button, Card, CardContent, Typography, Box, Grid, Container, Divider, Link } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [profileData, setProfileData] = useState({
    name: "",
    furigana: "",
    photo: null,
    education: "",
    career: "",
    resume: null,
    careerSheet: null,
    route: "",
    birthdate: "",
    address: "",
    origin: "",
    employmentStatus: "",
    university: "",
    highSchool: "",
  });
  

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [casualData, setCasualData] = useState({
    result: "",
    honesty: "",
    teamLove: "",
    charm: "",
    humility: "",
    notes: "",
  });

  const [firstInterviewData, setFirstInterviewData] = useState({
    technicalSkills: "",
    problemSolving: "",
    logicalThinking: "",
    leadership: "",
    careerVision: "",
  });

  const [secondInterviewData, setSecondInterviewData] = useState({
    technicalSkills: "",
    problemSolving: "",
    logicalThinking: "",
    leadership: "",
    careerVision: "",
  });

  const [finalInterviewData, setFinalInterviewData] = useState({
    technicalSkills: "",
    problemSolving: "",
    logicalThinking: "",
    leadership: "",
    careerVision: "",
  });

  const [followupData, setFollowupData] = useState({
    notes: "",
  });

  const [currentStep, setCurrentStep] = useState(0);

  const [stepLabels, setStepLabels] = useState([
    "エントリー",
    "調整中",
    "カジュアル",
    "調整中",
    "1次面接",
    "調整中",
    "2次面接",
    "調整中",
    "最終面接",
    "調整中"
  ]);

  const [steps, setSteps] = useState([
    { id: 1, type: 'profile' },
    { id: 2, type: 'entryAdjustment' },
    { id: 3, type: 'casual' },
    { id: 4, type: 'casualAdjustment' },
    { id: 5, type: 'firstInterview' },
    { id: 6, type: 'firstInterviewAdjustment' },
    { id: 7, type: 'secondInterview' },
    { id: 8, type: 'secondInterviewAdjustment' },
    { id: 9, type: 'finalInterview' },
    { id: 10, type: 'finalInterviewAdjustment' },
    { id: 11, type: 'other' },
  ]);

  // // フォロー面談の追加
  // const handleAddStep = () => {
  //   const newStepIndex = steps.length;
  //   const newStepName = `フォロー面談 ${newStepIndex - 10}`;
  //   setStepLabels((prev) => [...prev, newStepName]);
  //   setSteps((prev) => [...prev, { id: newStepIndex, type: "followUp" }]);
  //   setCurrentStep(newStepIndex);
  // };

  const handleRegister = async () => {
    // stateに保持されたprofileDataをバックエンド用に整形
    const candidateData = {
      name: profileData.name,
      furigana: profileData.furigana,
      photo_url: profileData.photo ? URL.createObjectURL(profileData.photo) : null,
      education: profileData.education,
      career: profileData.career,
      resume_url: profileData.resume ? URL.createObjectURL(profileData.resume) : null,
      career_sheet_url: profileData.careerSheet ? URL.createObjectURL(profileData.careerSheet) : null,
      route: profileData.route,
      birthdate: profileData.birthdate, // "YYYY-MM-DD"形式に整形する場合も検討
      address: profileData.address,
      origin: profileData.origin,
      employment_status: profileData.employmentStatus,
      university: profileData.university,
      high_school: profileData.highSchool,
    };
    try {
      const response = await fetch("http://localhost:3001/candidates/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(candidateData)
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Candidate登録成功", data);
        setProfileData((prev) => ({ ...prev, id: data.id }));
        setIsSubmitted(true);  // 登録成功後、表示専用モードに切り替える
        // 成功時の処理（画面遷移や通知表示など）
      } else {
        console.error("登録エラー:", response.statusText);
      }
    } catch (error) {
      console.error("ネットワークエラー:", error);
    }
  };
  


  // 例: handleAddStep の修正例
const handleAddStep = () => {
  // 既存のフォロー面談ステップ数を数える
  const followupCount = steps.filter(step => step.type.startsWith("followUp")).length;
  const followupNumber = followupCount + 1; // 新たな番号を付与
  const newStepName = `フォロー面談 ${followupNumber}`;
  
  // 新規ステップの type を "followUp" + 番号 に設定
  setStepLabels(prev => [...prev, newStepName]);
  setSteps(prev => [...prev, { id: prev.length + 1, type: `followUp${followupNumber}` }]);
  setCurrentStep(steps.length);
};






  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const fixedWidth = 1280;
      const fixedHeight = 720;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
  
      const scaleX = windowWidth / fixedWidth;
      const scaleY = windowHeight / fixedHeight;
  
      // 画面が小さい場合は縮小、大きい場合は拡大しない（最大値は 1）
      const newScale = Math.min(scaleX, scaleY, 1);
      setScale(newScale);
    };
  
    // 初回レンダリング時にスケールを設定
    updateScale();
  
    // ウィンドウリサイズ時にスケールを更新
    window.addEventListener("resize", updateScale);
  
    // クリーンアップ
    return () => window.removeEventListener("resize", updateScale);
  }, []);
  
  const photoPreviewUrl = profileData.photo ? URL.createObjectURL(profileData.photo) : null;
  const fileInputRef = useRef(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: files[0] }));
  };


  return (
    <Router>
      <Box className="app-container">
        <Box
          className="scale-wrapper"
          sx={{
            transform: `scale(${scale})`,
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontSize: '1.2rem' }}>
              個人プロフィール
            </Typography>
            <Divider sx={{ mb: 1.25 }} />
            <Grid container spacing={4}>
              {/* 左側セクション */}

              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    p: { xs: 2, md: 2 },                // パディングを画面サイズに応じて調整
                    boxShadow: 3,
                    maxHeight: { xs: '80vh', md: '72vh', lg: '68vh' }, // 高さの制限とレスポンシブ調整
                    overflowY: 'auto',
                  }}
                >
                  {/* 写真と名前の部分 */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      gap: 2,
                    }}
                  >                   
                    <Box
                      sx={{
                        width: { xs: 90, md: 90 },          // 幅を画面サイズに合わせて調整
                        height: { xs: 120, md: 120 },         // 高さも同様に調整
                        flexShrink: 0,
                        backgroundColor: "#f5f5f5",
                        borderRadius: "8px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundImage: photoPreviewUrl ? `url(${photoPreviewUrl})` : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        border: "2px solid #ddd",
                        cursor: isSubmitted ? "default" : "pointer", // 表示専用の場合はクリック不可
                      }}
                      onClick={isSubmitted ? undefined : () => fileInputRef.current.click()}
                    >
                      {!photoPreviewUrl && (
                        <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }}>
                          写真未挿入
                        </Typography>
                      )}
                    </Box>


                    <Box>
                      {isSubmitted ? (
                        <>
                          {/* 表示専用モード：ふりがな */}
                          <Typography
                            fullWidth
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              fontSize: { xs: '0.7rem', md: '0.7rem' },
                              height: { xs: '30px', md: '15px' },
                              padding: '8px',
                            }}
                          >
                            {profileData.furigana || "ふりがな"}
                          </Typography>

                          {/* 表示専用モード：名前 */}
                          <Typography
                            fullWidth
                            variant="h6"
                            sx={{
                              mt: { xs: 0.5, md: 1 },
                              fontSize: { xs: '1rem', md: '2rem' },
                              height: { xs: '40px', md: '50px' },
                              padding: '8px',
                            }}
                          >
                            {profileData.name || "名前"}
                          </Typography>
                        </>
                        ) : (
                        <>
                          {/* 編集モード：ふりがなのTextField */}
                          <TextField
                            fullWidth
                            label="ふりがな"
                            name="furigana"
                            value={profileData.furigana}
                            onChange={handleInputChange}
                            variant="outlined"
                            sx={{
                              '& .MuiInputBase-input': {
                                fontSize: { xs: '0.7rem', md: '0.7rem' },
                                height: { xs: '30px', md: '15px' }, // 入力部分の高さを調整
                                padding: '8px',
                              },
                              '& .MuiInputLabel-root': {
                                fontSize: { xs: '0.7rem', md: '0.7rem' },
                              },
                            }}
                          />

                          {/* 編集モード：名前のTextField */}
                          <TextField
                            fullWidth
                            label="名前"
                            name="name"
                            value={profileData.name}
                            onChange={handleInputChange}
                            variant="outlined"
                            sx={{
                              mt: { xs: 0.5, md: 1 },
                              '& .MuiInputBase-input': {
                                fontSize: { xs: '1rem', md: '2rem' },
                                height: { xs: '40px', md: '50px' }, // 入力部分の高さを調整
                                padding: '8px',
                              },
                              '& .MuiInputLabel-root': {
                                fontSize: { xs: '1rem', md: '1rem' },
                              },
                            }}
                          />
                        </>
                      )}
                    </Box>



                    
                  </Box>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                  />

                  {/* Divider で区切り */}
                  <Divider sx={{ my: 1 }} />

                  {/* 追加の項目群 */}
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12}>
                      { isSubmitted ? (
                        // 表示専用モード：入力済みの「職務経歴」を表示
                        <Typography variant="body1">
                          <strong>職務経歴:</strong> {profileData.career || "未入力"}
                        </Typography>
                      ) : (
                        // 編集モード：TextField による入力フォーム
                        <TextField
                          fullWidth
                          label="職務経歴"
                          name="career"
                          value={profileData.career}
                          onChange={handleInputChange}
                          variant="outlined"
                          sx={{
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
                          }}
                        />
                      )}

                    </Grid>




                    <Grid item xs={12} sm={12} md={12}>
                      {isSubmitted ? (
                        <Typography variant="body1">
                          <strong>履歴書:</strong>{" "}
                          {profileData.resume ? (
                            <Link
                              onClick={() => {
                                const fileURL = URL.createObjectURL(profileData.resume);
                                window.open(fileURL, "_blank");
                              }}
                              sx={{ cursor: "pointer", color: "#007bff" }}
                            >
                              📎 {profileData.resume.name}
                            </Link>
                          ) : (
                            "未アップロード"
                          )}
                        </Typography>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            component="label"
                            fullWidth
                            sx={{ fontSize: { xs: "0.8rem", md: "0.8rem" } }}
                          >
                            履歴書をアップロード
                            <input
                              type="file"
                              name="resume"
                              hidden
                              onChange={handleFileUpload}
                            />
                          </Button>
                          {profileData.resume && (
                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                              アップロード済み: {profileData.resume.name}
                            </Typography>
                          )}
                        </>
                      )}
                    </Grid>

                    {/* 職務経歴書フィールド */}
                    <Grid item xs={12} sm={12} md={12}>
                      {isSubmitted ? (
                        <Typography variant="body1">
                          <strong>職務経歴書:</strong>{" "}
                          {profileData.careerSheet ? (
                            <Link
                              onClick={() => {
                                const fileURL = URL.createObjectURL(profileData.careerSheet);
                                window.open(fileURL, "_blank");
                              }}
                              sx={{ cursor: "pointer", color: "#007bff" }}
                            >
                              📎 {profileData.careerSheet.name}
                            </Link>
                          ) : (
                            "未アップロード"
                          )}
                        </Typography>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            component="label"
                            fullWidth
                            sx={{ fontSize: { xs: "0.8rem", md: "0.8rem" } }}
                          >
                            職務経歴書をアップロード
                            <input
                              type="file"
                              name="careerSheet"
                              hidden
                              onChange={handleFileUpload}
                            />
                          </Button>
                          {profileData.careerSheet && (
                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                              アップロード済み: {profileData.careerSheet.name}
                            </Typography>
                          )}
                        </>
                      )}
                    </Grid>




                    <Grid item xs={12} sm={12} md={12}>
                      { isSubmitted ? (
                        // 表示専用モード：入力済みの「職務経歴」を表示
                        <Typography variant="body1">
                          <strong>経路:</strong> {profileData.route || "未入力"}
                        </Typography>
                      ) : (
                        /* 編集モード：TextField による入力フォーム */
                        <TextField
                          fullWidth
                          label="経路"
                          name="route"
                          value={profileData.route}
                          onChange={handleInputChange}
                          variant="outlined"
                          sx={{
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
                          }}
                        />
                      )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      { isSubmitted ? (
                        // 表示専用モード：入力済みの「職務経歴」を表示
                        <Typography variant="body1">
                          <strong>生年月日:</strong> {profileData.birthdate || "未入力"}
                        </Typography>
                      ) : (
                        /* 編集モード：TextField による入力フォーム */
                        <TextField
                          fullWidth
                          label="生年月日"
                          name="birthdate"
                          value={profileData.birthdate}
                          onChange={handleInputChange}
                          variant="outlined"
                          sx={{
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
                          }}
                        />
                      )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      { isSubmitted ? (
                        // 表示専用モード：入力済みの「職務経歴」を表示
                        <Typography variant="body1">
                          <strong>住所:</strong> {profileData.address || "未入力"}
                        </Typography>
                      ) : (
                        /* 編集モード：TextField による入力フォーム */
                        <TextField
                          fullWidth
                          label="住所"
                          name="address"
                          value={profileData.address}
                          onChange={handleInputChange}
                          variant="outlined"
                          sx={{
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
                          }}
                        />
                      )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                    { isSubmitted ? (
                        // 表示専用モード：入力済みの「職務経歴」を表示
                        <Typography variant="body1">
                          <strong>出身:</strong> {profileData.origin || "未入力"}
                        </Typography>
                      ) : (
                        /* 編集モード：TextField による入力フォーム */
                        <TextField
                          fullWidth
                          label="出身"
                          name="origin"
                          value={profileData.origin}
                          onChange={handleInputChange}
                          variant="outlined"
                          sx={{
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
                          }}
                        />
                      )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      { isSubmitted ? (
                        // 表示専用モード：入力済みの「職務経歴」を表示
                        <Typography variant="body1">
                          <strong>就業状況:</strong> {profileData.employmentStatus || "未入力"}
                        </Typography>
                      ) : (
                        /* 編集モード：TextField による入力フォーム */
                        <TextField
                          fullWidth
                          label="就業状況"
                          name="employmentStatus"
                          value={profileData.employmentStatus}
                          onChange={handleInputChange}
                          variant="outlined"
                          sx={{
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
                          }}
                        />
                      )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      { isSubmitted ? (
                        // 表示専用モード：入力済みの「職務経歴」を表示
                        <Typography variant="body1">
                          <strong>大学:</strong> {profileData.university || "未入力"}
                        </Typography>
                      ) : (
                        /* 編集モード：TextField による入力フォーム */
                        <TextField
                          fullWidth
                          label="大学"
                          name="university"
                          value={profileData.university}
                          onChange={handleInputChange}
                          variant="outlined"
                          sx={{
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
                          }}
                        />
                      )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      { isSubmitted ? (
                        // 表示専用モード：入力済みの「職務経歴」を表示
                        <Typography variant="body1">
                          <strong>高校:</strong> {profileData.highSchool || "未入力"}
                        </Typography>
                      ) : (
                        /* 編集モード：TextField による入力フォーム */
                        <TextField
                          fullWidth
                          label="高校"
                          name="highSchool"
                          value={profileData.highSchool}
                          onChange={handleInputChange}
                          variant="outlined"
                          sx={{
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
                          }}
                        />
                      )}
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                        {/* 編集ボタンの追加 */}
                        <Button
                          variant="outlined"
                          onClick={() => setIsSubmitted(false)}
                          sx={{ fontSize: { xs: '0.8rem', md: '0.8rem' }, ml: 1 }}
                        >
                          編集
                        </Button>
                        <Button
                          variant="contained"
                          onClick={handleRegister}
                          sx={{ fontSize: { xs: '0.8rem', md: '0.8rem' }, ml: 1 }}
                        >
                          登録
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>










              {/* 右側セクション */}
              <Grid item xs={12} md={8}>
                <StepNavigator
                  steps={stepLabels}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                  onAddStep={handleAddStep}
                />
                <Routes>
                  <Route path="/" element={<ProfileScreen profileData={profileData} setProfileData={setProfileData} />} />
                  <Route path="/entryAdjustment" element={<EntryAdjustmentScreen profileData={profileData} setProfileData={setProfileData} />} />
                  <Route path="/casual" element={<CasualScreen profileData={profileData} casualData={casualData} setCasualData={setCasualData} />} />
                  <Route path="/casualAdjustment" element={<CasualAdjustmentScreen profileData={profileData} casualData={casualData} />} />
                  <Route path="/firstInterview" element={<FirstInterviewScreen profileData={profileData} firstInterviewData={firstInterviewData} setFirstInterviewData={setFirstInterviewData} />} />
                  <Route path="/firstInterviewAdjustment" element={<FirstInterviewAdjustmentScreen profileData={profileData} casualData={casualData} firstInterviewData={firstInterviewData} />} />
                  <Route path="/secondInterview" element={<SecondInterviewScreen profileData={profileData} secondInterviewData={secondInterviewData} setSecondInterviewData={setSecondInterviewData} />} />
                  <Route path="/secondInterviewAdjustment" element={<SecondInterviewAdjustmentScreen profileData={profileData} casualData={casualData} firstInterviewData={firstInterviewData} secondInterviewData={secondInterviewData} />} />
                  <Route path="/finalInterview" element={<FinalInterviewScreen profileData={profileData} finalInterviewData={finalInterviewData} setFinalInterviewData={setFinalInterviewData} />} />
                  <Route path="/finalInterviewAdjustment" element={<FinalInterviewAdjustmentScreen profileData={profileData} casualData={casualData} firstInterviewData={firstInterviewData} secondInterviewData={secondInterviewData} finalInterviewData={finalInterviewData} />} />
                  {/* <Route path="/other" element={<OtherScreens profileData={profileData} casualData={casualData} />} /> */}
                  <Route path="/followup/:followupId" element={<OtherScreens profileData={profileData} followupData={followupData} setFollowupData={setFollowupData}/>} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Router>
  );
}  





export default App;
// 