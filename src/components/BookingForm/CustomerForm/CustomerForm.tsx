"use client";

import { useState } from "react";
import CountryCodeSelector from "./CountryCodeSelector";
import type { CustomerFormData, FormErrors } from "@/types/booking";

interface CustomerFormProps {
  createAppointment: (formData: CustomerFormData) => void;
  formErrors: FormErrors | null;
}

export default function CustomerForm({
  createAppointment,
  formErrors,
}: CustomerFormProps) {
  const [formData, setFormData] = useState<CustomerFormData>({
    firstName: ``,
    lastName: ``,
    phone: ``,
    email: ``,
    orderMessage: ``,
    consentPrivacy: false,
    consentMarketing: false,
  });

  const [countryCode, setCountryCode] = useState(`+49`);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    if (formErrors && formErrors[name]) {
      delete formErrors[name];
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const fullPhoneNumber = formData.phone.trim()
      ? `${countryCode}${formData.phone.replace(/^[+\s0]+/, ``)}`
      : ``;

    createAppointment({
      ...formData,
      phone: fullPhoneNumber,
    });
  };

  return (
    <div className="mt-4 mb-4">
      <h5 className="text-center text-xl font-heading font-semibold tracking-wide">
        Kundendetails
      </h5>

      <div className="flex flex-col w-full gap-5 mt-4">
        {/* Vorname */}
        <div>
          <label className="form-label block">Vorname</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`input ${formErrors?.firstName ? `border-[var(--color-crimson)]` : ``}`}
          />
          {formErrors?.firstName && (
            <p className="text-[var(--color-crimson)] text-xs mt-1">{formErrors.firstName}</p>
          )}
        </div>

        {/* Nachname */}
        <div>
          <label className="form-label block">Nachname</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`input ${formErrors?.lastName ? `border-[var(--color-crimson)]` : ``}`}
          />
          {formErrors?.lastName && (
            <p className="text-[var(--color-crimson)] text-xs mt-1">{formErrors.lastName}</p>
          )}
        </div>

        {/* Telefon */}
        <div>
          <label className="form-label block">Telefon</label>
          <div className="flex gap-2 items-start">
            <CountryCodeSelector
              value={countryCode}
              onChange={setCountryCode}
              error={Boolean(formErrors?.phone)}
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              placeholder="123 456 7890"
              onChange={handleChange}
              className={`input flex-1 ${formErrors?.phone ? `border-[var(--color-crimson)]` : ``}`}
            />
          </div>
          {formErrors?.phone && (
            <p className="text-[var(--color-crimson)] text-xs mt-1">{formErrors.phone}</p>
          )}
        </div>

        {/* E-Mail */}
        <div>
          <label className="form-label block">E-Mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`input ${formErrors?.email ? `border-[var(--color-crimson)]` : ``}`}
          />
          {formErrors?.email && (
            <p className="text-[var(--color-crimson)] text-xs mt-1">{formErrors.email}</p>
          )}
        </div>

        {/* Nachricht (optional) */}
        <div>
          <label className="form-label block">Nachricht (optional)</label>
          <textarea
            name="orderMessage"
            value={formData.orderMessage}
            onChange={handleChange}
            rows={3}
            placeholder="Hier können Sie uns Hinweise oder Wünsche zu Ihrer Buchung mitteilen."
            className="input resize-y"
          />
        </div>

        {/* Privacy consent (required) */}
        <div>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.consentPrivacy}
              onChange={(event) => {
                if (formErrors?.consentPrivacy) {
                  delete formErrors.consentPrivacy;
                }
                setFormData((prev) => ({
                  ...prev,
                  consentPrivacy: event.target.checked,
                }));
              }}
              className={`mt-1 w-4 h-4 flex-shrink-0 accent-black ${formErrors?.consentPrivacy ? `accent-[var(--color-crimson)]` : ``}`}
            />
            <span className="text-[0.8rem]">
              * Ich stimme der Verarbeitung meiner personenbezogenen Daten gem&auml;&szlig; der{` `}
              <a
                href="/datenschutz"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Datenschutzerkl&auml;rung
              </a>{` `}zu.
            </span>
          </label>
          {formErrors?.consentPrivacy && (
            <p className="text-[var(--color-crimson)] text-xs mt-1">{formErrors.consentPrivacy}</p>
          )}
        </div>

        {/* Marketing consent (optional) */}
        <div>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.consentMarketing}
              onChange={(event) => setFormData((prev) => ({
                ...prev,
                consentMarketing: event.target.checked,
              }))}
              className="mt-1 w-4 h-4 flex-shrink-0 accent-black"
            />
            <span className="text-[0.8rem]">
              Ich m&ouml;chte Neuigkeiten, Angebote und Aktionen per E-Mail erhalten (optional).
            </span>
          </label>
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-md btn-primary mt-4 mx-auto w-[300px] max-w-full"
        >
          Termin Buchen
        </button>
      </div>
    </div>
  );
}
