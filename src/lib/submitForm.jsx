export default async function submitForm(formId, formData = {}, files = {}) {
  try {
    // Step 1: Get the latest field map from your backend
    const fieldMapRes = await fetch(`/form-fields/${formId}`);
    const { success, fieldMap } = await fieldMapRes.json();

    if (!success || !fieldMap) {
      throw new Error("Could not fetch field map");
    }

    // Step 2: Build the payload
    const payload = {
      form_id: formId,
      fields: {}
    };

    // Map text fields
    for (const [key, value] of Object.entries(formData)) {
      const fieldId = fieldMap[key.toLowerCase()];
      if (fieldId) {
        payload.fields[fieldId] = { value };
      }
    }

    // Map file fields
    for (const [key, file] of Object.entries(files)) {
      const fieldId = fieldMap[key.toLowerCase()];
      if (fieldId) {
        payload.fields[fieldId] = { value: file };
      }
    }

    // Step 3: Submit to your secure backend route
    const submitRes = await fetch("/secure-submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // ⚠ Keep secrets server-side; proxy this call if needed
        "X-Proxy-Secret": "<your-proxy-secret>"
      },
      body: JSON.stringify(payload)
    });

    const result = await submitRes.json();
    return result;

  } catch (err) {
    console.error("❌ Submission error:", err);
    return { success: false, error: err.message };
  }
}
