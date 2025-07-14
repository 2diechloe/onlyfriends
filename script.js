document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            this.classList.add('active');
            
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    const paymentMethods = document.querySelectorAll('.payment-method');
    const paymentDetails = document.querySelectorAll('.payment-detail');
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            paymentDetails.forEach(d => d.classList.remove('active'));
            
            this.classList.add('active');
            
            const methodType = this.getAttribute('data-method');
            document.getElementById(`${methodType}-details`).classList.add('active');
        });
    });
    
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const address = this.getAttribute('data-address');
            const icon = this.querySelector('i');
            
            navigator.clipboard.writeText(address).then(() => {
                const originalIcon = icon.className;
                icon.className = 'fas fa-check';
                
                setTimeout(() => {
                    icon.className = originalIcon;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy address: ', err);
            });
        });
    });
    
    const termsCheckbox = document.getElementById('terms');
    const donateButton = document.querySelector('.donate-button');
    
    termsCheckbox.addEventListener('change', function() {
        donateButton.disabled = !this.checked;
    });
    
    donateButton.addEventListener('click', function() {
        if (termsCheckbox.checked) {
            const selectedMethod = document.querySelector('.payment-method.active').getAttribute('data-method');
            
            let message = 'Thank you for your donation!\n\n';
            
            switch(selectedMethod) {
                case 'paypal':
                    message += 'Please send your payment to: paypal.me/chloerhee';
                    break;
                case 'bitcoin':
                    message += 'Please send your payment to this Bitcoin address: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
                    break;
                case 'litecoin':
                    message += 'Please send your payment to this Litecoin address: LRXH1UGPcHkjB5sKM2X8cTNsWFBKJW8sri';
                    break;
            }
            
            message += '\n\nOnce your payment is received, you will get access to the exclusive content.';
            
            alert(message);
        }
    });
    
    if (tabButtons.length > 0) tabButtons[0].click();
    if (paymentMethods.length > 0) paymentMethods[0].click();
});
