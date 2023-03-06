const Xendit = require('xendit-node');
const x = new Xendit({
    secretKey: 'xnd_development_CRdqFF8HGkmWVKSErMAAIS6voYxkQgVfagoWycRs8RyB8gAS97YWFsewam',
});

const { Invoice } = x;
const invoiceSpecificOptions = {};
const i = new Invoice(invoiceSpecificOptions)

class xenditController {
    static async createTransaction(req, res, next) {
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
            if(error.status === 400){
                res.status(400).json(error)
            }
            next(error)
            console.log(error);
        }
    }

    static async readTransaction (req, res, next) {
        try {
            const Invoice = await i.getInvoice({
                invoiceID: "640442c7ec41c6969b41386b",
            })
            res.status(200).json(Invoice)

        } catch (error) {
            if(error.status === 404){
                res.status(404).json(error)
            }
            next(error)
            console.log(error);
        }
    }

}

module.exports = xenditController