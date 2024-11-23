import React, { useState } from "react";
import axios from "axios";
import './App.css';


function App() {
  const [formData, setFormData] = useState({
    candidate_name: "",
    candidate_surname: "",
    training_name: "",
    training_duration: "",
    training_date: "",
  });
  const [certificateUrl, setCertificateUrl] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const certificateNumber = `CERT-${Date.now()}`; // Sertifika numarasını otomatik oluştur
      const requestData = { ...formData, certificate_number: certificateNumber };

      const response = await axios.post("https://taskbackend-xi.vercel.app/certificates/", requestData, {
        headers: { "Content-Type": "application/json" },
      });

      setCertificateUrl(`https://taskbackend-xi.vercel.app/certificates/${certificateNumber}/pdf`);
      console.log("Certificate created:", response.data);
    } catch (error) {
      console.error("Error creating certificate:", error.response?.data || error.message);
    }
  };

  return (
    <div className="App">
      <h1>Create a Certificate</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="candidate_name"
          placeholder="Candidate Name"
          value={formData.candidate_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="candidate_surname"
          placeholder="Candidate Surname"
          value={formData.candidate_surname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="training_name"
          placeholder="Training Name"
          value={formData.training_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="training_duration"
          placeholder="Training Duration"
          value={formData.training_duration}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="training_date"
          value={formData.training_date}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Certificate</button>
      </form>

      {certificateUrl && (
        <div>
          <h2>Certificate Created!</h2>
          <a href={certificateUrl} target="_blank" rel="noopener noreferrer">
            View Certificate
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
