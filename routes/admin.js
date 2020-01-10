const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")
require("../models/Produto")
const Produto = mongoose.model("produtos")


router.get('/',(req, res) => {
    res.render("admin/index")
})

router.get('/posts', (req, res) => {
    res.send("Página de posts")
})

router.get('/categorias', (req, res) => {
    Categoria.find().sort({date: 'desc'}).then((categorias) => {
        res.render("admin/categorias", {categorias: categorias})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar a categoria.")
        res.redirect("/admin")
    })
})

router.get('/categorias/add', (req, res) => {
    res.render("admin/addcategorias")
})

router.post('/categorias/nova', (req, res) => {

var erros = []

if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
    erros.push({texto: "Nome inválido!"})
} 

if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
    erros.push({texto: "Slug inválido!"})
}

if(req.body.nome.length < 2){
    erros.push({texto: "Nome da categoria é muito pequeno!"})
}

if(erros.length > 0){
    res.render("admin/addcategorias", {erros: erros})
       }else{
        const novaCategortia = {
            nome: req.body.nome,
            slug: req.body.slug
        }
        new Categoria(novaCategortia).save().then(() => {
            req.flash("success_msg", "Categoria criada com sucesso!")
            res.redirect("/admin/categorias")
        }).catch((err) => {
            req.flash("error_msg", "Erro ao cadastrar categoria :( -  Tente novamente!")
            req.redirect("/admin")
        })
    }

})

router.get("/categorias/edit/:id", (req, res) => {
    Categoria.findOne({_id:req.params.id}).then((categoria) => {
        res.render("admin/editcategorias", {categoria: categoria})
    }).catch((err) => {
        req.flash("error_msg", "Esta categoria não existe")
        res.redirect("/admin/categorias")
    })

})

router.post("/categorias/edit", (req, res) => {
    Categoria.findOne({_id: req.body.id}).then((categoria) => {

        categoria.nome  = req.body.nome
        categoria.slug = req.body.slug

        categoria.save().then(() => {
            req.flash("success_msg", "Categoria editada com sucesso!")
            res.redirect("/admin/categorias")
        }).catch((error) => {
            req.flash("error_msg", "Houve um erro interno ao salvar a edição da categoria! :(")
            res.redirect("/admin/categorias")
        })

    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao editar a categoria")
        res.redirect("/admin/categorias")
    })

})

router.post("/categorias/deletar", (req, res) => {
    Categoria.remove({_id: req.body.id}).then(() => {
        req.flash("sucess_msg", "Categoria deletada com sucesso!")
        res.redirect("/admin/categorias")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao deletar a categoria. :(")
        res.redirect("/admin/categorias")
    })
})

router.get("/produtos", (req, res) => {
    res.render("admin/produtos")
})

router.get("/produtos/add", (req, res) => {
   Categoria.find().then((categorias) => {
       res.render("admin/addprodutos",{categorias: categorias})
   }).catch((err) => {
       req.flash("error_msg", "Houve um erro ao carregar o formulário! :(")
       res.redirect("/admin")
   })   
})

router.post("/produtos/novos", (req, res) => {
    res.render("/admin/produtos/add")

    var erros = []

    if(req.body.categoria == "0"){
        erros.push({text0: "Selecione uma categoria"})
    }

    if(erros.length > 0){
        res.render("admin/produtos", {erros: erros})
    }else{
        const novoProduto = {
            cod_produto: req.body.cod_produto,
            desc_produto: req.body.desc_produto,
            cat_produto: req.body.cat_produto,
            mp_produto: req.body.mp_produto,
            qtd_mp: req.body.qtd_mp,
            peso_produto: req.body.peso_produto,
            add_produto: req.body.add_produto,
            roteiro: req.body.roteiro
        }

        new Produto(novoProduto).save().then(() => {
            req.flash("success_msg", "Produto cadastrado com sucesso!")
            res.redirect("/admin/produtos")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro durante o salvamento do produto :(")
            res.redirect("/admin/produtos")
        })
    }
})

module.exports = router