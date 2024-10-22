function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateContact(contact: string): boolean {
    const re = /^\d{10}$/; // Regex for exactly 10 digits
    return re.test(contact);
}

// Function to display modal message
function showModal(message: string) {
    const modal = document.getElementById('modal') as HTMLElement;
    const modalMessage = document.getElementById('modalMessage') as HTMLElement;
    modalMessage.innerText = message;
    modal.style.display = 'block';
}

// Function to handle form submission
async function handleSubmit(event: Event) {
    event.preventDefault(); // Prevent the default form submission

    const form = event.target as HTMLFormElement; // Get the form element
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const contact = (document.getElementById('contact') as HTMLInputElement).value;
    const subject = (document.getElementById('subject') as HTMLInputElement).value;
    const message = (document.getElementById('message') as HTMLTextAreaElement).value;

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

    // Prepare data for submission
    const formData = {
        name,
        email,
        contact,
        subject,
        message
    };

    try {
        const response = await fetch('https://6717c6c6b910c6a6e029ed90.mockapi.io/Contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Submission failed');
        }

        const result = await response.json();
        showModal('Form Submitted Successfully');
        console.log('Success:', result);

        // Reset the form fields
        form.reset();
    } catch (error) {
        showModal('Submission Failed');
        console.error('Error:', error);
    }
}

// Attach the submit event listener to the form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }

    // Close the modal when the user clicks on <span> (x)
    const closeModal = document.getElementById('closeModal') as HTMLElement;
    closeModal.onclick = () => {
        const modal = document.getElementById('modal') as HTMLElement;
        modal.style.display = 'none';
    };

    // Close the modal when the user clicks on OK button
    const confirmModal = document.getElementById('confirmModal') as HTMLElement;
    confirmModal.onclick = () => {
        const modal = document.getElementById('modal') as HTMLElement;
        modal.style.display = 'none';
    };

    // Close the modal when the user clicks outside of the modal content
    window.onclick = (event) => {
        const modal = document.getElementById('modal') as HTMLElement;
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
});
