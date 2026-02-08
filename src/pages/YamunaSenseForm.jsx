import { useState, useRef } from "react";
import "./YamunaSenseForm.css";
import Loading from "../components/YamunaSenseForm/Loading";

export default function YamunaSenseForm() {
	const [selectedIssue, setSelectedIssue] = useState("");
	const [customIssue, setCustomIssue] = useState("");
	const [reporterName, setReporterName] = useState("");
	const [reporterEmail, setReporterEmail] = useState("");
	const [location, setLocation] = useState("");
	const [locationDisplay, setLocationDisplay] = useState(null);
	const [details, setDetails] = useState("");
	const [file, setFile] = useState(null);
	const [fileLink, setFileLink] = useState("");
	const [preview, setPreview] = useState(null);
	const [isCapturingGPS, setIsCapturingGPS] = useState(false);
	const [gpsSuccess, setGpsSuccess] = useState(false);
	const [isDragging, setIsDragging] = useState(false);

	const [loadOverlay, setLoadOverlay] = useState(false);

	const fileInputRef = useRef(null);

	const issues = [
		{ id: "garbage", icon: "🗑️", title: "Garbage Dumping" },
		{ id: "industrial", icon: "🏭", title: "Industrial Discharge" },
		{ id: "dirty", icon: "🌊", title: "Dirty River Stretch" },
		{ id: "sewage", icon: "💧", title: "Sewage Flow" },
		{ id: "water", icon: "🚰", title: "No Clean Water" },
		{ id: "other", icon: "✏️", title: "Other Issue" },
	];

	const handleFileSelect = (selectedFile) => {
		if (!selectedFile) return;

		setFile(selectedFile);
		const reader = new FileReader();

		reader.onload = (e) => {
			setPreview({
				url: e.target.result,
				name: selectedFile.name,
				type: selectedFile.type,
			});
		};

		reader.readAsDataURL(selectedFile);
	};

	const handleDragOver = (e) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = () => {
		setIsDragging(false);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		setIsDragging(false);
		const files = e.dataTransfer.files;
		if (files.length > 0) {
			handleFileSelect(files[0]);
		}
	};

	const captureGPS = () => {
		if (!navigator.geolocation) {
			alert("Geolocation is not supported by your browser. Please use a modern browser with GPS support.");
			return;
		}

		setIsCapturingGPS(true);
		setGpsSuccess(false);

		navigator.geolocation.getCurrentPosition(
			(position) => {
				const lat = position.coords.latitude.toFixed(6);
				const lon = position.coords.longitude.toFixed(6);
				const accuracy = position.coords.accuracy.toFixed(0);

				setLocation(`${lat}, ${lon}`);
				setLocationDisplay({
					lat,
					lon,
					accuracy,
				});
				setGpsSuccess(true);
				setIsCapturingGPS(false);
			},
			(error) => {
				let errorMsg = "Unable to get location. ";
				switch (error.code) {
					case error.PERMISSION_DENIED:
						errorMsg += "Please allow location access in your browser settings.";
						break;
					case error.POSITION_UNAVAILABLE:
						errorMsg += "Location information is unavailable.";
						break;
					case error.TIMEOUT:
						errorMsg += "Location request timed out.";
						break;
					default:
						errorMsg += "An unknown error occurred.";
				}
				alert(errorMsg);
				setIsCapturingGPS(false);
			},
			{
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: 0,
			},
		);
	};

	const uploadImage = async () => {
		if (!file) return;

		const imageData = new FormData();
		imageData.append("file", file);
		imageData.append("upload_preset", "jamuna-sense");

		try {
			const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
				method: "POST",
				body: imageData,
			});
			const data = await res.json();
			setFileLink(data.secure_url);
		} catch (err) {
			console.error(err);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const issueType = selectedIssue === "other" ? customIssue : selectedIssue;

		setLoadOverlay(true);
		await uploadImage();

		const formData = {
			reportedBy: reporterName,
			reporterEmail: reporterEmail,
			issueType: issueType,
			multimedia: fileLink,
			location: location,
			description: details,
			resolved: false,
		};

		try {
			// console.log(import.meta.env.VITE_BACKEND_URL);
			// const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/report`, {
			const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reports`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			const data = await response.json();
			alert("Your report has been submitted successfully!");
		} catch (err) {
			console.error(err);
			alert("There was an error when submitting your report. Please try again.");
		} finally {
			setLoadOverlay(false);
		}

		// Show success message
		// alert("✓ Report Submitted Successfully!");

		// Reset form
		setSelectedIssue("");
		setCustomIssue("");
		setReporterName("");
		setReporterEmail("");
		setLocation("");
		setLocationDisplay(null);
		setDetails("");
		setFile(null);
		setPreview(null);
		setGpsSuccess(false);
	};

	if (loadOverlay) {
		return <Loading />;
	}

	return (
		<div className="yamuna-sense-form">
			<div className="water-ripple ripple-1"></div>
			<div className="water-ripple ripple-2"></div>
			<div className="water-ripple ripple-3"></div>

			<div className="form-container">
				<header className="form-header">
					<div className="form-logo">Yamuna Sense</div>
					<h1 className="form-title">Citizen Action System</h1>
					<p className="form-subtitle">Power to the People — Your Report, Their Accountability</p>
				</header>

				<form className="form-card" onSubmit={handleSubmit}>
					{/* Reporter Information */}
					<div className="form-section">
						<label className="form-label">Name </label>
						<input
							type="text"
							className="form-input"
							value={reporterName}
							onChange={(e) => setReporterName(e.target.value)}
							placeholder="Enter your full name"
							required
						/>
					</div>

					<div className="form-section">
						<label className="form-label">Email</label>
						<input
							type="email"
							className="form-input"
							value={reporterEmail}
							onChange={(e) => setReporterEmail(e.target.value)}
							placeholder="Enter your email address"
							required
						/>
					</div>

					{/* Issue Type Selection */}
					<div className="form-section">
						<label className="form-label">Select Issue Type</label>
						<div className="issue-grid">
							{issues.map((issue) => (
								<div key={issue.id} className="issue-card">
									<input
										type="radio"
										name="issue"
										id={issue.id}
										value={issue.id}
										checked={selectedIssue === issue.id}
										onChange={(e) => setSelectedIssue(e.target.value)}
										required
									/>
									<label htmlFor={issue.id} className="issue-label">
										<div className="issue-icon">{issue.icon}</div>
										<div className="issue-title">{issue.title}</div>
									</label>
								</div>
							))}
						</div>
						<div className={`custom-issue-container ${selectedIssue === "other" ? "active" : ""}`}>
							<input
								type="text"
								className="form-input"
								value={customIssue}
								onChange={(e) => setCustomIssue(e.target.value)}
								placeholder="Specify the issue type..."
								style={{ marginTop: "16px" }}
								required={selectedIssue === "other"}
							/>
						</div>
					</div>

					{/* File Upload */}
					<div className="form-section">
						<label className="form-label">Upload Photo or Video</label>
						{!preview ? (
							<div
								className={`upload-zone ${isDragging ? "dragover" : ""}`}
								onClick={() => fileInputRef.current.click()}
								onDragOver={handleDragOver}
								onDragLeave={handleDragLeave}
								onDrop={handleDrop}
							>
								<div className="upload-icon">📸</div>
								<div className="upload-text">Click or drag files here</div>
								<div className="upload-hint">Supports JPG, JPEG, PNG (Max 10MB)</div>
								<input
									ref={fileInputRef}
									type="file"
									// accept="image/*,video/*"
									accept="image/*"
									onChange={(e) => handleFileSelect(e.target.files[0])}
									style={{ display: "none" }}
									required
								/>
							</div>
						) : (
							<div className="preview-container">
								{/* {preview.type.startsWith("image/") ? (
									<img src={preview.url} alt="Preview" className="preview-image" />
								) : (
									<video src={preview.url} controls className="preview-video" />
								)} */}
								<div className="preview-image-container">
									<img src={preview.url} alt="Preview" className="preview-image" />
									<button
										onClick={(e) => {
											e.preventDefault();
											setPreview(null);
										}}
										className="preview-image-remove"
									>
										⨯
									</button>
								</div>
								<div className="file-name">📎 {preview.name}</div>
							</div>
						)}
						{/* {!preview && (
							<div
								className={`upload-zone ${isDragging ? "dragover" : ""}`}
								onClick={() => fileInputRef.current.click()}
								onDragOver={handleDragOver}
								onDragLeave={handleDragLeave}
								onDrop={handleDrop}
							>
								<div className="upload-icon">📸</div>
								<div className="upload-text">Click or drag files here</div>
								<div className="upload-hint">Supports JPG, JPEG, PNG (Max 10MB)</div>
								<input
									ref={fileInputRef}
									type="file"
									// accept="image/*,video/*"
									accept="image/*"
									onChange={(e) => handleFileSelect(e.target.files[0])}
									style={{ display: "none" }}
									required
								/>
							</div>
						)}
						{preview && (
							<div className="preview-container">
								<img src={preview.url} alt="Preview" className="preview-image" />
								<div className="file-name">📎 {preview.name}</div>
							</div>
						)} */}
					</div>

					{/* GPS Location */}
					<div className="form-section">
						<label className="form-label">Location (GPS Required)</label>
						<button
							type="button"
							onClick={captureGPS}
							disabled={isCapturingGPS || gpsSuccess}
							className={`gps-button ${gpsSuccess ? "success" : ""}`}
						>
							{isCapturingGPS
								? "⌛ Capturing location..."
								: gpsSuccess
									? "✓ Location Captured Successfully"
									: "📍 Capture GPS Location"}
						</button>
						<input type="hidden" value={location} required />
						{locationDisplay && (
							<div className="location-display">
								<div className="location-success">
									<span className="location-success-icon">✓</span>
									<div>
										<div className="location-success-title">Location Captured</div>
										<div className="location-success-coords">
											<strong>Coordinates:</strong> {locationDisplay.lat}, {locationDisplay.lon}
											<br />
											<strong>Accuracy:</strong> ±{locationDisplay.accuracy} meters
										</div>
									</div>
								</div>
							</div>
						)}
					</div>

					{/* Additional Details */}
					<div className="form-section">
						<label className="form-label">Additional Details (Optional)</label>
						<textarea
							className="form-textarea"
							value={details}
							onChange={(e) => setDetails(e.target.value)}
							placeholder="Describe what you observed, when it started, or any other relevant information..."
						/>
					</div>

					{/* Submit Button */}
					<button type="submit" className="submit-button">
						Submit Report
					</button>
				</form>

				<footer className="form-footer">
					Your report helps protect the Yamuna River ecosystem.
					<br />
					Together, we create accountability and drive action.
				</footer>
			</div>
		</div>
	);
}
