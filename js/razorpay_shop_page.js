document.querySelectorAll('.paymentButton').forEach(function(element) {
    element.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default action of anchor tag

        // Retrieve the price from the product details relative to the clicked button
        var priceText = this.parentNode.querySelector('.pro-price').textContent.trim();
        var price = parseFloat(priceText.replace('₹', ''));

        // Convert the price to paise (100 paise = 1 INR)
        var amountInPaise = Math.round(price * 100);

        // Ask for confirmation before proceeding
        if (confirm("Are you sure you want to make the payment?")) {
            var options = {
                "key": "rzp_test_sJpyjaezMQUgYU",
                "amount": amountInPaise,
                "currency": "INR",
                "name": "TREND MART",
                "description": "Purchase Description",
                "image": "https://example.com/your_logo.png",
                "handler": function(response) {
                    alert('Payment successful. Payment ID: ' + response.razorpay_payment_id);
                    // You can handle the success callback here, like updating the database or redirecting to a thank you page
                },
                "prefill": {
                    "name": "Customer Name",
                    "email": "customer@example.com",
                    "contact": "9999999999"
                },
                "notes": {
                    "address": "Customer Address"
                },
                "theme": {
                    "color": "#9F496E"
                },
                "modal": {
                     "ondismiss": function() {
                         // Reload the page when the Razorpay modal is dismissed
                         location.reload();
                     }
                 }
            };

            // Create a new instance of Razorpay and open the payment modal
            var rzp = new Razorpay(options);
            rzp.open();
        }
    });
});
