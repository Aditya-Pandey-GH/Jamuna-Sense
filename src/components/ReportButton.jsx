import React from 'react';
import './ReportButton.css';

export default function ReportButton({ onClick, children = 'Report Issue' }) {
  return (
    <button className="report-button" onClick={onClick}>
      {children}
    </button>
  );
}