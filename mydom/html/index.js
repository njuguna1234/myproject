document.addEventListener('DOMContentLoaded', async () => {
    try {
        const groceriesData = await getGroceries();
        console.log(groceriesData);
        displayGroceries(groceriesData);
    } catch (error) {
        console.error('Error fetching groceries:', error);
    }
});



async function getGroceries() {
    const response = await fetch("http://localhost:3000/groceries", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch groceries');
    }
    return response.json();
}

function displayGroceries(data) {
    const displayDiv = document.getElementById("display");
    data.forEach(grocery => {
        const itemDiv = document.createElement("div");
        
        // Create an image element
        const img = document.createElement("img");
        img.src = grocery.imag; // Set the image source
        img.style.width = "300px"; // Set the width of the image
        img.style.height = "auto"; // Maintain aspect ratio
        
        // Create a heading element for the grocery type
        const heading = document.createElement("h4");
        heading.textContent = `Type: ${grocery.type}`;
        
        // Create a paragraph element for the price
        const priceParagraph = document.createElement("p");
        priceParagraph.textContent = `Price: ${grocery.price}`;
        
        // Create a button to add the item to cart
        const addButton = document.createElement("button");
        addButton.textContent = "Add to Cart";
        addButton.addEventListener("click", () => {
            addToCart(grocery);
        });

        // Append the image, heading, price, and button to the item div
        itemDiv.appendChild(img);
        itemDiv.appendChild(heading);
        itemDiv.appendChild(priceParagraph);
        itemDiv.appendChild(addButton);
        
        // Append the item div to the display container
        displayDiv.appendChild(itemDiv);
    });
}

// Shopping cart array to store selected items
let cart = [];

// Function to add an item to the cart
function addToCart(item) {
    cart.push(item);
    console.log(`${item.type} added to cart.`);
    console.log("Current cart:", cart);
    displayCart();
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    console.log("Item removed from cart.");
    console.log("Current cart:", cart);
    displayCart();
}


// Function to display the cart and calculate total price
function displayCart() {
    const cartDiv = document.getElementById("cart");
    // Clear previous cart content
    cartDiv.innerHTML = "";

    // Create a heading for the cart
    const heading = document.createElement("h2");
    heading.textContent = "Shopping Cart";
    cartDiv.appendChild(heading);

    let totalAmountToPay = 0; // Initialize total amount to pay

    // Display each item in the cart
    cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");

        // Create a paragraph to display item details
        const itemDetails = document.createElement("p");
        itemDetails.textContent = `${item.type} - Price: ${item.price}`;

        // Create a button to remove the item from the cart
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove from Cart";
        removeButton.addEventListener("click", () => {
            removeFromCart(index);
        });

        // Append item details and remove button to item div
        itemDiv.appendChild(itemDetails);
        itemDiv.appendChild(removeButton);

        // Append the item div to the cart container
        cartDiv.appendChild(itemDiv);

        // Calculate total amount to pay
        totalAmountToPay += parseFloat(item.price); // Assuming price is a string
    });

    // Display total amount to pay on the webpage
    const totalAmountParagraph = document.createElement("p");
    totalAmountParagraph.textContent = `Total Amount to Pay: $${totalAmountToPay.toFixed(2)}`; // Format total amount
    cartDiv.appendChild(totalAmountParagraph);
}


function displayResults(results) {
    const searchResultsDiv = document.getElementById('searchResults');
    searchResultsDiv.innerHTML = '';

    if (results.length === 0) {
        searchResultsDiv.textContent = 'No results found.';
        return;
    }

    const ul = document.createElement('ul');
    results.forEach(result => {
        const li = document.createElement('li');
        li.textContent = result.title;
        ul.appendChild(li);
    });

    searchResultsDiv.appendChild(ul);
}

//Function to display the cart and calculate total price
function displayCart() {
    const cartDiv = document.getElementById("cart");
    // Clear previous cart content
    cartDiv.innerHTML = "";

    // Create a heading for the cart
    const heading = document.createElement("h2");
    heading.textContent = "Shopping Cart";
    cartDiv.appendChild(heading);

    let totalAmountToPay = 0; // Initialize total amount to pay

    // Display each item in the cart
    cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item"); // Add a class for styling
        
        // Create an image element for the item
        const img = document.createElement("img");
        img.src = item.imag; 
        img.style.width = "300px"; // Set the width of the image
        img.style.height = "auto"; // Maintain aspect ratio
        
        img.alt = item.type; 
        itemDiv.appendChild(img);


        // Create a paragraph to display item details (type and price)
        const detailsParagraph = document.createElement("p");
        detailsParagraph.textContent = `${item.type} - Price: ${item.price}`;
        itemDiv.appendChild(detailsParagraph); // Append details to the item div

        // Create a button to remove the item from the cart
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove from Cart";
        removeButton.addEventListener("click", () => {
            removeFromCart(index);
        });
        itemDiv.appendChild(removeButton); // Append the remove button to the item div

        // Append the item div to the cart container
        cartDiv.appendChild(itemDiv);

        // Calculate total amount to pay
        totalAmountToPay += parseFloat(item.price); 
    })
    // Display total amount to pay on the webpage
    const totalAmountParagraph = document.createElement("p");
    totalAmountParagraph.textContent = `Total Amount to Pay: $${totalAmountToPay.toFixed(2)}`; 
    cartDiv.appendChild(totalAmountParagraph);
}
