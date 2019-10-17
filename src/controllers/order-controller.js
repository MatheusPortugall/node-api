const repository = require("../repositories/order-repository");
const guid = require("guid");

exports.post = async (req, res, next) => {
    try {
        await repository.create({
            customer: req.body.customer,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        });
        res.status(201).send({success: true, message: "Pedido cadastrado com sucesso!"});
    } catch (e) {
        res.status(500).send({success: false, message: "Falha ao processar sua requisição", data: e});
    }
    
};