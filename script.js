// 1. 딴짓 항목 설정 (이름, 시간, 아이콘)
const activities = [
    { id: 1, icon: '🚽', name: '똥 타임', time: 15, count: 0 },
    { id: 2, icon: '🚬', name: '담배/커피', time: 10, count: 0 },
    { id: 3, icon: '📱', name: 'SNS 루팡', time: 5, count: 0 },
    { id: 4, icon: '🛌', name: '멍 때리기', time: 5, count: 0 },
    { id: 5, icon: '🛍️', name: '쇼핑하기', time: 20, count: 0 },
    { id: 6, icon: '📺', name: '유튜브', time: 10, count: 0 }
];

const salaryInput = document.getElementById('salary');
const resultDiv = document.getElementById('result');

// 2. 화면에 버튼 만들기
function init() {
    const listContainer = document.getElementById('activityList');
    activities.forEach(act => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${act.icon} ${act.name} (+${act.time}분)
            <span class="count-badge" id="badge-${act.id}">0</span>
        `;
        li.onclick = () => handleClick(act.id, li);
        listContainer.appendChild(li);
    });
}

// 3. 버튼 클릭 시 처리
function handleClick(id, element) {
    const activity = activities.find(a => a.id === id);
    activity.count++; // 횟수 증가

    // 배지(빨간 숫자) 업데이트
    const badge = element.querySelector('.count-badge');
    badge.innerText = `x ${activity.count}`;
    badge.classList.add('show');

    // 클릭 효과
    element.classList.add('active');
    setTimeout(() => element.classList.remove('active'), 150);

    calculate(); // 돈 다시 계산
}

// 4. 돈 계산 로직
function calculate() {
    const salaryManwon = parseInt(salaryInput.value);
    if (!salaryManwon || salaryManwon <= 0) return;

    // 전체 딴짓 시간 합계
    const totalMinutes = activities.reduce((sum, act) => sum + (act.time * act.count), 0);

    if (totalMinutes > 0) {
        // 월급을 분급으로 환산 (주 40시간 기준 월 209시간 = 12,540분)
        // 간단하게 월 10,000분 정도로 계산 (한달 근무일 20일 * 8시간 * 60분 = 9600분)
        const salaryWon = salaryManwon * 10000;
        const minuteWage = salaryWon / 9600; 
        const lupinMoney = Math.floor(minuteWage * totalMinutes);

        document.getElementById('totalTime').innerText = totalMinutes;
        document.getElementById('totalMoney').innerText = lupinMoney.toLocaleString();
        resultDiv.classList.remove('hidden');
    }
}

// 5. 공유하기 버튼 기능
function shareLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert("링크가 복사되었습니다! \n카톡방에 붙여넣고 자랑해보세요 ㅋㅋ");
    }).catch(() => {
        alert("복사 실패! 주소창을 직접 복사해주세요.");
    });
}

// 월급 입력할 때도 실시간 계산
salaryInput.addEventListener('input', calculate);

// 시작!
init();