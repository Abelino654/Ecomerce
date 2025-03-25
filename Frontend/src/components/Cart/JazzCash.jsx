import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const JazzCash = ({ amount, transactionId, onSuccess, onError }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const MERCHANT_ID = 'MC149694';
    const PASSWORD = 't1h520zwug';
    const INTEGRITY_SALT = 'wzv2s212x0';
    const RETURN_URL = 'http://localhost:5173/payment-return';

    const initiateJazzCashPayment = (e) => {
        e.preventDefault(); // Prevent default button behavior to avoid current tab redirect

        setLoading(true);
        setError(null);

        try {
            const currentDate = new Date();
            const txnDateTime = currentDate.toISOString().replace(/[-:T.]/g, '').slice(0, 14);

            console.log("Amount:", amount);
            console.log("Amount in paisa:", Math.round(amount * 100));
            console.log("Transaction ID:", transactionId);

            const data = {
                pp_Version: '1.1',
                pp_TxnType: 'MWALLET',
                pp_Language: 'EN',
                pp_MerchantID: MERCHANT_ID,
                pp_Password: PASSWORD,
                pp_TxnRefNo: transactionId,
                pp_Amount: Math.round(amount * 100).toString(),
                pp_TxnCurrency: 'PKR',
                pp_TxnDateTime: txnDateTime,
                pp_BillReference: 'billRef',
                pp_Description: 'Checkout Payment',
                pp_ReturnURL: RETURN_URL,
                pp_SecureHash: ''
            };

            console.log("Request Data:", data);

            const sortedKeys = Object.keys(data).sort();
            let hashString = INTEGRITY_SALT;
            sortedKeys.forEach((key) => {
                if (key !== 'pp_SecureHash' && data[key]) {
                    hashString += `&${data[key]}`;
                }
            });

            console.log("Hash String:", hashString);
            const secureHash = CryptoJS.HmacSHA256(hashString, INTEGRITY_SALT).toString(CryptoJS.enc.Hex);
            console.log("Secure Hash:", secureHash);
            data.pp_SecureHash = secureHash;

            const redirectUrl = 'https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform?' + new URLSearchParams(data).toString();
            console.log("Redirect URL:", redirectUrl);

            // Open JazzCash payment page in a new tab
            const newWindow = window.open(redirectUrl, '_blank');
            if (newWindow) {
                newWindow.focus(); // Focus on the new tab
            } else {
                console.error("Failed to open new tab. Pop-up blocker might be enabled.");
                setError("Failed to open JazzCash payment page. Please allow pop-ups and try again.");
            }

            setLoading(false); // Stop loading after attempting to open the new tab
        } catch (err) {
            console.error("Error in initiating JazzCash payment:", err);
            setError('Failed to initiate JazzCash payment');
            onError(err);
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && <p className="text-blue-500">Initiating JazzCash Payment...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <button
                onClick={initiateJazzCashPayment}
                className="w-full bg-blue-600 text-white py-3 rounded"
                disabled={loading}
            >
                Pay with JazzCash
            </button>
        </div>
    );
};

export default JazzCash;