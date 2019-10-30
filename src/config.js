global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef';
global.EMAIL_TMPL = 'Olá, <strong>{0}</strong>, seja bem vindo ao Node Store.';

module.exports = {
    connectionString: 'mongodb://localhost:27017/nodestr',
    sendgridKey: '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',
    containerConnectionString: 'TBD',
    key: global.SALT_KEY,
    email_tmpl: '<strong>{0}</strong>'
};