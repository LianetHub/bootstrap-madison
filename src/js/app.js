"use strict";

//  Fancybox
if (typeof Fancybox !== "undefined" && Fancybox !== null) {
    Fancybox.bind("[data-fancybox]", {
        dragToClose: false,
        closeExisting: true
    });
}



document.addEventListener("DOMContentLoaded", function () {

    // webP support fallback
    function testWebP(callback) {
        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    };

    testWebP(function (support) {

        if (support == true) {
            document.querySelector('body').classList.add('webp');
        } else {
            document.querySelector('body').classList.add('no-webp');
        }
    });

    document.addEventListener('click', function (e) {
        const target = e.target;
        const header = document.querySelector('.header');
        const toggler = document.querySelector('.header__toggler');
        const menu = document.querySelector('.menu');

        if (target.matches('.faq__item-question')) {
            target.classList.toggle('active');
            target.nextElementSibling.slideToggle()
        }


        if (target.closest('.header__toggler')) {
            toggler.classList.toggle('active');
            header.classList.toggle('open-menu');
            document.body.classList.toggle('open-mobile-menu');
        } else if (
            header.classList.contains('open-menu') &&
            !target.closest('.menu')
        ) {
            toggler.classList.remove('active');
            header.classList.remove('open-menu');
            document.body.classList.remove('open-mobile-menu');
        }
    })

    // sliders
    if (document.querySelector('.teachers__slider')) {
        new Swiper('.teachers__slider', {
            slidesPerView: 1,
            spaceBetween: 20,
            watchOverflow: true,
            navigation: {
                prevEl: ".teachers__prev",
                nextEl: ".teachers__next"
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1200: {
                    slidesPerView: 3,
                }
            },
            on: {
                init: function () {
                    if (!this.isLocked) {
                        this.el.classList.add('can-scroll');
                    }
                },
                sliderMove: function () {
                    this.el.classList.add('is-swiped');
                },
                slideChange: function () {
                    this.el.classList.add('is-swiped');
                }
            }
        })
    }

    if (document.querySelector('.reviews__slider')) {
        new Swiper('.reviews__slider', {
            slidesPerView: 2,
            spaceBetween: 10,
            watchOverflow: true,
            breakpoints: {
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                }
            },
            on: {
                init: function () {
                    if (!this.isLocked) {
                        this.el.classList.add('can-scroll');
                    }
                },
                sliderMove: function () {
                    this.el.classList.add('is-swiped');
                },
                slideChange: function () {
                    this.el.classList.add('is-swiped');
                }
            }
        })
    }

    if (document.querySelector('.halls__slider')) {
        new Swiper('.halls__slider', {
            slidesPerView: "auto",
            spaceBetween: 20,
            watchOverflow: true,
            navigation: {
                prevEl: ".halls__prev",
                nextEl: ".halls__next"
            },
            on: {
                init: function () {
                    if (!this.isLocked) {
                        this.el.classList.add('can-scroll');
                    }
                },
                sliderMove: function () {
                    this.el.classList.add('is-swiped');
                },
                slideChange: function () {
                    this.el.classList.add('is-swiped');
                }
            }
        })
    }

    if (document.querySelector('.benefits__slider')) {
        new Swiper('.benefits__slider', {
            slidesPerView: "auto",
            spaceBetween: 20,
            breakpoints: {
                1200: {
                    slidesPerView: 4,
                }
            },
            on: {
                init: function () {
                    if (!this.isLocked) {
                        this.el.classList.add('can-scroll');
                    }
                },
                sliderMove: function () {
                    this.el.classList.add('is-swiped');
                },
                slideChange: function () {
                    this.el.classList.add('is-swiped');
                }
            }
        })
    }


    if (document.querySelectorAll('.gallery__slider').length) {
        const gallerySliders = document.querySelectorAll('.gallery__slider');

        gallerySliders.forEach((slider, index) => {
            new Swiper(slider, {
                loop: true,
                speed: 20000,
                slidesPerView: 'auto',
                spaceBetween: 10,
                allowTouchMove: false,
                autoplay: {
                    delay: 0,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                    reverseDirection: index % 2 !== 0,
                },
            });
        });
    }


    initPhoneMask();

    setupTrialFormLogic()

});

