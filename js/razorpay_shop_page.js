document.querySelectorAll('.paymentButton').forEach(function(element) {
    element.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default action of anchor tag

        // Retrieve the price from the product details relative to the clicked button
        var priceText = this.parentNode.querySelector('.pro-price').textContent.trim();
        var price = parseFloat(priceText.replace('₹', ''));

        // Convert the price to paise (100 paise = 1 INR)
        var amountInPaise = Math.round(price * 100);

        // Retrieve the product name from the data attribute
        var productName = this.getAttribute('data-product-name');

        // Ask for confirmation before proceeding
        var add = prompt('Enter address');
        var contact = prompt('Enter mobile number');

        // Check if address and contact are not empty and user hasn't clicked cancel
        if (add !== null && add.trim() !== '' && contact !== null && contact.trim() !== '') { 
            if (confirm("Are you sure you want to make the payment?")) 
           
        
        {

            // Get the current date
            var currentDate = new Date();
            var formattedDate = currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear();

             // Calculate estimated delivery date (2 days after the order date)
             var estimatedDeliveryDate = new Date(currentDate);
             estimatedDeliveryDate.setDate(currentDate.getDate() + 2); // Adding 2 days

             var formattedEstimatedDeliveryDate = estimatedDeliveryDate.getDate() + "-" + (estimatedDeliveryDate.getMonth() + 1) + "-" + estimatedDeliveryDate.getFullYear();

            var options = {
                "key": "rzp_test_sJpyjaezMQUgYU",
                "amount": amountInPaise,
                "currency": "INR",
                "name": "TREND MART",
                "description": "Purchase Description",
                "image": "https://example.com/your_logo.png",
                "handler": function(response) {
                    alert('Payment successful for ' + productName + '. Payment ID: ' + response.razorpay_payment_id);
                        // Handle the success callback here, like updating the database or redirecting to a thank you page
                         // Get the current date
                         var currentDate = new Date();
                         var formattedDate = currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear();
 
                        var order = {
                            paymentId: response.razorpay_payment_id,
                            productName: productName,
                            amount: price,
                            address: add, // Include address in the order object
                            contact: contact, // Include contact number in the order object
                            date: formattedDate, 
                            estimatedDeliveryDate: formattedEstimatedDeliveryDate, // Include estimated delivery date
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
             
            // Create a new instance of Razorpay and open the payment modal
            var rzp = new Razorpay(options);
            rzp.open();
        }
    }
    });
});
