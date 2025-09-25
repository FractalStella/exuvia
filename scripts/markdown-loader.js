let currentLang = 'en';

// Function to load and render markdown content
function loadContent(filePath) {
    const fullPath = `data_${currentLang}/${filePath}`;
    fetch(fullPath)
        .then(response => response.text())
        .then(text => {
            document.getElementById('content').innerHTML = marked.parse(text);
        })
        .catch(error => {
            console.error('Error loading content:', error);
            document.getElementById('content').innerHTML = '<p>Error loading content</p>';
        });
}

document.querySelectorAll('.lang-select button').forEach(button => {
    button.addEventListener('click', (e) => {
        currentLang = e.target.dataset.lang;
        // Update active state of language buttons
        document.querySelectorAll('.lang-select button').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        // Reload current content in new language
        const currentFile = document.querySelector('#navbar a.active')?.dataset.file || 'home.md';
        loadContent(currentFile);
    });
});

// Add click handlers to navigation items
document.querySelectorAll('#navbar a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // Remove active class from all links
        document.querySelectorAll('#navbar a').forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        e.target.classList.add('active');
        // Load content
        loadContent(e.target.dataset.file);
    });
});

// Load default content
loadContent('home.md');