function setupTrialFormLogic() {
    const form = document.querySelector('#sign-up');

    if (!form) return;

    const phoneInput = form.querySelector('input[name="phone"]');
    const tgInput = form.querySelector('input[name="telegram"]');

    if (!phoneInput || !tgInput) return;

    const phoneContainer = phoneInput.closest('.col-sm-6, .col-12');
    const tgContainer = tgInput.closest('.col-sm-6');

    const toggleFields = () => {
        const checkedRadio = form.querySelector('input[name="contactMethod"]:checked');
        if (!checkedRadio) return;

        const isTelegram = checkedRadio.value === 'telegram';

        if (isTelegram) {
            tgContainer.style.display = 'block';
            tgInput.disabled = false;

            phoneContainer.classList.remove('col-12');
            phoneContainer.classList.add('col-sm-6');
        } else {
            tgContainer.style.display = 'none';
            tgInput.disabled = true;

            phoneContainer.classList.remove('col-sm-6');
            phoneContainer.classList.add('col-12');
        }
    };

    form.addEventListener('change', (e) => {
        if (e.target.name === 'contactMethod') {
            toggleFields();
        }
    });

    toggleFields();
}


function initPhoneMask() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');

    const getInputNumbersValue = (input) => input.value.replace(/\D/g, '');

    const onPhonePaste = (e) => {
        const input = e.target;
        const inputNumbersValue = getInputNumbersValue(input);
        const pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            const pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                input.value = inputNumbersValue;
            }
        }
    };

    const onPhoneInput = (e) => {
        const input = e.target;
        let inputNumbersValue = getInputNumbersValue(input);
        const selectionStart = input.selectionStart;
        let formattedInputValue = "";

        if (!inputNumbersValue) {
            input.value = "";
            return;
        }

        if (input.value.length !== selectionStart) {
            if (e.data && /\D/g.test(e.data)) {
                input.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] === "9") inputNumbersValue = "7" + inputNumbersValue;
            const firstSymbols = (inputNumbersValue[0] === "8") ? "8" : "+7";
            formattedInputValue = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    };

    const onPhoneKeyDown = (e) => {
        const inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode === 8 && inputValue.length === 1) {
            e.target.value = "";
        }
    };

    phoneInputs.forEach(phoneInput => {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
        phoneInput.addEventListener('paste', onPhonePaste, false);
    });
}


HTMLElement.prototype.slideToggle = function (duration, callback) {
    if (this.clientHeight === 0) {
        _s(this, duration, callback, true);
    } else {
        _s(this, duration, callback);
    }
};

HTMLElement.prototype.slideUp = function (duration, callback) {
    _s(this, duration, callback);
};

HTMLElement.prototype.slideDown = function (duration, callback) {
    _s(this, duration, callback, true);
};

function _s(el, duration, callback, isDown) {
    if (typeof duration === 'undefined') duration = 400;
    if (typeof isDown === 'undefined') isDown = false;

    el.style.overflow = "hidden";
    if (isDown) el.style.display = "block";

    const elStyles = window.getComputedStyle(el);

    const elHeight = parseFloat(elStyles.getPropertyValue('height'));
    const elPaddingTop = parseFloat(elStyles.getPropertyValue('padding-top'));
    const elPaddingBottom = parseFloat(elStyles.getPropertyValue('padding-bottom'));
    const elMarginTop = parseFloat(elStyles.getPropertyValue('margin-top'));
    const elMarginBottom = parseFloat(elStyles.getPropertyValue('margin-bottom'));

    const stepHeight = elHeight / duration;
    const stepPaddingTop = elPaddingTop / duration;
    const stepPaddingBottom = elPaddingBottom / duration;
    const stepMarginTop = elMarginTop / duration;
    const stepMarginBottom = elMarginBottom / duration;

    let start;

    function step(timestamp) {
        if (start === undefined) start = timestamp;

        const elapsed = timestamp - start;

        if (isDown) {
            el.style.height = `${stepHeight * elapsed}px`;
            el.style.paddingTop = `${stepPaddingTop * elapsed}px`;
            el.style.paddingBottom = `${stepPaddingBottom * elapsed}px`;
            el.style.marginTop = `${stepMarginTop * elapsed}px`;
            el.style.marginBottom = `${stepMarginBottom * elapsed}px`;
        } else {
            el.style.height = `${elHeight - stepHeight * elapsed}px`;
            el.style.paddingTop = `${elPaddingTop - stepPaddingTop * elapsed}px`;
            el.style.paddingBottom = `${elPaddingBottom - stepPaddingBottom * elapsed}px`;
            el.style.marginTop = `${elMarginTop - stepMarginTop * elapsed}px`;
            el.style.marginBottom = `${elMarginBottom - stepMarginBottom * elapsed}px`;
        }

        if (elapsed >= duration) {
            el.style.height = "";
            el.style.paddingTop = "";
            el.style.paddingBottom = "";
            el.style.marginTop = "";
            el.style.marginBottom = "";
            el.style.overflow = "";
            if (!isDown) el.style.display = "none";
            if (typeof callback === "function") callback();
        } else {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}