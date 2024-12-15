document.addEventListener("DOMContentLoaded", function () {
    const reviewForm = document.getElementById('review-form');
    const reviewsList = document.getElementById('reviews-list');
    
    reviewForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the form from submitting the traditional way

        const username = document.getElementById('username').value;
        const rating = document.getElementById('rating').value;
        const reviewMessage = document.getElementById('review-message').value;

        if (username && reviewMessage) {
            // Create a new review element
            const newReview = document.createElement('div');
            newReview.classList.add('review');
            newReview.innerHTML = `
                <p><strong>${username}</strong> (${rating} stars): ${reviewMessage}</p>
            `;
            
            // Append the new review to the reviews list
            reviewsList.appendChild(newReview);
            
            // Clear the form fields
            reviewForm.reset();
        }
    });
});
