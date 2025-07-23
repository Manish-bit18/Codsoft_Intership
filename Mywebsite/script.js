       
        const books = [
            {
                title: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
                cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
                link: "https://www.gutenberg.org/ebooks/64317",
                free: true,
                rating: 4.5
            },
            {
                title: "Pride and Prejudice",
                author: "Jane Austen",
                cover: "https://covers.openlibrary.org/b/id/8226191-L.jpg",
                link: "https://www.gutenberg.org/ebooks/1342",
                free: true,
                rating: 4.8
            },
            {
                title: "1984",
                author: "George Orwell",
                cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
                link: "https://www.george-orwell.org/1984",
                free: false,
                rating: 4.7
            },
            {
                title: "Moby Dick",
                author: "Herman Melville",
                cover: "https://covers.openlibrary.org/b/id/8100921-L.jpg",
                link: "https://www.gutenberg.org/ebooks/2701",
                free: true,
                rating: 4.1
            },
            {
                title: "Alice in Wonderland",
                author: "Lewis Carroll",
                cover: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
                link: "https://www.gutenberg.org/ebooks/11",
                free: true,
                rating: 4.6
            },
            {
                title: "The Silent Patient",
                author: "Alex Michaelides",
                cover: "https://covers.openlibrary.org/b/id/10523338-L.jpg",
                link: "#",
                free: false,
                rating: 4.3
            },
            {
                title: "Atomic Habits",
                author: "James Clear",
                cover: "https://covers.openlibrary.org/b/id/10523339-L.jpg",
                link: "#",
                free: false,
                rating: 4.9
            }
        ];

        let currentBooks = [...books];

        function renderBooks(filteredBooks) {
            const grid = document.getElementById('booksGrid');
            grid.innerHTML = '';
            if (filteredBooks.length === 0) {
                grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">No books found.</p>';
                return;
            }
            filteredBooks.forEach(book => {
                const card = document.createElement('div');
                card.className = 'book-card';
                card.innerHTML = `
                    <img class="book-cover" src="${book.cover}" alt="${book.title}">
                    <div class="book-title">${book.title}</div>
                    <div class="book-author">${book.author}</div>
                    <div style="margin-bottom:8px;">
                        <span style="color:#ffd700;font-size:1.1rem;">${'★'.repeat(Math.round(book.rating))}${'☆'.repeat(5-Math.round(book.rating))}</span>
                        <span style="color:#888;font-size:0.95rem;">${book.rating.toFixed(1)}</span>
                    </div>
                    <div style="margin-bottom:10px;">
                        <span style="font-size:0.92rem;padding:2px 8px;border-radius:4px;${book.free?'background:#e3fbe3;color:#2e7d32;':'background:#fff3cd;color:#856404;'}">
                            ${book.free ? 'Free' : 'Paid'}
                        </span>
                    </div>
                    <button class="read-btn" onclick="window.open('${book.link}', '_blank')">Read</button>
                `;
                grid.appendChild(card);
            });
        }

        function searchBooks() {
            const query = document.getElementById('searchInput').value.toLowerCase();
            filterBooks(query);
        }

        function filterBooks(query = null) {
            const freeOnly = document.getElementById('freeOnly').checked;
            let filtered = books.filter(book => {
                let matches = true;
                if (freeOnly) matches = matches && book.free;
                if (query !== null) {
                    matches = matches && (
                        book.title.toLowerCase().includes(query) ||
                        book.author.toLowerCase().includes(query)
                    );
                } else {
                    const searchVal = document.getElementById('searchInput').value.toLowerCase();
                    if (searchVal)
                        matches = matches && (
                            book.title.toLowerCase().includes(searchVal) ||
                            book.author.toLowerCase().includes(searchVal)
                        );
                }
                return matches;
            });
            currentBooks = filtered;
            sortBooks();
        }

        function sortBooks() {
            const sortVal = document.getElementById('sortSelect').value;
            let sorted = [...currentBooks];
            if (sortVal === 'title') {
                sorted.sort((a, b) => a.title.localeCompare(b.title));
            } else if (sortVal === 'author') {
                sorted.sort((a, b) => a.author.localeCompare(b.author));
            }
            renderBooks(sorted);
        }

        
        renderBooks(books);


        document.getElementById('searchInput').addEventListener('keydown', function(e) {
            if (e.key === 'Enter') searchBooks();
        });

        
        document.getElementById('freeOnly').addEventListener('change', () => filterBooks());
        document.getElementById('sortSelect').addEventListener('change', () => sortBooks());
  