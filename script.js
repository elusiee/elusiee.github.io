fetch('data.json')
  .then(response => response.json())
  .then(data => {
    document.querySelector('title').textContent = data.title;
    document.querySelector('.navbar-translate .navbar-brand').setAttribute('href', data.profile.socials.github);
    document.querySelector('.navbar-translate .navbar-brand').textContent = data.title;
    document.querySelector('div.h2.title').textContent = data.profile.name;

    // NAV BAR
    const navbarNav = document.querySelector('.navbar-nav');
    const navItems = `
      ${data.nav.home}
      ${data.nav.about}
      ${data.nav.skills}
      ${data.nav.projects}
      ${data.nav.experience}
      ${data.nav.contact}
      ${data.nav.resume}
    `;
    navbarNav.innerHTML = navItems;

    // Update the image src dynamically
    const profileImage = document.querySelector('.cc-profile-image img');
    profileImage.setAttribute('src', data.profile.profileImage);
    
    // Optional: Update the alt attribute if needed
    profileImage.setAttribute('alt', data.profile.altText || 'Profile Image');

    // Update the title and category
    document.querySelector('.h2.title').textContent = data.profile.name;
    document.querySelector('.category.text-white').textContent = data.profile.role;
    
    // Update the "Download CV" button
    const downloadCVButton = document.querySelector('a.btn.btn-primary[download]');
    downloadCVButton.setAttribute('href', data.profile.resume);
    downloadCVButton.textContent = 'Download Resume';
    
    // Update social media links
    const socialLinks = data.profile.socials;
    document.querySelector('a[title="facebook"]').setAttribute('href', socialLinks.facebook);
    document.querySelector('a[title="whatsapp"]').setAttribute('href', socialLinks.whatsapp);
    document.querySelector('a[title="linkedin"]').setAttribute('href', socialLinks.linkedin);
    document.querySelector('a[title="Github"]').setAttribute('href', socialLinks.github);

    // Update the "About" section
    const aboutTitle = document.querySelector('#about .h4.title');
    const aboutDescription = document.querySelector('#about .card-body p');

    // Update the title and description
    aboutTitle.textContent = "About Me";
    aboutDescription.textContent = data.profile.bio;

    // Update the "Basic Information" section
    const contactEmail = document.querySelector('.basic-info-email');
    const contactPhone = document.querySelector('.basic-info-phone');
    const contactAddress = document.querySelector('.basic-info-address');
    const contactLanguages = document.querySelector('.basic-info-languages');

    // Update the email, phone, and location 
    contactEmail.textContent = data.profile.contact.email;
    contactPhone.textContent = data.profile.contact.phone;
    contactAddress.textContent = data.profile.contact.address;
    contactLanguages.textContent = data.profile.contact.languages.join(', ');

    // Update the "My Tech Stack" section
    const stacks = data.stacks;
    const stackContainer = document.querySelector('#skill .card-body');

    stackContainer.innerHTML = '';

    for (let i = 0; i < stacks.length; i += 2) {
      const row = document.createElement('div');
      row.className = 'row';

      [stacks[i], stacks[i + 1]].forEach(stack => {
        if (!stack) return;

        const col = document.createElement('div');
        col.className = 'col-md-6';

        col.innerHTML = `
          <div class="progress-container progress-primary">
            <span class="progress-badge">${stack.name}</span>
            <div class="progress">
              <div
                class="progress-bar progress-bar-primary"
                data-aos="progress-full"
                data-aos-offset="10"
                data-aos-duration="2000"
                role="progressbar"
                aria-valuenow="${parseInt(stack.level)}"
                aria-valuemin="0"
                aria-valuemax="100"
                style="width: ${stack.level};"
              ></div>
              <span class="progress-value">${stack.level}</span>
            </div>
          </div>
        `;

        row.appendChild(col);
      });

      stackContainer.appendChild(row);
    }


    // Update the "Skills" section
    const skills = data.skills;
    const container = document.querySelector('.row.justify-content-xl-center');

    // Clear existing cards
    container.innerHTML = '';

    // Generate each card dynamically
    skills.forEach(skill => {
      const col = document.createElement('div');
      col.className = 'col-12 col-sm-6 col-xl-5';

      // Extract numeric value for aria-valuenow and class width
      const value = parseInt(skill.level);

      col.innerHTML = `
        <div class="bg-white rounded shadow-sm p-3 p-md-4 p-xxl-5">
          <h3 class="fw-bold mb-2">${skill.name}</h3>
          <p class="text-secondary fst-italic mb-4">${skill.comment}</p>
          <div class="progress">
            <div
              class="progress-bar w-${value} progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-label="${skill.name}"
              aria-valuenow="${value}"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              ${skill.level}
            </div>
          </div>
        </div>
      `;

      container.appendChild(col);
    });


    // Update the "Projects" section
    // Update the "Featured Projects" section
    const projects = data.projects;
    const projectSection = document.querySelector('#project');

    // Clear old rows if they exist
    projectSection.querySelectorAll('.row').forEach(row => row.remove());

    for (let i = 0; i < projects.length; i += 2) {
      const row = document.createElement('div');
      row.className = 'row mb-4';

      [projects[i], projects[i + 1]].forEach(project => {
        if (!project) return;

        const col = document.createElement('div');
        col.className = 'col-sm-6';

        const demoUrl = project.demo && project.demo !== 'None' ? project.demo : null;
        const githubUrl = project.github;

        col.innerHTML = `
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">${project.title}</h5>
              <p class="card-text">${project.description}</p>
              <h5>Tech Stack Used:</h5>
              <p>${project.techStack}</p>
              <div class="d-flex flex-wrap gap-2">
                ${demoUrl ? `<a href="${demoUrl}" target="_blank" class="btn btn-primary">Live Demo</a>` : '<button class="btn btn-secondary" disabled>No Demo</button>'}
                <a href="${githubUrl}" target="_blank" class="btn btn-primary">GitHub Repository</a>
              </div>
            </div>
          </div>
        `;

        row.appendChild(col);
      });

      projectSection.appendChild(row);
    }

    // Update the "Education" section
        const educationSection = document.querySelector("#education .container.cc-education");

    // Clear any existing content after the title
    const title = educationSection.querySelector('.title');
    while (title.nextElementSibling) {
      title.nextElementSibling.remove();
    }

    // Loop through education data and generate cards
    data.education.forEach(entry => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="row">
          <div class="col-md-3 bg-primary" data-aos="fade-right" data-aos-offset="50" data-aos-duration="500">
            <div class="card-body cc-education-header">
              <p>${entry.duration}</p>
              <div class="h5">${entry.level}</div>
            </div>
          </div>
          <div class="col-md-9" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500">
            <div class="card-body">
              <div class="h5">${entry.field}</div>
              <p class="category">${entry.institution}</p>
              <p class="category">${entry.department}</p>
              <h4>Degree Obtained : ${entry.degree}</h4>
            </div>
          </div>
        </div>
      `;
      educationSection.appendChild(card);
    });

    // Update the "Experience" section
    const experienceSection = document.querySelector("#experience .container.cc-experience");

    // Clear any existing cards after the title
    const expTitle = experienceSection.querySelector('.title');
    while (expTitle.nextElementSibling) {
      expTitle.nextElementSibling.remove();
    }

    // Loop through experience data and generate cards
    data.experience.forEach(entry => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="row">
          <div class="col-md-3 bg-primary" data-aos="fade-right" data-aos-offset="50" data-aos-duration="500">
            <div class="card-body cc-experience-header">
              <p>${entry.period}</p>
              <div class="h5">${entry.company}</div>
            </div>
          </div>
          <div class="col-md-9" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500">
            <div class="card-body">
              <div class="h5">${entry.role}</div>
              <p>${entry.description}</p>
            </div>
          </div>
        </div>
      `;
      experienceSection.appendChild(card);
    });

    // Update the "Contact" section
    document.addEventListener("DOMContentLoaded", () => {
      const contact = data.profile.contact;
    
      // Update Address
      const addressEl = document.getElementById("contact-address");
      if (addressEl) addressEl.textContent = contact.address;
    
      // Update Phone
      const phoneEl = document.getElementById("contact-phone");
      if (phoneEl) phoneEl.textContent = contact.phone;
    
      // Update Email
      const emailEl = document.getElementById("contact-email");
      if (emailEl) emailEl.textContent = contact.email;
    });

    // Update the "Footer Section"
    document.addEventListener("DOMContentLoaded", () => {
      // Set footer name
      const footerName = document.getElementById("footer");
      if (footerName) {
        footerName.textContent = data.profile.name;
      }
    
      // Set copyright
      const footerCopyright = document.getElementById("footer-copyright");
      if (footerCopyright) {
        footerCopyright.textContent = `©${data.profile.name}. All rights reserved. ${new Date().getFullYear()}`;
      }
    });

    // Update the "Github Calendar"
    document.addEventListener("DOMContentLoaded", () => {
      const username = data.profile.github.username;
      const calendarEl = document.getElementById("githubCalender");
    
      if (calendarEl) {
        GitHubCalendar(".calendar", username, {
          responsive: true
        });
      }
    });

    // Update the "Github Analytics"
    document.addEventListener("DOMContentLoaded", () => {
      const username = data.profile.github.username;
      const theme = data.profile.github.theme;
    
      const statsImg = document.getElementById("github-stats");
      const langsImg = document.getElementById("github-langs");
    
      if (statsImg) {
        statsImg.src = `https://github-readme-stats.vercel.app/api?username=${username}&theme=${theme}&show_icons=true`;
      }
    
      if (langsImg) {
        langsImg.src = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&theme=${theme}&layout=compact`;
      }
    });
    
    


});