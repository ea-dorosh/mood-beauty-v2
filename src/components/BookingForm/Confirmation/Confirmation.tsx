"use client";

import dayjs from "dayjs";
import "dayjs/locale/de";
import Link from "next/link";
import type { AppointmentConfirmation } from "@/types/booking";
import { formattedTime } from "@/utils/formatters";

dayjs.locale(`de`);

interface ConfirmationProps {
  appointment: AppointmentConfirmation;
}

export default function Confirmation({ appointment }: ConfirmationProps) {
  return (
    <>
      {/* Success banner */}
      <div className="flex items-center justify-center gap-3 p-4 mb-4 rounded-2xl bg-[rgba(0,171,85,0.08)] border border-[rgba(0,171,85,0.3)]">
        {/* Checkmark icon */}
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-[var(--color-success)]">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[var(--color-success)] font-bold">
          Termin erfolgreich best&auml;tigt
        </span>
      </div>

      <div>
        <p className="text-[1.6rem] font-bold text-center">
          Terminbest&auml;tigung
        </p>

        <div className="mt-6">
          Hallo {appointment.firstName} {appointment.lastName},
        </div>

        <div>
          vielen Dank f&uuml;r Ihre Buchung! Ihr Termin wurde erfolgreich best&auml;tigt.
          <br />
          <br />
          <b>Details Ihres Termins:</b>
        </div>

        {!appointment.service.secondService && (
          <div className="mt-4">
            Behandlung: <b>{appointment.service.name}</b>
          </div>
        )}

        {appointment.service.secondService && (
          <div className="mt-4">
            Behandlung:
            <br />
            - <b>{appointment.service.name}</b><br />
            - <b>{appointment.service.secondService.name}</b>
          </div>
        )}

        <div className="mt-4">
          Datum: <b>{dayjs(appointment.date).format(`D. MMMM YYYY`)}</b>
        </div>

        <div className="mt-4">
          Uhrzeit: <b>{formattedTime(appointment.service.timeStart)} Uhr</b>
        </div>

        <div className="mt-4">
          Wir freuen uns, Sie bald bei uns begr&uuml;&szlig;en zu d&uuml;rfen. Bei Fragen oder &Auml;nderungen zu Ihrem Termin stehen wir Ihnen jederzeit gerne zur Verf&uuml;gung.
          <br />
          <br />
          Mit freundlichen Gr&uuml;&szlig;en,
          <br />
          {appointment.company.branches[0].name}
          <br />
          <a
            href={`mailto:${appointment.company.branches[0].email}`}
            className="underline"
          >
            {appointment.company.branches[0].email}
          </a>
          <br />
          <a
            href={`tel:${appointment.company.branches[0].phone}`}
            className="underline"
          >
            {appointment.company.branches[0].phone}
          </a>
          <br />
          {appointment.company.branches[0].addressStreet}, {appointment.company.branches[0].addressZip} {appointment.company.branches[0].addressCity}
        </div>
      </div>

      <hr className="my-4 border-[rgba(0,0,0,0.12)]" />

      <Link
        href="/"
        className="btn btn-md btn-primary mx-auto block text-center w-fit"
      >
        Zur&uuml;ck zur Startseite
      </Link>
    </>
  );
}
