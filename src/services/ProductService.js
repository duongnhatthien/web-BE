const Product = require('../models/ProductModel');
const CreateProduct = (data) => {
    return new Promise((resolve, reject) => {
        Product.create({ ...data })
            .then((result) => {
                resolve({
                    status: 200,
                    message: 'Create product successfully',
                    data: result,
                });
            })
            .catch((error) => {
                if (
                    error.code === 11000 &&
                    error.keyPattern &&
                    error.keyValue
                ) {
                    console.error(
                        `Duplicate key error for name product: ${error.keyValue.name}`
                    );
                    reject({
                        status: false,
                        message: `Duplicate key error for name product: ${error.keyValue.name}`,
                        errorCode: 11000,
                    });
                } else {
                    // Xử lý các loại lỗi khác
                    console.error('Error creating user:', error);
                    reject({
                        status: false,
                        message: 'Error creating product',
                    });
                }
            });
    });
};
const UpdateProduct = (ProductId, Data) => {
    return new Promise((resolve, reject) => {
        Product.findByIdAndUpdate(ProductId, Data, { new: true })
            .then((result) => {
                if (!result) {
                    reject({
                        status: 404,
                        message: 'Not found product',
                    });
                } else {
                    resolve({
                        status: 200,
                        message: 'Update product successfully',
                    });
                }
            })
            .catch((err) => {
                reject({
                    status: 500,
                    message: 'Update product fail',
                });
            });
    });
};
const DeleteProduct = (ProductId) => {
    return new Promise((resolve, reject) => {
        Product.findByIdAndDelete(ProductId)
            .then((result) => {
                if (!result) {
                    reject({
                        status: 404,
                        message: 'Not found product',
                    });
                } else {
                    resolve({
                        status: 200,
                        message: 'Delete product successfully',
                    });
                }
            })
            .catch((e) => {
                reject(e);
            });
    });
};
const GetAllProduct = (limit = 6, page = 1, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        console.log(sort);
        const totalProducts = await Product.countDocuments();
        if (filter) {
            const label = filter[0];
            Product.find({
                [label]: { $regex: filter[1] },
            })
                .limit(limit)
                .skip(limit * (page - 1))
                .then((result) => {
                    resolve({
                        status: 200,
                        message: 'Get all product successfully',
                        data: result,
                        totalProducts,
                        totalPage: Math.ceil(totalProducts / limit),
                        currentPage: page,
                    });
                })
                .catch((e) => {
                    reject(e);
                });
        } else {
            if (sort) {
                const objectSort = {
                    [sort[0]]: sort[1],
                };
                Product.find()
                    .limit(limit)
                    .skip(limit * (page - 1))
                    .sort(objectSort) // Apply sorting here
                    .then((result) => {
                        resolve({
                            status: 200,
                            message: 'Get all product successfully',
                            data: result,
                            totalProducts,
                            totalPage: Math.ceil(totalProducts / limit),
                            currentPage: page,
                        });
                    })
                    .catch((e) => {
                        reject(e);
                    });
            } else {
                Product.find()
                    .limit(limit)
                    .skip(limit * (page - 1))
                    .then((result) => {
                        resolve({
                            status: 200,
                            message: 'Get all product successfully',
                            data: result,
                            totalProducts,
                            totalPage: Math.ceil(totalProducts / limit),
                            currentPage: page,
                        });
                    })
                    .catch((e) => {
                        reject(e);
                    });
            }
        }
    });
};

const GetDetailProduct = (ProductId) => {
    return new Promise((resolve, reject) => {
        Product.findById(ProductId)
            .then((result) => {
                if (result) {
                    resolve({
                        status: 200,
                        message: 'Found product by id successfully',
                        data: result,
                    });
                } else {
                    reject({
                        status: 404,
                        message: 'Found product by id fail',
                    });
                }
            })
            .catch((e) => {
                reject(e);
            });
    });
};
module.exports = {
    CreateProduct,
    UpdateProduct,
    DeleteProduct,
    GetAllProduct,
    GetDetailProduct,
};
