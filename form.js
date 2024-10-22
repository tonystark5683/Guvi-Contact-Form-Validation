"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
function validateContact(contact) {
    const re = /^\d{10}$/;
    return re.test(contact);
}
function showModal(message) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.innerText = message;
    modal.style.display = 'block';
}
function handleSubmit(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const form = event.target;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const contact = document.getElementById('contact').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        // Validate inputs
        if (!name || !email || !contact || !subject || !message) {
            showModal('Please fill in all required fields.');
            return;
        }
        if (!validateEmail(email)) {
            showModal('Please enter a valid email address.');
            return;
        }
        if (!validateContact(contact)) {
            showModal('Please enter a valid 10-digit mobile number.');
            return;
        }
        const formData = {
            name,
            email,
            contact,
            subject,
            message
        };
        try {
            const response = yield fetch('https://6717c6c6b910c6a6e029ed90.mockapi.io/Contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Submission failed');
            }
            const result = yield response.json();
            showModal('Form Submitted Successfully');
            console.log('Success:', result);
            form.reset();
        }
        catch (error) {
            showModal('Submission Failed');
            console.error('Error:', error);
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
    const closeModal = document.getElementById('closeModal');
    closeModal.onclick = () => {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
    };
    const confirmModal = document.getElementById('confirmModal');
    confirmModal.onclick = () => {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
    };
    window.onclick = (event) => {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
});
