const { useEffect, useState } = React;
const data = window.portfolioData;

function Icon({ name }) {
  const paths = {
    code: "M8 9 4 13l4 4M16 9l4 4-4 4M14 5l-4 16",
    layers: "m12 3 9 5-9 5-9-5 9-5Zm-7 9 7 4 7-4M5 16l7 4 7-4",
    device: "M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm3 17h2",
    plug: "M4 17h16M7 13h10M10 9h4M12 3v18",
    database: "M4 6c0-2 4-4 8-4s8 2 8 4-4 4-8 4-8-2-8-4Zm0 6c0 2 4 4 8 4s8-2 8-4M4 18c0 2 4 4 8 4s8-2 8-4V6M4 6v12",
    tool: "M14.7 6.3a4 4 0 0 0-5 5L3 18v3h3l6.7-6.7a4 4 0 0 0 5-5l-2.4 2.4-2.8-2.8 2.2-2.6Z",
    card: "M3 6h18v12H3V6Zm0 4h18M7 15h4",
    spark: "M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z",
    search: "M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm6-2 5 5",
    calendar: "M7 2v4M17 2v4M3 9h18M5 5h14a2 2 0 0 1 2 2v13H3V7a2 2 0 0 1 2-2Z",
    clock: "M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Zm0-15v6l4 2",
    enterprise: "M3 21h18M6 21V5h9v16M15 9h3v12M8 9h2M8 13h2M8 17h2",
    finance: "M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6",
    wallet: "M4 7h16v12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14v4M16 13h2",
    github: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-1-2.6c3.2-.4 6.5-1.6 6.5-7.1A5.5 5.5 0 0 0 20 4.6a5 5 0 0 0-.1-3.6s-1.3-.4-4.1 1.5a14 14 0 0 0-7.6 0C5.4.6 4.1 1 4.1 1A5 5 0 0 0 4 4.6a5.5 5.5 0 0 0-1.5 3.8c0 5.5 3.3 6.7 6.5 7.1a3.4 3.4 0 0 0-1 2.6V22",
    linkedin: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v2a5 5 0 0 1 2-3ZM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
    mail: "M4 4h16v16H4V4Zm0 3 8 6 8-6",
    arrow: "M5 12h14M13 6l6 6-6 6",
    download: "M12 3v12M7 10l5 5 5-5M5 21h14",
    user: "M20 21a8 8 0 0 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
    briefcase: "M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1M3 7h18v12H3V7Zm0 5h18",
    flutter: "M14 3 4 13l3 3L20 3h-6Zm1 10-5 5 4 4h6l-5-5 5-4h-5Z",
    firebase: "M5 20 12 3l2.2 7L17 7l2 13-7 2-7-2Z",
    dart: "M4 7 9 2h8l3 5-8 15-8-15Zm5-5 11 5M4 7h16M9 2l3 20",
    web3: "M12 3 4 7v10l8 4 8-4V7l-8-4Zm0 0v18M4 7l8 4 8-4M4 17l8-6 8 6",
    swift: "M5 5c5 5 8 8 14 10-3 1-6 1-9-1 2 3 5 5 9 5-4 2-10 1-14-3M5 5c3 7 8 11 14 13"
  };
  return React.createElement(
    "svg",
    { viewBox: "0 0 24 24", "aria-hidden": "true", className: "icon" },
    React.createElement("path", { d: paths[name] || paths.spark })
  );
}

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const links = ["home", "about", "skills", "experience", "projects", "open-source", "interests", "contact"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-38% 0px -52% 0px" }
    );
    links.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return React.createElement("nav", { className: `navbar ${scrolled ? "is-scrolled" : ""}` },
    React.createElement("a", { className: "brand", href: "#home" },
      React.createElement("span", { className: "brand-mark" }, "S"),
      React.createElement("span", null, "Sumit Sharma")
    ),
    React.createElement("div", { className: "nav-links" },
      links.map((id) => React.createElement("a", { key: id, className: active === id ? "active" : "", href: `#${id}` }, id === "open-source" ? "Open Source" : id[0].toUpperCase() + id.slice(1)))
    ),
    React.createElement("a", { href: data.personalInfo.resume, download: true, className: "resume-button" }, React.createElement(Icon, { name: "download" }), "Download Resume")
  );
}

function SectionHeader({ eyebrow, title, centered = true }) {
  return React.createElement("div", { className: `section-header reveal ${centered ? "centered" : ""}` },
    React.createElement("span", { className: "eyebrow" }, eyebrow),
    React.createElement("h2", null, title)
  );
}

function Socials() {
  return React.createElement("div", { className: "social-row" },
    React.createElement("a", { href: data.personalInfo.github, "aria-label": "GitHub" }, React.createElement(Icon, { name: "github" })),
    React.createElement("a", { href: data.personalInfo.linkedin, "aria-label": "LinkedIn" }, React.createElement(Icon, { name: "linkedin" })),
    React.createElement("a", { href: `mailto:${data.personalInfo.email}`, "aria-label": "Email" }, React.createElement(Icon, { name: "mail" }))
  );
}

