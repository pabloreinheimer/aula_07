import express from "express"
import { Router, Request, Response } from "express"
import "./interface/product"
import { IProduct } from "./interface/product";
import createIdByProduct from "./Utils/createIdByProduct"
import saveDataJson from "./Utils/saveData";

const app = express();
const route = Router();

app.use(express.json());
const data = require('../product.json');
const products: IProduct[] = data

function handleBodyRegister(returnAPI: any, idProduct: string): IProduct {
    const newProduct = {
        id: idProduct,
        productName: returnAPI.productName,
        productDescription: returnAPI.roductDescription,
        productCategory: returnAPI.productCategory,
        productCost: returnAPI.productCost,
        productTags: returnAPI.productTags,
        productRelated: returnAPI.productRelated,
    }
    return newProduct
}

function verifyBody(body: any): { isValid: boolean; mensage: string } {
    if (!body) {
        return { isValid: false, mensage: 'Corpo invalido' }
    }
    if (!body.productName || typeof body.productName !== "string") {
        return { isValid: false, mensage: 'O campo product name é obrigatorio e deve receber uma string' }
    }
    if (!body.productDescription || typeof body.productDescription !== "string") {
        return { isValid: false, mensage: 'O campo product description é obrigatorio e deve receber uma string' }
    }
    if (!body.productCategory || typeof body.productCategory !== "string") {
        return { isValid: false, mensage: 'O campo product category é obrigatorio e deve receber uma string' }
    }
    if (!body.productCost || typeof body.productCost !== "number") {
        return { isValid: false, mensage: 'O campo product cost é obrigatorio e deve receber um numero' }
    }
    if (!body.productTags || !body.productTags.every((productRelated: string) => typeof productRelated === 'string')) {
        return { isValid: false, mensage: ' O campo product tags é obrigatorio e deve ser um array' }
    }
    if (!body.productRelated || !body.productRelated.every((productRelated: number) => typeof productRelated === 'number')) {
        return { isValid: false, mensage: ' O campo product related é obrigatorio e deve ser um array' }
    }
    return { isValid: true, mensage: '' }
}
route.get('/productList', (req: Request, res: Response) => {
    if (products.length !== 0) {
        res.json(products)
    } else {
        res.json({ mensage: 'Nao ha produtos registrados' })
    }
})
route.post('/productRegister', (req: Request, res: Response) => {
    const body = req.body;
    console.log (body)
    const validBody = verifyBody(body)
    if(validBody.isValid){
        const idProduct = createIdByProduct(body.productName, body.productCategory)
        const product = handleBodyRegister(body, idProduct)
        products.push(product)
        res.json({mensage:'Produto cadastrado com sucesso'})
        saveDataJson(products)
    }else{
        res.json({mensage:'Cliente nao cadastrado corpo invalido, te acorda e coloca o dado certo'})
    }
    
})

app.use(route);
app.listen(3000, () => 'server running port 3000');