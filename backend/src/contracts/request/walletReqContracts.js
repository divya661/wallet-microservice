const yup = require("yup");

const setupWalletRequestContract = yup.object({
    balance: yup
        .number()
        .typeError("Balance must be a number")
        .positive("Balance must be a positive number")
        .required("Balance is required"),

    name: yup.string().trim().required("Name is required"),
});

const getWalletDetailsContract = yup.object().shape({
    id: yup.string().trim().required("ID is required"),
});

module.exports = {
    setupWalletRequestContract,
    getWalletDetailsContract,
};
