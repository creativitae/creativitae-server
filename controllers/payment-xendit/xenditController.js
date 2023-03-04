const Xendit = require('xendit-node');
const x = new Xendit({
    secretKey: 'xnd_development_SHH6jJcnrd27zEW1TWk5UjcxsBGjF5cTDju8byEywFv2nvdCIm36ZlFVXZWriSR',
});

const { Invoice } = x;
const invoiceSpecificOptions = {};
const i = new Invoice(invoiceSpecificOptions)

class xenditController {
    static async createTransaction(req, res) {
        try {
            let data = await i.createInvoice({
                externalID: `${req.customer.id}`,
                payerEmail: `${req.customer.email}`,
                description: "Get Premium",
                amount: 15000,
                customer: {
                    given_names: `${req.customer.username}`,
                    surname: `${req.customer.username}`,
                    email: `${req.customer.email}`,
                    mobile_number: `${req.customer.phoneNumber}`,
                },
                shouldSendEmail: true,
                successRedirectURL: "http://localhost:5173/",
                failureRedirectURL: "http://localhost:5173/",
                currency: "IDR",
            })
            res.status(201).json(data)
        } catch (error) {
            console.log(error);
        }
    }

    static async readTransaction (req, res) {
        try {
            const Invoice = await i.getInvoice({
                invoiceID: "640194fae7491e4de020e1b4",
            })
            res.status(200).json(Invoice)

        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = xenditController