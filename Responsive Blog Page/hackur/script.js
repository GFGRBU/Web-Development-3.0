var btn = document.querySelector('.sidebar-button');
var sidebarDropdown = document.querySelector('.sidebar-dropdown');
let click = 0;

btn.addEventListener('click', () => {
    click++;
    if (click % 2 === 0) {
        sidebarDropdown.style.right = "-100%"; // Slide out to the right
        sidebarDropdown.style.opacity = "0"; // Fade out
    } else {
        sidebarDropdown.style.visibility = "visible"; // Make visible
        setTimeout(() => {
            sidebarDropdown.style.right = "0"; // Slide in from the right
            sidebarDropdown.style.opacity = "1"; // Fade in
        }, 50); // Adding a small delay before showing to ensure visibility change occurs first
    }
});

// Get all anchor tags
const anchors = document.querySelectorAll('.glow-anchor');

// Add event listeners to each anchor tag
anchors.forEach(anchor => {
    anchor.addEventListener('mouseenter', () => {
        // Add glow class on hover
        anchor.classList.add('glow');
    });

    anchor.addEventListener('mouseleave', () => {
        // Remove glow class when mouse leaves
        anchor.classList.remove('glow');
    });
});

// Get color picker input and color preview element
const colorPicker = document.getElementById('color-picker');
const colorPreview = document.getElementById('navbar');

// Add event listener to color picker input
colorPicker.addEventListener('input', (event) => {
    // Get selected color value
    const selectedColor = event.target.value;
    
    // Update color preview element background color
    colorPreview.style.backgroundColor = selectedColor;
});

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});







