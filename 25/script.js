document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const inputs = document.querySelectorAll('.form-control');
    const submitButton = document.querySelector('.btn-primary');

    inputs.forEach((input, index) => {
        input.addEventListener('focus', function() {
            this.classList.add('input-focused');

            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';

            setTimeout(() => {
                this.classList.remove('input-focused');
            }, 600);
        });

        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.style.borderColor = '#2a5298';
                this.style.background = '#ffffff';
            } else {
                this.style.borderColor = '#e1e8ed';
                this.style.background = '#f8fafc';
            }
        });

        if (this.tagName === 'SELECT') {
            input.addEventListener('change', function() {
                this.style.color = '#1e3c72';
                this.style.fontWeight = '500';
            });
        }
    });

    form.addEventListener('submit', function(e) {
        const formData = new FormData(form);
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ef4444';
                input.style.animation = 'shake 0.5s';

                setTimeout(() => {
                    input.style.animation = '';
                }, 500);
            }
        });

        if (isValid) {
            form.classList.add('loading');
            submitButton.textContent = 'Submitting...';
            submitButton.style.position = 'relative';

            inputs.forEach(input => {
                input.disabled = true;
            });
        }
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);

    submitButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });

    submitButton.addEventListener('mouseleave', function() {
        if (!form.classList.contains('loading')) {
            this.style.transform = 'translateY(0) scale(1)';
        }
    });

    const nameInput = document.querySelector('input[name="name"]');
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
        });
    }

    const contactInput = document.querySelector('input[name="contact_number"]');
    if (contactInput) {
        contactInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9+\-() ]/g, '');
        });
    }

    const yearInput = document.querySelector('input[name="year_of_passing"]');
    if (yearInput) {
        yearInput.addEventListener('input', function() {
            const currentYear = new Date().getFullYear();
            if (this.value.length === 4) {
                if (parseInt(this.value) > currentYear) {
                    this.style.borderColor = '#ef4444';
                    setTimeout(() => {
                        this.style.borderColor = '#e1e8ed';
                    }, 2000);
                } else if (parseInt(this.value) < 1950) {
                    this.style.borderColor = '#ef4444';
                    setTimeout(() => {
                        this.style.borderColor = '#e1e8ed';
                    }, 2000);
                }
            }
        });
    }

    const cardHeader = document.querySelector('.card-header');
    if (cardHeader) {
        let mouseX = 0;
        let mouseY = 0;

        cardHeader.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (mouseY - centerY) / 20;
            const rotateY = (centerX - mouseX) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        cardHeader.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });

        cardHeader.style.transition = 'transform 0.1s ease';
    }

    function createFloatingParticles() {
        const container = document.querySelector('.container');
        const particleCount = 15;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(255, 255, 255, 0.3)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.pointerEvents = 'none';
            particle.style.animation = `float ${Math.random() * 3 + 3}s ease-in-out infinite`;
            particle.style.animationDelay = Math.random() * 2 + 's';

            if (container) {
                container.style.position = 'relative';
                container.appendChild(particle);
            }
        }
    }

    createFloatingParticles();

    const emailInput = document.querySelector('input[name="email"]');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailPattern.test(this.value)) {
                this.style.borderColor = '#ef4444';
                this.style.animation = 'shake 0.5s';

                setTimeout(() => {
                    this.style.animation = '';
                    this.style.borderColor = '#e1e8ed';
                }, 1500);
            }
        });
    }

    const card = document.querySelector('.card');
    if (card) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'scaleIn 0.6s ease-out';
                }
            });
        }, { threshold: 0.1 });

        observer.observe(card);
    }

    inputs.forEach(input => {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && this.tagName !== 'TEXTAREA') {
                e.preventDefault();
                const inputArray = Array.from(inputs);
                const currentIndex = inputArray.indexOf(this);
                const nextInput = inputArray[currentIndex + 1];

                if (nextInput) {
                    nextInput.focus();
                } else {
                    submitButton.focus();
                }
            }
        });
    });

    const modal = document.getElementById('ticketModal');
    if (modal) {
        modal.addEventListener('shown.bs.modal', function() {
            const confettiCount = 50;
            const colors = ['#1e3c72', '#2a5298', '#4a90e2', '#ffffff'];

            for (let i = 0; i < confettiCount; i++) {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = '-10px';
                confetti.style.opacity = Math.random();
                confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '9999';

                document.body.appendChild(confetti);

                const fallDuration = Math.random() * 3 + 2;
                const fallDistance = window.innerHeight + 10;
                const swayDistance = Math.random() * 200 - 100;

                confetti.animate([
                    {
                        transform: `translateY(0px) translateX(0px) rotate(0deg)`,
                        opacity: Math.random()
                    },
                    {
                        transform: `translateY(${fallDistance}px) translateX(${swayDistance}px) rotate(${Math.random() * 720}deg)`,
                        opacity: 0
                    }
                ], {
                    duration: fallDuration * 1000,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                });

                setTimeout(() => {
                    confetti.remove();
                }, fallDuration * 1000);
            }
        });
    }
});
