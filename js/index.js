// Cycle header background classes every 5 seconds and handle shrink-on-scroll
(function () {
	const header = document.getElementById('site-header');
	const bgCount = 3;
	let idx = 1;
	function setBg(i) {
		header.classList.remove(...Array.from({ length: bgCount }, (_, k) => 'bg-' + (k + 1)));
		header.classList.add('bg-' + i);
	}
	setBg(idx);
	setInterval(() => {
		idx = idx % bgCount + 1;
		setBg(idx);
	}, 5000);

	// shrink header on scroll
	const shrinkAt = 120;
	function onScroll() {
		if (window.scrollY > shrinkAt) header.classList.add('shrink');
		else header.classList.remove('shrink');

		// highlight sidebar links
		const sections = Array.from(document.querySelectorAll('main .panel, main .panel article'));
		let currentId = '';
		sections.forEach(s => {
			const rect = s.getBoundingClientRect();
			if (rect.top <= 120 && rect.bottom > 120) currentId = s.id || currentId;
		});
		document.querySelectorAll('.sidebar a, .top-nav a').forEach(a => {
			if (a.getAttribute('href') === '#' + currentId) a.classList.add('active'); else a.classList.remove('active');
		});
	}
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('load', onScroll);
})();

// Theme toggle: persist in localStorage
(function () {
	const btn = document.getElementById('theme-toggle');
	if (!btn) return;
	const root = document.documentElement;
	function applyTheme(dark) {
		if (dark) document.body.classList.add('dark'); else document.body.classList.remove('dark');
		btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
	}
	const saved = localStorage.getItem('eco-theme');
	applyTheme(saved === 'dark');
	btn.addEventListener('click', () => {
		const isDark = document.body.classList.toggle('dark');
		applyTheme(isDark);
		localStorage.setItem('eco-theme', isDark ? 'dark' : 'light');
	});
})();

