import "./Loading.css";

const Loading = ({ children }) => {
	return (
		<>
			<div className="loading">
				<div className="spinner"></div>
				<div className="loadingText">Submitting your report</div>
			</div>
		</>
	);
};

export default Loading;
