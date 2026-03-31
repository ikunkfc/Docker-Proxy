/**
 * 移动端菜单交互脚本
 * 处理移动端导航菜单和侧边栏的显示/隐藏
 */

(function() {
    'use strict';
    
    // 等待 DOM 加载完成
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        initAdminSidebar();
        handleOrientationChange();
        optimizeTouchEvents();
    });
    
    /**
     * 初始化主页面的移动端菜单
     */
    function initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!menuToggle || !navMenu) return;
        
        // 点击菜单按钮切换菜单显示
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            
            // 更新按钮图标
            const icon = this.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });
        
        // 点击菜单项后关闭菜单
        const menuItems = navMenu.querySelectorAll('.nav-list a');
        menuItems.forEach(function(item) {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-bars';
                    }
                }
            });
        });
        
        // 点击页面其他地方关闭菜单
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-bars';
                    }
                }
            }
        });
    }
    
    /**
     * 初始化管理面板的移动端侧边栏
     */
    function initAdminSidebar() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) return;
        
        // 创建移动端菜单切换按钮
        if (window.innerWidth <= 768) {
            createMobileMenuToggle();
            createSidebarOverlay();
        }
        
        // 监听窗口大小变化
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth <= 768) {
                    if (!document.querySelector('.mobile-menu-toggle')) {
                        createMobileMenuToggle();
                        createSidebarOverlay();
                    }
                } else {
                    removeMobileElements();
                    sidebar.classList.remove('active');
                }
            }, 250);
        });
    }
    
    /**
     * 创建移动端菜单切换按钮
     */
    function createMobileMenuToggle() {
        if (document.querySelector('.mobile-menu-toggle')) return;
        
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mobile-menu-toggle';
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        toggleBtn.setAttribute('aria-label', '切换菜单');
        
        toggleBtn.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            const overlay = document.querySelector('.sidebar-overlay');
            
            if (sidebar && overlay) {
                sidebar.classList.toggle('active');
                overlay.classList.toggle('active');
                
                // 更新图标
                const icon = this.querySelector('i');
                if (icon) {
                    if (sidebar.classList.contains('active')) {
                        icon.className = 'fas fa-times';
                    } else {
                        icon.className = 'fas fa-bars';
                    }
                }
            }
        });
        
        document.body.appendChild(toggleBtn);
    }
    
    /**
     * 创建侧边栏遮罩层
     */
    function createSidebarOverlay() {
        if (document.querySelector('.sidebar-overlay')) return;
        
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        
        overlay.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            const toggleBtn = document.querySelector('.mobile-menu-toggle');
            
            if (sidebar) {
                sidebar.classList.remove('active');
                this.classList.remove('active');
                
                if (toggleBtn) {
                    const icon = toggleBtn.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-bars';
                    }
                }
            }
        });
        
        document.body.appendChild(overlay);
    }
    
    /**
     * 移除移动端元素
     */
    function removeMobileElements() {
        const toggleBtn = document.querySelector('.mobile-menu-toggle');
        const overlay = document.querySelector('.sidebar-overlay');
        
        if (toggleBtn) toggleBtn.remove();
        if (overlay) overlay.remove();
    }
    
    /**
     * 处理屏幕方向变化
     */
    function handleOrientationChange() {
        window.addEventListener('orientationchange', function() {
            // 方向改变时关闭所有打开的菜单
            const navMenu = document.querySelector('.nav-menu');
            const sidebar = document.querySelector('.sidebar');
            const overlay = document.querySelector('.sidebar-overlay');
            
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            
            if (sidebar) {
                sidebar.classList.remove('active');
            }
            
            if (overlay) {
                overlay.classList.remove('active');
            }
            
            // 重置菜单按钮图标
            const menuToggle = document.querySelector('.menu-toggle');
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
            
            if (mobileToggle) {
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });
    }
    
    /**
     * 优化触摸事件
     */
    function optimizeTouchEvents() {
        // 为所有按钮添加触摸反馈
        const buttons = document.querySelectorAll('button, .btn, .tab, .registry-tab');
        
        buttons.forEach(function(button) {
            button.addEventListener('touchstart', function() {
                this.style.opacity = '0.7';
            }, { passive: true });
            
            button.addEventListener('touchend', function() {
                this.style.opacity = '1';
            }, { passive: true });
            
            button.addEventListener('touchcancel', function() {
                this.style.opacity = '1';
            }, { passive: true });
        });
        
        // 优化滚动性能
        const scrollElements = document.querySelectorAll('.nav-list, .registry-tabs, #documentationText, .tag-table');
        
        scrollElements.forEach(function(element) {
            element.style.webkitOverflowScrolling = 'touch';
        });
    }
    
    /**
     * 防止iOS双击缩放
     */
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });
    
    /**
     * 优化输入框焦点处理（防止iOS自动缩放）
     */
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(function(input) {
        input.addEventListener('focus', function() {
            if (window.innerWidth <= 768) {
                // 滚动到输入框位置
                setTimeout(function() {
                    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        });
    });
    
})();

// 导出函数供外部使用
window.MobileMenu = {
    /**
     * 关闭所有打开的菜单
     */
    closeAllMenus: function() {
        const navMenu = document.querySelector('.nav-menu');
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        
        if (navMenu) navMenu.classList.remove('active');
        if (sidebar) sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    },
    
    /**
     * 检查是否为移动设备
     */
    isMobile: function() {
        return window.innerWidth <= 768;
    },
    
    /**
     * 检查是否为触摸设备
     */
    isTouchDevice: function() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
};
