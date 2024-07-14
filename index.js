document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.getElementById("main-content");

    // Load the initial component (home)
    loadComponent("home");

    // Event listener for nav links
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const component = event.target.getAttribute('data-link');
            loadComponent(component);
        });
    });

    function loadComponent(component) {
        let filePath;
        switch (component) {
            case "home":
                mainContent.innerHTML = `
                    <div class="link-container">
                        <div class="gitHubVariable green"> String </div>
                        <div class="gitHubVariable orange"> gitHubLink </div>
                        <div class="gitHubVariable"> = </div>
                        <div class="gitHubVariable purple"> "<a href="https://github.com/fathsam82" target="_blank" rel="noopener noreferrer">https://github.com/fathsam82</a>"; </div>
                        <div class="social-card">
                            <a href="https://www.linkedin.com/in/sam-fath" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-linkedin"></i> LinkedIn
                            </a>
                        </div>
                        <div id="technologies">
                            <!-- Technologies will be loaded here -->
                        </div>
                    </div>`;
                displayTechnologies();
                break;
            case "aboutme":
                fetch("components/aboutme.html")
                    .then(response => response.text())
                    .then(data => {
                        mainContent.innerHTML = data;
                        initializeAboutMeComponent();
                    })
                    .catch(error => console.error('Error loading component:', error));
                break;
            case "projects":
                filePath = "components/projects.html";
                break;
            case "contact":
                filePath = "components/contact.html";
                break;
            default:
                return;
        }
        if (filePath) {
            fetch(filePath)
                .then(response => response.text())
                .then(data => mainContent.innerHTML = data)
                .catch(error => console.error('Error loading component:', error));
        }
    }

    function initializeAboutMeComponent() {
        const folderIcons = document.querySelectorAll('.folder-icon');
        
        folderIcons.forEach(folderIcon => {
            folderIcon.addEventListener('click', function() {
                const folder = this.getAttribute('data-folder');
                const fileItems = document.querySelector(`.file-items.${folder}`);
                const isOpen = fileItems.style.display === 'flex';
    
                // Hide all file items before clickEvent
                document.querySelectorAll('.file-items').forEach(item => {
                    item.style.display = 'none';
                });
    
                if (!isOpen) {
                    fileItems.style.display = 'flex';
                }
            });
        });
    
        // Event listener for clicking file items in the sidebar
        document.querySelectorAll('.file-item').forEach(item => {
            item.addEventListener('click', event => {
                const file = item.getAttribute('data-file');
                loadFileContent(file);
            });
        });
    
        // Expand the personal folder and load the bio content by default
        document.querySelector('.folder-icon[data-folder="personal"]').click();
        document.querySelector('.file-item[data-file="bio"]').click();
    }

    function loadFileContent(file) {
        const fileContent = document.getElementById('file-content');
        switch (file) {
            case 'bio':
                fileContent.innerHTML = `
                    <p>Sam was born in Cincinnati, Ohio in January of 1995. They grew up in West Chester, Ohio. It was the summer after sixth grade when they found an old skateboard in their friend's garage and fell in love with it. Skateboarding taught Sam to always get back up after you fall, and try again. Throughout high school, they were fascinated by science. After reading Stephen Hawking's 'A Brief History of Time' and 'The Universe in a Nutshell', their understanding of the universe deepened, and their perspective on how everything works was altered.</p>
                    <p>After high school, they took road trips around the Western United States to visit Yellowstone, Glacier, Olympic, Redwood, Yosemite, Zion, Canyonlands, Arches, and Rocky Mountain National Parks. They realized how much of a privilege it was to live in the United States, appreciating how extraordinary and diverse its ecosystems and people are. This instilled a passion for environmental advocacy.</p>
                    <p>They knew a place with an abundance of outdoor recreational activities had to be their new home, so in 2016, they moved to Colorado. After building a PC in 2019, they became curious about the universe inside these machines. Recognizing that the electromagnetic forces that control relations between particles and the principles that guide the transmission of signals through circuits were governed by the same laws was just another astonishing epiphany that helped Sam understand how everything is connected.</p>
                    <p>Sam went from learning about ordinary science to hardware to software! Their passion for learning lead them to pursue a higher education.</p>
                `;
                break;
                case 'education':
                    fileContent.innerHTML = `
                        <p>In May 2023, I decided to further my understanding of programming and enrolled in a Java bootcamp by Skill Distillery. It was a full-time, 16-week cohort where I spent more than 800 hours learning full-stack web development with Java. The program was project-focused, full of pair programming and late-night problem-solving.</p>
                        <p>The initial weeks of the course focused on Java programming fundamentals. We covered a range of topics, from pair programming principles to nested for loops. One of our first projects was the "Change Maker." This involved inputting an item price and the amount tendered into the console. The program would then calculate and display the change in each dollar and coin denomination. For this project, I wrote a method to calculate the change by taking the difference between the money tendered and the item price. Using modulus operators, I determined the remainder for each denomination and updated the parameter.</p>
                        <p>In the next couple of weeks, we focused on OOP with Java. To practice this, we were assigned a project each weekend to complete. My favorite was the "Jets" project. We had a fleet of Jets, each with a type, model, speed, range, and price listed within a text file in the project directory. I used a BufferedReader to read each line of the text file and declare each attribute as a variable type. The user is given a menu with options to add jets to the fleet, list the fleet of jets, calculate the time the jet can fly based on speed and range attributes, etc.</p>
                        <p>Nearing the halfway point in the cohort, I learned about garbage collection, the JVM, and debugging. We moved on to Java Libraries, dates, times, enums, and lambdas. With the knowledge I had cultivated so far, I completed my next project, "BlackJack". Each suite was an enum. We practiced using inheritance to build classes with objects as attributes, organizing data using collections, and creating game logic with conditionals.</p>
                        <p>Next, we took practice Oracle Certified Associate exams individually and together as a cohort. I learned about standard protocols of the global network, the client-server model, and HTML and CSS basics. I created an AWS EC2 instance on my personal machine. I then installed the Apache HTTPD web server on my instance.</p>
                        <p>We were introduced to Spring MVC and MySQL databases to call methods in a controller class. We incorporated TDD using JUnit and JPA in all of our projects moving forward. Using Hibernate, we managed the connection to MySQL while we used JPA to translate from SQL to Java and back. For my project, I used JPQL to deal with the entities and properties. We combined Java into HTML using JSP files. I created a program for mountains over fourteen thousand feet in Colorado, where a user could search for and display attributes for mountains.</p>
                        <p>We then traversed the landscape of RESTful services and Spring Data JPA leveraging JPA repositories, service interfaces, implementation classes for logic, and controllers. From here on, we tested all of our endpoints using Postman. I created an event tracker project to keep track of my dog Milo's schedule. For the front-end, I wrote both a JavaScript and an Angular version.</p>
                        <p>From there, we scratched the surface of Spring Security to integrate into our next project, a simple to-do list. I created a user object and used base-64 encoding to protect the user's password in the database. Using RESTful services with Spring Data JPA, I sent requests from my Angular front-end using the RXJS library. We covered pipes, routing, deploying, authentication, among other tools of the Angular framework.</p>
                        <p>Both my Midterm project and my Final project have detailed READMEs on GitHub. A link is on my home page. Since school, I have reviewed everything I learned there, extensively. Working on personal projects since then has not only been a learning experience but also very rewarding. Creating a finished project, solving bugs after hours of troubleshooting and problem-solving has been extremely fulfilling.</p>
                        <p>During my 16 weeks there, I learned more than I thought I was capable of learning. The program not only taught me the basics of how to learn languages and the mechanics that come with them, but it also gave me the confidence to take on software engineering roles across the industry.</p>
                    `;
                    break;

               
            case 'programming':
                fileContent.innerHTML = `
                    <p>I have always tackled problems head-on. Whether it was taking apart my washing machine to figure out why water wasn't draining or dissecting my nearly decade-old PlayStation 4 to clean the dust out of the fans. I've always enjoyed taking things apart and putting them back together for fun.</p>
                    <p>I realized that I could build my own applications, dissect each line of code, and perceive it as a machine, with each component comprising variables, constructors, loops, conditions, and logic, all working in unison to create something extraordinary! As I keep learning more, I appreciate the freedom in creating programs without being constrained by the limitations of pre-existing applications.</p>
                    <p>My favorite aspect of programming is that there's always a way. With an ordinary toolset, anyone can create anything they envision and solve any problem they set their mind to. Most exiting to me is the perpetual nature of learning and mastering communication between man and machine. There's always more to learn, something new to explore and push the boundries of.</p>
                `;
                break;
            // case 'photography':
            //     fileContent.innerHTML = "<p>Nam non dui vitae lectus fermentum bibendum. Integer sit amet lectus at urna hendrerit aliquet ut vel libero. Sed ut dui id arcu vestibulum sodales. Phasellus vel tortor eu ex sagittis fermentum.</p>";
            //     break;
            case 'recreation':
                fileContent.innerHTML = `
                    <p>When I'm not programming or practicing me leetcode algorithms, you can find me in the mountains. Living near the foothills of the front range, I take every opportunity to wander into the mountains. Nearly 6 years ago, I climbed my first fourteen-thousand-foot mountain. With my knees about to give out right below the peak of Mt.Quandary, I miraculously found the strength to make it to the peak. Although it was one of the most physically demanding things I've ever done, it was also one of the most gratifying. The 360 panoramic view from the top of the mountain was unlike anything I'd ever experienced!</p>
                    <p>The great outdoors always gives me a sense of serenity. To me, nothing is quite inspiring as a hike through the mountains.</p>
                `;
                break;
            default:
                fileContent.innerHTML = "<p>Content not found.</p>";
                break;
        }
    }
    

    function displayTechnologies() {
        const technologies = [
            { name: 'mySQL', icon: 'images-icons/mysqltwo.svg' },
            { name: 'Java', icon: 'fa-java' },
            { name: 'Spring Boot', icon: 'images-icons/spring-boot.svg' },
            { name: 'Postman', icon: 'images-icons/postman (1).svg'},
            { name: 'TypeScript', icon: 'images-icons/typescript.svg' },
            { name: 'JavaScript', icon: 'fa-js' },
            { name: 'ThreeJS', icon: 'images-icons/brand-threejs.svg' },
            { name: 'Angular', icon: 'fa-angular' },
            { name: 'NodeJS', icon: 'fa-node-js' },
            { name: 'HTML', icon: 'fa-html5' },
            { name: 'CSS', icon: 'fa-css3-alt' },
            { name: 'AWS', icon: 'fa-aws' },
        ];

        const techContainer = document.getElementById('technologies');
        technologies.forEach(tech => {
            const techItem = document.createElement('div');
            techItem.className = 'tech-item';

            if (tech.icon.endsWith('.svg')) {
                techItem.innerHTML = `<img src="${tech.icon}" class="tech-icon" alt="${tech.name} icon"> ${tech.name}`;
            } else {
                techItem.innerHTML = `<i class="fab ${tech.icon}"></i> ${tech.name}`;
            }
            
            techContainer.appendChild(techItem);
        });
    }
});





