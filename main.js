document.addEventListener('DOMContentLoaded', () => {
  initMainProductSlider(); // Khởi tạo slider chính với thumbnails
  initNutritionModal(); // Khởi tạo modal dinh dưỡng
  initGeneralAccordions(); // Khởi tạo các accordion chung
  initProductOptions(); // Khởi tạo lựa chọn sản phẩm
  initIngredientCards(); // Khởi tạo thẻ thành phần
  initReviewForm(); // Khởi tạo biểu mẫu đánh giá
  initReviewSlider(); // Khởi tạo slider đánh giá
  initVideoTriggers(); // Khởi tạo trình kích hoạt video
  initFaqAccordion(); // Khởi tạo accordion FAQ
});

// 1. MAIN PRODUCT SLIDER WITH THUMBNAILS
function initMainProductSlider() {
  const mainTrack = document.getElementById("mainTrack");
  const thumbTrack = document.getElementById("thumbTrack");
  const nextBtn = document.querySelector(".right-6");
  const prevBtn = document.querySelector(".left-6");

  if (!mainTrack || !thumbTrack) return;

  const slides = mainTrack.children;
  const thumbsBtn = thumbTrack.querySelectorAll(".thumb");
  let index = 0;
  const maxIndex = slides.length - 1;

  const getMainOffset = () => {
    const gap = parseFloat(getComputedStyle(mainTrack).gap) || 0;
    return slides[0].offsetWidth + gap;
  };

  const getThumbOffset = () => {
    const gap = parseFloat(getComputedStyle(thumbTrack).gap) || 0;
    return thumbsBtn[0].offsetWidth + gap;
  };

  const updateSlider = () => {
    // Di chuyển Main Slider
    const mainOffset = getMainOffset();
    mainTrack.style.transform = `translate3d(-${index * mainOffset}px, 0, 0)`;

    // Di chuyển Thumb Slider
    const visibleThumbs = 4;
    const thumbOffset = getThumbOffset();
    const maxThumbOffset = (thumbsBtn.length - visibleThumbs) * thumbOffset;
    
    // Đảm bảo không cuộn quá giới hạn
    const offset = Math.min(index * thumbOffset, maxThumbOffset);
    
    thumbTrack.style.transform = `translate3d(-${offset}px, 0, 0)`;
  };

  // Lắp sự kiện cho các nút
  if (nextBtn) {
    nextBtn.onclick = () => {
      if (index < maxIndex) {
        index++;
        updateSlider();
      }
    };
  }

  if (prevBtn) {
    prevBtn.onclick = () => {
      if (index > 0) {
        index--;
        updateSlider();
      }
    };
  }

  thumbsBtn.forEach((btn, i) => {
    btn.onclick = () => {
      index = i;
      updateSlider();
    };
  });

  window.addEventListener("resize", updateSlider);
  
  // Khởi tạo lần đầu
  updateSlider();
}

// 2. NUTRITION MODAL
function initNutritionModal() {
  const nutriBtns = document.querySelectorAll(".nutri-btn");
  const modal = document.getElementById("nutritionModal");
  const closeBtn = document.getElementById("closeNutrition");

  if (!modal) return;

  // Hàm bật/tắt modal
  const toggleModal = (show) => {
    if (show) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      document.body.style.overflow = "hidden";
    } else {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.body.style.overflow = "";
    }
  };

  nutriBtns.forEach(btn => btn.addEventListener("click", () => toggleModal(true)));
  
  if (closeBtn) closeBtn.addEventListener("click", () => toggleModal(false));
  
  modal.addEventListener("click", e => {
    if (e.target === modal) toggleModal(false);
  });
}

// 3. GENERAL ACCORDIONS
function initGeneralAccordions() {
  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = item.querySelector('.accordion-content');
      const icon = item.querySelector('img');
      const title = item.querySelector('p');
      const isActive = item.classList.contains('active');

      if (isActive) {
        // Đóng
        item.classList.remove('active', 'border-[#039869]');
        item.classList.add('border-[#d2d2d2]');
        
        icon.classList.remove('rotate-45');
        icon.classList.add('rotate-0');
        
        title.classList.remove('text-[#039869]');
        title.classList.add('text-black');
        
        content.classList.remove('grid-rows-[1fr]');
        content.classList.add('grid-rows-[0fr]');
      } else {
        // Mở
        item.classList.add('active', 'border-[#039869]');
        item.classList.remove('border-[#d2d2d2]');
        
        icon.classList.remove('rotate-0');
        icon.classList.add('rotate-45');
        
        title.classList.remove('text-black');
        title.classList.add('text-[#039869]');
        
        content.classList.remove('grid-rows-[0fr]');
        content.classList.add('grid-rows-[1fr]');
      }
    });
  });
}

// 4. PRODUCT OPTIONS SELECTION
function initProductOptions() {
  const options = document.querySelectorAll('.product-option');
  const shippingTexts = document.querySelectorAll('.shipping-text');

  options.forEach(option => {
    option.addEventListener('click', () => {
      const selectedId = option.getAttribute('data-id');

      // Khởi tạo lại tất cả
      options.forEach(opt => {
        opt.classList.remove('active', 'opacity-100');
        opt.classList.add('opacity-60');
        
        const dot = opt.querySelector('.option-dot');
        const radioWrapper = opt.querySelector('.option-radio-wrapper');
        
        if (dot) {
            dot.classList.remove('block');
            dot.classList.add('hidden');
        }
        if (radioWrapper) {
            radioWrapper.classList.remove('border-[#039869]');
            radioWrapper.classList.add('border-[#d2d2d2]');
        }
      });

      // Kích hoạt lựa chọn hiện tại
      option.classList.add('active', 'opacity-100');
      option.classList.remove('opacity-60');

      const activeDot = option.querySelector('.option-dot');
      const activeRadioWrapper = option.querySelector('.option-radio-wrapper');

      if (activeDot) {
          activeDot.classList.remove('hidden');
          activeDot.classList.add('block');
      }
      if (activeRadioWrapper) {
          activeRadioWrapper.classList.remove('border-[#d2d2d2]');
          activeRadioWrapper.classList.add('border-[#039869]');
      }

      // Cập nhật văn bản vận chuyển
      shippingTexts.forEach(text => {
        if (text.getAttribute('data-target') === selectedId) {
          text.classList.remove('hidden');
        } else {
          text.classList.add('hidden');
        }
      });
    });
  });
}

