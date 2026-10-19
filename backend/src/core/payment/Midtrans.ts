import MidtransClient from "midtrans-client";

class Midtrans {
    private static instance: MidtransClient.Snap | null = null;

    // Sembunyikan constructor agar tidak bisa di-instansiasi dengan `new` di luar kelas
    private constructor() {}

    public static getInstance(): MidtransClient.Snap {
        if (!Midtrans.instance) {
            const q = {
                isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
                serverKey: process.env.MIDTRANS_SERVER_KEY || "",
                clientKey: process.env.MIDTRANS_CLIENT_KEY || ""
            }

            console.log(q)

            Midtrans.instance = new MidtransClient.Snap(q);
        }
        
        return Midtrans.instance;
    }
}

export default Midtrans