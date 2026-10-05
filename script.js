/*
====================================================
NOVA FRONTEND JAVASCRIPT
====================================================

This file:

1. Loads database.json
2. Displays database information
3. Creates features dynamically
4. Creates pricing cards dynamically
5. Creates testimonials dynamically
6. Creates FAQ dynamically
7. Creates dashboard statistics
8. Controls mobile navigation
9. Controls FAQ accordion
10. Controls scroll-to-top button

====================================================
*/


// ================================================
// LOAD DATABASE
// ================================================

async function loadDatabase() {

    try {

        const response =
            await fetch("database.json");

        if (!response.ok) {
            throw new Error(
                "Could not load database.json"
            );
        }

        const database =
            await response.json();


        // Load every section

        loadSite(database);

        loadDashboard(database);

        loadCompanies(database);

        loadFeatures(database);

        loadPricing(database);

        loadTestimonials(database);

        loadFAQ(database);


    } catch (error) {

        console.error(error);

        showDatabaseError();

    }

}


// ================================================
// SITE INFORMATION
// ================================================

function loadSite(database) {

    const site =
        database.site;


    document.title =
        site.title;


    document.getElementById(
        "heroBadge"
    ).textContent =
        site.badge;


    document.getElementById(
        "heroTitle"
    ).innerHTML =
        site.heroTitle;


    document.getElementById(
        "heroDescription"
    ).textContent =
        site.heroDescription;


    document.getElementById(
        "logo"
    ).innerHTML =
        site.logo;


    document.getElementById(
        "footerDescription"
    ).textContent =
        site.footerDescription;


    document.getElementById(
        "copyright"
    ).textContent =
        "© " +
        site.year +
        " " +
        site.name +
        ". All rights reserved.";

}


// ================================================
// DASHBOARD
// ================================================

function loadDashboard(database) {

    const dashboard =
        database.dashboard;


    document.getElementById(
        "dashboardAvatar"
    ).textContent =
        dashboard.avatar;


    const stats =
        document.getElementById(
            "stats"
        );


    stats.innerHTML = "";


    dashboard.stats.forEach(
        stat => {

            stats.innerHTML += `

                <div class="stat">

                    <small>
                        ${escapeHTML(stat.label)}
                    </small>

                    <strong>
                        ${escapeHTML(stat.value)}
                    </strong>

                </div>

            `;

        }
    );


    const chart =
        document.getElementById(
            "chart"
        );


    chart.innerHTML = "";


    dashboard.chart.forEach(
        value => {

            chart.innerHTML += `

                <div
                    class="bar"
                    style="height:${Number(value)}%"
                ></div>

            `;

        }
    );

}


// ================================================
// COMPANIES
// ================================================

function loadCompanies(database) {

    const container =
        document.getElementById(
            "logos"
        );


    container.innerHTML = "";


    database.companies.forEach(
        company => {

            const span =
                document.createElement(
                    "span"
                );


            span.textContent =
                company;


            container.appendChild(span);

        }
    );

}


// ================================================
// FEATURES
// ================================================

function loadFeatures(database) {

    const container =
        document.getElementById(
            "featuresGrid"
        );


    container.innerHTML = "";


    database.features.forEach(
        feature => {

            container.innerHTML += `

                <article class="feature-card">

                    <div class="feature-icon">
                        ${feature.icon}
                    </div>

                    <h3>
                        ${escapeHTML(feature.title)}
                    </h3>

                    <p>
                        ${escapeHTML(feature.description)}
                    </p>

                </article>

            `;

        }
    );

}


// ================================================
// PRICING
// ================================================

function loadPricing(database) {

    const container =
        document.getElementById(
            "pricingGrid"
        );


    container.innerHTML = "";


    database.pricing.forEach(
        plan => {

            const popular =
                plan.popular === true;


            container.innerHTML += `

                <article
                    class="price-card
                    ${popular ? "popular" : ""}"
                >

                    ${
                        popular
                        ?
                        `
                        <div class="popular-label">
                            MOST POPULAR
                        </div>
                        `
                        :
                        ""
                    }


                    <h3>
                        ${escapeHTML(plan.name)}
                    </h3>


                    <p>
                        ${escapeHTML(plan.description)}
                    </p>


                    <div class="price">

                        ${escapeHTML(plan.price)}

                        <span>
                            ${escapeHTML(plan.period)}
                        </span>

                    </div>


                    <a
                        href="#"
                        class="btn
                        ${popular
                            ? "btn-primary"
                            : "btn-outline"}"
                    >
                        ${escapeHTML(plan.button)}
                    </a>


                    <ul class="price-features">

                        ${
                            plan.features
                                .map(
                                    feature =>
                                        `
                                        <li>
                                            ✓
                                            ${escapeHTML(feature)}
                                        </li>
                                        `
                                )
                                .join("")
                        }

                    </ul>

                </article>

            `;

        }
    );

}


