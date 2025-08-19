// src/utils/fieldMap.js will hold your key → Ninja Forms field ID mapping
import { fieldMap } from "./fieldMap";

/**
 * 🛠 Build a Ninja Forms submission payload
 * @param {number} formId - Numeric ID of the Ninja Form in WordPress
 * @param {object} formData - Object keyed by your friendly names (matching fieldMap keys)
 * @param {Array} [uploadedFiles=[]] - Optional array of uploaded file objects for 'imageupload'
 * @returns {object} - Payload ready to send to your proxy's submit endpoint
 */
export function buildNinjaFormsPayload(formId, formData, uploadedFiles = []) {
  const fields = {};

  Object.entries(formData).forEach(([key, value]) => {
    if (fieldMap[key]) {
      // Handle the image upload case separately if needed
      if (key === "imageupload") {
        fields[fieldMap[key]] = {
          value: 1,
          files: uploadedFiles
        };
      } else {
        fields[fieldMap[key]] = { value: value || "" };
      }
    }
  });

  return {
    form_id: formId,
    fields
  };
}
