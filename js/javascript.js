        // ========================================
        // AUTO-HIDE NAVBAR ON SCROLL
        // ========================================
        (function() {
            let lastScrollTop = 0;
            let scrollThreshold = 10; // Minimum scroll distance to trigger hide/show
            const header = document.querySelector('header');
            
            window.addEventListener('scroll', function() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Skip if at the very top of the page
                if (scrollTop <= 100) {
                    header.classList.remove('header-hidden');
                    return;
                }
                
                // Check scroll direction
                if (Math.abs(scrollTop - lastScrollTop) > scrollThreshold) {
                    if (scrollTop > lastScrollTop) {
                        // Scrolling down - hide header
                        header.classList.add('header-hidden');
                    } else {
                        // Scrolling up - show header
                        header.classList.remove('header-hidden');
                    }
                    lastScrollTop = scrollTop;
                }
            }, { passive: true });
        })();

        // ========================================
        // ANIMASI MUNCUL CARD BRAND
        // ========================================
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.brand-card');
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries, obs) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Tambahkan delay bertingkat untuk animasi berurutan
                            const idx = Array.from(cards).indexOf(entry.target);
                            entry.target.style.transitionDelay = (idx * 0.13) + 's';
                            entry.target.classList.add('visible');
                            obs.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.2 });
                cards.forEach(card => observer.observe(card));
            } else {
                // Fallback jika browser lama
                cards.forEach((card, idx) => {
                    card.style.transitionDelay = (idx * 0.13) + 's';
                    card.classList.add('visible');
                });
            }
        });

        // ========================================
        // ANIMASI TAMBAHAN UNTUK LOGO SOSIAL MEDIA - DIPERBAIKI
        // ========================================
        document.addEventListener('DOMContentLoaded', function() {
            // PERBAIKAN: Tidak perlu setTimeout tambahan
            const socialLinks = document.querySelectorAll('.social-link');
            
            // Tambah event listener untuk hover effect
            socialLinks.forEach(link => {
                link.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-8px) scale(1.1)';
                    this.style.boxShadow = '0 20px 40px rgba(67, 56, 202, 0.3)';
                });
                
                link.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                    this.style.boxShadow = '0 8px 25px rgba(67, 56, 202, 0.15)';
                });
            });
        });

        // ========================================
        // CUSTOM CURSOR SYSTEM (OPTIMIZED - Desktop Only)
        // ========================================
        // Only initialize cursor on desktop devices
        if (window.innerWidth > 1024 && !('ontouchstart' in window)) {
            const cursor = document.querySelector('.cursor');
            const follower = document.querySelector('.cursor-follower');
            
            if (cursor && follower) {
                let mouseX = 0, mouseY = 0;
                let isHovering = false;
                let trailCount = 0;
                const MAX_TRAILS = 2;
                const trailPool = [];

                // Initialize trail pool
                for (let i = 0; i < 10; i++) {
                    const trail = document.createElement('div');
                    trail.className = 'cursor-trail';
                    trail.style.display = 'none';
                    document.body.appendChild(trail);
                    trailPool.push({ element: trail, inUse: false });
                }

                function getTrailFromPool() {
                    let trail = trailPool.find(t => !t.inUse);
                    if (!trail) {
                        const newTrail = document.createElement('div');
                        newTrail.className = 'cursor-trail';
                        document.body.appendChild(newTrail);
                        trail = { element: newTrail, inUse: false };
                        trailPool.push(trail);
                    }
                    return trail;
                }

                let rafId = null;
                let pendingX = 0, pendingY = 0;

                function updateCursor() {
                    cursor.style.left = pendingX + 'px';
                    cursor.style.top = pendingY + 'px';
                    follower.style.left = pendingX + 'px';
                    follower.style.top = pendingY + 'px';

                    if (!isHovering && Math.random() > 0.8 && trailCount < MAX_TRAILS) {
                        const trail = getTrailFromPool();
                        trail.inUse = true;
                        trail.element.style.display = 'block';
                        trail.element.style.left = pendingX + 'px';
                        trail.element.style.top = pendingY + 'px';
                        trail.element.style.animation = 'none';
                        void trail.element.offsetWidth;
                        trail.element.style.animation = 'trailFade 0.8s ease-out forwards';
                        trailCount++;

                        setTimeout(() => {
                            trail.inUse = false;
                            trail.element.style.display = 'none';
                            trailCount--;
                        }, 800);
                    }

                    rafId = null;
                }

                document.addEventListener('mousemove', (e) => {
                    pendingX = e.clientX;
                    pendingY = e.clientY;

                    if (!rafId) {
                        rafId = requestAnimationFrame(updateCursor);
                    }
                }, { passive: true });

                document.addEventListener('mouseover', (e) => {
                    if (e.target.closest('a, .brand-card, .team-member, button')) {
                        isHovering = true;
                        cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
                        follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    }
                }, true);

                document.addEventListener('mouseout', (e) => {
                    if (e.target.closest('a, .brand-card, .team-member, button')) {
                        isHovering = false;
                        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                        follower.style.transform = 'translate(-50%, -50%) scale(1)';
                    }
                }, true);
            }
        } else {
            // Remove cursor elements on mobile/tablet
            const cursorElements = document.querySelectorAll('.cursor, .cursor-follower');
            cursorElements.forEach(el => {
                if (el) el.remove();
            });
        }

        // ========================================
        // HERO 3D SCENE
        // ========================================
        let heroScene, heroCamera, heroRenderer, heroParticles, heroTime = 0;
        const heroShapes = [];

        function initHero3D() {
            const canvas = document.getElementById('hero-canvas');
            heroScene = new THREE.Scene();
            
            heroCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            heroCamera.position.z = 5;

            heroRenderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
            heroRenderer.setSize(window.innerWidth, window.innerHeight);
            heroRenderer.setPixelRatio(window.devicePixelRatio);

            // Colorful Particles
            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 800;
            const posArray = new Float32Array(particlesCount * 3);
            const colorArray = new Float32Array(particlesCount * 3);

            for(let i = 0; i < particlesCount * 3; i += 3) {
                posArray[i] = (Math.random() - 0.5) * 15;
                posArray[i + 1] = (Math.random() - 0.5) * 15;
                posArray[i + 2] = (Math.random() - 0.5) * 10;
                
                colorArray[i] = 0.26 + Math.random() * 0.15;
                colorArray[i + 1] = 0.22 + Math.random() * 0.15;
                colorArray[i + 2] = 0.79 + Math.random() * 0.15;
            }

            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.05,
                vertexColors: true,
                transparent: true,
                opacity: 0.7,
                blending: THREE.AdditiveBlending
            });

            heroParticles = new THREE.Points(particlesGeometry, particlesMaterial);
            heroScene.add(heroParticles);

            // Geometric Shapes
            const geometries = [
                new THREE.TorusGeometry(0.8, 0.3, 8, 32),
                new THREE.OctahedronGeometry(0.6),
                new THREE.TetrahedronGeometry(0.5)
            ];

            for(let i = 0; i < 2; i++) {
                const geometry = geometries[i % geometries.length];
                const material = new THREE.MeshBasicMaterial({
                    color: 0x4338CA,
                    wireframe: true,
                    transparent: true,
                    opacity: 0.2
                });
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.x = (Math.random() - 0.5) * 10;
                mesh.position.y = (Math.random() - 0.5) * 10;
                mesh.position.z = (Math.random() - 0.5) * 4;
                heroShapes.push(mesh);
                heroScene.add(mesh);
            }

            document.addEventListener('mousemove', (e) => {
                const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
                const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
                
                heroCamera.position.x = mouseX * 0.5;
                heroCamera.position.y = mouseY * 0.5;
                heroCamera.lookAt(heroScene.position);
            });

            animateHero();
        }

        function animateHero() {
            requestAnimationFrame(animateHero);
            
            heroTime += 0.003;

            heroParticles.rotation.y += 0.0008;
            heroParticles.rotation.x += 0.0004;

            const positions = heroParticles.geometry.attributes.position.array;
            for(let i = 0; i < positions.length; i += 3) {
                positions[i + 1] = Math.sin(heroTime + positions[i]) * 0.5;
            }
            heroParticles.geometry.attributes.position.needsUpdate = true;

            heroShapes.forEach((shape, i) => {
                shape.rotation.x += 0.003;
                shape.rotation.y += 0.005;
                shape.position.y = Math.sin(heroTime + i) * 1.5;
            });

            heroRenderer.render(heroScene, heroCamera);
        }

        // ========================================
        // BRANDS 3D SCENE
        // ========================================
        let brandsScene, brandsCamera, brandsRenderer, brandsTime = 0;
        const brandsCrystals = [];
        const brandsSections = [];

        function initBrands3D() {
            const canvas = document.getElementById('brands-canvas');
            const section = document.querySelector('.brands');
            brandsScene = new THREE.Scene();
            
            brandsCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            brandsCamera.position.z = 8;

            brandsRenderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
            brandsRenderer.setSize(window.innerWidth, section.offsetHeight);
            brandsRenderer.setPixelRatio(window.devicePixelRatio);

            for(let i = 0; i < 5; i++) {
                const size = 0.3 + Math.random() * 0.5;
                const geometry = new THREE.OctahedronGeometry(size, 0);
                const material = new THREE.MeshBasicMaterial({
                    color: new THREE.Color().setHSL(0.68, 0.85, 0.5 + Math.random() * 0.3),
                    wireframe: true,
                    transparent: true,
                    opacity: 0.25 + Math.random() * 0.25
                });
                const crystal = new THREE.Mesh(geometry, material);
                crystal.position.x = (Math.random() - 0.5) * 18;
                crystal.position.y = (Math.random() - 0.5) * 12;
                crystal.position.z = (Math.random() - 0.5) * 6;
                brandsCrystals.push(crystal);
                brandsScene.add(crystal);
            }

            for(let s = 0; s < 1; s++) {
                const spiralPoints = [];
                for(let i = 0; i < 100; i++) {
                    const angle = i * 0.35 + s * Math.PI * 0.66;
                    const x = Math.cos(angle) * 1.5 + (s - 1) * 5;
                    const y = i * 0.08 - 4;
                    const z = Math.sin(angle) * 1.5;
                    spiralPoints.push(new THREE.Vector3(x, y, z));
                }
                const spiralGeometry = new THREE.BufferGeometry().setFromPoints(spiralPoints);
                const spiralMaterial = new THREE.LineBasicMaterial({
                    color: 0x4338CA,
                    transparent: true,
                    opacity: 0.3
                });
                const spiral = new THREE.Line(spiralGeometry, spiralMaterial);
                brandsSections.push(spiral);
                brandsScene.add(spiral);
            }

            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 400;
            const posArray = new Float32Array(particlesCount * 3);

            for(let i = 0; i < particlesCount * 3; i += 3) {
                posArray[i] = (Math.random() - 0.5) * 20;
                posArray[i + 1] = (Math.random() - 0.5) * 14;
                posArray[i + 2] = (Math.random() - 0.5) * 8;
            }

            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.04,
                color: 0x4338CA,
                transparent: true,
                opacity: 0.5
            });

            const particles = new THREE.Points(particlesGeometry, particlesMaterial);
            brandsScene.add(particles);

            animateBrands();
        }

        function animateBrands() {
            requestAnimationFrame(animateBrands);
            
            brandsTime += 0.005;

            brandsCrystals.forEach((crystal, i) => {
                crystal.rotation.x += 0.01;
                crystal.rotation.y += 0.015;
                crystal.position.y += Math.sin(brandsTime + i) * 0.01;
                crystal.position.x += Math.cos(brandsTime * 0.5 + i) * 0.004;
            });

            brandsSections.forEach((section, i) => {
                section.rotation.y += 0.002 * (i + 1);
            });

            brandsRenderer.render(brandsScene, brandsCamera);
        }

        // ========================================
        // TEAM 3D SCENE
        // ========================================
        let teamScene, teamCamera, teamRenderer, teamTime = 0;
        const teamElements = [];

        function initTeam3D() {
            const canvas = document.getElementById('team-canvas');
            const section = document.querySelector('.team');
            teamScene = new THREE.Scene();
            
            teamCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            teamCamera.position.z = 7;

            teamRenderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
            teamRenderer.setSize(window.innerWidth, section.offsetHeight);
            teamRenderer.setPixelRatio(window.devicePixelRatio);

            for(let i = 0; i < 6; i++) {
                const geometry = new THREE.SphereGeometry(0.15, 16, 16);
                const material = new THREE.MeshBasicMaterial({
                    color: 0x4338CA,
                    wireframe: true,
                    transparent: true,
                    opacity: 0.4
                });
                const sphere = new THREE.Mesh(geometry, material);
                sphere.position.x = (Math.random() - 0.5) * 12;
                sphere.position.y = (Math.random() - 0.5) * 8;
                sphere.position.z = (Math.random() - 0.5) * 5;
                teamElements.push(sphere);
                teamScene.add(sphere);
            }

            const linePoints = [];
            for(let i = 0; i < teamElements.length; i++) {
                for(let j = i + 1; j < teamElements.length; j++) {
                    if(Math.random() > 0.7) {
                        linePoints.push(teamElements[i].position);
                        linePoints.push(teamElements[j].position);
                    }
                }
            }
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
            const lineMaterial = new THREE.LineBasicMaterial({
                color: 0x4338CA,
                transparent: true,
                opacity: 0.15
            });
            const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
            teamScene.add(lines);

            for(let i = 0; i < 2; i++) {
                const geometry = new THREE.TorusGeometry(1 + i * 0.5, 0.05, 8, 32);
                const material = new THREE.MeshBasicMaterial({
                    color: 0x4338CA,
                    transparent: true,
                    opacity: 0.2
                });
                const ring = new THREE.Mesh(geometry, material);
                ring.rotation.x = Math.PI / 4;
                ring.position.y = (i - 1) * 2;
                teamElements.push(ring);
                teamScene.add(ring);
            }

            animateTeam();
        }

        function animateTeam() {
            requestAnimationFrame(animateTeam);
            
            teamTime += 0.004;

            teamElements.forEach((element, i) => {
                if(element.geometry.type === 'SphereGeometry') {
                    element.position.y += Math.sin(teamTime + i) * 0.008;
                    element.rotation.y += 0.01;
                } else if(element.geometry.type === 'TorusGeometry') {
                    element.rotation.z += 0.005 * (i + 1);
                }
            });

            teamRenderer.render(teamScene, teamCamera);
        }

        // ========================================
        // CONTACT 3D SCENE
        // ========================================
        // VISION & MISSION 3D SCENE (subtle background)
        let vmScene, vmCamera, vmRenderer, vmTime = 0;
        const vmLines = [];

        function initVisionMission3D() {
            const canvas = document.getElementById('vision-mission-canvas');
            const section = document.querySelector('.vision-mission');
            if (!canvas || !section) return;
            vmScene = new THREE.Scene();

            vmCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            vmCamera.position.z = 8;

            vmRenderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
            vmRenderer.setSize(window.innerWidth, section.offsetHeight);
            vmRenderer.setPixelRatio(window.devicePixelRatio);

            for (let i = 0; i < 3; i++) {
                const points = [];
                for (let t = 0; t < 200; t++) {
                    const x = (t - 100) * 0.06;
                    const y = Math.sin(t * 0.08 + i) * 0.6 + (i - 1) * 1.2;
                    const z = Math.cos(t * 0.06 + i) * 0.2;
                    points.push(new THREE.Vector3(x, y, z));
                }
                const geo = new THREE.BufferGeometry().setFromPoints(points);
                const mat = new THREE.LineBasicMaterial({ color: 0x4338CA, transparent: true, opacity: 0.25 });
                const line = new THREE.Line(geo, mat);
                vmLines.push(line);
                vmScene.add(line);
            }

            animateVisionMission();
        }

        function animateVisionMission() {
            requestAnimationFrame(animateVisionMission);
            vmTime += 0.003;
            vmLines.forEach((line, idx) => {
                line.rotation.z = Math.sin(vmTime + idx) * 0.04;
            });
            if (vmRenderer && vmCamera) vmRenderer.render(vmScene, vmCamera);
        }

        // ========================================
        // HISTORY 3D SCENE
        // ========================================
        let historyScene, historyCamera, historyRenderer, historyTime = 0;
        const historyParticles = [];

        function initHistory3D() {
            const canvas = document.getElementById('history-canvas');
            const section = document.querySelector('.history-section');
            if (!canvas || !section) return;

            historyScene = new THREE.Scene();
            
            historyCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            historyCamera.position.z = 8;

            historyRenderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
            historyRenderer.setSize(window.innerWidth, section.offsetHeight);
            historyRenderer.setPixelRatio(window.devicePixelRatio);

            // Create flowing particles
            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 200;
            const posArray = new Float32Array(particlesCount * 3);

            for(let i = 0; i < particlesCount; i++) {
                posArray[i * 3] = (Math.random() - 0.5) * 20;
                posArray[i * 3 + 1] = (Math.random() - 0.5) * 20;
                posArray[i * 3 + 2] = (Math.random() - 0.5) * 10;
            }

            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.05,
                color: 0x4338CA,
                transparent: true,
                opacity: 0.6
            });

            const particles = new THREE.Points(particlesGeometry, particlesMaterial);
            historyParticles.push(particles);
            historyScene.add(particles);

            // Create timeline visualization lines
            for (let i = 0; i < 5; i++) {
                const points = [];
                for (let t = 0; t < 100; t++) {
                    const x = (t - 50) * 0.15;
                    const y = Math.sin(t * 0.1 + i * 2) * 0.5 + (i - 2) * 1.5;
                    const z = Math.cos(t * 0.08 + i) * 0.3;
                    points.push(new THREE.Vector3(x, y, z));
                }
                const geo = new THREE.BufferGeometry().setFromPoints(points);
                const mat = new THREE.LineBasicMaterial({ 
                    color: 0x5b4de8, 
                    transparent: true, 
                    opacity: 0.2 
                });
                const line = new THREE.Line(geo, mat);
                historyScene.add(line);
            }

            animateHistory();
        }

        function animateHistory() {
            requestAnimationFrame(animateHistory);
            historyTime += 0.005;
            
            historyParticles.forEach(particle => {
                particle.rotation.y = historyTime * 0.2;
                particle.rotation.x = Math.sin(historyTime * 0.3) * 0.1;
            });
            
            if (historyRenderer && historyCamera) {
                historyRenderer.render(historyScene, historyCamera);
            }
        }

        // ========================================
        // TIMELINE SCROLL ANIMATION
        // ========================================
        document.addEventListener('DOMContentLoaded', function() {
            const timelineItems = document.querySelectorAll('.timeline-item');
            
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            observer.unobserve(entry.target);
                        }
                    });
                }, { 
                    threshold: 0.2,
                    rootMargin: '0px 0px -100px 0px'
                });
                
                timelineItems.forEach(item => {
                    observer.observe(item);
                });
            } else {
                // Fallback for older browsers
                timelineItems.forEach(item => {
                    item.classList.add('visible');
                });
            }
        });

        let contactScene, contactCamera, contactRenderer, contactTime = 0;
        const contactWaves = [];

        function initContact3D() {
            const canvas = document.getElementById('contact-canvas');
            const section = document.querySelector('.contact');
            contactScene = new THREE.Scene();
            
            contactCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            contactCamera.position.z = 6;

            contactRenderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
            contactRenderer.setSize(window.innerWidth, section.offsetHeight);
            contactRenderer.setPixelRatio(window.devicePixelRatio);

            for(let i = 0; i < 3; i++) {
                const geometry = new THREE.TorusGeometry(0.8 + i * 0.3, 0.02, 8, 32);
                const material = new THREE.MeshBasicMaterial({
                    color: 0x4338CA,
                    transparent: true,
                    opacity: 0.3 - i * 0.05
                });
                const circle = new THREE.Mesh(geometry, material);
                circle.rotation.x = Math.PI / 2;
                contactWaves.push(circle);
                contactScene.add(circle);
            }

            const pinGeometry = new THREE.ConeGeometry(0.3, 1, 8);
            const pinMaterial = new THREE.MeshBasicMaterial({
                color: 0x4338CA,
                wireframe: true,
                transparent: true,
                opacity: 0.5
            });
            const pin = new THREE.Mesh(pinGeometry, pinMaterial);
            pin.position.y = 1;
            contactScene.add(pin);

            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 300;
            const posArray = new Float32Array(particlesCount * 3);

            for(let i = 0; i < particlesCount; i++) {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                const radius = 3 + Math.random() * 0.5;
                
                posArray[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
                posArray[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
                posArray[i * 3 + 2] = radius * Math.cos(phi);
            }

            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.03,
                color: 0x4338CA,
                transparent: true,
                opacity: 0.4
            });

            const globeParticles = new THREE.Points(particlesGeometry, particlesMaterial);
            contactScene.add(globeParticles);

            animateContact();
        }

        function animateContact() {
            requestAnimationFrame(animateContact);
            
            contactTime += 0.005;

            contactWaves.forEach((wave, i) => {
                const scale = 1 + Math.sin(contactTime * 2 - i * 0.3) * 0.2;
                wave.scale.set(scale, scale, scale);
                wave.material.opacity = 0.3 - i * 0.05 + Math.sin(contactTime * 2 - i * 0.3) * 0.1;
            });

            contactRenderer.render(contactScene, contactCamera);
        }

        // ========================================
        // TEAM CAROUSEL - SCROLL MANUAL
        // ========================================
        class TeamCarousel {
            constructor() {
                this.carousel = document.querySelector('.team-carousel');
                this.container = document.querySelector('.team-carousel-container');
                this.members = document.querySelectorAll('.team-member');
                this.activeCard = null;

                if (this.carousel && this.container && this.members.length > 0) {
                    this.init();
                    this.scrollToCenter();
                }
            }

            init() {
                this.members.forEach(member => {
                    member.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.setActiveCard(member);
                    });
                    
                    member.addEventListener('touchstart', (e) => {
                        e.stopPropagation();
                        this.setActiveCard(member);
                    });
                });
            }

            setActiveCard(card) {
                this.members.forEach(member => member.classList.remove('active'));
                card.classList.add('active');
                this.activeCard = card;
            }

            scrollToCenter() {
                const containerWidth = this.container.clientWidth;
                const carouselWidth = this.carousel.scrollWidth;
                const scrollPosition = (carouselWidth - containerWidth) / 2;
                
                setTimeout(() => {
                    this.container.scrollLeft = scrollPosition;
                }, 100);
            }
        }

        // ========================================
        // SMOOTH SCROLL
        // ========================================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // ========================================
        // ACTIVE NAVIGATION
        // ========================================
        // MOBILE NAV TOGGLE (Burger)
        (function() {
            const nav = document.querySelector('header nav');
            const toggle = document.querySelector('.nav-toggle');
            if (!nav || !toggle) return;

            toggle.addEventListener('click', () => {
                const isOpen = nav.classList.toggle('open');
                toggle.classList.toggle('active', isOpen);
                toggle.setAttribute('aria-expanded', String(isOpen));
            });

            // Close menu when clicking menu items
            nav.querySelectorAll('a').forEach(a => {
                a.addEventListener('click', () => {
                    if (nav.classList.contains('open')) {
                        nav.classList.remove('open');
                        toggle.classList.remove('active');
                        toggle.setAttribute('aria-expanded', 'false');
                    }
                });
            });

            // Close menu when clicking outside (backdrop)
            nav.addEventListener('click', (e) => {
                if (e.target === nav && nav.classList.contains('open')) {
                    nav.classList.remove('open');
                    toggle.classList.remove('active');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });

            // Close menu on window resize
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768 && nav.classList.contains('open')) {
                    nav.classList.remove('open');
                    toggle.classList.remove('active');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        })();

        // ACTIVE NAVIGATION
        const navLinks = document.querySelectorAll('nav a');
        const sections = document.querySelectorAll('section');
        
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // ========================================
        // RESIZE HANDLER
        // ========================================
        window.addEventListener('resize', () => {
            const aspect = window.innerWidth / window.innerHeight;
            
            if (heroCamera && heroRenderer) {
                heroCamera.aspect = aspect;
                heroCamera.updateProjectionMatrix();
                heroRenderer.setSize(window.innerWidth, window.innerHeight);
            }
            
            if (brandsCamera && brandsRenderer) {
                brandsCamera.aspect = aspect;
                brandsCamera.updateProjectionMatrix();
                brandsRenderer.setSize(window.innerWidth, document.querySelector('.brands').offsetHeight);
            }

            if (vmCamera && vmRenderer) {
                vmCamera.aspect = aspect;
                vmCamera.updateProjectionMatrix();
                vmRenderer.setSize(window.innerWidth, document.querySelector('.vision-mission').offsetHeight);
            }

            if (historyCamera && historyRenderer) {
                historyCamera.aspect = aspect;
                historyCamera.updateProjectionMatrix();
                historyRenderer.setSize(window.innerWidth, document.querySelector('.history-section').offsetHeight);
            }

            if (teamCamera && teamRenderer) {
                teamCamera.aspect = aspect;
                teamCamera.updateProjectionMatrix();
                teamRenderer.setSize(window.innerWidth, document.querySelector('.team').offsetHeight);
            }

            if (contactCamera && contactRenderer) {
                contactCamera.aspect = aspect;
                contactCamera.updateProjectionMatrix();
                contactRenderer.setSize(window.innerWidth, document.querySelector('.contact').offsetHeight);
            }
        });

        // ========================================
        // INITIALIZE ALL
        // ========================================
        window.addEventListener('load', () => {
            initHero3D();
            initBrands3D();
            initTeam3D();
            initVisionMission3D();
            initHistory3D();
            initContact3D();
            new TeamCarousel();
        });
        // Initialize carousel with custom settings
        const carousel = document.querySelector('#brandBanner');
        const bsCarousel = new bootstrap.Carousel(carousel, {
            interval: 7000,
            wrap: true,
            touch: true
        });

        // ========================================
        // DYNAMIC BACKGROUND THEME CHANGER
        // ========================================
        function updateBackgroundTheme(slideIndex) {
            const body = document.body;
            // Remove all theme classes
            body.classList.remove('theme-bocinyoi', 'theme-cikemam', 'theme-green', 'theme-default');
            
            // Add appropriate theme class based on slide index
            switch(slideIndex) {
                case 0:
                    body.classList.add('theme-bocinyoi');
                    break;
                case 1:
                    body.classList.add('theme-cikemam');
                    break;
                case 2:
                    body.classList.add('theme-green');
                    break;
                default:
                    body.classList.add('theme-default');
            }
        }

        // Set initial theme on page load
        const activeSlideOnLoad = document.querySelector('#brandBanner .carousel-item.active');
        if (activeSlideOnLoad) {
            const allSlides = Array.from(document.querySelectorAll('#brandBanner .carousel-item'));
            const initialIndex = allSlides.indexOf(activeSlideOnLoad);
            updateBackgroundTheme(initialIndex);
        }

        // Function untuk handle klik button
        function visitBrand(brandName) {
            alert(`Mengunjungi ${brandName}!\n\nDalam implementasi nyata, ini akan redirect ke halaman brand.`);
            // window.location.href = '/brand/' + brandName.toLowerCase().replace(' ', '-');
        }

        // Add animation on slide change
        carousel.addEventListener('slide.bs.carousel', function (e) {
            // Update background theme based on slide index
            const allSlides = Array.from(document.querySelectorAll('#brandBanner .carousel-item'));
            const nextSlideIndex = allSlides.indexOf(e.relatedTarget);
            updateBackgroundTheme(nextSlideIndex);
            
            // Reset animations
            const activeSlide = e.relatedTarget;
            const elements = activeSlide.querySelectorAll('.brand-tag, .brand-title, .brand-description, .btn-brand, .brand-logo-container');
            
            elements.forEach((el, index) => {
                el.style.animation = 'none';
                setTimeout(() => {
                    el.style.animation = null;
                }, 10);
            });
        });

        // Add keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                bsCarousel.prev();
            } else if (e.key === 'ArrowRight') {
                bsCarousel.next();
            }
        });

        // Add swipe gestures for mobile
        let touchstartX = 0;
        let touchendX = 0;

        carousel.addEventListener('touchstart', function(e) {
            touchstartX = e.changedTouches[0].screenX;
        });

        carousel.addEventListener('touchend', function(e) {
            touchendX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchendX < touchstartX - 50) {
                bsCarousel.next();
            }
            if (touchendX > touchstartX + 50) {
                bsCarousel.prev();
            }
        }

        // Auto-pause on hover
        carousel.addEventListener('mouseenter', function() {
            bsCarousel.pause();
        });

        carousel.addEventListener('mouseleave', function() {
            bsCarousel.cycle();
        });

        // Console log untuk debugging
        console.log('Brand Carousel initialized successfully! 🎉');
        console.log('Features:');
        console.log('- Auto-play carousel every 3.5 seconds');
        console.log('- Keyboard navigation (Arrow Left/Right)');
        console.log('- Touch swipe gestures');
        console.log('- Pause on hover');
        console.log('- Smooth animations');

        document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".fade-in-up");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target); // animasi hanya sekali
                }
            });
        },
        {
            threshold: 0.1
        }
    );

    elements.forEach(el => observer.observe(el));
});