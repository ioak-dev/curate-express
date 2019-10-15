export function sendForgetPasswordResetCode(to, resetCode) {
    console.log('inside sendForgetPasswordResetCode function');
    // compose subject and body
    sendEmail(to, '', '');
}

export function sendEmail(to, subject, body) {
    console.log('inside send email function');
}
