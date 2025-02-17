import React from "react";
import { NavLink } from "react-router-dom";
import "./StepNavigator.css";

function StepNavigator({ steps, onAddStep }) {
  return (
    <div className="step-navigator">
      <div className="step-container">
        {steps.map((step, index) => (
          <NavLink
            key={index}
            to={getRouteByStep(index)}  // 各ステップに対応するパスを返す関数
            className={({ isActive }) =>
              `step-button ${isActive ? "active" : ""}`
            }
          >
            {step}
          </NavLink>
        ))}
        <button className="add-button" onClick={onAddStep}>
          ＋ フォロー面談追加
        </button>
      </div>
    </div>
  );
}

// 例：ステップインデックスに対応するパスを返す関数
function getRouteByStep(index) {
  switch (index) {
    case 0:
      return "/";
    case 1:
      return "/entryAdjustment";
    case 2:
      return "/casual";
    case 3:
      return "/casualAdjustment";
    case 4:
      return "/firstInterview";
    case 5:
      return "/firstInterviewAdjustment";
    case 6:
      return "/secondInterview";
    case 7:
      return "/secondInterviewAdjustment";
    case 8:
      return "/finalInterview";
    case 9:
      return "/finalInterviewAdjustment";
    default:
      return `/followup/${index - 9}`;
  }
}

export default StepNavigator;
