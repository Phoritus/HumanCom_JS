// Avatar-Themed Animated X
// Inspired by the bioluminescent and natural elements from the movie Avatar

// Create main function to initialize the animation
function createAvatarX() {
	// Create container
	const container = document.createElement('div');
	container.style.position = 'relative';
	container.style.width = '600px';
	container.style.height = '600px';
	container.style.margin = '50px auto';
	container.style.background = 'linear-gradient(to bottom, #041E42, #051024)'; // Deep Pandora night sky
	container.style.borderRadius = '10px';
	container.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
	container.style.overflow = 'hidden';
	
	// Create Canvas
	const canvas = document.createElement('canvas');
	canvas.width = 600;
	canvas.height = 600;
	container.appendChild(canvas);
	
	// Add to page
	document.body.appendChild(container);
	
	// Get drawing context
	const ctx = canvas.getContext('2d');
	
	// Particles array for bioluminescent effect
	const particles = [];
	const particleCount = 200;
	
	// Initialize particles
	for (let i = 0; i < particleCount; i++) {
	  particles.push({
		x: Math.random() * canvas.width,
		y: Math.random() * canvas.height,
		size: Math.random() * 3 + 1,
		speedX: Math.random() * 1 - 0.5,
		speedY: Math.random() * 1 - 0.5,
		color: `rgba(${32 + Math.random() * 30}, ${180 + Math.random() * 75}, ${200 + Math.random() * 55}, ${0.4 + Math.random() * 0.6})` // Bioluminescent blue
	  });
	}
	
	// Animation variables
	let time = 0;
	let lineThickness = 0;
	const maxLineThickness = 20;
	let growing = true;
	
	// Create bioluminescent gradient for X lines
	function createAvatarGradient(x1, y1, x2, y2, colorOffset) {
	  const grad = ctx.createLinearGradient(x1, y1, x2, y2);
	  // Main Avatar blues and teals
	  grad.addColorStop(0, `rgba(${32 + colorOffset}, ${200 + Math.sin(time/10) * 55}, ${255}, ${0.8})`);
	  grad.addColorStop(0.5, `rgba(${20 + colorOffset}, ${160 + Math.sin(time/15) * 40}, ${220}, ${0.9})`);
	  grad.addColorStop(1, `rgba(${10 + colorOffset}, ${120 + Math.sin(time/20) * 30}, ${190}, ${0.8})`);
	  return grad;
	}
	
	// Draw tree of souls effect
	function drawTreeOfSouls(x, y, length, angle, depth) {
	  if (depth <= 0) return;
	  
	  const endX = x + Math.cos(angle) * length;
	  const endY = y + Math.sin(angle) * length;
	  
	  // Draw branch
	  ctx.beginPath();
	  ctx.strokeStyle = `rgba(200, 255, 230, ${0.3 + Math.sin(time/20) * 0.2})`;
	  ctx.lineWidth = depth * 0.5;
	  ctx.moveTo(x, y);
	  ctx.lineTo(endX, endY);
	  ctx.stroke();
	  
	  // Draw white dot at end to simulate seed
	  if (depth <= 2) {
		ctx.beginPath();
		ctx.fillStyle = `rgba(220, 255, 240, ${0.7 + Math.sin(time/10 + depth) * 0.3})`;
		ctx.arc(endX, endY, 2, 0, Math.PI * 2);
		ctx.fill();
	  }
	  
	  // Recursively draw smaller branches
	  const branchAngle = 0.3 + Math.sin(time/50) * 0.1;
	  drawTreeOfSouls(endX, endY, length * 0.7, angle + branchAngle, depth - 1);
	  drawTreeOfSouls(endX, endY, length * 0.7, angle - branchAngle, depth - 1);
	}
	
	// Main animation function
	function animate() {
	  // Clear canvas
	  ctx.fillStyle = 'rgba(4, 30, 66, 0.2)'; // Semi-transparent background for trail effect
	  ctx.fillRect(0, 0, canvas.width, canvas.height);
	  
	  // Draw floating spirit seeds (particles)
	  for (let i = 0; i < particles.length; i++) {
		const p = particles[i];
		
		// Move particles
		p.x += p.speedX;
		p.y += p.speedY;
		
		// Wrap around edges
		if (p.x > canvas.width) p.x = 0;
		if (p.x < 0) p.x = canvas.width;
		if (p.y > canvas.height) p.y = 0;
		if (p.y < 0) p.y = canvas.height;
		
		// Draw particle
		ctx.beginPath();
		ctx.fillStyle = p.color;
		ctx.arc(p.x, p.y, p.size * (0.5 + Math.sin(time/10 + i) * 0.5), 0, Math.PI * 2);
		ctx.fill();
	  }
	  
	  // Handle growing/shrinking animation
	  if (growing) {
		lineThickness += 0.3;
		if (lineThickness >= maxLineThickness) {
		  growing = false;
		}
	  } else {
		lineThickness -= 0.1;
		if (lineThickness <= maxLineThickness * 0.7) {
		  growing = true;
		}
	  }
	  
	  // Draw the main X with Avatar-style bioluminescent glow
	  
	  // First diagonal (top-left to bottom-right)
	  ctx.beginPath();
	  ctx.strokeStyle = createAvatarGradient(100, 100, 500, 500, 0);
	  ctx.lineWidth = lineThickness;
	  ctx.lineCap = 'round';
	  ctx.lineJoin = 'round';
	  ctx.shadowColor = 'rgba(100, 220, 255, 0.8)';
	  ctx.shadowBlur = 15 + Math.sin(time/10) * 5;
	  ctx.shadowOffsetX = 0;
	  ctx.shadowOffsetY = 0;
	  
	  ctx.moveTo(100, 100);
	  ctx.lineTo(500, 500);
	  ctx.stroke();
	  
	  // Second diagonal (top-right to bottom-left)
	  ctx.beginPath();
	  ctx.strokeStyle = createAvatarGradient(500, 100, 100, 500, 30);
	  ctx.moveTo(500, 100);
	  ctx.lineTo(100, 500);
	  ctx.stroke();
	  
	  // Draw some Tree of Souls style elements near the X
	  ctx.shadowBlur = 0;
	  drawTreeOfSouls(300, 300, 30, 0, 3);
	  drawTreeOfSouls(300, 300, 30, Math.PI/2, 3);
	  drawTreeOfSouls(300, 300, 30, Math.PI, 3);
	  drawTreeOfSouls(300, 300, 30, Math.PI*3/2, 3);
	  
	  // Update time
	  time += 0.5;
	  
	  // Continue animation
	  requestAnimationFrame(animate);
	}
	
	// Start animation
	animate();
	
	return container;
  }
  
  // Style the page
  function setupPage() {
	// Add styles
	const style = document.createElement('style');
	style.textContent = `
	  body {
		background: #000;
		margin: 0;
		padding: 0;
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: 'Avenir Next', 'Arial', sans-serif;
		color: #fff;
		overflow: hidden;
	  }
	  
	  h1 {
		position: absolute;
		top: 20px;
		text-align: center;
		color: #8DF9FF;
		font-size: 28px;
		text-transform: uppercase;
		letter-spacing: 4px;
		text-shadow: 0 0 10px rgba(140, 230, 255, 0.8);
		width: 100%;
	  }
	  
	  #main-container {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	  }
	  
	  /* Na'vi language style markings */
	  .navi-marks {
		position: absolute;
		font-family: monospace;
		color: rgba(100, 200, 255, 0.3);
		transform: rotate(90deg);
		font-size: 14px;
	  }
	`;
	document.head.appendChild(style);
	
	// Create main container
	const mainContainer = document.createElement('div');
	mainContainer.id = 'main-container';
	document.body.appendChild(mainContainer);
	
	// Add title
	const title = document.createElement('h1');
	title.textContent = 'Animated X - Avatar Theme';
	mainContainer.appendChild(title);
	
	// Add some Na'vi-style decorative marks
	for (let i = 0; i < 8; i++) {
	  const mark = document.createElement('div');
	  mark.className = 'navi-marks';
	  mark.textContent = '| | • – • | | • – • |';
	  mark.style.left = (i * 15) + '%';
	  mark.style.top = (30 + Math.random() * 40) + '%';
	  mark.style.opacity = 0.2 + Math.random() * 0.3;
	  mainContainer.appendChild(mark);
	}
	
	// Add the X
	mainContainer.appendChild(createAvatarX());
  }
  
  // Run when page loads
  document.addEventListener('DOMContentLoaded', setupPage);