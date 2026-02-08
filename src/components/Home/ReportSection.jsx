import Card from "./Card";
import { reportsData } from "./reportsData";
import './ReportSection.css'

const ReportsSection = () => {
  return (
    <Card title="Recent Reports">
      <div className="reports-list">
        {reportsData.map((report) => (
          <div key={report.id} className="report-item">
            <div className="report-info">
              <h4>{report.issue}</h4>
              <p className="stretch">{report.stretch}</p>
              <span className="time">{report.time}</span>
            </div>

            <span
              className={`severity ${report.severity.toLowerCase()}`}
            >
              {report.severity}
            </span>
          </div>
        ))}
      </div>

      <button className="report-btn">⬆ Report Issue</button>
    </Card>
  );
};

export default ReportsSection;
