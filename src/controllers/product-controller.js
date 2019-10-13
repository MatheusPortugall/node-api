
const mongoose = require("mongoose");
const Product = mongoose.model("Product");

exports.get = (req, res, next) => {
    Product.find({ active: true }, 'title price slug')
    .then(data => {
        res.status(200).send(data);
    })
    .catch(e => {
        res.status(400).send(e);
    });
};

exports.post = (req, res, next) => {
    var product = new Product(req.body);
    product.save()
    .then(x => {
        res.status(201).send({success: true, message: "Produto cadastrado com sucesso!"});
    })
    .catch(e => {
        res.status(400).send({success: false, message: "Falha no cadastro de produto!", data: e});
    });
    
};

exports.put = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
        }
    }).then(x => {
        res.status(201).send({success: true, message: "Produto atualizado com sucesso!" });
    }).catch(e => {
        res.status(400).send({success: false, message: "Falha ao atualizar produto!", error: e });
    });
};

exports.delete = (req, res, next) => {
    Product.findOneAndDelete(req.body.id)
    .then(x => {
        res.status(200).send({success: true, message: "Produto removido com sucesso!" });
    }).catch(e => {
        res.status(400).send({success: false, message: "Falha ao remover produto!", error: e });
    });
};

exports.getBySlug = (req, res, next) => {
    Product.findOne({
        slug: req.params.slug,
        active: true
    }, 'title price slug tags'
    )
    .then(data => {
        res.status(200).send(data);
    })
    .catch(e => {
        res.status(400).send(e);
    });
};

exports.getById = (req, res, next) => {
    Product.findById( req.params.id)
    .then(data => {
        res.status(200).send(data);
    })
    .catch(e => {
        res.status(400).send(e);
    });
};

exports.getByTag = (req, res, next) => {
    Product.find({
        tags: req.params.tag,
        active: true,
    }, 'title description price slug tags')
    .then(data => {
        res.status(200).send(data);
    })
    .catch(e => {
        res.status(400).send(e);
    });
};