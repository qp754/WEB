const parkingLot = document.getElementById('parkingLot');

// ฟังก์ชันเพื่อดึงข้อมูลจาก API
async function fetchParkingData() {
    try {
        const response = await fetch('http://localhost:3000/api/parking');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        renderParkingLot(data);
    } catch (error) {
        console.error('Error fetching parking data:', error);
    }
}

// ฟังก์ชันเพื่อแสดงข้อมูลในหน้าเว็บ
function renderParkingLot(parkingData) {
    parkingLot.innerHTML = ''; // เคลียร์พื้นที่ก่อนหน้า
    parkingData.forEach(space => {
        const div = document.createElement('div');
        div.className = 'parking-space' + (space.occupied ? ' occupied' : '');
        div.innerText = space.occupied ? 'รถจอด' : 'ว่าง';
        parkingLot.appendChild(div);
    });
}

// เรียกใช้ฟังก์ชันเมื่อโหลดหน้า
fetchParkingData();