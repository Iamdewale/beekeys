import React, { useState } from "react";
import submitForm from "../lib/submitForm";

export default function NinjaForm({ formId }) {
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files: fileList } = e.target;
    if (type === "file") {
      setFiles((prev) => ({ ...prev, [name]: fileList[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await submitForm(formId, formData, files);
    setStatus(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Example inputs - the "name" must match WP field keys */}
      <input
        name="name"
        placeholder="Your Name"
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        name="imageupload"
        type="file"
        onChange={handleChange}
      />

      <button type="submit">Send</button>

      {status && (
        <pre style={{ marginTop: "1rem" }}>
          {JSON.stringify(status, null, 2)}
        </pre>
      )}
    </form>
  );
}
