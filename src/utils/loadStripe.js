export const loadStripeJs = () => {
    return new Promise((resolve, reject) => {
        if (document.querySelector('script[src="https://js.stripe.com/v3/"]')) {
            resolve();
            return;
        }
        const script = document.createElement("script");
        script.src = "https://js.stripe.com/v3/";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Stripe.js failed to load."));
        document.head.appendChild(script);
    });
};