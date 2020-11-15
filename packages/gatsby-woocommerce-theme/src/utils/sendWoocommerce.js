import Axios from "axios";

export const sendWoocommerce = async function(cartItems, cartNbItems, payment_method, payment_res, shipping, billing) {

    // request 2 tokens (main et upsell) pour pouvoir payer 2 fois en ne rentrant les informations qu'une seule fois

    const { data: response } = await Axios({
        method: 'post',
        url: "https://idriss-stripe.emeka.fr/ordering/",
        data: {
            articles: cartItems,
            nb_articles: cartNbItems,
            payment: payment_method,
            payment_res: payment_res,
            shipping: shipping,
            billing: billing,
        }
    });

    const data = {
        payment_method: "stripe",
        payment_method_title: "Paiement Stripe",
        set_paid: true,
        billing: {
            first_name: "Janette",
            last_name: "Doe",
            address_1: "969 Market",
            address_2: "",
            city: "San Francisco",
            state: "CA",
            postcode: "94103",
            country: "US",
            email: "john.doe@example.com",
            phone: "(555) 555-5555"
        },
        shipping: {
            first_name: "John",
            last_name: "Doe",
            address_1: "969 Market",
            address_2: "",
            city: "San Francisco",
            state: "CA",
            postcode: "94103",
            country: "US"
        },
        line_items: [
            {
                product_id: 93,
                quantity: 2
            },
            {
                product_id: 22,
                variation_id: 23,
                quantity: 1
            }
        ],
        shipping_lines: [
            {
                method_id: "flat_rate",
                method_title: "Flat Rate",
                total: "10.00"
            }
        ]
    };

      /*/#console.log(response);*/
};