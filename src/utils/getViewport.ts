// Calculate the real viewport height excluding browser UI elements
function getRealViewportHeight() {
    const vh = window.innerHeight;
    const offset = window.visualViewport ? window.visualViewport.offsetTop : 0;
    return vh - offset;
}
// Function to update the --real-vh custom property
function updateRealViewportHeight() {
    const realViewportHeight = getRealViewportHeight();
    document.documentElement.style.setProperty('--real-vh', `${realViewportHeight}px`);
}
export const getViewport = () => {
    // Get the real viewport height
    const realViewportHeight = getRealViewportHeight();

    // Apply the height to your CSS
    const style = document.createElement('style');
    style.textContent = `:root { --real-vh: ${realViewportHeight}px; }`;
    document.head.appendChild(style);
    // Recalculate and update the --real-vh property on window resize
    window.addEventListener('resize', updateRealViewportHeight);
    // Initial calculation and update
    updateRealViewportHeight();
}

