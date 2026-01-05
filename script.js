// ========== 轮播图功能 ==========
let currentSlide = 0;
let autoSlideInterval;
// 初始化轮播图
function initCarousel() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  // 移动幻灯片
  const slideContainer = document.querySelector('.carousel-slides');
  slideContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
  // 更新指示点
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}
// 下一张幻灯片
function nextSlide() {
  const slides = document.querySelectorAll('.slide');
  currentSlide = (currentSlide + 1) % slides.length;
  initCarousel();
  resetAutoSlide();
}
// 上一张幻灯片
function prevSlide() {
  const slides = document.querySelectorAll('.slide');
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  initCarousel();
  resetAutoSlide();
}
// 跳转到指定幻灯片
function goToSlide(index) {
  currentSlide = index;
  initCarousel();
  resetAutoSlide();
}
// 自动轮播
function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 4000); // 4秒切换一次
}
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}
// 页面加载时初始化轮播图
window.addEventListener('load', () => {
  initCarousel();
  startAutoSlide();
  // 鼠标悬停时暂停轮播
  const carousel = document.querySelector('.carousel-container');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => {
      clearInterval(autoSlideInterval);
    });
    carousel.addEventListener('mouseleave', () => {
      startAutoSlide();
    });
  }
});
// 键盘控制（可选功能）
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    prevSlide();
  } else if (e.key === 'ArrowRight') {
    nextSlide();
  }
});

    /* ========== JavaScript 功能 ========== */
    // 简单的页面切换功能
    function showPage(pageId) {
      // 获取所有页面
      const pages = document.querySelectorAll('.page');
      // 隐藏所有页面
      pages.forEach(page => {
        page.classList.remove('active-page');
      });
      // 显示目标页面
      const targetPage = document.getElementById(pageId);
      if (targetPage) {
        targetPage.classList.add('active-page');
      }
      // 滚动到顶部
      window.scrollTo(0, 0);
    }

    // 城市推荐功能
    function recommendCity() {
        // 获取用户选择的兴趣
      const interest = document.getElementById('interest').value;
      // 获取用户选择的季节
      const season = document.getElementById('season').value;
      // 获取用户选择的行程天数
      const days = document.getElementById('days').value;
      // 城市数据
      const cityData = {
        culture: { 
          name: "Madrid", 
          tag: "博物馆之都", 
          detail: "拥有普拉多博物馆，是欧洲艺术的殿堂。"
        },
        beach: { 
          name: "Barcelona", 
          tag: "高迪之城", 
          detail: "圣家堂与地中海海滩的完美融合。"
        },
        sports: { 
          name: "Seville", 
          tag: "热情的安达卢西亚", 
          detail: "不仅有足球，还有最正宗的塞维利亚双年展。"
        },
        history: { 
          name: "Toledo", 
          tag: "三种文化之都", 
          detail: "基督教、伊斯兰教与犹太教和谐共处的历史古城。"
        }
      };
      // 获取结果显示区域的DOM元素
      const resultDiv = document.getElementById('recommend-result');
      // 检查是否选择了兴趣
      if (!interest) {
         // 显示错误提示
        resultDiv.innerHTML = '<p style="color: #c62828; margin-top: 20px;">请先选择您的兴趣！</p>';
        return;// 结束函数执行
      }
       // 根据兴趣获取对应的城市数据
      const city = cityData[interest];
      if (city) {
        // 构建推荐信息
        let message = `
          <div class="result-card">
            <h4>推荐城市：${city.name}</h4>
            <span class="badge">${city.tag}</span>
            <p>${city.detail}</p>
        `;
        // 添加季节建议
        if (season) {
          message += `<p><strong>最佳季节：</strong>${season}是最佳游览时间</p>`;
        }
        // 添加行程建议
        if (days) {
          message += `<p><strong>建议行程：</strong>${days}的深度游最为合适</p>`;
        }
        message += '</div>';
         // 将生成的HTML插入到页面中
        resultDiv.innerHTML = message;
      }
       else {
        // 如果没有找到匹配的城市
        resultDiv.innerHTML = '<p style="color: #c62828; margin-top: 20px;">未找到匹配的城市推荐。</p>';
      }
    }
    // 页面加载时显示首页
    window.onload = function() {
      showPage('home');
    }