import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    console.log('[ContactAPI] Received POST request');
    const body = await request.json();
    console.log('[ContactAPI] Request body:', body);

    const { name, email, phone, package: selectedPackage, message, subject, source, website, revenue } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      console.error('[ContactAPI] Validation failed - missing required fields');
      return NextResponse.json(
        { error: 'Nome, email e telefono sono obbligatori' },
        { status: 400 }
      );
    }

    console.log('[ContactAPI] Validation passed, preparing to send email');

    // Email HTML template
    const emailHTML = `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Nuova Richiesta di Contatto</h1>
              <p style="margin: 10px 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">${source === 'offerta-dicembre' ? 'Offerta Dicembre 2025' : (source === 'offer-page-funnel' ? 'Funnel Offerta' : 'Modulo Contatti')}</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px; color: #1f2937; font-size: 20px; font-weight: bold;">Dettagli Richiedente</h2>

              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #6b7280; font-size: 14px; font-weight: bold; width: 150px;">Nome:</td>
                  <td style="padding: 10px 0; color: #1f2937; font-size: 14px;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #6b7280; font-size: 14px; font-weight: bold;">Email:</td>
                  <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #6366f1; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #6b7280; font-size: 14px; font-weight: bold;">Telefono:</td>
                  <td style="padding: 10px 0;"><a href="tel:${phone}" style="color: #6366f1; text-decoration: none;">${phone}</a></td>
                </tr>
                ${website ? `
                <tr>
                  <td style="padding: 10px 0; color: #6b7280; font-size: 14px; font-weight: bold;">Sito Web:</td>
                  <td style="padding: 10px 0;"><a href="${website}" target="_blank" style="color: #6366f1; text-decoration: none;">${website}</a></td>
                </tr>
                ` : ''}
                ${revenue ? `
                <tr>
                  <td style="padding: 10px 0; color: #6b7280; font-size: 14px; font-weight: bold;">Fatturato:</td>
                  <td style="padding: 10px 0; color: #1f2937; font-size: 14px;">${revenue}</td>
                </tr>
                ` : ''}
                ${selectedPackage ? `
                <tr>
                  <td style="padding: 10px 0; color: #6b7280; font-size: 14px; font-weight: bold;">Pacchetto:</td>
                  <td style="padding: 10px 0; color: #1f2937; font-size: 14px;"><strong>${selectedPackage}</strong></td>
                </tr>
                ` : ''}
              </table>

              ${message ? `
              <div style="margin-top: 30px;">
                <h3 style="margin: 0 0 10px; color: #1f2937; font-size: 16px; font-weight: bold;">Messaggio:</h3>
                <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; border-left: 4px solid #6366f1;">
                  <p style="margin: 0; color: #4b5563; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
              ` : ''}

              <div style="margin-top: 30px; padding: 20px; background-color: #fef3c7; border-radius: 6px; border-left: 4px solid #f59e0b;">
                <p style="margin: 0; color: #92400e; font-size: 14px;">
                  <strong>⚡ Azione richiesta:</strong> Rispondi al cliente entro 24 ore per massimizzare la conversione.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                Richiesta ricevuta il ${new Date().toLocaleString('it-IT')}
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

    // Plain text version
    const emailText = `
Nuova Richiesta di Contatto - ${source === 'offerta-dicembre' ? 'Offerta Dicembre 2025' : (source === 'offer-page-funnel' ? 'Funnel Offerta' : 'Modulo Contatti')}

DETTAGLI RICHIEDENTE:
Nome: ${name}
Email: ${email}
Telefono: ${phone}
${website ? `Sito Web: ${website}` : ''}
${revenue ? `Fatturato: ${revenue}` : ''}
${selectedPackage ? `Pacchetto: ${selectedPackage}` : ''}

${message ? `MESSAGGIO:\n${message}` : ''}

---
Richiesta ricevuta il ${new Date().toLocaleString('it-IT')}
    `;

    // Send email to robert.gridjac@gridjacarts.com
    console.log('[ContactAPI] Attempting to send email to robert.gridjac@gridjacarts.com');
    // ... rest of the code is unchanged ...
    console.log('[ContactAPI] SMTP Config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      hasPass: !!process.env.SMTP_PASS,
    });

    await transporter.sendMail({
      from: `"GridjaCards - Richieste Clienti" <${process.env.SMTP_USER}>`,
      to: 'robert.gridjac@gridjacarts.com',
      replyTo: email,
      subject: subject || `Nuova richiesta da ${name}${selectedPackage ? ` - ${selectedPackage}` : ''}`,
      text: emailText,
      html: emailHTML,
    });

    console.log('[ContactAPI] Email sent successfully');

    return NextResponse.json({
      success: true,
      message: 'Email inviata con successo',
    });
  } catch (error) {
    console.error('[ContactAPI] Error sending contact email:', error);
    return NextResponse.json(
      { error: `Errore durante l'invio dell'email: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
