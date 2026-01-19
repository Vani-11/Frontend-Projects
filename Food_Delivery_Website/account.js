// Save user data in localStorage
    const form = document.getElementById("accountForm");
    const successMsg = document.getElementById("successMessage");

    // Load saved data if available
    window.addEventListener("load", () => {
      const savedData = JSON.parse(localStorage.getItem("userAccount"));
      if (savedData) {
        document.getElementById("name").value = savedData.name || "";
        document.getElementById("email").value = savedData.email || "";
        document.getElementById("phone").value = savedData.phone || "";
        document.getElementById("address").value = savedData.address || "";

      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,

      };

      localStorage.setItem("userAccount", JSON.stringify(user));

      successMsg.style.display = "block";
      setTimeout(() => {
        successMsg.style.display = "none";
      }, 2000);
    });