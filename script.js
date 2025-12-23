// 딴짓 항목 데이터 (총 11개로 대폭 추가!)
const activities = [
    // 기존 항목
    { id: 1, icon: '🚽', name: '쾌변 타임', time: 15, count: 0 },
    { id: 2, icon: '🚬', name: '흡연/커피', time: 10, count: 0 },
    { id: 3, icon: '📱', name: 'SNS/카톡', time: 5, count: 0 },
    { id: 4, icon: '🤤', name: '멍 때리기', time: 5, count: 0 },
    { id: 5, icon: '🛍️', name: '몰래 쇼핑', time: 20, count: 0 },
    { id: 6, icon: '📉', name: '주식/코인', time: 3, count: 0 },
    
    // 🔥 새로 추가된 재미있는 항목들
    { id: 7, icon: '🌞', name: '광합성 산책', time: 20, count: 0 },
    { id: 8, icon: '⌨️', name: '일하는 척', time: 30, count: 0 },
    { id: 9, icon: '🍪', name: '탕비실 털기', time: 10, count: 0 },
    { id: 10, icon: '🗣️', name: '동료랑 뒷담화', time: 15, count: 0 },
    { id: 11, icon: '🧘', name: '회의 중 딴생각', time: 40, count: 0 }
];

const wageInput = document.getElementById('wageInput');
const unitText = document.getElementById('unitText');
const resultDiv = document.getElementById('result');

// 초기화
function init() {
    const listContainer = document.getElementById('activityList');
    // 기존 리스트 초기화 (중복 방지)
    listContainer.innerHTML = '';
    
    activities.forEach(act => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div style="font-size: 24px; margin-bottom: 5px;">${act.icon}</div>
            <div style="font-weight: bold;">${act.name}</div>
            <div style="font-size:12px; color:#888;">(+${act.time}분)</div>
            <span class="count-badge" id="badge-${act.id}">0</span>
        `;
        li.onclick = () => handleClick(act.id, li);
        listContainer.appendChild(li);
    });
}

// 직장인/알바생 전환 기능
function toggleInput() {
    const type = document.querySelector('input[name="wageType"]:checked').value;
    if (type === 'salary') {
        wageInput.placeholder = "월급(세전)을 만원 단위로 입력 (예: 300)";
        unitText.innerText = "만원";
    } else {
        wageInput.placeholder = "시급을 원 단위로 입력 (예: 9860)";
        unitText.innerText = "원";
    }
    calculate(); // 모드 바꾸면 재계산
}

// 클릭 이벤트
function handleClick(id, element) {
    const activity = activities.find(a => a.id === id);
    activity.count++; 
    
    // 배지 업데이트
    const badge = element.querySelector('.count-badge');
    badge.innerText = `x ${activity.count}`;
    badge.classList.add('show');

    // 클릭 효과 (잠깐 커졌다 작아짐)
    element.classList.add('active');
    setTimeout(() => element.classList.remove('active'), 100);

    calculate();
}

// 계산 로직 (핵심)
function calculate() {
    const wageValue = parseInt(wageInput.value);
    if (!wageValue || wageValue <= 0) return;

    const type = document.querySelector('input[name="wageType"]:checked').value;
    let minuteWage = 0;

    if (type === 'salary') {
        // 월급: (월급 * 10000) / 209시간(약 12,540분)
        minuteWage = (wageValue * 10000) / 12540;
    } else {
        // 시급: 시급 / 60분
        minuteWage = wageValue / 60;
    }

    const totalMinutes = activities.reduce((sum, act) => sum + (act.time * act.count), 0);

    if (totalMinutes > 0) {
        const lupinMoney = Math.floor(minuteWage * totalMinutes);
        document.getElementById('totalTime').innerText = totalMinutes;
        document.getElementById('totalMoney').innerText = lupinMoney.toLocaleString();
        resultDiv.classList.remove('hidden');
    }
}

// 공유하기
function shareLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert("링크 복사 완료! \n이 좋은 걸 너만 알거야? 얼른 공유해! 🤣");
    }).catch(() => alert("주소창을 직접 복사해주세요 ㅠㅠ"));
}

wageInput.addEventListener('input', calculate);
init();