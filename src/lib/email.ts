import nodemailer from 'nodemailer';

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendWelcomeEmail(email: string) {
  const welcomeEmailHTML = `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Benvenuto alla Newsletter di GridjaCards</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">GridjaCards</h1>
              <p style="margin: 10px 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">Innovazione Digitale</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px; color: #1f2937; font-size: 24px; font-weight: bold;">Benvenuto nella nostra Newsletter! 🎉</h2>

              <p style="margin: 0 0 15px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                Grazie per esserti iscritto alla newsletter di <strong>GridjaCards</strong>!
              </p>

              <p style="margin: 0 0 15px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                Da oggi riceverai:
              </p>

              <ul style="margin: 0 0 20px; padding-left: 20px; color: #4b5563; font-size: 16px; line-height: 1.8;">
                <li>📰 Novità e aggiornamenti sui nostri servizi</li>
                <li>💡 Consigli e best practices per il tuo business digitale</li>
                <li>🎁 Offerte esclusive riservate agli iscritti</li>
                <li>🚀 Case study e progetti interessanti</li>
              </ul>

              <p style="margin: 0 0 25px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                Siamo entusiasti di averti con noi in questo viaggio digitale!
              </p>

              <!-- CTA Button -->
              <table role="presentation" style="margin: 30px 0;">
                <tr>
                  <td style="border-radius: 6px; background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);">
                    <a href="https://gridjacarts.com" style="display: inline-block; padding: 14px 30px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 6px;">
                      Visita il nostro sito
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 25px 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                A presto,<br>
                <strong style="color: #1f2937;">Il Team GridjaCards</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px;">
                📧 info@gridjacarts.com | 📱 RO: +40 770 362 294 | IT: +39 320 377 9506
              </p>
              <p style="margin: 10px 0 0; color: #9ca3af; font-size: 12px;">
                Str. Principală 159, Balcauți 727025 SV, România<br>
                Via Trecate 43, Roma 00166, Italia
              </p>
              <p style="margin: 15px 0 0; color: #9ca3af; font-size: 12px;">
                Non vuoi più ricevere queste email?
                <a href="https://gridjacarts.com/unsubscribe?email=${encodeURIComponent(email)}" style="color: #6366f1; text-decoration: none;">
                  Cancella l'iscrizione
                </a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const welcomeEmailText = `
Benvenuto nella Newsletter di GridjaCards!

Grazie per esserti iscritto alla newsletter di GridjaCards!

Da oggi riceverai:
- Novità e aggiornamenti sui nostri servizi
- Consigli e best practices per il tuo business digitale
- Offerte esclusive riservate agli iscritti
- Case study e progetti interessanti

Siamo entusiasti di averti con noi in questo viaggio digitale!

Visita il nostro sito: https://gridjacarts.com

A presto,
Il Team GridjaCards

---
info@gridjacarts.com
RO: +40 770 362 294 | IT: +39 320 377 9506
Str. Principală 159, Balcauți 727025 SV, România
Via Trecate 43, Roma 00166, Italia

Non vuoi più ricevere queste email?
Cancella l'iscrizione: https://gridjacarts.com/unsubscribe?email=${encodeURIComponent(email)}
  `;

  await transporter.sendMail({
    from: `"GridjaCards" <${process.env.SMTP_USER}>`,
    to: email,
    subject: '🎉 Benvenuto nella Newsletter di GridjaCards!',
    text: welcomeEmailText,
    html: welcomeEmailHTML,
  });
}

export async function sendNewsletter(
  emails: string[],
  subject: string,
  content: string
) {
  // Send newsletter to multiple recipients
  const promises = emails.map((email) =>
    transporter.sendMail({
      from: `"GridjaCards Newsletter" <${process.env.SMTP_USER}>`,
      to: email,
      subject,
      html: content,
    })
  );

  await Promise.all(promises);
}