// 5. INGREDIENT CARDS TOGGLE
function initIngredientCards() {
  const cards = document.querySelectorAll('.ingredient-card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const content = card.querySelector('.content-wrapper');
      if (!content) return;

      const isOpen = content.classList.contains('grid-rows-[1fr]');

      if (isOpen) {
        content.classList.remove('grid-rows-[1fr]');
        content.classList.add('grid-rows-[0fr]');
      } else {
        content.classList.remove('grid-rows-[0fr]');
        content.classList.add('grid-rows-[1fr]');
      }
    });
  });
}

// 6. REVIEW FORM TOGGLE
function initReviewForm() {
  const toggleBtn = document.getElementById('toggle-review-btn');
  const formWrapper = document.getElementById('review-form-wrapper');
  const internalCancelBtn = document.getElementById('btn-cancel-internal');

  if (!toggleBtn || !formWrapper) return;

  const toggleForm = () => {
    const isOpen = formWrapper.classList.contains('grid-rows-[1fr]');

    if (isOpen) {
      // Đóng
      formWrapper.classList.remove('grid-rows-[1fr]');
      formWrapper.classList.add('grid-rows-[0fr]');
      
      toggleBtn.textContent = "Write a review";
      toggleBtn.classList.add('bg-[#FA8A8A]', 'text-white');
      toggleBtn.classList.remove('bg-white', '!text-[#fa8a8a]');
    } else {
      // Mở
      formWrapper.classList.remove('grid-rows-[0fr]');
      formWrapper.classList.add('grid-rows-[1fr]');
      
      toggleBtn.textContent = "Cancel Review";
      toggleBtn.classList.add('bg-white', '!text-[#fa8a8a]');
      toggleBtn.classList.remove('bg-[#FA8A8A]', 'text-white');
    }
  };

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleForm();
  });

  if (internalCancelBtn) {
    internalCancelBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleForm(); 
    });
  }
}

// 7. REVIEW SLIDER
function initReviewSlider() {
  const track = document.getElementById('slider-track');
  if (!track) return;

  const slides = document.querySelectorAll('.slide-item');
  const btnPrev = document.getElementById('prev-slide-btn');
  const btnNext = document.getElementById('next-slide-btn');
  const dots = document.querySelectorAll('.dot-btn');

  let currentIndex = 0;
  let slideWidth = 0;
  let visibleSlides = 1;

  const updateDimensions = () => {
    if (slides.length > 0) {
      slideWidth = slides[0].offsetWidth;
      visibleSlides = window.innerWidth >= 768 ? 4 : 1;
    }
  };

  const moveSlider = (index) => {
    const maxIndex = Math.max(0, slides.length - visibleSlides);
    
    // Chọn lọc chỉ số hợp lệ
    if (index < 0) index = 0;
    if (index > maxIndex) index = maxIndex;

    currentIndex = index;
    track.style.transform = `translate3d(-${currentIndex * slideWidth}px, 0, 0)`;

    // Cập nhật trạng thái các chấm
    dots.forEach((dot, i) => {
        const isActive = i === currentIndex;
        dot.classList.toggle('!bg-[#039869]', isActive);
        dot.classList.toggle('!bg-[#00000026]', !isActive);
    });
  };

  if (btnNext) {
    btnNext.addEventListener('click', () => moveSlider(currentIndex + 1));
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => moveSlider(currentIndex - 1));
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => moveSlider(index));
  });

  window.addEventListener('resize', () => {
    updateDimensions();
    moveSlider(currentIndex);
  });

  // Init
  updateDimensions();
}

// 8. VIDEO TRIGGERS
function initVideoTriggers() {
  const videoTriggers = document.querySelectorAll('.video-trigger');

  videoTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const video = this.querySelector('video');
      const playIcon = this.querySelector('.play-icon');

      if (!video) return;

      // Tạm dừng tất cả các video khác
      document.querySelectorAll('video').forEach(vid => {
        if (vid !== video) {
          vid.pause();
          const otherIcon = vid.parentElement.querySelector('.play-icon');
          if (otherIcon) otherIcon.style.display = 'block';
        }
      });

      if (video.paused) {
        video.play();
        video.controls = false; 
        if (playIcon) playIcon.style.display = 'none';
      } else {
        video.pause();
        video.controls = false;
        if (playIcon) playIcon.style.display = 'block';
      }
    });
  });
}

// 9. FAQ ACCORDION
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const content = item.querySelector('.faq-content');
      const icon = item.querySelector('.faq-icon');
      const isOpen = content.classList.contains('grid-rows-[1fr]');

      if (isOpen) {
        content.classList.remove('grid-rows-[1fr]');
        content.classList.add('grid-rows-[0fr]');
        
        if(icon) {
            icon.classList.remove('rotate-180');
            icon.classList.add('rotate-0');
        }
        item.classList.remove('active');
      } else {
        content.classList.remove('grid-rows-[0fr]');
        content.classList.add('grid-rows-[1fr]');
        
        if(icon) {
            icon.classList.remove('rotate-0');
            icon.classList.add('rotate-180');
        }
        item.classList.add('active');
      }
    });
  });
}