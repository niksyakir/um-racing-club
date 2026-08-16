"use server";

import { createClient } from "@/lib/supabase/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_RESUME_BYTES = 5 * 1024 * 1024;

export async function submitApplication(prevState, formData) {
  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const department = formData.get("department")?.toString().trim() ?? "";
  const motivation = formData.get("motivation")?.toString().trim() ?? "";
  const studentId = formData.get("student_id")?.toString().trim() ?? "";
  const file = formData.get("resume");
  const hasResume = file && typeof file === "object" && file.size > 0;
  const consent = formData.get("consent") === "on";

  const fieldErrors = {};
  if (!name) fieldErrors.name = "Full name is required.";
  if (!email) fieldErrors.email = "Email is required.";
  else if (!EMAIL_RE.test(email)) fieldErrors.email = "Enter a valid email address.";
  if (!department) fieldErrors.department = "Please select a department.";
  if (!consent) fieldErrors.consent = "You must agree to the Privacy Policy to submit.";
  if (hasResume) {
    if (file.type !== "application/pdf") {
      fieldErrors.resume = "Resume must be a PDF file.";
    } else if (file.size > MAX_RESUME_BYTES) {
      fieldErrors.resume = "Resume must be smaller than 5MB.";
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { error: "Please fix the errors below.", fieldErrors, success: false };
  }

  const supabase = await createClient();
  let resume_url = null;

  if (hasResume) {
    const path = `${crypto.randomUUID()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(path, file);

    if (uploadError) {
      return {
        error: "Resume upload failed. Please try again.",
        fieldErrors: {},
        success: false,
      };
    }
    resume_url = path;
  }

  const { error } = await supabase.from("applications").insert({
    applicant_name: name,
    applicant_email: email,
    student_id: studentId || null,
    department_applied: department,
    motivation_text: motivation || null,
    resume_url,
  });

  if (error) {
    return {
      error: "Something went wrong submitting your application. Please try again.",
      fieldErrors: {},
      success: false,
    };
  }

  return { error: null, fieldErrors: {}, success: true };
}
