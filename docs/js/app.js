/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};




//  Fancybox
if (typeof Fancybox !== "undefined" && Fancybox !== null) {
	Fancybox.bind("[data-fancybox]", {
		dragToClose: false,
		closeExisting: true,
	});
}

document.addEventListener("DOMContentLoaded", function () {
	
	// webP support fallback
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {
		if (support == true) {
			document.querySelector("body").classList.add("webp");
		} else {
			document.querySelector("body").classList.add("no-webp");
		}
	});

	const animatingFaqAnswers = new WeakSet();

	document.addEventListener("click", function (e) {
		const question = e.target.closest(".faq__item-question");
		if (!question) return;

		const answer = document.getElementById(question.getAttribute("aria-controls"));
		if (!answer || animatingFaqAnswers.has(answer)) return;

		const expanded = question.getAttribute("aria-expanded") !== "true";
		animatingFaqAnswers.add(answer);
		question.classList.toggle("active", expanded);
		question.setAttribute("aria-expanded", String(expanded));
		answer.slideToggle(400, function () {
			animatingFaqAnswers.delete(answer);
		});
	});

	// sliders
	if (document.querySelector(".teachers__slider")) {
		new Swiper(".teachers__slider", {
			slidesPerView: 1,
			spaceBetween: 20,
			watchOverflow: true,
			navigation: {
				prevEl: ".teachers__prev",
				nextEl: ".teachers__next",
			},
			breakpoints: {
				768: {
					slidesPerView: 2,
				},
				1200: {
					slidesPerView: 3,
				},
			},
			on: {
				init: function () {
					if (!this.isLocked) {
						this.el.classList.add("can-scroll");
					}
				},
				sliderMove: function () {
					this.el.classList.add("is-swiped");
				},
				slideChange: function () {
					this.el.classList.add("is-swiped");
				},
			},
		});
	}

	if (document.querySelector(".reviews__slider")) {
		new Swiper(".reviews__slider", {
			slidesPerView: 2,
			spaceBetween: 10,
			watchOverflow: true,
			breakpoints: {
				1200: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
			},
			on: {
				init: function () {
					if (!this.isLocked) {
						this.el.classList.add("can-scroll");
					}
				},
				sliderMove: function () {
					this.el.classList.add("is-swiped");
				},
				slideChange: function () {
					this.el.classList.add("is-swiped");
				},
			},
		});
	}

	if (document.querySelector(".halls__slider")) {
		new Swiper(".halls__slider", {
			slidesPerView: "auto",
			spaceBetween: 20,
			watchOverflow: true,
			navigation: {
				prevEl: ".halls__prev",
				nextEl: ".halls__next",
			},
			on: {
				init: function () {
					if (!this.isLocked) {
						this.el.classList.add("can-scroll");
					}
				},
				sliderMove: function () {
					this.el.classList.add("is-swiped");
				},
				slideChange: function () {
					this.el.classList.add("is-swiped");
				},
			},
		});
	}

	if (document.querySelector(".benefits__slider")) {
		new Swiper(".benefits__slider", {
			slidesPerView: "auto",
			spaceBetween: 20,
			breakpoints: {
				1200: {
					slidesPerView: 4,
				},
			},
			on: {
				init: function () {
					if (!this.isLocked) {
						this.el.classList.add("can-scroll");
					}
				},
				sliderMove: function () {
					this.el.classList.add("is-swiped");
				},
				slideChange: function () {
					this.el.classList.add("is-swiped");
				},
			},
		});
	}

	if (document.querySelector(".directions__slider")) {
		new Swiper(".directions__slider", {
			slidesPerView: 2,
			spaceBetween: 10,
			watchOverflow: true,
			navigation: {
				prevEl: ".directions__prev",
				nextEl: ".directions__next",
			},
			breakpoints: {
				767.98: {
					slidesPerView: 2.5,
					spaceBetween: 20,
				},
				991.98: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1199.98: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
			},
			on: {
				init: function () {
					if (!this.isLocked) {
						this.el.classList.add("can-scroll");
					}
				},
				sliderMove: function () {
					this.el.classList.add("is-swiped");
				},
				slideChange: function () {
					this.el.classList.add("is-swiped");
				},
			},
		});
	}

	if (document.querySelectorAll(".gallery__slider").length) {
		const gallerySliders = document.querySelectorAll(".gallery__slider");

		gallerySliders.forEach((slider, index) => {
			new Swiper(slider, {
				loop: true,
				speed: 20000,
				slidesPerView: "auto",
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

	setupTrialFormLogic();

	initDirectionsCatalog();
	
	initHeaderMenu();
});

function setupTrialFormLogic() {
	const form = document.querySelector("#sign-up");

	if (!form) return;

	const phoneInput = form.querySelector('input[name="phone"]');
	const tgInput = form.querySelector('input[name="telegram"]');

	if (!phoneInput || !tgInput) return;

	const phoneContainer = phoneInput.closest(".col-sm-6, .col-12");
	const tgContainer = tgInput.closest(".col-sm-6");

	const toggleFields = () => {
		const checkedRadio = form.querySelector('input[name="contactMethod"]:checked');
		if (!checkedRadio) return;

		const isTelegram = checkedRadio.value === "telegram";

		if (isTelegram) {
			tgContainer.style.display = "block";
			tgInput.disabled = false;

			phoneContainer.classList.remove("col-12");
			phoneContainer.classList.add("col-sm-6");
		} else {
			tgContainer.style.display = "none";
			tgInput.disabled = true;

			phoneContainer.classList.remove("col-sm-6");
			phoneContainer.classList.add("col-12");
		}
	};

	form.addEventListener("change", (e) => {
		if (e.target.name === "contactMethod") {
			toggleFields();
		}
	});

	toggleFields();
}

function initPhoneMask() {
	const phoneInputs = document.querySelectorAll('input[type="tel"]');

	const getInputNumbersValue = (input) => input.value.replace(/\D/g, "");

	const onPhonePaste = (e) => {
		const input = e.target;
		const inputNumbersValue = getInputNumbersValue(input);
		const pasted = e.clipboardData || window.clipboardData;
		if (pasted) {
			const pastedText = pasted.getData("Text");
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
			const firstSymbols = inputNumbersValue[0] === "8" ? "8" : "+7";
			formattedInputValue = firstSymbols + " ";
			if (inputNumbersValue.length > 1) {
				formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
			}
			if (inputNumbersValue.length >= 5) {
				formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
			}
			if (inputNumbersValue.length >= 8) {
				formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
			}
			if (inputNumbersValue.length >= 10) {
				formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
			}
		} else {
			formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
		}
		input.value = formattedInputValue;
	};

	const onPhoneKeyDown = (e) => {
		const inputValue = e.target.value.replace(/\D/g, "");
		if (e.keyCode === 8 && inputValue.length === 1) {
			e.target.value = "";
		}
	};

	phoneInputs.forEach((phoneInput) => {
		phoneInput.addEventListener("keydown", onPhoneKeyDown);
		phoneInput.addEventListener("input", onPhoneInput, false);
		phoneInput.addEventListener("paste", onPhonePaste, false);
	});
}

function initDirectionsCatalog(scope = document) {
    scope.querySelectorAll("[data-directions-catalog]").forEach((root) => {
        if (root.dataset.catalogInitialized) return;
        const tabs = [...root.querySelectorAll("[data-catalog-tab]")];
        const panels = [...root.querySelectorAll("[data-catalog-panel]")];
        const select = root.querySelector("[data-catalog-select]");
        if (!tabs.length || !panels.length || !select) return;

        const wrap = root.querySelector(".directions-catalog__select-wrap");
        const trigger = root.querySelector("[data-catalog-select-trigger]");
        const label = root.querySelector("[data-catalog-select-label]");
        const icon = root.querySelector("[data-catalog-select-icon]");
        const list = root.querySelector("[data-catalog-select-options]");
        const options = [...root.querySelectorAll("[data-catalog-select-option]")];
        const prompt = select.querySelector('option[value=""]')?.textContent || "Выберите возраст";
        const promptIcon = icon?.getAttribute("src");
        let active = tabs.find((tab) => tab.getAttribute("aria-selected") === "true")?.dataset.catalogTab || tabs[0].dataset.catalogTab;
        let hasSelection = Boolean(select.value);
        let open = false;
        let highlighted = 0;

        const renderSelection = () => {
            const selected = options.find((option) => option.dataset.catalogSelectOption === active);
            const displayLabel = !open && hasSelection ? selected?.textContent.trim() || prompt : prompt;
            if (label) label.textContent = displayLabel;
            trigger?.setAttribute("aria-label", displayLabel);
            if (icon && promptIcon) {
                const selectedIcon = selected?.querySelector("img")?.getAttribute("src");
                icon.setAttribute("src", !open && hasSelection && selectedIcon ? selectedIcon : promptIcon);
            }
            options.forEach((option) => option.setAttribute("aria-selected", String(hasSelection && option.dataset.catalogSelectOption === active)));
        };

        const highlight = (index) => {
            highlighted = (index + options.length) % options.length;
            options.forEach((option, optionIndex) => option.classList.toggle("is-highlighted", optionIndex === highlighted));
            if (open && options[highlighted]) trigger?.setAttribute("aria-activedescendant", options[highlighted].id);
        };

        const setOpen = (nextOpen) => {
            if (!trigger || !list || !options.length) return;
            open = nextOpen;
            wrap.classList.toggle("is-open", open);
            trigger.setAttribute("aria-expanded", String(open));
            list.hidden = !open;
            if (open) highlight(Math.max(0, options.findIndex((option) => option.dataset.catalogSelectOption === active)));
            else trigger.removeAttribute("aria-activedescendant");
            renderSelection();
        };

        const activate = (value, synchronizeSelect = true) => {
            if (!tabs.some((tab) => tab.dataset.catalogTab === value)) return;
            active = value;
            tabs.forEach((tab) => {
                const selected = tab.dataset.catalogTab === active;
                tab.setAttribute("aria-selected", String(selected));
                tab.tabIndex = selected ? 0 : -1;
            });
            panels.forEach((panel) => {
                const selected = panel.dataset.catalogPanel === active;
                panel.classList.toggle("d-none", !selected);
                panel.setAttribute("aria-hidden", String(!selected));
            });
            if (synchronizeSelect) {
                select.value = active;
                hasSelection = true;
            }
            renderSelection();
        };

        const chooseHighlighted = () => {
            const value = options[highlighted]?.dataset.catalogSelectOption;
            if (!value) return;
            select.value = value;
            select.dispatchEvent(new Event("change", { bubbles: true }));
            setOpen(false);
            trigger.focus();
        };

        tabs.forEach((tab, index) => {
            tab.addEventListener("click", () => { activate(tab.dataset.catalogTab); setOpen(false); });
            tab.addEventListener("keydown", (event) => {
                let next;
                if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
                if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
                if (event.key === "Home") next = 0;
                if (event.key === "End") next = tabs.length - 1;
                if (next === undefined) return;
                event.preventDefault();
                activate(tabs[next].dataset.catalogTab);
                setOpen(false);
                tabs[next].focus();
            });
        });
        select.addEventListener("change", () => { activate(select.value); setOpen(false); });
        trigger?.addEventListener("click", () => setOpen(!open));
        trigger?.addEventListener("keydown", (event) => {
            if (event.key === "Tab") { setOpen(false); return; }
            if (event.key === "Escape") {
                if (open) { event.preventDefault(); setOpen(false); }
                return;
            }
            if (!["ArrowDown", "ArrowUp", "Home", "End", "Enter", " "].includes(event.key)) return;
            event.preventDefault();
            if (event.key === "Enter" || event.key === " ") {
                if (open) chooseHighlighted();
                else setOpen(true);
                return;
            }
            const wasOpen = open;
            if (!open) setOpen(true);
            if (event.key === "Home") highlight(0);
            else if (event.key === "End") highlight(options.length - 1);
            else if (!wasOpen && !hasSelection && event.key === "ArrowUp") highlight(options.length - 1);
            else if (wasOpen) highlight(highlighted + (event.key === "ArrowDown" ? 1 : -1));
        });
        options.forEach((option, index) => {
            option.addEventListener("pointerenter", () => highlight(index));
            option.addEventListener("click", () => { highlight(index); chooseHighlighted(); });
        });
        root.ownerDocument.addEventListener("pointerdown", (event) => {
            if (open && !wrap.contains(event.target)) setOpen(false);
        });
        wrap?.addEventListener("focusout", (event) => {
            if (open && !wrap.contains(event.relatedTarget)) setOpen(false);
        });
        root.dataset.catalogInitialized = "true";
      
        activate(active, hasSelection);
    });
}

function initHeaderMenu() {
    const header = document.querySelector(".header");
    const toggler = header?.querySelector(".header__toggler");
    const menu = header?.querySelector(".menu");
    if (!header || !toggler || !menu) return;

    const desktop = window.matchMedia("(min-width: 768px)");
    let open = false;

    const setOpen = (nextOpen, restoreFocus = false) => {
        open = nextOpen && !desktop.matches;
        toggler.classList.toggle("active", open);
        header.classList.toggle("open-menu", open);
        document.body.classList.toggle("open-mobile-menu", open);
        toggler.setAttribute("aria-expanded", String(open));
        toggler.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
        if (restoreFocus) toggler.focus();
    };

    toggler.addEventListener("click", () => setOpen(!open));
    document.addEventListener("click", (event) => {
        if (!open || toggler.contains(event.target)) return;
        if (!menu.contains(event.target) || event.target.closest("a[href]")) setOpen(false);
    });
    document.addEventListener("keydown", (event) => {
        if (open && event.key === "Escape") {
            event.preventDefault();
            setOpen(false, true);
        }
    });
    desktop.addEventListener("change", () => {
        if (desktop.matches) setOpen(false);
    });
    setOpen(false);
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
	if (typeof duration === "undefined") duration = 400;
	if (typeof isDown === "undefined") isDown = false;

	el.style.overflow = "hidden";
	if (isDown) el.style.display = "block";

	const elStyles = window.getComputedStyle(el);

	const elHeight = parseFloat(elStyles.getPropertyValue("height"));
	const elPaddingTop = parseFloat(elStyles.getPropertyValue("padding-top"));
	const elPaddingBottom = parseFloat(elStyles.getPropertyValue("padding-bottom"));
	const elMarginTop = parseFloat(elStyles.getPropertyValue("margin-top"));
	const elMarginBottom = parseFloat(elStyles.getPropertyValue("margin-bottom"));

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

/******/ })()
;