// ================================================
// TESTIMONIALS
// ================================================

function loadTestimonials(database) {

    const container =
        document.getElementById(
            "testimonialGrid"
        );


    container.innerHTML = "";


    database.testimonials.forEach(
        testimonial => {

            container.innerHTML += `

                <article class="testimonial">

                    <div class="stars">
                        ${"★".repeat(
                            Number(testimonial.rating)
                        )}
                    </div>


                    <p>
                        "${escapeHTML(
                            testimonial.text
                        )}"
                    </p>


                    <div class="person">

                        <div class="person-avatar">

                            ${escapeHTML(
                                testimonial.initials
                            )}

                        </div>


                        <div>

                            <strong>
                                ${escapeHTML(
                                    testimonial.name
                                )}
                            </strong>

                            <small>
                                ${escapeHTML(
                                    testimonial.role
                                )}
                            </small>

                        </div>

                    </div>

                </article>

            `;

        }
    );

}


// ================================================
// FAQ
// ================================================

function loadFAQ(database) {

    const container =
        document.getElementById(
            "faqContainer"
        );


    container.innerHTML = "";


    database.faq.forEach(
        item => {

            container.innerHTML += `

                <div class="faq-item">

                    <button
                        class="faq-question"
                    >

                        ${escapeHTML(
                            item.question
                        )}

                        <span>
                            +
                        </span>

                    </button>


                    <div class="faq-answer">

                        <p>
                            ${escapeHTML(
                                item.answer
                            )}
                        </p>

                    </div>

                </div>

            `;

        }
    );


    setupFAQ();

}


// ================================================
// FAQ ACCORDION
// ================================================

function setupFAQ() {

    const questions =
        document.querySelectorAll(
            ".faq-question"
        );


    questions.forEach(
        question => {

            question.addEventListener(
                "click",
                () => {

                    const item =
                        question.parentElement;


                    const answer =
                        item.querySelector(
                            ".faq-answer"
                        );


                    document
                        .querySelectorAll(
                            ".faq-item"
                        )
                        .forEach(
                            other => {

                                if (
                                    other !== item
                                ) {

                                    other.classList
                                        .remove(
                                            "active"
                                        );


                                    other.querySelector(
                                        ".faq-answer"
                                    ).style.maxHeight =
                                        null;

                                }

                            }
                        );


                    item.classList.toggle(
                        "active"
                    );


                    if (
                        item.classList.contains(
                            "active"
                        )
                    ) {

                        answer.style.maxHeight =
                            answer.scrollHeight +
                            "px";

                    } else {

                        answer.style.maxHeight =
                            null;

                    }

                }
            );

        }
    );

}


// ================================================
// MOBILE MENU
// ================================================

const menuButton =
    document.getElementById(
        "menuBtn"
    );


const navbar =
    document.getElementById(
        "navbar"
    );


menuButton.addEventListener(
    "click",
    () => {

        navbar.classList.toggle(
            "mobile-open"
        );


        document.body.classList.toggle(
            "menu-open"
        );


        if (
            navbar.classList.contains(
                "mobile-open"
            )
        ) {

            menuButton.textContent =
                "✕";

        } else {

            menuButton.textContent =
                "☰";

        }

    }
);


// ================================================
// CLOSE MOBILE MENU
// ================================================

document
    .querySelectorAll(
        ".nav-links a"
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    navbar.classList.remove(
                        "mobile-open"
                    );

                    document.body.classList.remove(
                        "menu-open"
                    );

                    menuButton.textContent =
                        "☰";

                }
            );

        }
    );


// ================================================
// SCROLL TOP
// ================================================

const scrollTop =
    document.getElementById(
        "scrollTop"
    );


window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 500
        ) {

            scrollTop.classList.add(
                "show"
            );

        } else {

            scrollTop.classList.remove(
                "show"
            );

        }

    }
);


scrollTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


// ================================================
// DATABASE ERROR
// ================================================

function showDatabaseError() {

    document.body.innerHTML = `

        <div style="
            min-height:100vh;
            display:flex;
            align-items:center;
            justify-content:center;
            background:#0f172a;
            color:white;
            font-family:Arial;
            text-align:center;
            padding:30px;
        ">

            <div>

                <h1>
                    Database Error
                </h1>

                <p style="
                    color:#94a3b8;
                    margin-top:10px;
                ">
                    Could not load database.json.
                    Make sure database.json is in
                    the same folder as index.html.
                </p>

            </div>

        </div>

    `;

}


// ================================================
// SECURITY HELPER
// ================================================

function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


// ================================================
// START APPLICATION
// ================================================

loadDatabase();