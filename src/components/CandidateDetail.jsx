import React, { useEffect, useState } from "react";
import { useParams, Routes, Route, Navigate } from "react-router-dom";
import ProfileScreen from "./ProfileScreen";
import EntryAdjustmentScreen from "./EntryAdjustmentScreen";
import CasualScreen from "./CasualScreen";
import CasualAdjustmentScreen from "./CasualAdjustmentScreen";
import FirstInterviewScreen from "./FirstInterviewScreen";
import FirstInterviewAdjustmentScreen from "./FirstInterviewAdjustmentScreen";
import HRInterviewScreen from "./HRInterviewScreen";
import HRInterviewAdjustmentScreen from "./HRInterviewAdjustmentScreen";
import SecondInterviewScreen from "./SecondInterviewScreen";
import SecondInterviewAdjustmentScreen from "./SecondInterviewAdjustmentScreen";
import FinalInterviewScreen from "./FinalInterviewScreen";
import FinalInterviewAdjustmentScreen from "./FinalInterviewAdjustmentScreen";
import OtherScreens from "./OtherScreens";

function CandidateDetail({ profileData, setProfileData, casualData, setCasualData, firstInterviewData, setFirstInterviewData, HRInterviewData, setHRInterviewData, secondInterviewData, setSecondInterviewData, finalInterviewData, setFinalInterviewData, followupDataMap, setFollowupDataMap }) {
    const { candidateId } = useParams();
  

    useEffect(() => {
      if (candidateId) {
        fetch(`http://127.0.0.1:3001/candidates/${candidateId}`)
          .then((response) => response.json())
          .then((data) => {
            // プロフィール情報
            setProfileData({
              name: data.name,
              furigana: data.furigana,
              photo_url: data.photo_url,
              education: data.education,
              career: data.career,
              resume_url: data.resume_url,
              career_sheet_url: data.career_sheet_url,
              route: data.route,
              birthdate: data.birthdate,
              address: data.address,
              origin: data.origin,
              employmentStatus: data.employment_status,
              university: data.university,
              highSchool: data.highSchool
            });
    
            // カジュアル面接情報
            setCasualData({
              interview_data: data.casual_interview_data,  // 例: SQLのカラム名に合わせる
              interviewer: data.casual_interviewer,
              result: data.casual_result,
              personality: data.casual_personality,
              character: data.casual_character,
              remarks: data.casual_remarks
            });
    
            // 1次面接情報
            setFirstInterviewData({
              interview_data: data.first_interview_data,
              interviewer: data.first_interviewer,
              values: data.first_values,
              culture: data.first_culture,
              remarks: data.first_remarks
            });
    
            // 人事面談情報
            setHRInterviewData({
              interview_data: data.hr_interview_data,
              interviewer: data.hr_interviewer,
              values: data.hr_values,
              culture: data.hr_culture,
              remarks: data.hr_remarks
            });
    
            // 2次面接情報
            setSecondInterviewData({
              technicalSkills: data.second_technicalSkills,
              problemSolving: data.second_problemSolving,
              logicalThinking: data.second_logicalThinking,
              leadership: data.second_leadership,
              careerVision: data.second_careerVision
            });
    
            // 最終面接情報
            setFinalInterviewData({
              technicalSkills: data.final_technicalSkills,
              problemSolving: data.final_problemSolving,
              logicalThinking: data.final_logicalThinking,
              leadership: data.final_leadership,
              careerVision: data.final_careerVision
            });
    
            // フォロー面談情報（必要に応じて）
            setFollowupDataMap({
              // 例: data.followupDataMap が返ってくる場合
              ...data.followupDataMap
            });
          })
          .catch((error) => console.error("Error fetching candidate details:", error));
      }
    }, [candidateId, setProfileData]);


  return (
    <>
      {/* 共通のナビゲーションなどをここに置くことも可能 */}
      <Routes>
        <Route
          path="profile"
          element={<ProfileScreen profileData={profileData} setProfileData={setProfileData} />}
        />
        <Route
          path="entryAdjustment"
          element={<EntryAdjustmentScreen profileData={profileData} setProfileData={setProfileData} />}
        />
        <Route
          path="casual"
          element={<CasualScreen profileData={profileData} casualData={casualData} setCasualData={setCasualData} />}
        />
        <Route
          path="casualAdjustment"
          element={<CasualAdjustmentScreen profileData={profileData} casualData={casualData} />}
        />
        <Route
          path="firstInterview"
          element={<FirstInterviewScreen profileData={profileData} firstInterviewData={firstInterviewData} setFirstInterviewData={setFirstInterviewData} />}
        />
        <Route
          path="firstInterviewAdjustment"
          element={<FirstInterviewAdjustmentScreen profileData={profileData} casualData={casualData} firstInterviewData={firstInterviewData}/>}
        />
        <Route
          path="HRInterview"
          element={<HRInterviewScreen profileData={profileData} HRInterviewData={HRInterviewData} setHRInterviewData={setHRInterviewData}/>}
        />
        <Route
          path="HRInterviewAdjustment"
          element={<HRInterviewAdjustmentScreen profileData={profileData} casualData={casualData} firstInterviewData={firstInterviewData} HRInterviewData={HRInterviewData}/>}
        />
        <Route
          path="secondInterview"
          element={<SecondInterviewScreen profileData={profileData} secondInterviewData={secondInterviewData} setSecondInterviewData={setSecondInterviewData}/>}
        />
        <Route
          path="secondInterviewAdjustment"
          element={<SecondInterviewAdjustmentScreen profileData={profileData} casualData={casualData} firstInterviewData={firstInterviewData} HRInterviewData={HRInterviewData} secondInterviewData={secondInterviewData}/>}
        />
        <Route
          path="finalInterview"
          element={<FinalInterviewScreen profileData={profileData} finalInterviewData={finalInterviewData} setFinalInterviewData={setFinalInterviewData}/>}
        />
        <Route
          path="finalInterviewAdjustment"
          element={<FinalInterviewAdjustmentScreen profileData={profileData} casualData={casualData} firstInterviewData={firstInterviewData} HRInterviewData={HRInterviewData} secondInterviewData={secondInterviewData} finalInterviewData={finalInterviewData}/>}
        />
        <Route
          path="followup/:followupId"
          element={<OtherScreens profileData={profileData} followupDataMap={followupDataMap} setFollowupDataMap={setFollowupDataMap}/>}
        />
        {/* URL が候補者詳細内で該当しない場合は profile へリダイレクト */}
        <Route path="*" element={<Navigate to="profile" />} />
      </Routes>
    </>
  );
}

export default CandidateDetail;
