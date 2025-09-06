const { sendMail } = require('../utils/mailer');

function validateOrderPayload(body) {
  const errors = [];
  if (!body) errors.push('Missing body');
  if (!body.email) errors.push('email is required');
  if (!body.orderId) errors.push('orderId is required');
  if (!Array.isArray(body.items) || body.items.length === 0) errors.push('items are required');
  return errors;
}

exports.sendOrderConfirmation = async (req, res, next) => {
  try {
    const errors = validateOrderPayload(req.body);
    if (errors.length) {
      return res.status(400).json({ error: 'Invalid payload', details: errors });
    }

    const { email, orderId, items, address } = req.body;

    const itemsRows = items.map((item) => {
      const safeName = String(item.name || 'Item');
      const image = item.image || item.imageUrl || '';
      return `
        <tr>
          <td style="padding:8px;border:1px solid #eee;vertical-align:top;">
            <img src="${image}" alt="${safeName}" style="width:64px;height:64px;object-fit:cover;border-radius:8px;" />
          </td>
          <td style="padding:8px;border:1px solid #eee;">${safeName}</td>
        </tr>
      `;
    }).join('');

    const addressBlock = address ? `
      <p style="margin:0 0 12px 0;">
        <strong>Delivery Address</strong><br/>
        ${address.name ? address.name + '<br/>' : ''}
        ${address.line1 || ''}${address.line2 ? ', ' + address.line2 : ''}<br/>
        ${address.city || ''}${address.state ? ', ' + address.state : ''} ${address.postalCode || ''}<br/>
        ${address.country || ''}
      </p>
    ` : '';

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#111;">
        <h2 style="color:#16a34a;margin:0 0 8px 0;">Your order is confirmed 🎉</h2>
        <p style="margin:0 0 16px 0;">Thanks for shopping with us. Your order has been placed successfully.</p>
        <p style="margin:0 0 16px 0;">Order ID: <strong style="font-family:monospace;">${orderId}</strong></p>
        ${addressBlock}
        <table style="border-collapse:collapse;border:1px solid #eee;width:100%;max-width:560px;">
          <thead>
            <tr>
              <th style="text-align:left;padding:8px;border:1px solid #eee;width:80px;">Image</th>
              <th style="text-align:left;padding:8px;border:1px solid #eee;">Product</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRows}
          </tbody>
        </table>
        <p style="margin-top:16px;">We'll notify you when your order ships.</p>
      </div>
    `;

    await sendMail({
      to: email,
      subject: `Order Confirmed • ${orderId}`,
      html,
      text: `Your order ${orderId} is confirmed.`
    });

    res.status(200).json({ message: 'Confirmation email sent' });
  } catch (err) {
    next(err);
  }
};


