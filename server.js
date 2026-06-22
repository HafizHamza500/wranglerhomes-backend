require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({ origin: "https://wranglerhomes.com" }));
// app.use(cors());
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", time: new Date().toISOString() });
});

app.post("/api/lead", async (req, res) => {
  try {
    const data = req.body;
    console.log("Lead received:", data);

 const adminMailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.ADMIN_EMAIL,
  subject: `🏠 New Lead - ${data.fname || ''} ${data.lname || ''} (Wrangler Homes)`,
  html: `
  <div style="background:#F7F9FC;padding:30px 15px;font-family:'Segoe UI',Arial,sans-serif;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 10px 30px rgba(15,30,56,0.12);border:1px solid #e3e8f0;">

      <!-- Header -->
      <div style="background:#0F1E38;padding:24px 30px;border-bottom:3px solid #B22234;">
        <h1 style="margin:0;color:#fff;font-size:20px;letter-spacing:1px;">
          Wrangler <span style="color:#C8960C;">Homes</span>
        </h1>
        <p style="margin:6px 0 0;color:rgba(255,255,255,0.6);font-size:12px;letter-spacing:2px;text-transform:uppercase;">
          New Cash Offer Lead
        </p>
      </div>

      <!-- Status badge -->
      <div style="padding:18px 30px 0;">
        <span style="display:inline-block;background:rgba(200,150,12,0.12);color:#B8860B;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;padding:6px 14px;border-radius:20px;border:1px solid rgba(200,150,12,0.3);">
          ${data.step === 3 ? 'New Cash Offer Request' : `Step ${data.step || '-'} of 3`}
        </span>
      </div>

      <!-- Lead Info Table -->
      <div style="padding:20px 30px 10px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr>
            <td style="padding:12px 0;color:#3D6B9E;width:140px;border-bottom:1px solid #eef1f6;font-weight:600;">Full Name</td>
            <td style="padding:12px 0;color:#0F1E38;border-bottom:1px solid #eef1f6;">${data.fname || '-'} ${data.lname || ''}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;color:#3D6B9E;border-bottom:1px solid #eef1f6;font-weight:600;">Phone</td>
            <td style="padding:12px 0;color:#0F1E38;border-bottom:1px solid #eef1f6;">
              <a href="tel:${data.phone || ''}" style="color:#B22234;text-decoration:none;">${data.phone || '-'}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0;color:#3D6B9E;border-bottom:1px solid #eef1f6;font-weight:600;">Email</td>
            <td style="padding:12px 0;color:#0F1E38;border-bottom:1px solid #eef1f6;">
              <a href="mailto:${data.email || ''}" style="color:#B22234;text-decoration:none;">${data.email || '-'}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0;color:#3D6B9E;border-bottom:1px solid #eef1f6;font-weight:600;">Property Address</td>
            <td style="padding:12px 0;color:#0F1E38;border-bottom:1px solid #eef1f6;">${data.address || '-'}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;color:#3D6B9E;border-bottom:1px solid #eef1f6;font-weight:600;">Property Type</td>
            <td style="padding:12px 0;color:#0F1E38;border-bottom:1px solid #eef1f6;">${data.type || '-'}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;color:#3D6B9E;border-bottom:1px solid #eef1f6;font-weight:600;">Timeline</td>
            <td style="padding:12px 0;color:#0F1E38;border-bottom:1px solid #eef1f6;">${data.timeline || '-'}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;color:#3D6B9E;border-bottom:1px solid #eef1f6;font-weight:600;">Condition</td>
            <td style="padding:12px 0;color:#0F1E38;border-bottom:1px solid #eef1f6;">${data.condition || '-'}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;color:#3D6B9E;border-bottom:1px solid #eef1f6;font-weight:600;">Terms Accepted</td>
            <td style="padding:12px 0;color:#0F1E38;border-bottom:1px solid #eef1f6;">${data.agreedTerms || 'No'}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;color:#3D6B9E;border-bottom:1px solid #eef1f6;font-weight:600;">SMS/Call Consent</td>
            <td style="padding:12px 0;color:#0F1E38;border-bottom:1px solid #eef1f6;">${data.agreedSms || 'No'}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;color:#3D6B9E;font-weight:600;vertical-align:top;">Notes</td>
            <td style="padding:12px 0;color:#0F1E38;">${data.situation || '-'}</td>
          </tr>
        </table>
      </div>

      <!-- CTA -->
      <div style="padding:10px 30px 28px;">
        <a href="mailto:${data.email || ''}" style="display:inline-block;background:#B22234;color:#fff;text-decoration:none;font-size:13px;font-weight:600;letter-spacing:1px;padding:12px 26px;border-radius:6px;">
          Reply to Lead
        </a>
      </div>

      <!-- Footer -->
      <div style="background:#F7F9FC;padding:14px 30px;border-top:1px solid #e3e8f0;">
        <p style="margin:0;color:#9aa6b8;font-size:11px;">
          Submitted from wranglerhomes.com · ${new Date().toLocaleString()}
        </p>
      </div>

    </div>
  </div>
  `,
};

    await transporter.sendMail(adminMailOptions);
    console.log("Admin email sent to:", process.env.ADMIN_EMAIL);

    if (data.step === 3 && data.email) {
      const userMailOptions = {
        from: process.env.EMAIL_USER,
        to: data.email,
        subject: "We received your inquiry - Wrangler Homes",
        html: `
          <div style="font-family:Arial,sans-serif;text-align:center;padding:20px;max-width:500px;margin:auto;">
            <h2 style="color:#b8860b;">Thank you, ${data.fname || ''}!</h2>
            <p>We have received your request and a dedicated agent will contact you within <strong>24 hours</strong> with a fair cash offer.</p>
            <p>No obligation. No pressure. Just a straightforward offer.</p>
            <br/>
            <p style="color:#555;">- The Wrangler Homes Team</p>
          </div>
        `,
      };
      await transporter.sendMail(userMailOptions);
      console.log("User confirmation sent to:", data.email);
    }

    res.status(200).json({ success: true, message: "Lead received successfully" });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});