// payment.js
(function(){
  const methodsEl = document.getElementById('methods');
  const methodFields = document.getElementById('methodFields');
  const payBtn = document.getElementById('payBtn');
  const summaryList = document.getElementById('summaryList');
  const subTotalEl = document.getElementById('subTotal');
  const deliveryEl = document.getElementById('delivery');
  const discountEl = document.getElementById('discount');
  const grandTotalEl = document.getElementById('grandTotal');

  let selectedMethod = null;
  const DELIVERY = 20;

  function getCurrentOrder(){
    try {
      return JSON.parse(localStorage.getItem('currentOrder') || 'null');
    } catch(e){
      return null;
    }
  }

  function formatR(n){
    return '₹' + Number(n).toFixed(0);
  }

  function renderSummary(){
    const order = getCurrentOrder();
    if(!order){
      summaryList.innerHTML = '<p>Your order was not found. <a href="index.html">Go back</a></p>';
      payBtn.disabled = true;
      return;
    }
    summaryList.innerHTML = '';
    order.items.forEach(it => {
      const div = document.createElement('div');
      div.style.display = 'flex';
      div.style.justifyContent = 'space-between';
      div.style.padding = '8px 0';
      div.innerHTML = `<div>${it.name} x ${it.qty}</div><div>${formatR(it.price * it.qty)}</div>`;
      summaryList.appendChild(div);
    });
    const sub = order.total;
    const disc = 0;
    const grand = sub + DELIVERY - disc;
    subTotalEl.textContent = formatR(sub);
    deliveryEl.textContent = formatR(DELIVERY);
    discountEl.textContent = formatR(disc);
    grandTotalEl.textContent = formatR(grand);
  }

  function clearMethodFields(){
    methodFields.innerHTML = '';
  }

  function setActiveMethod(methodEl){
    document.querySelectorAll('.pm').forEach(pm => pm.classList.remove('active'));
    methodEl.classList.add('active');
    selectedMethod = methodEl.dataset.method;
    payBtn.disabled = false;
    methodFields.innerHTML = '';

    // show method-specific fields (demo)
    if(selectedMethod === 'UPI'){
      methodFields.innerHTML = `
        <label class="small">Enter UPI ID (demo)</label>
        <input id="upiId" placeholder="example@upi" />
      `;
    } else if(selectedMethod === 'CARD'){
      methodFields.innerHTML = `
        <label class="small">Card Number</label>
        <input id="cardNumber" placeholder="4242 4242 4242 4242" />
        <label class="small">Expiry / CVV</label>
        <input id="cardExp" placeholder="MM/YY - CVV" />
      `;
    } else if(selectedMethod === 'NETBANK'){
      methodFields.innerHTML = `
        <label class="small">Choose Bank</label>
        <input id="bank" placeholder="HDFC / SBI / ICICI (demo)" />
      `;
    } else if(selectedMethod === 'COD'){
      methodFields.innerHTML = `<p class="small">You will pay the delivery partner in cash.</p>`;
    }
  }

  // attach click handlers
  methodsEl.addEventListener('click', (e) => {
    const pm = e.target.closest('.pm');
    if(!pm) return;
    setActiveMethod(pm);
  });

  payBtn.addEventListener('click', () => {
    const order = getCurrentOrder();
    if(!order){
      alert('Order not found.');
      return;
    }
    // validate simple fields for demonstration
    if(selectedMethod === 'UPI'){
      const upi = document.getElementById('upiId')?.value?.trim();
      if(!upi){ alert('Enter UPI ID'); return; }
    } else if(selectedMethod === 'CARD'){
      const card = document.getElementById('cardNumber')?.value?.trim();
      if(!card){ alert('Enter card details'); return; }
    } else if(selectedMethod === null){
      alert('Choose a payment method');
      return;
    }

    // simulate payment processing
    payBtn.disabled = true;
    payBtn.textContent = 'Processing...';

    setTimeout(() => {
      // create order record (persist to localStorage.orders)
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const DELIVERY = 20;
      const discount = 0;
      const grand = order.total + DELIVERY - discount;
      const newOrder = {
        id: order.id,
        items: order.items,
        subtotal: order.total,
        delivery: DELIVERY,
        discount,
        grandTotal: grand,
        paymentMethod: selectedMethod,
        status: 'confirmed', // initial status
        history: [
          { status: 'confirmed', ts: new Date().toISOString() }
        ]
      };
      orders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(orders));

      // also save lastOrderId for convenience
      localStorage.setItem('lastOrderId', newOrder.id);

      // clear currentOrder & cart (simulating checkout)
      localStorage.removeItem('currentOrder');
      localStorage.removeItem('cart');

      // redirect to tracking page with order id
      window.location.href = 'track.html?orderId=' + encodeURIComponent(newOrder.id);
    }, 1100);
  });

  // initial render
  renderSummary();
})();
