const vehicleDetails = {
    falcon9: {
        type: 'Reusable launch vehicle',
        name: 'Falcon 9',
        summary: 'Falcon 9 是 SpaceX 最成熟的主力运载火箭。它真正改变行业的地方，是让一级火箭完成任务后回到地面或海上平台，经过检查和翻新后再次飞行。',
        features: ['一级火箭可回收复用', '承担卫星、星链、货运和载人发射', '高频发射推动流程持续优化', '让火箭重复使用更接近日常运营'],
        useCases: ['商业卫星发射', 'Starlink 卫星部署', '国际空间站补给', 'Crew Dragon 载人发射']
    },
    falconHeavy: {
        type: 'Heavy-lift rocket',
        name: 'Falcon Heavy',
        summary: 'Falcon Heavy 可以理解为把三枚 Falcon 9 的一级核心级组合在一起，获得更强的推力。它适合把更重的载荷送往更高能量的轨道。',
        features: ['三芯并联构型', '适合重型载荷和高能轨道任务', '侧助推器具备回收能力', '是 Falcon 体系向大运力任务的延伸'],
        useCases: ['大型通信卫星', '深空科学载荷', '政府与国防任务', '高能轨道转移']
    },
    starship: {
        type: 'Fully reusable system',
        name: 'Starship',
        summary: 'Starship 是 SpaceX 面向下一阶段的核心项目。它追求整个系统完全复用，并通过更大的体积和载荷能力，让月球基地、火星运输和大规模轨道建设成为可讨论的工程问题。',
        features: ['Super Heavy 助推器与 Starship 飞船组合', '目标是完全可重复使用', '面向大载荷和深空运输', '仍处在快速测试和迭代阶段'],
        useCases: ['月球任务', '火星运输', '大载荷入轨', '未来轨道加注与补给']
    },
    dragon: {
        type: 'Crew and cargo spacecraft',
        name: 'Dragon',
        summary: 'Dragon 是 SpaceX 的近地轨道飞船系统，能把人员和货物送往国际空间站，也能把人员、实验样品和设备带回地球。',
        features: ['支持自动对接空间站', '拥有载人和货运版本', '可返回地球并回收', '把商业公司带入载人航天交通体系'],
        useCases: ['国际空间站人员往返', '空间站货运补给', '科学实验运输', '商业载人任务']
    }
};

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const dialog = document.getElementById('detailDialog');
const detailContent = document.getElementById('detailContent');
const dialogClose = document.querySelector('.dialog-close');

function setNav(open) {
    navToggle.setAttribute('aria-expanded', String(open));
    navLinks.classList.toggle('is-open', open);
}

function openDetail(key) {
    const detail = vehicleDetails[key];
    if (!detail) return;

    detailContent.innerHTML = `
        <header class="detail-header">
            <p>${detail.type}</p>
            <h2>${detail.name}</h2>
        </header>
        <div class="detail-body">
            <p>${detail.summary}</p>
            <div class="detail-columns">
                <section>
                    <h3>关键看点</h3>
                    <ul>${detail.features.map(item => `<li>${item}</li>`).join('')}</ul>
                </section>
                <section>
                    <h3>典型任务</h3>
                    <ul>${detail.useCases.map(item => `<li>${item}</li>`).join('')}</ul>
                </section>
            </div>
        </div>
    `;

    if (typeof dialog.showModal === 'function') {
        dialog.showModal();
    } else {
        dialog.setAttribute('open', '');
    }

    document.body.classList.add('is-locked');
}

function closeDetail() {
    if (dialog.open && typeof dialog.close === 'function') {
        dialog.close();
    } else {
        dialog.removeAttribute('open');
    }

    document.body.classList.remove('is-locked');
}

navToggle.addEventListener('click', () => {
    setNav(navToggle.getAttribute('aria-expanded') !== 'true');
});

document.querySelectorAll('.nav-links a, .brand, .hero-actions a').forEach(link => {
    link.addEventListener('click', () => setNav(false));
});

document.querySelectorAll('[data-detail]').forEach(button => {
    button.addEventListener('click', () => openDetail(button.dataset.detail));
});

dialogClose.addEventListener('click', closeDetail);

dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    const clickedOutside = event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom;

    if (clickedOutside) closeDetail();
});

dialog.addEventListener('close', () => {
    document.body.classList.remove('is-locked');
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.16 });

document.querySelectorAll('.vehicle-card, .timeline article, .impact-grid article, .concept-grid article').forEach(item => {
    observer.observe(item);
});
