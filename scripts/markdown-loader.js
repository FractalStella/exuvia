        // Function to load and render markdown content
        function loadContent(filePath) {
            fetch(filePath)
                .then(response => response.text())
                .then(text => {
                    document.getElementById('content').innerHTML = marked.parse(text);
                })
                .catch(error => {
                    console.error('Error loading content:', error);
                    document.getElementById('content').innerHTML = '<p>Error loading content</p>';
                });
        }

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
        loadContent('data/home.md');