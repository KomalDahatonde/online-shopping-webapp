document.querySelectorAll('.paymentButton').forEach(function(element) {
    element.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default action of anchor tag

        // Retrieve the price from the product details
        var priceText = document.querySelector('.product__details__price').textContent.trim();
        var price = parseInt(priceText.replace('₹', ''));

        // Retrieve the product name from the data attribute
        var productName = this.getAttribute('data-product-name');

        // Ask for confirmation before proceeding
        var add = prompt('Enter address');
        var contact = prompt('Enter mobile number');

        // Check if address and contact are not empty and user hasn't clicked cancel
        if (add !== null && add.trim() !== '' && contact !== null && contact.trim() !== '') { 
            if (confirm("Are you sure you want to make the payment?")) 
            
        {
            var options = {
                "key": "rzp_test_sJpyjaezMQUgYU",
                "amount": price * 100, // Convert price to paise (100 paise = 1 INR)
                "currency": "INR",
                "name": "TREND MART",
                "description": "Purchase Description",
                "image": "https://example.com/your_logo.png",
                "handler": function(response) {
                    alert('Payment successful for ' + productName + '. Payment ID: ' + response.razorpay_payment_id);
                    // Handle the success callback here, like updating the database or redirecting to a thank you page

                    var order = {
                        paymentId: response.razorpay_payment_id,
                        productName: productName,
                        address: add, // Include address in the order object
                        contact: contact, // Include contact number in the order object
                        status: 'success' // You can set the status as required

                    };

                    // Retrieve existing orders from localStorage or initialize as empty array
                    var orders = JSON.parse(localStorage.getItem('orders')) || [];
                    // Push the new order to the array
                    orders.push(order);
                    // Store the updated orders back to localStorage
                    localStorage.setItem('orders', JSON.stringify(orders));

                    // Redirect to order.html after successful payment
                    window.location.href = "shop-details.html";
                },
                "prefill": {
                    "name": "Customer Name",
                    "email": "customer@example.com",
                    "contact": contact
                },
                "notes": {
                    "address": add
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

            // Set the product name in the description
            options.description = "Purchase of " + productName;
            
            var rzp = new Razorpay(options);
            rzp.open();
        }

    }

    });
});
