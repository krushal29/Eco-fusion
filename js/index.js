// Cycle header background classes every 5 seconds and handle shrink-on-scroll
(function(){
	const header = document.getElementById('site-header');
	const bgCount = 3;
	let idx = 1;
	function setBg(i){
		header.classList.remove(...Array.from({length:bgCount},(_,k)=>'bg-'+(k+1)));
		header.classList.add('bg-'+i);
	}
	setBg(idx);
	setInterval(()=>{
		idx = idx%bgCount + 1;
		setBg(idx);
	},5000);

	// shrink header on scroll
	const shrinkAt = 120;
	function onScroll(){
		if(window.scrollY > shrinkAt) header.classList.add('shrink');
		else header.classList.remove('shrink');

		// highlight sidebar links
		const sections = document.querySelectorAll('main .panel');
		let currentId = '';
		sections.forEach(s=>{
			const rect = s.getBoundingClientRect();
			if(rect.top <= 120 && rect.bottom > 120) currentId = s.id;
		});
		document.querySelectorAll('.sidebar a').forEach(a=>{
			if(a.getAttribute('href') === '#'+currentId) a.classList.add('active'); else a.classList.remove('active');
		});
	}
	window.addEventListener('scroll', onScroll, {passive:true});
	window.addEventListener('load', onScroll);
})();

