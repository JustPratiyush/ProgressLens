"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async () => {
  await resend.emails.send({
    to: "omkarpadalkar21@gmail.com",
    from: "OrcDev <onboarding@resend.dev>",
    subject: "Hello from Resend",
    html: "<p>Hello from Resend</p>",
  });
};

function lowAttendanceEmailTemplate(params: {
  name: string;
  attendance: number;
  className?: string;
}) {
  const { name, attendance, className } = params;
  return `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #0f172a;">
      <h2 style="margin: 0 0 12px; font-size: 18px;">Attendance Notice</h2>
      <p style="margin: 0 0 12px;">Hi ${name},</p>
      <p style="margin: 0 0 12px;">We noticed your recent attendance is at <strong>${attendance}%</strong>${
    className ? ` in <strong>${className}</strong>` : ""
  }. Maintaining consistent attendance is important for your progress.</p>
      <p style="margin: 0 0 12px;">If there’s anything we can do to help, please reply to this email or reach out to your mentor.</p>
      <p style="margin: 16px 0 0;">Thanks,<br/>Student Support<br/>ProgressLens</p>
    </div>
  `;
}

export const sendLowAttendanceEmail = async (params: {
  to: string;
  name: string;
  attendance: number;
  className?: string;
}) => {
  const { to, name, attendance, className } = params;
  await resend.emails.send({
    to,
    from: "OrcDev <onboarding@resend.dev>",
    subject: "Attendance Notice",
    html: lowAttendanceEmailTemplate({ name, attendance, className }),
  });
};
