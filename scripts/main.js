// AOS (Animate On Scroll) başlatma
AOS.init({
    duration: 1000,
    once: true
});

// Smooth scroll ve aktif menü takibi için
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Mobil menüyü kapat
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        }

        // Tıklanan linkin hedef bölümüne scroll
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });

        // Aktif menü öğesini güncelle
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Navbar scroll efekti
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Mobil menü için
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Scroll pozisyonuna göre aktif menüyü güncelle
window.addEventListener('scroll', () => {
    let scrollPosition = window.scrollY;

    // Her section'ın pozisyonunu kontrol et
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;

        // Eğer scroll pozisyonu section içindeyse
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            const currentId = section.getAttribute('id');
            
            // Tüm menü öğelerinden active class'ını kaldır
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // İlgili menü öğesine active class'ı ekle
            document.querySelector(`.nav-item[href="#${currentId}"]`).classList.add('active');
        }
    });
});

// Particles.js konfigürasyonunu güncelle
const particlesConfig = {
    particles: {
        number: {
            value: 160,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ["#ffffff", "#4a90e2", "#1e3c72", "#2a5298", "#00bfff"]
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.8,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.4,
                sync: false
            }
        },
        size: {
            value: 5,
            random: true,
            anim: {
                enable: true,
                speed: 4,
                size_min: 0.5,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#4a90e2",
            opacity: 0.6,
            width: 1.5
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: ["grab", "bubble"]
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 250,
                line_linked: {
                    opacity: 0.8
                }
            },
            bubble: {
                distance: 250,
                size: 8,
                duration: 2,
                opacity: 0.9,
                speed: 3
            },
            push: {
                particles_nb: 6
            }
        }
    },
    retina_detect: true
};

particlesJS("particles-js", particlesConfig);

// Typing efekti için
const roles = [
    'Yazılım Mühendisi', 
    'Java Developer', 
    'Python Developer', 
    'Web Developer',
    'Full Stack Developer'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000;

function type() {
    const role = roles[roleIndex];
    const typeDisplay = document.querySelector('.hero-content h2');
    
    if (isDeleting) {
        typeDisplay.textContent = role.substring(0, charIndex-1);
        charIndex--;
    } else {
        typeDisplay.textContent = role.substring(0, charIndex+1);
        charIndex++;
    }

    if (!isDeleting && charIndex === role.length) {
        isDeleting = true;
        setTimeout(type, newTextDelay);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(type, isDeleting ? erasingDelay : typingDelay);
    }
}

// Sayfa yüklendiğinde typing efektini başlat
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(type, newTextDelay);
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form verilerini al
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Form gönderildiğinde animasyon
    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
    
    // Burada form verilerini işleyebilir veya bir API'ye gönderebilirsiniz
    // Örnek olarak console'a yazdıralım
    console.log('Form Data:', formData);
    
    // Başarılı gönderim simülasyonu
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Gönderildi!';
        submitBtn.style.background = '#4CAF50';
        
        // Formu resetle
        this.reset();
        
        // 3 saniye sonra butonu eski haline getir
        setTimeout(() => {
            submitBtn.innerHTML = '<span>Gönder</span><i class="fas fa-paper-plane"></i>';
            submitBtn.style.background = '';
        }, 3000);
    }, 2000);
}); 