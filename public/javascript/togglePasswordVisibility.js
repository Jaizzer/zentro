const passwordFields = document.querySelectorAll("#password, #confirmPassword");

if (passwordFields) {
	passwordFields.forEach((passwordField) => {
		const passwordVisibilityTogglerButton =
			passwordField.parentElement.querySelector(
				".passwordVisibilityToggler"
			);

		if (passwordVisibilityTogglerButton) {
			passwordVisibilityTogglerButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                             <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                             <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                             <g clip-path="url(#clip0_601_48)">
                                                             <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="#9F9F9F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                             <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#9F9F9F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                             <path d="M22.5 1.5L1 23" stroke="#9F9F9F" stroke-width="2"/>
                                                             </g>
                                                             <defs>
                                                             <clipPath id="clip0_601_48">
                                                             <rect width="24" height="24" fill="white"/>
                                                             </clipPath>
                                                             </defs>
                                                         </svg>`;

			passwordVisibilityTogglerButton.addEventListener("click", () => {
				const isVisible =
					passwordVisibilityTogglerButton.classList.contains(
						"visible"
					);
				if (isVisible) {
					// Hide the password
					passwordVisibilityTogglerButton.classList.remove("visible");
					passwordVisibilityTogglerButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                                    <g clip-path="url(#clip0_601_48)">
                                                                    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="#9F9F9F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#9F9F9F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                                    <path d="M22.5 1.5L1 23" stroke="#9F9F9F" stroke-width="2"/>
                                                                    </g>
                                                                    <defs>
                                                                    <clipPath id="clip0_601_48">
                                                                    <rect width="24" height="24" fill="white"/>
                                                                    </clipPath>
                                                                    </defs>
                                                                 </svg>`;
					passwordField.type = "password";
				} else {
					// Show the password
					passwordVisibilityTogglerButton.classList.add("visible");
					passwordVisibilityTogglerButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                     <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                                     <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                                     <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="#9F9F9F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                                     <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#9F9F9F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                                 </svg>`;
					passwordField.type = "text";
				}
			});
		}
	});
}
