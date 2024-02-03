const ProductService = require('../services/ProductService');
const isValidator = (props) => {
    const { name, images, rating, description, type, countInStock } = props;
    console.log(props);
    if (!name || !images.length || !rating || !description || !type || !countInStock) {
        return {
            status: false,
            message: 'The fiels is empty',
        };
    }
    return {
        status: true,
        message: 'All fields are filled',
    };
};

const CreateProduct = async (req, res) => {
    try {
        const props = req.body;
        const check = isValidator(props);
        if (check.status) {
            const Result = await ProductService.CreateProduct(props);
            return res.status(200).json(Result);
        } else {
            return res.status(500).json(check.message);
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json(e);
    }
};
const UpdateProduct = async (req, res) => {
    try {
        const productID = req.params.id;
        const data = req.body;
        if (!productID) {
            return res.status(500).json({
                message: 'product id is required',
            });
        }
        const response = await ProductService.UpdateProduct(productID, data);
        return res.status(200).json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).json(e);
    }
};
const DeleteProduct = async (req, res) => {
    try {
        const productID = req.params.id;
        if (!productID) {
            return res.status(500).json({
                message: 'product id is required',
            });
        }
        const response = await ProductService.DeleteProduct(productID, data);
        return res.status(200).json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).json(e);
    }
};
const GetAllProduct = async (req, res) => {
    try {
        const {limit, page, sort, filter} = req.query
        const response = await ProductService.GetAllProduct(Number(limit), Number(page), sort, filter);
        return res.status(200).json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).json(e);
    }
};
const GetDetailProduct = async (req, res) => {
    try {
        const ProductId = req.params.id;
        if (!ProductId) {
            return res.status(500).json({
                message: 'product id is required',
            });
        }
        const response = await ProductService.GetDetailProduct(ProductId);
        return res.status(200).json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).json(e);
    }
};
module.exports = {
    CreateProduct,
    UpdateProduct,
    DeleteProduct,
    GetAllProduct,
    GetDetailProduct,
};
