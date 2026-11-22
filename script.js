(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('is-open', !isOpen);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
      });
    });
  }

  const filters = Array.from(document.querySelectorAll('.filter-button'));
  const publications = Array.from(document.querySelectorAll('.publication-item'));
  const count = document.getElementById('publication-count');

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filters.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      let visible = 0;
      publications.forEach((publication) => {
        const show = filter === 'all' || publication.dataset.kind === filter;
        publication.hidden = !show;
        if (show) visible += 1;
      });
      if (count) count.textContent = `Showing ${visible} ${visible === 1 ? 'record' : 'records'}`;
    });
  });



  // Interactive three-layer research infographic: image hotspots and tabs share state.
  const layerTriggers = Array.from(document.querySelectorAll('[data-layer-trigger]'));
  const layerPanels = Array.from(document.querySelectorAll('[data-layer-panel]'));
  const selectResearchLayer = (layer) => {
    layerTriggers.forEach((trigger) => {
      const active = trigger.dataset.layerTrigger === layer;
      if (trigger.classList.contains('research-layer-tab')) {
        trigger.classList.toggle('is-active', active);
        trigger.setAttribute('aria-selected', String(active));
      } else {
        trigger.setAttribute('aria-pressed', String(active));
      }
    });
    layerPanels.forEach((panel) => {
      const active = panel.dataset.layerPanel === layer;
      panel.hidden = !active;
      panel.classList.toggle('is-active', active);
    });
  };
  layerTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => selectResearchLayer(trigger.dataset.layerTrigger));
  });
  document.querySelectorAll('.hero-domain-pill[data-layer-trigger]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelector('#research')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  selectResearchLayer('power');

  // Accessible arrow-key navigation across the three research layer tabs.
  const researchTabs = Array.from(document.querySelectorAll('.research-layer-tab'));
  researchTabs.forEach((tab, index) => {
    tab.addEventListener('keydown', (event) => {
      let nextIndex = index;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % researchTabs.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + researchTabs.length) % researchTabs.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = researchTabs.length - 1;
      else return;
      event.preventDefault();
      researchTabs[nextIndex].focus();
      selectResearchLayer(researchTabs[nextIndex].dataset.layerTrigger);
    });
  });

  // Subtle 3D tilt on precise-pointer devices; the image remains static on touch.
  const researchFrame = document.getElementById('research-map');
  const finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (researchFrame && finePointer && !reducedMotion) {
    researchFrame.addEventListener('pointermove', (event) => {
      const bounds = researchFrame.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      const rotateY = (x - 0.5) * 2.2;
      const rotateX = (0.5 - y) * 1.6;
      researchFrame.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
      researchFrame.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
    });
    researchFrame.addEventListener('pointerleave', () => {
      researchFrame.style.setProperty('--tilt-x', '0deg');
      researchFrame.style.setProperty('--tilt-y', '0deg');
    });
  }

  // Skill tiles highlight the selected tool/language and explain its role.
  document.querySelectorAll('.skills-panel').forEach((panel) => {
    const tiles = Array.from(panel.querySelectorAll('[data-skill-select]'));
    const title = panel.querySelector('.skill-detail-name');
    const copy = panel.querySelector('.skill-detail-copy');
    tiles.forEach((tile) => {
      tile.addEventListener('click', () => {
        tiles.forEach((item) => {
          const active = item === tile;
          item.classList.toggle('is-active', active);
          item.setAttribute('aria-pressed', String(active));
        });
        if (title) title.textContent = tile.dataset.skillTitle || '';
        if (copy) copy.textContent = tile.dataset.skillDescription || '';
      });
    });
  });

  // Build the Packages cards from the public GitHub profile. If the public API
  // is unreachable, show the two projects visible on the profile screenshot.
  const repoGrid = document.getElementById('github-repos');
  const repoStatus = document.getElementById('repo-status');
  const fallbackRepos = [
    {
      name: 'Minimalistic-Terminal-Editor-for-Julia-MinTEJ-',
      title: 'MinTEJ — Minimalistic Terminal Editor for Julia',
      description: 'A minimalistic integrated development environment for Julia, with sub-programs and files for editing and managing code.',
      html_url: 'https://github.com/PCTejasvi/Minimalistic-Terminal-Editor-for-Julia-MinTEJ-',
      language: 'Julia',
      topics: ['Julia', 'Terminal editor', 'Scientific programming', 'Developer tools'],
      stargazers_count: null,
      pushed_at: null
    },
    {
      name: 'Program-for-Abstract-Syntax-Tree-pAST.jl-Julia-Programming',
      title: 'pAST.jl — Abstract Syntax Tree Visualizer',
      description: 'A Julia program for abstract syntax tree (AST) visualization and description.',
      html_url: 'https://github.com/PCTejasvi/Program-for-Abstract-Syntax-Tree-pAST.jl-Julia-Programming',
      language: 'Julia',
      topics: ['Julia', 'Abstract syntax tree', 'AST visualization', 'Program structure'],
      stargazers_count: null,
      pushed_at: null
    }
  ];

  const makeNode = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const renderRepositories = (repositories, isFallback = false) => {
    if (!repoGrid) return;
    repoGrid.replaceChildren();
    repositories.forEach((repo, index) => {
      const isMintej = /mintej|minimalistic-terminal/i.test(repo.name || '');
      const title = isMintej ? 'MinTEJ — Minimalistic Terminal Editor for Julia' : 'pAST.jl — Abstract Syntax Tree Visualizer';
      const card = makeNode('article', `package-card ${isMintej ? 'package-mintej' : 'package-past'}`);
      const top = makeNode('div', 'package-card-top');
      top.append(makeNode('span', 'package-language', repo.language || 'Julia'));
      top.append(makeNode('span', 'package-type', 'OPEN-SOURCE PROJECT'));
      card.append(top);
      const heading = makeNode('h3', 'package-card-title');
      const link = makeNode('a', '', title);
      link.href = repo.html_url || 'https://github.com/PCTejasvi?tab=repositories';
      link.target = '_blank';
      link.rel = 'noopener';
      heading.append(link);
      card.append(heading);
      const description = repo.description || (isMintej ? fallbackRepos[0].description : fallbackRepos[1].description);
      card.append(makeNode('p', 'package-card-description', description));
      const visual = makeNode('div', `package-mini-flow ${isMintej ? 'flow-mintej' : 'flow-past'}`);
      const stages = isMintej ? ['Julia code', 'MinTEJ editor', 'Edit & manage'] : ['Julia source', 'AST structure', 'Visual tree'];
      stages.forEach((stage, stageIndex) => {
        visual.append(makeNode('span', 'package-mini-node', stage));
        if (stageIndex < stages.length - 1) visual.append(makeNode('span', 'package-mini-arrow', '→'));
      });
      card.append(visual);
      const fallback = fallbackRepos[isMintej ? 0 : 1];
      const topics = Array.isArray(repo.topics) && repo.topics.length ? repo.topics.slice(0, 5) : fallback.topics;
      if (topics.length) {
        const topicRow = makeNode('div', 'package-keywords');
        topics.forEach((topic) => topicRow.append(makeNode('span', '', topic.replace(/-/g, ' '))));
        card.append(topicRow);
      }
      const foot = makeNode('div', 'package-card-foot');
      const meta = [];
      if (repo.stargazers_count !== null && repo.stargazers_count !== undefined) meta.push(`★ ${repo.stargazers_count}`);
      if (repo.pushed_at) meta.push(`Updated ${new Date(repo.pushed_at).toLocaleDateString(undefined, {year:'numeric',month:'short'})}`);
      meta.push('Julia');
      foot.append(makeNode('span', 'package-meta', meta.join(' · ')));
      const openLink = makeNode('a', 'package-open', 'Explore project ↗');
      openLink.href = repo.html_url || 'https://github.com/PCTejasvi?tab=repositories';
      openLink.target = '_blank';
      openLink.rel = 'noopener';
      foot.append(openLink);
      card.append(foot);
      repoGrid.append(card);
    });
    if (repoStatus) {
      repoStatus.textContent = isFallback ? 'Showing the two public profile projects · live metadata unavailable' : `Loaded ${repositories.length} public GitHub ${repositories.length === 1 ? 'project' : 'projects'}`;
    }
  };

  if (repoGrid) {
    fetch('https://api.github.com/users/PCTejasvi/repos?per_page=100&sort=updated', {
      headers: { Accept: 'application/vnd.github+json' }
    })
      .then((response) => {
        if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
        return response.json();
      })
      .then((repositories) => {
        const publicRepos = Array.isArray(repositories) ? repositories.filter((repo) => !repo.private && /mintej|past\.jl|abstract-syntax-tree/i.test(repo.name || '')) : [];
        renderRepositories(publicRepos.length ? publicRepos : fallbackRepos, publicRepos.length === 0);
      })
      .catch(() => renderRepositories(fallbackRepos, true));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
