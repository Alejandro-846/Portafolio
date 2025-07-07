document.addEventListener("DOMContentLoaded", function() {
    const intro = document.getElementById("intro");
    const video = document.getElementById("introVideo");
    const mainContent = document.getElementById("mainContent");
    
    // Crear botón móvil
    const mobileBtn = document.createElement('button');
    mobileBtn.classList.add('mobile-menu-btn');
    mobileBtn.innerHTML = '☰';
    document.body.appendChild(mobileBtn);
    
    // Forzar reinicio del video
    video.currentTime = 0;
    
    // Función para mostrar el contenido principal
    const showMainContent = () => {
        intro.classList.add('fade-out');
        setTimeout(() => {
            mainContent.classList.remove('hidden');
            mainContent.classList.add('show-content');
            document.body.style.overflow = 'auto';
        }, 1000);
    };
    
    // Intentar reproducir automáticamente
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            // Fallback para navegadores que bloquean autoplay
            video.controls = true;
            document.body.style.overflow = 'hidden';
            
            const playButton = document.createElement('div');
            playButton.innerHTML = '▶ Reproducir Intro';
            playButton.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0,191,255,0.8);
                color: white;
                padding: 15px 30px;
                border-radius: 50px;
                cursor: pointer;
                z-index: 10000;
                font-family: 'Poppins', sans-serif;
            `;
            document.body.appendChild(playButton);
            
            playButton.addEventListener('click', () => {
                video.play();
                playButton.remove();
                video.controls = false;
            });
        });
    }
    
    // Cuando el video termina
    video.addEventListener('ended', showMainContent);
    
    // Fallback por si el video no termina
    setTimeout(showMainContent, 15000);
    
    // Control del menú móvil
    mobileBtn.addEventListener('click', () => {
        document.querySelector('.navbar').classList.toggle('active');
    });
    
    // Mostrar/ocultar botón en responsive
    function handleResize() {
        if (window.innerWidth <= 768) {
            mobileBtn.classList.add('active');
        } else {
            mobileBtn.classList.remove('active');
            document.querySelector('.navbar').classList.remove('active');
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Reiniciar el video al recargar
    window.addEventListener('beforeunload', function() {
        sessionStorage.setItem('shouldPlayIntro', 'true');
    });
    
    // Evitar mostrar intro en navegación interna
    window.addEventListener('load', function() {
        if (sessionStorage.getItem('shouldPlayIntro') === 'true') {
            sessionStorage.removeItem('shouldPlayIntro');
        } else {
            intro.style.display = 'none';
            mainContent.classList.remove('hidden');
        }
    });
});