function Hero() {
  return React.createElement("section", { id: "home", className: "hero" },
    React.createElement("div", { className: "stars" }),
    React.createElement("div", { className: "container hero-grid" },
      React.createElement("div", { className: "hero-copy reveal is-visible" },
        React.createElement("span", { className: "hello-pill" }, "Hello, I'm"),
        React.createElement("h1", null, "Sumit ", React.createElement("span", null, "Sharma")),
        React.createElement("p", { className: "type-line" }, data.personalInfo.role),
        React.createElement("p", { className: "hero-text" }, "Building scalable mobile, desktop and Web3 experiences."),
        React.createElement("div", { className: "button-row" },
          React.createElement("a", { className: "primary-button", href: data.personalInfo.resume, download: true }, React.createElement(Icon, { name: "download" }), "Download Resume"),
          React.createElement("a", { className: "secondary-button", href: "#about" }, "View Profile"),
          React.createElement("a", { className: "ghost-button", href: "#contact" }, "Contact Me")
        ),
        React.createElement("div", { className: "find-row" },
          React.createElement("span", null, "Find me on"),
          React.createElement(Socials)
        )
      ),
      React.createElement("div", { className: "orbit-stage reveal is-visible" },
        React.createElement("div", { className: "orbit orbit-one" }),
        React.createElement("div", { className: "orbit orbit-two" }),
        React.createElement("div", { className: "profile-ring" },
          React.createElement("img", { className: "profile-photo", src: data.personalInfo.profileImage, alt: "Sumit Sharma" })
        ),
        [
          { label: "Flutter", icon: "flutter" },
          { label: "Firebase", icon: "firebase" },
          { label: "Dart", icon: "dart" },
          { label: "GitHub", icon: "github" },
          { label: "Swift", icon: "swift" },
          { label: "Web3", icon: "web3" }
        ].map((item, index) =>
          React.createElement("div", { key: item.label, className: `orbit-chip orbit-chip-${index + 1}`, title: item.label, "aria-label": item.label }, React.createElement(Icon, { name: item.icon }))
        )
      )
    )
  );
}

function About() {
  return React.createElement("section", { id: "about", className: "section split-section" },
    React.createElement("div", { className: "container about-layout" },
      React.createElement("div", { className: "about-copy reveal" },
        React.createElement(SectionHeader, { eyebrow: "About Me", title: "Building Solutions, Scalable & Future-Ready", centered: false }),
        React.createElement("p", null, data.about),
        React.createElement("ul", { className: "check-list" },
          ["Enterprise-grade application development", "Clean Architecture MVVM and scalable solutions", "Riverpod, Provider, Firebase, REST APIs and local storage", "Web3, crypto wallet and payment workflow integration", "Cross-platform Android, iOS, macOS and Windows delivery"].map((point) => React.createElement("li", { key: point }, point))
        )
      ),
      React.createElement("div", { className: "metric-grid reveal" },
        data.stats.map((stat) => React.createElement("article", { className: "metric-card", key: stat.label },
          React.createElement("div", { className: "metric-icon" }, React.createElement(Icon, { name: stat.icon })),
          React.createElement("strong", null, stat.value),
          React.createElement("span", null, stat.label)
        ))
      )
    )
  );
}

function Skills() {
  const flatSkills = ["Flutter", "Dart", "Clean Architecture", "Riverpod", "Provider", "Firebase", "REST APIs", "WebSockets", "Socket.IO", "Hive", "SQLite", "Sqflite", "Swift Integration", "PaybisMobile", "WalletConnect", "Git / GitHub"];
  return React.createElement("section", { id: "skills", className: "section" },
    React.createElement("div", { className: "container" },
      React.createElement(SectionHeader, { eyebrow: "Skills", title: "Tools & Technologies" }),
      React.createElement("div", { className: "tool-grid" },
        flatSkills.map((skill, index) => React.createElement("article", { className: "tool-card reveal", style: { "--delay": `${index * 35}ms` }, key: skill },
          React.createElement("div", { className: "small-icon" }, React.createElement(Icon, { name: data.skills[index % data.skills.length].icon })),
          React.createElement("span", null, skill)
        ))
      )
    )
  );
}

function Experience() {
  return React.createElement("section", { id: "experience", className: "section panel-section" },
    React.createElement("div", { className: "container" },
      React.createElement(SectionHeader, { eyebrow: "Experience", title: "My Professional Journey" }),
      React.createElement("div", { className: "timeline" },
        data.experience.map((item, index) => React.createElement("article", { className: "timeline-card reveal", style: { "--delay": `${index * 90}ms` }, key: item.role },
          React.createElement("div", { className: "timeline-dot" }),
          React.createElement("div", { className: "timeline-icon" }, React.createElement(Icon, { name: index === 0 ? "briefcase" : "wallet" })),
          React.createElement("div", { className: "timeline-content" },
            React.createElement("div", { className: "timeline-title" },
              React.createElement("div", null,
                React.createElement("h3", null, item.role),
                React.createElement("p", { className: "company" }, item.company)
              ),
              React.createElement("span", { className: "date-pill" }, item.duration)
            ),
            React.createElement("ul", null, item.highlights.map((point) => React.createElement("li", { key: point }, point)))
          )
        ))
      )
    )
  );
}

