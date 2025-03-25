import axios from "axios";

const JAZZCASH_API_URL = "https://sandbox.jazzcash.com.pk/ApplicationAPI/API/";  // Sandbox URL

export const initiateJazzCashPayment = async (amount, onSuccess, onError) => {
    try {
        const requestData = {
            pp_MerchantID: "MC149694",
            pp_Password: "t1h520zwug",
            pp_Amount: amount * 100,  // Convert to paisa
            pp_TxnRefNo: `TXN_${Date.now()}`,
            pp_Description: "E-Commerce Payment",
            pp_TxnCurrency: "PKR",
            pp_TxnDateTime: new Date().toISOString().replace(/[-T:]/g, "").slice(0, 14),
            pp_BillReference: "bill123",
            pp_Language: "EN",
            pp_Version: "1.1",
            pp_ReturnURL: "https://yourwebsite.com/payment-success",
            pp_SecureHash: "wzv2s212x0"  // Generate using your Integrity Salt
        };

        // Send request to JazzCash API
        const response = await axios.post(JAZZCASH_API_URL, requestData);

        // Check response
        if (response.data.pp_ResponseCode === "000") {
            onSuccess(response.data);
        } else {
            onError(response.data.pp_ResponseMessage);
        }
    } catch (error) {
        onError(error, "Payment Failed, Try Again.");
    }
};
