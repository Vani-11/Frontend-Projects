/*function renderOrders() {
      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      const tbody = document.querySelector("#orderTable tbody");
      const totalCell = document.getElementById("grandTotal");

      if (orders.length === 0) {
        document.querySelector(".order-box").innerHTML = "<h2>No Orders Found 😢</h2>";
        return;
      }

      tbody.innerHTML = "";
      let grandTotal = 0;

      orders.forEach((order, index) => {
        const total = order.price * order.quantity;
        grandTotal += total;

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${order.name}</td>
          <td>₹${order.price}</td>
          <td>${order.quantity}</td>
          <td>₹${total}</td>
          <td><button class="remove-btn" data-index="${index}">Remove</button></td>
        `;
        tbody.appendChild(row);
      });

      totalCell.textContent = `₹${grandTotal}`;
    }

    //  Remove item
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-btn")) {
        const index = e.target.getAttribute("data-index");
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.splice(index, 1);
        localStorage.setItem("orders", JSON.stringify(orders));
        renderOrders();
      }
    });

    renderOrders();
*/

