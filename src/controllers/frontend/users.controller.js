require('dotenv').config();

const nodemailer = require('nodemailer');
const userModel = require('../../models/users.schema');


//आप बार-बार एक ही ईमेल पर मेल भेज सकते हैं।

exports.sendMail = async (request, response) => {
    const { name, email, message } = request.body;
    console.log(request.body)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS // This should be your Gmail App Password
        }
    });
    try {
        const info = await transporter.sendMail({
            from: 'yogeshsainijpr123@gmail.com',
            to: email,
            subject: 'Thank You for Contacting Us!',
            text: `Hello ${name},\n\nThank you for reaching out! We received your message: "${message}".\n\nWe will get back to you soon.\n\nBest regards,\nYour Company`
        });

        response.status(200).json({
            success: true,
            message: 'Email sent successfully!',
            info
        });

    } catch (error) {
        response.status(500).json({
            success: false,
            message: 'Email already exists!',
            error: error.message
        });
    }
}

// const nodemailer = require('nodemailer');
// const userModel = require('../../models/users.schema');

// //एक ही Email पर सिर्फ एक बार मेल जाएगा।
// exports.sendMail = async (request, response) => {
//     const { name, email, message } = request.body;

//     try {
//         // ✅ 1. पहले चेक करें कि यह ईमेल पहले से डेटाबेस में मौजूद है या नहीं
//         const existingUser = await userModel.findOne({ email });

//         if (existingUser) {
//             return response.status(400).json({
//                 success: false,
//                 message: '❌ Email already sent once!',
//             });
//         }

//         // ✅ 2. अगर ईमेल मौजूद नहीं है, तो नया यूजर क्रिएट करें और मेल भेजें
//         const newUser = new userModel({ name, email, message });
//         await newUser.save();

//         // ✅ 3. Nodemailer का इस्तेमाल करके मेल भेजें
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'yogeshsainijpr123@gmail.com',
//                 pass: 'ilcc tlzk emmo ksfg' // 🔴 अपना सही App Password डालें
//             }
//         });

//         const info = await transporter.sendMail({
//             from: 'yogeshsainijpr123@gmail.com',
//             to: email,
//             subject: 'Thank You for Contacting Us!',
//             text: `Hello ${name},\n\nThank you for reaching out! We received your message: "${message}".\n\nWe will get back to you soon.\n\nBest regards,\nYour Company`
//         });

//         response.status(200).json({
//             success: true,
//             message: '✅ Email sent successfully!',
//             info
//         });

//     } catch (error) {
//         response.status(500).json({
//             success: false,
//             message: '❌ Error sending email!',
//             error: error.message
//         });
//     }
// };

