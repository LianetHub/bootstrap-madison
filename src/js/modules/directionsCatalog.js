/** Keep the mobile combobox, native backing select and desktop tabs on one state. */
export default function initDirectionsCatalog(scope = document) {
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
        // The reference opens on adults while the age control still prompts.
        activate(active, hasSelection);
    });
}
