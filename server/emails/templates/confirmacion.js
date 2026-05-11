export const confirmacionCliente = ({
  novio1    = 'Novio/a 1',
  novio2    = 'Novio/a 2',
  plan      = 'esencial',
  fechaBoda = 'Por confirmar',
  total     = 0,
  mitad     = 0,
}) => ({
  subject: `✨ ¡Reserva confirmada! — WedClick`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Georgia, serif; background: #F1EFE6; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: white;
                     border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .header { background: #243763; padding: 40px; text-align: center; }
        .header h1 { color: #F1EFE6; font-size: 28px; margin: 0; }
        .header p { color: #D9C7A6; font-size: 14px; margin: 8px 0 0; }
        .body { padding: 40px; }
        .body h2 { color: #243763; font-size: 22px; margin-bottom: 8px; }
        .body p { color: #8B6F5C; font-size: 15px; line-height: 1.6; }
        .card { background: #F1EFE6; border-radius: 12px; padding: 24px; margin: 24px 0; }
        .card p { margin: 6px 0; color: #243763; font-size: 14px; }
        .badge { display: inline-block; background: #243763; color: #F1EFE6;
                 padding: 6px 16px; border-radius: 20px; font-size: 12px;
                 text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
        .divider { border: none; border-top: 1px solid #D9C7A6; margin: 24px 0; }
        .footer { background: #243763; padding: 24px; text-align: center; }
        .footer p { color: #D9C7A6; font-size: 12px; margin: 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>WedClick</h1>
          <p>Invitaciones de boda digitales</p>
        </div>
        <div class="body">
          <span class="badge">Reserva confirmada ✨</span>
          <h2>¡Hola ${novio1} & ${novio2}!</h2>
          <p>
            Hemos recibido vuestra reserva correctamente. Estamos muy emocionados
            de crear vuestra invitación de boda digital. En breve nos pondremos
            en contacto con vosotros para recopilar toda la información necesaria.
          </p>
          <div class="card">
            <p><strong>Plan contratado:</strong> WedClick ${plan}</p>
            <p><strong>Fecha de la boda:</strong> ${fechaBoda}</p>
            <p><strong>Reserva pagada:</strong> ${(mitad / 100).toFixed(2)}€</p>
            <p><strong>Pendiente de pago:</strong> ${(mitad / 100).toFixed(2)}€ (a la entrega)</p>
            <p><strong>Total:</strong> ${(total / 100).toFixed(2)}€</p>
          </div>
          <hr class="divider" />
          <p>
            <strong>¿Qué pasa ahora?</strong><br/>
            En las próximas 24-48 horas nos pondremos en contacto con vosotros
            por el canal que habéis indicado para recopilar toda la información
            necesaria para crear vuestra invitación perfecta.
          </p>
          <p>
            Si tenéis cualquier duda, podéis escribirnos a
            <a href="mailto:contacto@wedclick.es" style="color:#243763">hola@wedclick.es</a>
            o por WhatsApp.
          </p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} WedClick — Hecho con ❤️ en Sevilla</p>
        </div>
      </div>
    </body>
    </html>
  `,
})

export const ordenInterna = ({
  novio1    = 'Novio/a 1',
  novio2    = 'Novio/a 2',
  plan      = 'esencial',
  fechaBoda = 'Por confirmar',
  mitad     = 0,
  formulario = {},
}) => ({
  subject: `🎉 Nueva orden — ${novio1} & ${novio2} — Plan ${plan}`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; }
        .header { background: #243763; padding: 30px; text-align: center; }
        .header h1 { color: white; font-size: 22px; margin: 0; }
        .body { padding: 30px; }
        .field { margin-bottom: 12px; }
        .field label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #999; display: block; }
        .field p { font-size: 15px; color: #333; margin: 4px 0 0; font-weight: bold; }
        .section { background: #f9f9f9; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .section h3 { color: #243763; margin: 0 0 16px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
        .badge { background: #243763; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Nueva orden recibida</h1>
        </div>
        <div class="body">
          <div class="section">
            <h3>📋 Datos del plan</h3>
            <div class="field">
              <label>Plan</label>
              <p><span class="badge">${plan.toUpperCase()}</span></p>
            </div>
            <div class="field">
              <label>Reserva cobrada</label>
              <p>${(mitad / 100).toFixed(2)}€</p>
            </div>
          </div>
          <div class="section">
            <h3>💑 Datos de los novios</h3>
            <div class="field">
              <label>Nombres</label>
              <p>${novio1} & ${novio2}</p>
            </div>
            <div class="field">
              <label>Fecha de la boda</label>
              <p>${fechaBoda}</p>
            </div>
            <div class="field">
              <label>Número de invitados</label>
              <p>${formulario.numInvitados || 'No especificado'}</p>
            </div>
          </div>
          <div class="section">
            <h3>📍 Lugares</h3>
            <div class="field">
              <label>Ceremonia</label>
              <p>${formulario.lugarCeremonia || 'No especificado'}</p>
            </div>
            <div class="field">
              <label>Celebración</label>
              <p>${formulario.lugarCelebracion || 'No especificado'}</p>
            </div>
          </div>
          <div class="section">
            <h3>📞 Contacto</h3>
            <div class="field">
              <label>Email</label>
              <p>${formulario.email || 'No especificado'}</p>
            </div>
            <div class="field">
              <label>Teléfono</label>
              <p>${formulario.telefono || 'No especificado'}</p>
            </div>
            <div class="field">
              <label>Canal preferido</label>
              <p>${formulario.canalContacto || 'No especificado'}</p>
            </div>
            <div class="field">
              <label>Horario preferido</label>
              <p>${formulario.horarioContacto || 'No especificado'}</p>
            </div>
          </div>
          <div class="section">
            <h3>🎨 Estilo</h3>
            <div class="field">
              <label>Estilo deseado</label>
              <p>${formulario.estilo || 'No especificado'}</p>
            </div>
            <div class="field">
              <label>Notas adicionales</label>
              <p>${formulario.notas || 'Sin notas'}</p>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `,
})