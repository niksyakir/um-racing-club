"use client";

import { useActionState, useState } from "react";
import DepartmentCard from "@/components/DepartmentCard";
import Reveal from "@/components/Reveal";
import { submitApplication } from "./actions";
import { departments } from "./data";

const inputClass =
  "mt-1 w-full rounded-lg border border-navy/20 px-3 py-2 text-sm shadow-soft focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20";
const inputErrorClass =
  "mt-1 w-full rounded-lg border border-race-red px-3 py-2 text-sm shadow-soft focus:border-race-red focus:outline-none focus:ring-2 focus:ring-race-red/20";
const labelClass = "block text-sm font-semibold text-navy";
const fieldErrorClass = "mt-1 text-xs font-medium text-race-red";

const initialState = { error: null, fieldErrors: {}, success: false };

export default function ApplyPage() {
  const [state, formAction, pending] = useActionState(submitApplication, initialState);
  const fieldErrors = state.fieldErrors ?? {};
  const [department, setDepartment] = useState(departments[0]?.name ?? "");
  const [departmentPreselected, setDepartmentPreselected] = useState(false);

  function selectDepartment(name) {
    setDepartment(name);
    setDepartmentPreselected(true);
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <Reveal>
        <h1 className="font-display text-5xl tracking-wide text-navy md:text-6xl">
          Apply / Recruitment
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          We&apos;re always looking for driven students to join UM Racing.
          Take a look at our departments, then submit your application below.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {departments.map((dept, index) => (
          <Reveal key={dept.name} delay={index * 100}>
            <DepartmentCard
              name={dept.name}
              description={dept.description}
              ctaHref="#apply-form"
              ctaLabel="Apply Now"
              onCtaClick={() => selectDepartment(dept.name)}
            />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div id="apply-form" className="mt-16 max-w-xl scroll-mt-24">
          <h2 className="text-xl font-bold text-navy">Submit Your Application</h2>
          {departmentPreselected && !state.success && (
            <p className="mt-1 text-sm font-semibold text-race-red">
              Applying for: {department}
            </p>
          )}

          {state.success ? (
            <div className="mt-4 rounded-xl border border-gold bg-gold/10 p-6">
              <p className="font-semibold text-navy">Application submitted!</p>
              <p className="mt-1 text-sm text-gray-600">
                Thanks for applying — we&apos;ll be in touch soon.
              </p>
            </div>
          ) : (
            <form action={formAction} className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? "name-error" : undefined}
                  className={fieldErrors.name ? inputErrorClass : inputClass}
                />
                {fieldErrors.name && (
                  <p id="name-error" className={fieldErrorClass} role="alert">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? "email-error" : undefined}
                  className={fieldErrors.email ? inputErrorClass : inputClass}
                />
                {fieldErrors.email && (
                  <p id="email-error" className={fieldErrorClass} role="alert">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="student_id" className={labelClass}>
                  Student ID
                </label>
                <input id="student_id" name="student_id" type="text" className={inputClass} />
              </div>

              <div>
                <label htmlFor="department" className={labelClass}>
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  required
                  value={department}
                  onChange={(event) => setDepartment(event.target.value)}
                  aria-invalid={Boolean(fieldErrors.department)}
                  aria-describedby={fieldErrors.department ? "department-error" : undefined}
                  className={fieldErrors.department ? inputErrorClass : inputClass}
                >
                  {departments.map((dept) => (
                    <option key={dept.name} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
                {fieldErrors.department && (
                  <p id="department-error" className={fieldErrorClass} role="alert">
                    {fieldErrors.department}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="motivation" className={labelClass}>
                  Why do you want to join?
                </label>
                <textarea
                  id="motivation"
                  name="motivation"
                  rows={4}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="resume" className={labelClass}>
                  Resume (PDF, max 5MB)
                </label>
                <input
                  id="resume"
                  name="resume"
                  type="file"
                  accept="application/pdf"
                  aria-invalid={Boolean(fieldErrors.resume)}
                  aria-describedby={fieldErrors.resume ? "resume-error" : undefined}
                  className={`${
                    fieldErrors.resume ? inputErrorClass : inputClass
                  } file:mr-3 file:rounded file:border-0 file:bg-navy file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white`}
                />
                {fieldErrors.resume && (
                  <p id="resume-error" className={fieldErrorClass} role="alert">
                    {fieldErrors.resume}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-start gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    name="consent"
                    aria-invalid={Boolean(fieldErrors.consent)}
                    aria-describedby={fieldErrors.consent ? "consent-error" : undefined}
                    className="mt-0.5 h-4 w-4 rounded border-navy/30"
                  />
                  <span>
                    I have read and agree to the{" "}
                    <a href="/privacy" target="_blank" className="text-race-red hover:underline">
                      Privacy Policy
                    </a>{" "}
                    regarding how my application data is collected and used.
                  </span>
                </label>
                {fieldErrors.consent && (
                  <p id="consent-error" className={fieldErrorClass} role="alert">
                    {fieldErrors.consent}
                  </p>
                )}
              </div>

              {state.error && (
                <p className="text-sm font-medium text-race-red" role="alert">
                  {state.error}
                </p>
              )}

              <button
                type="submit"
                disabled={pending}
                className="w-full rounded bg-race-red px-6 py-3 font-semibold text-white shadow-glow-red transition-all duration-200 hover:-translate-y-0.5 hover:bg-race-red/90 hover:shadow-glow-red-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
              >
                {pending ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </main>
  );
}
