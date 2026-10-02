/**
 * CosmosCommand - 3D WebGL Space Radar & Planetary Orrery
 * Interactive Three.js Earth, Moon, and plotted Asteroid flyby orbital vectors.
 */
class CosmosOrrery3D {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.earth = null;
    this.clouds = null;
    this.moon = null;
    this.moonOrbitLine = null;
    this.asteroidGroup = null;
    this.animId = null;
    this.isDragging = false;
    this.prevMousePos = { x: 0, y: 0 };
    this.rotationSpeed = { x: 0.0005, y: 0.0015 };
    this.targetRotation = { x: 0.2, y: 0 };
    this.currentAsteroids = [];
  }

  init() {
    if (!this.container || typeof THREE === 'undefined') {
      console.warn('[CosmosOrrery3D] Three.js not loaded or container missing');
      return;
    }

    const width = this.container.clientWidth || 600;
    const height = this.container.clientHeight || 450;

    // 1. Scene & Camera
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x030712, 0.004);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(0, 18, 42);
    this.camera.lookAt(0, 0, 0);

    // 2. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0x334155, 1.2);
    this.scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(50, 20, 30);
    this.scene.add(sunLight);

    const cyanRim = new THREE.PointLight(0x06b6d4, 1.5, 60);
    cyanRim.position.set(-30, -10, -20);
    this.scene.add(cyanRim);

    // 4. Starfield
    this.buildStarfield();

    // 5. Earth Globe
    this.buildEarth();

    // 6. Moon & Lunar Orbit
    this.buildMoon();

    // 7. Asteroid Vector Trajectories Group
    this.asteroidGroup = new THREE.Group();
    this.scene.add(this.asteroidGroup);

    // 8. Event Listeners
    this.setupInteractions();

    // 9. Resize Handling
    window.addEventListener('resize', () => this.onWindowResize());

    // 10. Start Animation Loop
    this.animate();
  }

  buildStarfield() {
    const starCount = 1800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      const radius = 120 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);

      const colorVariant = Math.random();
      if (colorVariant > 0.85) {
        colors[i] = 0.5; colors[i + 1] = 0.8; colors[i + 2] = 1.0; // Cyan star
      } else if (colorVariant > 0.70) {
        colors[i] = 1.0; colors[i + 1] = 0.9; colors[i + 2] = 0.6; // Amber star
      } else {
        colors[i] = 0.9; colors[i + 1] = 0.9; colors[i + 2] = 1.0; // White star
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const starPoints = new THREE.Points(geometry, material);
    this.scene.add(starPoints);
  }

  buildEarth() {
    const earthRadius = 6.0;
    const earthGeo = new THREE.SphereGeometry(earthRadius, 48, 48);

    // Procedural sci-fi stylized blue marble shader material
    const earthMat = new THREE.MeshPhongMaterial({
      color: 0x1e3a8a,
      emissive: 0x0f172a,
      specular: 0x38bdf8,
      shininess: 30,
      wireframe: false
    });

    this.earth = new THREE.Mesh(earthGeo, earthMat);
    this.scene.add(this.earth);

    // Coordinate grid ring / Equator
    const ringGeo = new THREE.RingGeometry(earthRadius + 0.1, earthRadius + 0.25, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35
    });
    const equatorRing = new THREE.Mesh(ringGeo, ringMat);
    equatorRing.rotation.x = Math.PI / 2;
    this.earth.add(equatorRing);

    // Atmospheric Glow Halo
    const glowGeo = new THREE.SphereGeometry(earthRadius * 1.15, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.12,
      wireframe: true
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    this.earth.add(glowMesh);
  }

  buildMoon() {
    const moonGeo = new THREE.SphereGeometry(1.6, 24, 24);
    const moonMat = new THREE.MeshLambertMaterial({
      color: 0x94a3b8,
      emissive: 0x1e293b
    });
    this.moon = new THREE.Mesh(moonGeo, moonMat);
    this.scene.add(this.moon);

    // Lunar Orbit Path Circle
    const orbitRadius = 18.0;
    const points = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * orbitRadius, 0, Math.sin(theta) * orbitRadius));
    }
    const orbitGeo = new THREE.BufferGeometry().setFromPoints(points);
    const orbitMat = new THREE.LineDashedMaterial({
      color: 0x64748b,
      dashSize: 1.0,
      gapSize: 0.6,
      transparent: true,
      opacity: 0.5
    });
    this.moonOrbitLine = new THREE.Line(orbitGeo, orbitMat);
    this.moonOrbitLine.computeLineDistances();
    this.scene.add(this.moonOrbitLine);
  }

  updateAsteroids(asteroidsList) {
    if (!this.asteroidGroup) return;
    this.currentAsteroids = asteroidsList;

    // Clear existing asteroid meshes
    while (this.asteroidGroup.children.length > 0) {
      const obj = this.asteroidGroup.children[0];
      this.asteroidGroup.remove(obj);
    }

    if (!asteroidsList || asteroidsList.length === 0) return;

    asteroidsList.forEach((ast, index) => {
      // Scale Lunar Distance to 3D radar space (Earth radius = 6, Moon orbit = 18)
      // 1 LD = 18 units in 3D scene
      const ld = Math.min(15, parseFloat(ast.lunarDist) || 4);
      const sceneDist = Math.max(8, (ld / 2.0) + 7.5);

      const angle = (index / asteroidsList.length) * Math.PI * 2 + (Math.PI / 4);
      const elevation = ((index % 3) - 1) * 3.5;

      const posX = Math.cos(angle) * sceneDist;
      const posY = elevation;
      const posZ = Math.sin(angle) * sceneDist;

      // Asteroid Mesh
      const astGeo = new THREE.DodecahedronGeometry(0.7, 0);
      const isRed = ast.isCloseAlert;
      const astMat = new THREE.MeshStandardMaterial({
        color: isRed ? 0xef4444 : 0xf97316,
        emissive: isRed ? 0x7f1d1d : 0x7c2d12,
        roughness: 0.8
      });
      const astMesh = new THREE.Mesh(astGeo, astMat);
      astMesh.position.set(posX, posY, posZ);

      // Trajectory vector line passing close to Earth
      const trajPoints = [
        new THREE.Vector3(posX * 2.2, posY * 2.0, posZ * 2.2),
        new THREE.Vector3(posX, posY, posZ),
        new THREE.Vector3(posX * -0.6, posY * -0.4, posZ * -0.6)
      ];
      const trajGeo = new THREE.BufferGeometry().setFromPoints(trajPoints);
      const trajMat = new THREE.LineBasicMaterial({
        color: isRed ? 0xef4444 : 0xf97316,
        transparent: true,
        opacity: 0.6
      });
      const trajLine = new THREE.Line(trajGeo, trajMat);

      // Threat distance radius circle
      const circleGeo = new THREE.RingGeometry(0.9, 1.1, 16);
      const circleMat = new THREE.MeshBasicMaterial({
        color: isRed ? 0xef4444 : 0xf97316,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
      });
      const markerRing = new THREE.Mesh(circleGeo, circleMat);
      markerRing.position.copy(astMesh.position);
      markerRing.lookAt(0, 18, 42);

      this.asteroidGroup.add(astMesh);
      this.asteroidGroup.add(trajLine);
      this.asteroidGroup.add(markerRing);
    });
  }

  setupInteractions() {
    this.container.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.prevMousePos = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    this.container.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.prevMousePos.x;
      const deltaY = e.clientY - this.prevMousePos.y;

      this.targetRotation.y += deltaX * 0.005;
      this.targetRotation.x = Math.max(-0.8, Math.min(0.8, this.targetRotation.x + deltaY * 0.005));

      this.prevMousePos = { x: e.clientX, y: e.clientY };
    });

    this.container.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.04;
      this.camera.position.z = Math.max(22, Math.min(85, this.camera.position.z + zoomDelta));
    }, { passive: false });
  }

  onWindowResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    this.animId = requestAnimationFrame(() => this.animate());

    const time = Date.now() * 0.001;

    // Earth axial rotation
    if (this.earth) {
      this.earth.rotation.y += 0.002;
      this.earth.rotation.x = THREE.MathUtils.lerp(this.earth.rotation.x, this.targetRotation.x, 0.05);
      this.earth.rotation.y = THREE.MathUtils.lerp(this.earth.rotation.y, this.targetRotation.y, 0.05);
    }

    // Moon orbital motion (18 units radius)
    if (this.moon) {
      const moonAngle = time * 0.15;
      this.moon.position.x = Math.cos(moonAngle) * 18.0;
      this.moon.position.z = Math.sin(moonAngle) * 18.0;
      this.moon.position.y = Math.sin(moonAngle) * 2.0;
      this.moon.rotation.y += 0.005;
    }

    // Subtle breathing animation for asteroid threat rings
    if (this.asteroidGroup) {
      this.asteroidGroup.children.forEach((child, i) => {
        if (child.isMesh && child.geometry.type === 'DodecahedronGeometry') {
          child.rotation.x += 0.01;
          child.rotation.y += 0.015;
        }
      });
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
    if (this.renderer && this.renderer.domElement) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}

window.cosmosOrrery3D = CosmosOrrery3D;
