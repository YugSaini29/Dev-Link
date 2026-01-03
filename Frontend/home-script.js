const left = document.getElementById('symbolLeft');
const right = document.getElementById('symbolRight');
const center = document.getElementById('symbolCenter');
const questions = document.querySelectorAll('.questions p');
const finalSection = document.getElementById('finalSection');
const scrollIndicator = document.getElementById('scrollIndicator');
const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollPos / docHeight, 1);

    // Update progress bar
    progressBar.style.width = `${progress * 100}%`;

    // Move symbols towards center with smooth easing
    const moveAmount = progress * 500;
    left.style.transform = `translateY(-50%) translateX(${moveAmount}px)`;
    right.style.transform = `translateY(-50%) translateX(-${moveAmount}px)`;
    center.style.transform = `translate(-50%, -50%) scale(${1 + progress * 0.8})`;

    // Add glow when symbols are close
    if (progress > 0.75) {
        left.classList.add('glowing');
        center.classList.add('glowing');
        right.classList.add('glowing');
    } else {
        left.classList.remove('glowing');
        center.classList.remove('glowing');
        right.classList.remove('glowing');
    }

    // Show questions sequentially in center
    const questionPhaseStart = 0.15;
    const questionPhaseEnd = 0.75;
    const questionPhase = questionPhaseEnd - questionPhaseStart;
    const questionDuration = questionPhase / questions.length;

    if (progress >= questionPhaseStart && progress < questionPhaseEnd) {
        questions.forEach((q, i) => {
            const start = questionPhaseStart + (i * questionDuration);
            const end = start + questionDuration;

            if (progress >= start && progress < end) {
                q.style.opacity = 1;
            } else {
                q.style.opacity = 0;
            }
        });
    } else {
        questions.forEach(q => q.style.opacity = 0);
    }

    // Show final section when symbols meet
    if (progress > 0.85) {
        finalSection.classList.add('visible');
    } else {
        finalSection.classList.remove('visible');
    }
});