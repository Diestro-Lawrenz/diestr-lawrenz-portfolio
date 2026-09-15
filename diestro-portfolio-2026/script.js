document.addEventListener("DOMContentLoaded", () => {
    const creativeIframe = document.getElementById("sample-card");
    const reloadButton = document.getElementById("reload-creative");
    const pauseButton = document.getElementById("pause-creative");
    const resetButton = document.getElementById("reset");
    const themeToggle = document.getElementById("theme-toggle");
    const themeToggleText = themeToggle?.querySelector(".theme-text");
    const themeToggleIcon = themeToggle?.querySelector(".theme-icon");

    const headlineColor = document.getElementById("headline-color");
    const gradientColor = document.getElementById("gradient-color");

    const headlineInputs = {
        frame1headline: document.getElementById("frame1-input"),
        frame2headline: document.getElementById("frame2-input"),
        frame3headline: document.getElementById("frame3-input"),
        frame4headline: document.getElementById("frame4-input"),
        frame5headline: document.getElementById("frame5-input")
    };

    const defaultCreativeValues = {
        frame1headline: "Explore the beauty of Thailand",
        frame2headline: "Cave Beach Resort, Pattaya",
        frame3headline: "Sanctuary of Truth",
        frame4headline: "Thai Costume Uniform",
        frame5headline: "Wat Arun",
        headlineColor: "#f9f9f9",
        gradientColor: "#000000"
    };

    let reloadTimer;
    let isPaused = false;

    function updateThemeButton(isDarkMode) {
        if (!themeToggle) return;

        themeToggle.setAttribute("aria-label", isDarkMode ? "Switch to light mode" : "Switch to night mode");

        if (themeToggleText) {
            themeToggleText.textContent = isDarkMode ? "Light mode" : "Night mode";
        }

        if (themeToggleIcon) {
            themeToggleIcon.textContent = isDarkMode ? "☀" : "☾";
        }
    }

    function applySavedTheme() {
        const savedTheme = localStorage.getItem("portfolioTheme");
        const isDarkMode = savedTheme === "dark";

        document.body.classList.toggle("dark-theme", isDarkMode);
        updateThemeButton(isDarkMode);
    }

    function getIframeDocument() {
        if (!creativeIframe) return null;
        return creativeIframe.contentDocument || creativeIframe.contentWindow.document;
    }

    function getCreativeTimeline() {
        return creativeIframe?.contentWindow?.creativeTimeline;
    }

    function hexToRgb(hex) {
        const cleanHex = hex.replace("#", "");

        return {
            r: parseInt(cleanHex.substring(0, 2), 16),
            g: parseInt(cleanHex.substring(2, 4), 16),
            b: parseInt(cleanHex.substring(4, 6), 16)
        };
    }

    function resetPauseButton() {
        isPaused = false;

        if (!pauseButton) return;

        pauseButton.textContent = "❚❚";
        pauseButton.setAttribute("aria-label", "Pause creative");
    }

    function applyDynamicValues() {
        const iframeDocument = getIframeDocument();
        if (!iframeDocument) return;

        Object.keys(headlineInputs).forEach((headlineId) => {
            const input = headlineInputs[headlineId];
            const headline = iframeDocument.getElementById(headlineId);

            if (!input || !headline) return;

            headline.textContent = input.value.trim() || defaultCreativeValues[headlineId];

            if (headlineColor) {
                headline.style.color = headlineColor.value;
            }
        });

        const bottomGradient = iframeDocument.getElementById("bottom-gradient");

        if (bottomGradient && gradientColor) {
            const rgb = hexToRgb(gradientColor.value);

            bottomGradient.style.background = `
                linear-gradient(
                    to top,
                    rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.85) 0%,
                    rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.45) 35%,
                    rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0) 65%
                )
            `;
        }
    }

    function reloadCreativeAndApplyValues() {
        if (!creativeIframe) return;

        creativeIframe.addEventListener(
            "load",
            function onIframeLoad() {
                applyDynamicValues();
                resetPauseButton();

                const timeline = getCreativeTimeline();

                if (timeline) {
                    timeline.restart();
                }
            },
            { once: true }
        );

        creativeIframe.contentWindow.location.reload();
    }

    function delayedReload() {
        clearTimeout(reloadTimer);

        reloadTimer = setTimeout(() => {
            reloadCreativeAndApplyValues();
        }, 400);
    }

    Object.keys(headlineInputs).forEach((headlineId) => {
        const input = headlineInputs[headlineId];

        if (!input) return;

        input.addEventListener("input", delayedReload);
    });

    if (headlineColor) {
        headlineColor.addEventListener("input", delayedReload);
    }

    if (gradientColor) {
        gradientColor.addEventListener("input", delayedReload);
    }

    if (reloadButton) {
        reloadButton.addEventListener("click", () => {
            reloadCreativeAndApplyValues();
        });
    }

    if (pauseButton) {
        pauseButton.addEventListener("click", () => {
            const timeline = getCreativeTimeline();

            if (!timeline) return;

            if (isPaused) {
                timeline.play();
                pauseButton.textContent = "❚❚";
                pauseButton.setAttribute("aria-label", "Pause creative");
                isPaused = false;
            } else {
                timeline.pause();
                pauseButton.textContent = "▶";
                pauseButton.setAttribute("aria-label", "Play creative");
                isPaused = true;
            }
        });
    }

    if (resetButton) {
        resetButton.addEventListener("click", () => {
            Object.values(headlineInputs).forEach((input) => {
                if (input) input.value = "";
            });

            if (headlineColor) headlineColor.value = defaultCreativeValues.headlineColor;
            if (gradientColor) gradientColor.value = defaultCreativeValues.gradientColor;

            reloadCreativeAndApplyValues();
        });
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const isDarkMode = document.body.classList.toggle("dark-theme");
            localStorage.setItem("portfolioTheme", isDarkMode ? "dark" : "light");
            updateThemeButton(isDarkMode);
        });
    }

    if (creativeIframe) {
        creativeIframe.addEventListener("load", () => {
            applyDynamicValues();
            resetPauseButton();
        });
    }

    applySavedTheme();
});
