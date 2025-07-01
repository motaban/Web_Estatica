// Módulo principal que coordina todas las funcionalidades del sitio
import { loadProducts, setupProductComparison } from './products.js';
import { setupTestimonials, setupTestimonialForm } from './testimonials.js';

// Función para cambiar entre tema claro y oscuro


// Función envio de formularios
function setupFormSubmissions() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulacion de envío
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            submitBtn.style.opacity = '0.7';
            
            // Simulacion de retraso de red
            setTimeout(() => {
                submitBtn.textContent = '¡Enviado!';
                submitBtn.style.backgroundColor = '#4CAF50';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.backgroundColor = '';
                    
                    // Cierre del modal
                    const modal = form.closest('.modal');
                    if (modal) {
                        modal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }
                    
                    // Notificación de éxito
                    showNotification('¡Formulario enviado con éxito!', 'success');
                    
                    // Reset formulario 
                    form.reset();
                }, 1500);
            }, 1000);
        });
    });
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Desaparecer después de 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-100%)';
        
        // Eliminar después de la animación
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Función para smooth scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Función para cargar productos destacados (solo en home)
function loadFeaturedProducts() {
    fetch('js/data/products.json')
        .then(response => response.json())
        .then(products => {
            const featuredContainer = document.getElementById('featuredProducts');
            if (!featuredContainer) return;
            
            // Filtramos los productos destacados
            const featuredProducts = products.filter(product => product.featured).slice(0, 4);
            
            if (featuredProducts.length === 0) {
                featuredContainer.innerHTML = '<p class="error-text">No hay productos destacados disponibles.</p>';
                return;
            }
            
            featuredContainer.innerHTML = '';
            
            featuredProducts.forEach(product => {
                const productCard = createProductCard(product);
                featuredContainer.appendChild(productCard);
            });
            
            // Configuramos los botones de comparación
            setupCompareButtons();
        })
        .catch(error => {
            console.error('Error cargando productos destacados:', error);
            document.getElementById('featuredProducts').innerHTML = 
                '<p class="error-text">Error al cargar los productos. Por favor intenta más tarde.</p>';
        });
}

// Función para crear tarjetas de producto
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product.id;
    
    card.innerHTML = `
        <div class="product-image">
            <img src="assets/img/products/${product.image}" alt="${product.name}" loading="lazy">
            ${product.featured ? '<span class="featured-badge">Destacado</span>' : ''}
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <div class="product-meta">
                <span class="category">${getCategoryName(product.category)}</span>
                <span class="price">$${product.price.toFixed(2)}</span>
            </div>
            <p class="description">${product.description.substring(0, 80)}...</p>
            <div class="product-actions">
                <a href="pages/machines.html#product-${product.id}" class="cta-button small">Ver Detalles</a>
                <button class="compare-btn" data-id="${product.id}">
                    <i class="fas fa-exchange-alt"></i> Comparar
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Función auxiliar para nombres de categoría
function getCategoryName(category) {
    const categories = {
        'cordless': 'Inalámbrica',
        'corded': 'Con cable',
        'clipper': 'Cortadora',
        'trimmer': 'Recortadora'
    };
    return categories[category] || category;
}

// Configurar botones de comparación en las tarjetas de producto
function setupCompareButtons() {
    document.querySelectorAll('.compare-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.dataset.id;
            toggleProductComparison(productId);
            
            // Animación del botón
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// Agregar o quitar producto de la comparación
function toggleProductComparison(productId) {
    const compareBtn = document.getElementById('compareBtn');
    const productIndex = productsToCompare.indexOf(productId);
    
    if (productIndex === -1) {
        // Agregar a la comparación (máximo 3 productos)
        if (productsToCompare.length < 3) {
            productsToCompare.push(productId);
            
            // Actualizar botones
            document.querySelector(`.compare-btn[data-id="${productId}"]`).classList.add('active');
            document.querySelector(`.compare-btn[data-id="${productId}"] i`).className = 'fas fa-check';
            
            // Mostrar notificación
            const product = allProducts.find(p => p.id === productId);
            showNotification(`"${product.name}" agregado a comparación`, 'success');
        } else {
            showNotification('Máximo 3 productos para comparar', 'warning');
        }
    } else {
        // Quitar de la comparación
        productsToCompare.splice(productIndex, 1);
        
        // Actualizar botones
        document.querySelector(`.compare-btn[data-id="${productId}"]`).classList.remove('active');
        document.querySelector(`.compare-btn[data-id="${productId}"] i`).className = 'fas fa-exchange-alt';
    }
    
    // Actualizar el botón de comparar
    if (compareBtn) {
        compareBtn.textContent = `Comparar (${productsToCompare.length})`;
        compareBtn.disabled = productsToCompare.length < 2;
    }
}

// Configurar el slider de testimonios
function setupTestimonialSlider() {
    const slider = document.getElementById('testimonialsSlider');
    if (!slider) return;
    
    const container = document.getElementById('testimonialsContainer');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    const testimonials = container.querySelectorAll('.testimonial-card');
    
    if (testimonials.length <= 1) return;
    
    let currentIndex = 0;
    const testimonialWidth = testimonials[0].offsetWidth + 30; // Incluye el gap
    
    function updateSlider() {
        container.style.transform = `translateX(-${currentIndex * testimonialWidth}px)`;
        
        // Deshabilitar botones en extremos
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= testimonials.length - 1;
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < testimonials.length - 1) {
            currentIndex++;
            updateSlider();
        }
    });
    
    // Inicializar
    updateSlider();
    
    // Configurar eventos táctiles para móviles
    let touchStartX = 0;
    let touchEndX = 0;
    
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        const difference = touchStartX - touchEndX;
        
        if (difference > 50 && currentIndex < testimonials.length - 1) {
            // Swipe izquierda
            currentIndex++;
            updateSlider();
        } else if (difference < -50 && currentIndex > 0) {
            // Swipe derecha
            currentIndex--;
            updateSlider();
        }
    }
}