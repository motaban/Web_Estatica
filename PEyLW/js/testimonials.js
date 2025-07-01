// testimonials.js


loadTestimonials();

// Configurar el modal
setupTestimonialModal();

// Configurar el formulario
setupTestimonialForm();

// Configurar controles del slider
setupSliderControls();


function loadTestimonials() {
    const testimonialsContainer = document.getElementById('testimonialsContainer');
    const savedTestimonials = JSON.parse(localStorage.getItem('wahlTestimonials')) || [];
    
    // Si no hay testimonios, cargar algunos de ejemplo
    if (savedTestimonials.length === 0) {
        const defaultTestimonials = [
            {
                name: "Carlos Barber",
                profession: "Barbero Profesional",
                rating: 5,
                comment: "Las máquinas Wahl son las mejores que he usado en mis 10 años de carrera. Durabilidad y potencia insuperables.",
                date: new Date().toISOString()
            },
            {
                name: "María Estilista",
                profession: "Dueña de Salón",
                rating: 4,
                comment: "Excelente calidad, mis clientes notan la diferencia cuando uso herramientas Wahl. Lo único es que son un poco pesadas.",
                date: new Date().toISOString()
            }
        ];
        localStorage.setItem('wahlTestimonials', JSON.stringify(defaultTestimonials));
        displayTestimonials(defaultTestimonials);
    } else {
        displayTestimonials(savedTestimonials);
    }
}

//Imprime las reseñas en el contenedor
function displayTestimonials(testimonials) {
    const container = document.getElementById('testimonialsContainer');
    container.innerHTML = '';
    
    testimonials.forEach(testimonial => {
        const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
        const date = new Date(testimonial.date).toLocaleDateString('es-AR');
        
        container.innerHTML += `
            <div class="testimonial-card">
                <div class="testimonial-header">
                    <div class="user-info">
                        <h4>${testimonial.name}</h4>
                        <span>${testimonial.profession}</span>
                    </div>
                    <div class="testimonial-rating">
                        ${stars}
                    </div>
                </div>
                <p class="testimonial-text">"${testimonial.comment}"</p>
                <div class="testimonial-date">${date}</div>
            </div>
        `;
    });
}

function setupTestimonialModal() {
    const modal = document.getElementById('testimonialModal');
    const addBtn = document.getElementById('addTestimonialBtn');
    const closeBtn = document.querySelector('.close-modal');
    
    addBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Configurar estrellas
    const stars = document.querySelectorAll('.rating-stars i');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.dataset.rating);
            document.getElementById('userRating').value = rating;
            
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
    });
}

function setupTestimonialForm() {
    const form = document.getElementById('testimonialForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const testimonial = {
            name: document.getElementById('userName').value,
            profession: document.getElementById('userProfession').value,
            rating: parseInt(document.getElementById('userRating').value),
            comment: document.getElementById('userComment').value,
            date: new Date().toISOString()
        };
        
        // Guardar el testimonio
        const savedTestimonials = JSON.parse(localStorage.getItem('wahlTestimonials')) || [];
        savedTestimonials.push(testimonial);
        localStorage.setItem('wahlTestimonials', JSON.stringify(savedTestimonials));
        
        // Actualizar la visualización
        displayTestimonials(savedTestimonials);
        
        // Cerrar el modal y resetear el formulario
        document.getElementById('testimonialModal').style.display = 'none';
        form.reset();
        
        // Resetear estrellas
        const stars = document.querySelectorAll('.rating-stars i');
        stars.forEach(star => {
            star.classList.remove('fas');
            star.classList.add('far');
        });
        
        alert('¡Gracias por tu reseña! Se ha guardado correctamente.');
    });
}

function setupSliderControls() {
    const slider = document.querySelector('.testimonials-slider');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentIndex = 0;
    
    if (!slider || !prevBtn || !nextBtn) return;
    
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length <= 3) return; // No necesita slider si hay pocos testimonios
    
    function updateSlider() {
        const containerWidth = slider.offsetWidth;
        const cardWidth = testimonials[0].offsetWidth + 20; // Incluye margen
        const visibleCards = Math.floor(containerWidth / cardWidth);
        
        testimonials.forEach((card, index) => {
            card.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            card.style.opacity = (index >= currentIndex && index < currentIndex + visibleCards) ? '1' : '0.5';
        });
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < testimonials.length - 3) {
            currentIndex++;
            updateSlider();
        }
    });
    
    window.addEventListener('resize', updateSlider);
    updateSlider();
}