const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

async function sendTempPassword(toEmail, tempPassword) {
  await transporter.sendMail({
    from: `"COPEOSPIL Panel Admin" <${process.env.MAIL_USER}>`,
    to: toEmail,
    subject: "Tu contraseña temporal - Panel COPEOSPIL",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#f8fafd;border-radius:16px;">
        <div style="text-align:center;margin-bottom:24px;">
          <div style="display:inline-block;background:#003366;border-radius:50%;width:64px;height:64px;line-height:64px;font-size:28px;color:#fff;">🔐</div>
        </div>
        <h2 style="color:#0b2b4a;text-align:center;margin:0 0 8px;font-size:1.3rem;">Panel Administrativo COPEOSPIL Ltda.</h2>
        <p style="color:#5a7a9a;text-align:center;font-size:0.85rem;margin:0 0 28px;">Se solicitó un blanqueo de contraseña para tu cuenta.</p>

        <div style="background:#fff;border:1.5px solid #dde3ea;border-radius:12px;padding:24px;text-align:center;margin-bottom:24px;">
          <p style="color:#8a9aaa;font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 10px;">Tu contraseña temporal es</p>
          <p style="font-size:1.8rem;font-weight:700;color:#003366;letter-spacing:0.15em;background:#f0f4ff;border:1.5px dashed #a0b4d0;border-radius:8px;padding:12px 24px;margin:0;">${tempPassword}</p>
        </div>

        <p style="color:#5a7a9a;font-size:0.82rem;line-height:1.7;text-align:center;margin:0 0 8px;">
          Usá esta contraseña para ingresar al panel.<br>
          Una vez adentro, cambiala desde <strong style="color:#003366;">Mi Perfil</strong>.
        </p>

        <hr style="border:none;border-top:1px solid #eef0f4;margin:24px 0;">
        <p style="color:#aab4be;font-size:0.7rem;text-align:center;margin:0;">
          Si no solicitaste este cambio, contactá al administrador del sistema.<br>
          © ${new Date().getFullYear()} COPEOSPIL Ltda. · www.copeospil.com.ar
        </p>
      </div>
    `,
  });
}

module.exports = { sendTempPassword };
