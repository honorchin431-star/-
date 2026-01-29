// 每日灵感数据
const inspirations = [
    "剪辑的本质是删减，去掉一切不必要的东西。",
    "好的剪辑应该由情绪驱动，而不是单纯的技术堆砌。",
    "声音占据了视频体验的 50%，请不要忽视音效设计。",
    "每一个镜头都应该有存在的理由。",
    "节奏就是心跳，让你的视频跟随观众的心跳律动。",
    "模仿是学习的开始，但在模仿中寻找自己的风格。",
    "看不见的剪辑才是最好的剪辑。"
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. 初始化每日灵感
    const tipElement = document.getElementById('daily-tip');
    const randomTip = inspirations[Math.floor(Math.random() * inspirations.length)];
    tipElement.textContent = `"${randomTip}"`;

    // 2. 启动入场动画
    revealCards();

    // 3. 初始化折叠面板 (Accordion)
    initAccordion();

    // 4. 初始化阅读进度条
    initProgressBar();
});

// 入场动画：顺序滑入并淡入
function revealCards() {
    const cards = document.querySelectorAll('.level-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('enter');
        }, 120 * index);
    });
}

// 折叠面板逻辑
function initAccordion() {
    const accordions = document.querySelectorAll('.accordion-item');

    accordions.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // 切换当前项的状态
            const isActive = item.classList.contains('active');
            
            // 关闭其他所有项（手风琴效果：一次只展开一个）
            accordions.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // 切换当前项
            if (!isActive) {
                item.classList.add('active');
                const content = item.querySelector('.accordion-content');
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                item.classList.remove('active');
                item.querySelector('.accordion-content').style.maxHeight = null;
            }
        });
    });
}

// 阅读进度条逻辑
function initProgressBar() {
    const progressBar = document.getElementById('reading-progress');
    
    window.addEventListener('scroll', () => {
        // 页面总高度 - 视窗高度 = 可滚动的总距离
        const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollCurrent = document.documentElement.scrollTop;
        
        if (scrollTotal > 0) {
            const scrollPercentage = (scrollCurrent / scrollTotal) * 100;
            progressBar.style.width = scrollPercentage + '%';
        }
    });
}
