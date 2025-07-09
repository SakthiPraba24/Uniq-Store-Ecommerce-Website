const nodemailer = require('nodemailer');

async function sendOrderEmail(toEmail, orderDetails) {
    const { customerName, cartItems, totalPrice , customerEmail , phone , paymentMethod} = orderDetails;

    if (!Array.isArray(cartItems)) {
        throw new Error('Invalid cart items passed to email service.');
    }

    const itemsList = cartItems.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
        </tr>
    `).join('');

    const emailContent = `
        <h1>Order Confirmation</h1>
        

        <h2>Dear ${customerName},</h2>
        <p>Thank you for your order, ${customerName}!</p>
            <p>We have received your order. Below are your order details:</p>

            <h3>Customer Information</h3>
            <p><strong>Name:</strong> ${customerName}</p>
            <p><strong>Email:</strong> ${customerEmail}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Payment Method:</strong> ${paymentMethod}</p>
        <p> Here are the details of your order:</p>
        <table border="1">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                ${itemsList}
            </tbody>
        </table>
        <p><strong>Total: $${totalPrice.toFixed(2)}</strong></p>
    `;

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'msp2414mss@gmail.com',
            pass: 'form uefg wbgt uzho',
        },
    });

    const mailOptions = {
        from: 'msp2414mss@gmail.com',
        to: toEmail,
        subject: 'Order Confirmation',
        html: emailContent,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Order confirmation email sent successfully.');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send order confirmation email.');
    }
}

module.exports = sendOrderEmail;
