// โค้ดสร้างรูปตัว X แบบมีแอนิเมชันและสีสันสวยงาม

// สร้างฟังก์ชันสำหรับสร้าง HTML และ Canvas
function สร้างรูปX() {
    // สร้างส่วนประกอบหลัก
    const คอนเทนเนอร์ = document.createElement('div');
    คอนเทนเนอร์.style.position = 'relative';
    คอนเทนเนอร์.style.width = '600px';
    คอนเทนเนอร์.style.height = '600px';
    คอนเทนเนอร์.style.margin = '50px auto';
    คอนเทนเนอร์.style.background = 'radial-gradient(circle, #f0f0f0, #d0d0d0)';
    คอนเทนเนอร์.style.borderRadius = '10px';
    คอนเทนเนอร์.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
    คอนเทนเนอร์.style.overflow = 'hidden';
    
    // สร้าง Canvas
    const ผืนผ้าใบ = document.createElement('canvas');
    ผืนผ้าใบ.width = 600;
    ผืนผ้าใบ.height = 600;
    คอนเทนเนอร์.appendChild(ผืนผ้าใบ);
    
    // เพิ่มเข้าไปในหน้าเว็บ
    document.body.appendChild(คอนเทนเนอร์);
    
    // ดึงคอนเทกซ์สำหรับวาด
    const ctx = ผืนผ้าใบ.getContext('2d');
    
    // ตั้งค่าสีและอนิเมชัน
    let เวลา = 0;
    let กำลังวาด = true;
    let ความหนา = 0;
    const ความหนาสูงสุด = 25;
    
    // ฟังก์ชันสำหรับสร้างสีสันแบบไล่ระดับ
    function สร้างสีไล่ระดับ(offset) {
      const สี1 = `hsl(${(เวลา + offset) % 360}, 80%, 60%)`;
      const สี2 = `hsl(${(เวลา + offset + 180) % 360}, 80%, 60%)`;
      return [สี1, สี2];
    }
    
    // ฟังก์ชันวาดเส้นตัว X
    function วาดตัวX() {
      // เคลียร์พื้นที่ Canvas
      ctx.clearRect(0, 0, ผืนผ้าใบ.width, ผืนผ้าใบ.height);
      
      // เพิ่มความหนาจนถึงค่าสูงสุดในช่วงแรก
      if (กำลังวาด && ความหนา < ความหนาสูงสุด) {
        ความหนา += 0.5;
      }
      
      // วาดเส้นทแยงมุมแรก (บนซ้ายไปล่างขวา)
      ctx.beginPath();
      const [สี1, สี2] = สร้างสีไล่ระดับ(0);
      const gradient1 = ctx.createLinearGradient(100, 100, 500, 500);
      gradient1.addColorStop(0, สี1);
      gradient1.addColorStop(1, สี2);
      
      ctx.strokeStyle = gradient1;
      ctx.lineWidth = ความหนา;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 5;
      CSSTransformComponent.
      ctx.shadowOffsetY = 5;
      
      ctx.moveTo(100, 100);
      ctx.lineTo(500, 500);
      ctx.stroke();
      
      // วาดเส้นทแยงมุมที่สอง (บนขวาไปล่างซ้าย)
      ctx.beginPath();
      const [สี3, สี4] = สร้างสีไล่ระดับ(120);
      const gradient2 = ctx.createLinearGradient(500, 100, 100, 500);
      gradient2.addColorStop(0, สี3);
      gradient2.addColorStop(1, สี4);
      
      ctx.strokeStyle = gradient2;
      ctx.moveTo(500, 100);
      ctx.lineTo(100, 500);
      ctx.stroke();
      
      // เพิ่มเอฟเฟ็กต์ประกาย
      for (let i = 0; i < 10; i++) {
        const ขนาด = 8 + Math.sin(เวลา / 10 + i) * 4;
        const องศา = เวลา / 20 + i * Math.PI / 5;
        
        // ประกายตามเส้นแรก
        ctx.fillStyle = `rgba(255, 255, 255, ${0.6 + Math.sin(เวลา / 10 + i) * 0.4})`;
        ctx.beginPath();
        const x1 = 100 + (i / 10) * 400;
        const y1 = 100 + (i / 10) * 400;
        ctx.arc(x1, y1, ขนาด, 0, Math.PI * 2);
        ctx.fill();
        
        // ประกายตามเส้นที่สอง
        ctx.beginPath();
        const x2 = 500 - (i / 10) * 400;
        const y2 = 100 + (i / 10) * 400;
        ctx.arc(x2, y2, ขนาด, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // เพิ่มเวลาสำหรับแอนิเมชัน
      เวลา += 1;
      
      // วนซ้ำวาดภาพใหม่
      requestAnimationFrame(วาดตัวX);
    }
    
    // เริ่มทำการวาด
    วาดตัวX();
    
    return คอนเทนเนอร์;
  }
  
  // เพิ่มสไตล์ให้กับหน้าเพจ
  function ตกแต่งหน้าเพจ() {
    const สไตล์ = document.createElement('style');
    สไตล์.textContent = `
      body {
        background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Kanit', 'Sarabun', sans-serif;
      }
      
      h1 {
        text-align: center;
        color: #333;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
        margin-bottom: 30px;
      }
      
      #คอนเทนเนอร์หลัก {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
      }
    `;
    document.head.appendChild(สไตล์);
    
    // เพิ่มฟอนต์ไทย
    const ลิงก์ฟอนต์ = document.createElement('link');
    ลิงก์ฟอนต์.rel = 'stylesheet';
    ลิงก์ฟอนต์.href = 'https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&family=Sarabun:wght@300;400;600&display=swap';
    document.head.appendChild(ลิงก์ฟอนต์);
    
    // สร้างคอนเทนเนอร์หลัก
    const คอนเทนเนอร์หลัก = document.createElement('div');
    คอนเทนเนอร์หลัก.id = 'คอนเทนเนอร์หลัก';
    document.body.appendChild(คอนเทนเนอร์หลัก);
    
    // เพิ่มชื่อเรื่อง
    const ชื่อเรื่อง = document.createElement('h1');
    ชื่อเรื่อง.textContent = 'รูปตัว X แบบมีแอนิเมชัน';
    คอนเทนเนอร์หลัก.appendChild(ชื่อเรื่อง);
    
    // เพิ่มรูป X ลงในคอนเทนเนอร์หลัก
    คอนเทนเนอร์หลัก.appendChild(สร้างรูปX());
  }
  
  // เรียกใช้ฟังก์ชันเมื่อโหลดหน้าเว็บเสร็จ
  document.addEventListener('DOMContentLoaded', ตกแต่งหน้าเพจ);