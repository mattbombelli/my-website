const links = {
    home: { href: '/', label: 'Home' },
    ux: { href: '/ux', label: 'UX case studies', theme: 'hibiscus' },
    projects: { href: '/projects', label: 'Projects', theme: 'marmalade' },
    about: { href: '/about', label: 'About me', theme: 'meadow' },
    blog: { href: '/blog', label: 'Blog' },
    feed: { href: '/feed', label: 'Feed' },
}

export const mainNavLinks = [
    links.ux,
    links.projects,
    links.about,
];

export const footerNavLinks = [
    links.home,
    links.ux,
    links.projects,
    links.about,
    links.blog,
    links.feed
]