function Projects() {
  const projects = data.projects;
  return React.createElement("section", { id: "projects", className: "section panel-section" },
    React.createElement("div", { className: "container" },
      React.createElement(SectionHeader, { eyebrow: "Projects", title: "Featured Projects" }),
      React.createElement("div", { className: "projects-grid" },
        projects.map((project, index) => React.createElement("article", { className: "project-card reveal", style: { "--delay": `${index * 45}ms` }, key: `${project.title}-${index}` },
          React.createElement("div", { className: "project-shot" }, React.createElement(Icon, { name: project.icon })),
          React.createElement("span", { className: "category" }, project.category),
          React.createElement("h3", null, project.title),
          React.createElement("p", null, project.summary),
        ))
      )
    )
  );
}

function OpenSource() {
  return React.createElement("section", { id: "open-source", className: "section" },
    React.createElement("div", { className: "container" },
      React.createElement(SectionHeader, { eyebrow: "Open Source", title: "Contributing to the Community" }),
      React.createElement("div", { className: "package-grid" },
        data.packages.map((pkg, index) => React.createElement("article", { className: "package-card reveal", style: { "--delay": `${index * 70}ms` }, key: pkg.name },
          React.createElement("div", { className: "card-icon" }, React.createElement(Icon, { name: pkg.icon })),
          React.createElement("h3", null, pkg.name),
          React.createElement("p", null, pkg.description),
          React.createElement("div", { className: "mini-stats" },
            React.createElement("span", null, "2.1K"),
            React.createElement("span", null, "124")
          ),
          React.createElement("div", { className: "package-actions" },
            React.createElement("a", { href: pkg.pubdev }, "Pub.dev"),
            React.createElement("a", { href: pkg.github, "aria-label": "GitHub" }, React.createElement(Icon, { name: "github" }))
          )
        ))
      ),
      React.createElement("div", { className: "center-actions" }, React.createElement("a", { className: "secondary-button", href: data.personalInfo.github }, "View All Packages"))
    )
  );
}

function Interests() {
  return React.createElement("section", { id: "interests", className: "section compact-section" },
    React.createElement("div", { className: "container" },
      React.createElement(SectionHeader, { eyebrow: "Interests", title: "Beyond Code" }),
      React.createElement("div", { className: "interest-grid" },
        data.interests.map((interest, index) => React.createElement("article", { className: "interest-card reveal", style: { "--delay": `${index * 55}ms` }, key: interest.title },
          React.createElement("div", { className: "card-icon" }, React.createElement(Icon, { name: interest.icon })),
          React.createElement("h3", null, interest.title),
          React.createElement("p", null, interest.text)
        ))
      )
    )
  );
}

function Contact() {
  const info = data.personalInfo;
  return React.createElement("section", { id: "contact", className: "section contact-section" },
    React.createElement("div", { className: "container contact-grid" },
      React.createElement("div", { className: "contact-copy reveal" },
        React.createElement(SectionHeader, { eyebrow: "Contact", title: "Let's Build Something Amazing", centered: false }),
        React.createElement("p", null, "I'm always open to discussing new opportunities, collaborations, or interesting projects."),
        React.createElement("a", { href: "#" }, info.location),
        React.createElement("a", { href: `mailto:${info.email}` }, info.email),
        React.createElement("a", { href: info.github }, "sumit-home2904"),
        React.createElement("a", { href: info.linkedin }, "sumitsharma2904"),
        React.createElement(Socials)
      ),
      React.createElement("form", { className: "contact-form reveal", onSubmit: (event) => event.preventDefault() },
        ["Your Name", "Your Email", "Subject"].map((label) => React.createElement("input", { key: label, type: label.includes("Email") ? "email" : "text", placeholder: label })),
        React.createElement("textarea", { rows: 6, placeholder: "Your Message" }),
        React.createElement("button", { type: "submit" }, "Send Message", React.createElement(Icon, { name: "arrow" }))
      )
    )
  );
}

function Footer() {
  return React.createElement("footer", { className: "footer" },
    React.createElement("div", { className: "container footer-inner" },
      React.createElement("a", { className: "brand footer-brand", href: "#home" },
        React.createElement("span", { className: "brand-mark" }, "S"),
        React.createElement("span", null, "Sumit Sharma")
      ),
      React.createElement("p", null, "Senior Flutter Developer"),
      React.createElement("p", null, "© 2025 Sumit Sharma. Built with Flutter & Passion")
    )
  );
}

function App() {
  useReveal();
  return React.createElement(React.Fragment, null,
    React.createElement(Navbar),
    React.createElement(Hero),
    React.createElement(About),
    React.createElement(Skills),
    React.createElement("div", { className: "dashboard-grid" },
      React.createElement(Experience),
      React.createElement(Projects)
    ),
    React.createElement(OpenSource),
    React.createElement(Interests),
    React.createElement(Contact),
    React.createElement(Footer)
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
