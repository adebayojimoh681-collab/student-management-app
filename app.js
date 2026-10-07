/**
 * STUDENT MANAGEMENT MOBILE APP
 * Core State & UI Logic
 */

(function () {
  'use strict';

  // --- Initial Default Database ---
  const DEFAULT_STUDENT = {
    id: "STU-2024-8842",
    name: "Alex Johnson",
    email: "alex.johnson@campus.edu",
    phone: "+1 (555) 234-8901",
    major: "B.S. Computer Science",
    department: "School of Engineering & Computing",
    year: "3rd Year (Junior)",
    semester: "Fall 2026",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    dob: "October 14, 2004",
    advisor: "Dr. Catherine Bennett",
    emergencyContact: "Martha Johnson (Mother) - +1 (555) 987-6543",
    address: "742 Evergreen Terrace, Campus Village Apt 4B",
    cgpa: 3.84,
    sgpa: 3.88,
    totalCredits: 76,
    targetCredits: 120,
    attendanceRate: 94
  };

  const DEFAULT_COURSES = [
    {
      id: "cs301",
      code: "CS-301",
      title: "Algorithms & Complexity",
      instructor: "Prof. David Miller",
      credits: 4,
      schedule: "Mon & Wed • 10:00 AM - 11:30 AM",
      room: "Turing Hall 102",
      progress: 82,
      attendance: "96%",
      color: "#4f46e5",
      enrolled: true,
      syllabus: [
        "Divide and Conquer Algorithms",
        "Dynamic Programming Paradigms",
        "Greedy Strategies & Graph Flow",
        "NP-Completeness and Reductions"
      ]
    },
    {
      id: "cs315",
      code: "CS-315",
      title: "Database Systems Design",
      instructor: "Prof. Sarah Chen",
      credits: 3,
      schedule: "Tue & Thu • 02:00 PM - 03:30 PM",
      room: "Hopper Lab 204",
      progress: 74,
      attendance: "91%",
      color: "#06b6d4",
      enrolled: true,
      syllabus: [
        "Relational Algebra & Normalization (3NF/BCNF)",
        "Indexing, B+ Trees & Query Optimization",
        "Transactions, ACID, & Concurrency Control",
        "NoSQL Document Stores and Distributed DBs"
      ]
    },
    {
      id: "cs328",
      code: "CS-328",
      title: "Mobile App Development",
      instructor: "Prof. Elena Rostova",
      credits: 4,
      schedule: "Fri • 09:00 AM - 12:00 PM",
      room: "Innovation Hub 301",
      progress: 90,
      attendance: "98%",
      color: "#10b981",
      enrolled: true,
      syllabus: [
        "Mobile UI/UX Design System Guidelines",
        "Component State, Lifecycle & Reactive Events",
        "Native Hardware Sensors & Offline Local Storage",
        "REST API Integration & Production Deployment"
      ]
    },
    {
      id: "math220",
      code: "MATH-220",
      title: "Linear Algebra & Probability",
      instructor: "Prof. James Wilson",
      credits: 3,
      schedule: "Mon & Wed • 01:30 PM - 03:00 PM",
      room: "Gauss Hall 105",
      progress: 68,
      attendance: "90%",
      color: "#8b5cf6",
      enrolled: true,
      syllabus: [
        "Vector Spaces & Matrix Decompositions (SVD)",
        "Eigenvalues, Eigenvectors and Diagonalization",
        "Discrete & Continuous Probability Distributions",
        "Markov Chains and Bayesian Inference"
      ]
    },
    {
      id: "cs410",
      code: "CS-410",
      title: "Artificial Intelligence & ML",
      instructor: "Prof. Marcus Vance",
      credits: 4,
      schedule: "Tue & Thu • 10:00 AM - 11:30 AM",
      room: "AI Lab 402",
      progress: 0,
      attendance: "100%",
      color: "#f59e0b",
      enrolled: false,
      syllabus: [
        "Supervised vs Unsupervised Learning",
        "Deep Neural Networks & Backpropagation",
        "Transformer Architectures & Attention",
        "Reinforcement Learning Fundamentals"
      ]
    },
    {
      id: "cyber301",
      code: "CYBER-301",
      title: "Cybersecurity & Cryptography",
      instructor: "Prof. Alan Sterling",
      credits: 3,
      schedule: "Wed & Fri • 03:30 PM - 05:00 PM",
      room: "Security Lab 110",
      progress: 0,
      attendance: "100%",
      color: "#ef4444",
      enrolled: false,
      syllabus: [
        "Symmetric & Asymmetric Encryption Standards",
        "Public Key Infrastructure (PKI) & TLS",
        "Network Defense, Firewalls & Penetration Testing",
        "Authentication Protocols and Zero Trust"
      ]
    }
  ];

  const DEFAULT_RESULTS = {
    "Fall 2026 (Current)": {
      sgpa: 3.88,
      credits: 14,
      courses: [
        { code: "CS-301", name: "Algorithms & Complexity", credits: 4, internal: 48, exam: 46, total: 94, grade: "A", gpa: 4.0 },
        { code: "CS-315", name: "Database Systems Design", credits: 3, internal: 43, exam: 44, total: 87, grade: "A-", gpa: 3.7 },
        { code: "CS-328", name: "Mobile App Development", credits: 4, internal: 49, exam: 48, total: 97, grade: "A+", gpa: 4.0 },
        { code: "MATH-220", name: "Linear Algebra & Prob.", credits: 3, internal: 42, exam: 43, total: 85, grade: "B+", gpa: 3.3 }
      ]
    },
    "Spring 2026": {
      sgpa: 3.82,
      credits: 16,
      courses: [
        { code: "CS-201", name: "Data Structures", credits: 4, internal: 46, exam: 47, total: 93, grade: "A", gpa: 4.0 },
        { code: "CS-210", name: "Computer Architecture", credits: 4, internal: 42, exam: 43, total: 85, grade: "B+", gpa: 3.3 },
        { code: "MATH-201", name: "Discrete Mathematics", credits: 4, internal: 47, exam: 48, total: 95, grade: "A", gpa: 4.0 },
        { code: "ENG-202", name: "Technical Communication", credits: 4, internal: 45, exam: 45, total: 90, grade: "A", gpa: 4.0 }
      ]
    },
    "Fall 2025": {
      sgpa: 3.78,
      credits: 16,
      courses: [
        { code: "CS-101", name: "Intro to Programming", credits: 4, internal: 48, exam: 49, total: 97, grade: "A+", gpa: 4.0 },
        { code: "MATH-101", name: "Calculus I", credits: 4, internal: 40, exam: 42, total: 82, grade: "B", gpa: 3.0 },
        { code: "PHY-101", name: "Physics for Computing", credits: 4, internal: 44, exam: 43, total: 87, grade: "A-", gpa: 3.7 },
        { code: "HUM-105", name: "Ethics in Technology", credits: 4, internal: 46, exam: 47, total: 93, grade: "A", gpa: 4.0 }
      ]
    }
  };

  const DEFAULT_DEADLINES = [
    { day: "04", month: "Oct", title: "CS-301 Midterm Examination", course: "Algorithms • 10:00 AM", type: "exam" },
    { day: "08", month: "Oct", title: "Mobile App Sprint 2 Submission", course: "CS-328 • 11:59 PM", type: "project" },
    { day: "14", month: "Oct", title: "Database Query Tuning Quiz", course: "CS-315 • 02:00 PM", type: "quiz" },
    { day: "20", month: "Oct", title: "Linear Algebra Homework 4", course: "MATH-220 • 05:00 PM", type: "assignment" }
  ];

  const DEFAULT_NOTIFICATIONS = [
    { title: "Mid-Term Exam Schedule", time: "2 hrs ago", unread: true, text: "Hall tickets and venue allocations for Fall 2026 are now live." },
    { title: "Library Due Reminder", time: "Yesterday", unread: true, text: "Book 'Introduction to Algorithms' due in 3 days." },
    { title: "Fee Receipt Generated", time: "3 days ago", unread: false, text: "Tuition installment payment of $1,400 confirmed." }
  ];

  // --- App State Management ---
  const AppState = {
    isLoggedIn: false,
    activeTab: "dashboard",
    theme: "light",
    student: null,
    courses: [],
    results: {},
    deadlines: [],
    notifications: [],

    init() {
      // Load saved state or default
      const savedAuth = localStorage.getItem("sm_logged_in");
      this.isLoggedIn = savedAuth === "true";

      const savedTheme = localStorage.getItem("sm_theme") || "light";
      this.setTheme(savedTheme);

      const savedStudent = localStorage.getItem("sm_student");
      this.student = savedStudent ? JSON.parse(savedStudent) : DEFAULT_STUDENT;

      const savedCourses = localStorage.getItem("sm_courses");
      this.courses = savedCourses ? JSON.parse(savedCourses) : DEFAULT_COURSES;

      const savedResults = localStorage.getItem("sm_results");
      this.results = savedResults ? JSON.parse(savedResults) : DEFAULT_RESULTS;

      this.deadlines = DEFAULT_DEADLINES;
      this.notifications = DEFAULT_NOTIFICATIONS;
    },

    saveStudent() {
      localStorage.setItem("sm_student", JSON.stringify(this.student));
    },

    saveCourses() {
      localStorage.setItem("sm_courses", JSON.stringify(this.courses));
    },

    setTheme(theme) {
      this.theme = theme;
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("sm_theme", theme);
      const themeToggle = document.getElementById("theme-toggle-checkbox");
      if (themeToggle) {
        themeToggle.checked = theme === "dark";
      }
    }
  };

  // --- UI Toast Helper ---
  function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    let icon = "✓";
    if (type === "error") icon = "✕";
    if (type === "info") icon = "ℹ";

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(-10px)";
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  }

  // --- Render Views ---

  // Header update
  function renderHeader() {
    const s = AppState.student;
    if (!s) return;

    const headerName = document.getElementById("header-user-name");
    const headerAvatar = document.getElementById("header-avatar");
    const notifBadge = document.getElementById("header-notif-badge");

    if (headerName) headerName.textContent = s.name.split(" ")[0];
    if (headerAvatar) headerAvatar.src = s.avatar;
    
    const unreadCount = AppState.notifications.filter(n => n.unread).length;
    if (notifBadge) {
      notifBadge.style.display = unreadCount > 0 ? "block" : "none";
    }
  }

  // 1. Dashboard View
  function renderDashboard() {
    const s = AppState.student;
    if (!s) return;

    // Greeting Banner
    const welcomeName = document.getElementById("dash-welcome-name");
    const dashMajor = document.getElementById("dash-major-text");
    const dashGpa = document.getElementById("dash-cgpa-val");
    const dashCreditPercent = document.getElementById("dash-credit-pct");
    const dashCreditBar = document.getElementById("dash-credit-bar");

    if (welcomeName) welcomeName.textContent = s.name;
    if (dashMajor) dashMajor.textContent = `${s.year} • ${s.major}`;
    if (dashGpa) dashGpa.textContent = s.cgpa.toFixed(2);

    const creditPercent = Math.round((s.totalCredits / s.targetCredits) * 100);
    if (dashCreditPercent) dashCreditPercent.textContent = `${s.totalCredits}/${s.targetCredits} Credits (${creditPercent}%)`;
    if (dashCreditBar) dashCreditBar.style.width = `${creditPercent}%`;

    // Metrics Stats
    const enrolledCourses = AppState.courses.filter(c => c.enrolled);
    const metricCourses = document.getElementById("stat-enrolled-count");
    const metricAttendance = document.getElementById("stat-attendance-val");
    const metricSgpa = document.getElementById("stat-sgpa-val");

    if (metricCourses) metricCourses.textContent = enrolledCourses.length;
    if (metricAttendance) metricAttendance.textContent = `${s.attendanceRate}%`;
    if (metricSgpa) metricSgpa.textContent = s.sgpa.toFixed(2);

    // Deadlines list
    const deadlineList = document.getElementById("dash-deadlines-container");
    if (deadlineList) {
      deadlineList.innerHTML = AppState.deadlines.map(d => `
        <div class="deadline-item">
          <div class="deadline-date-box">
            <div class="deadline-day">${d.day}</div>
            <div class="deadline-month">${d.month}</div>
          </div>
          <div class="deadline-info">
            <div class="deadline-title">${d.title}</div>
            <div class="deadline-course">${d.course}</div>
          </div>
          <span class="badge ${d.type === 'exam' ? 'badge-danger' : d.type === 'project' ? 'badge-warning' : 'badge-primary'}">
            ${d.type.toUpperCase()}
          </span>
        </div>
      `).join("");
    }

    // Today's classes preview
    const todayClasses = document.getElementById("dash-classes-preview");
    if (todayClasses) {
      todayClasses.innerHTML = enrolledCourses.slice(0, 2).map(c => `
        <div class="course-card" style="margin-bottom: 8px;">
          <div class="course-accent-strip" style="background: ${c.color}"></div>
          <div class="course-top-row">
            <span class="course-code">${c.code}</span>
            <span style="font-size: 0.75rem; color: var(--accent-primary); font-weight: 600;">${c.schedule.split("•")[0]}</span>
          </div>
          <div class="course-title" style="font-size: 0.92rem;">${c.title}</div>
          <div class="course-meta" style="margin-bottom: 4px; font-size: 0.75rem;">
            <span>📍 ${c.room}</span>
            <span>👤 ${c.instructor}</span>
          </div>
        </div>
      `).join("");
    }
  }

  // 2. Courses View
  let courseFilterTab = "enrolled"; // "enrolled" or "available"
  let courseSearchQuery = "";

  function renderCourses() {
    const listContainer = document.getElementById("courses-list-container");
    if (!listContainer) return;

    let filtered = AppState.courses.filter(c => {
      const matchStatus = courseFilterTab === "enrolled" ? c.enrolled : !c.enrolled;
      const matchSearch = c.title.toLowerCase().includes(courseSearchQuery.toLowerCase()) ||
                          c.code.toLowerCase().includes(courseSearchQuery.toLowerCase()) ||
                          c.instructor.toLowerCase().includes(courseSearchQuery.toLowerCase());
      return matchStatus && matchSearch;
    });

    if (filtered.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 10px;">📚</div>
          <p style="font-weight: 600;">No courses found in this category.</p>
          <p style="font-size: 0.8rem; margin-top: 4px;">Try searching for another subject or switch tabs.</p>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = filtered.map(c => `
      <div class="course-card">
        <div class="course-accent-strip" style="background: ${c.color}"></div>
        <div class="course-top-row">
          <span class="course-code">${c.code}</span>
          <span class="badge ${c.enrolled ? 'badge-success' : 'badge-primary'}">
            ${c.enrolled ? 'ENROLLED' : `${c.credits} CREDITS`}
          </span>
        </div>
        <div class="course-title">${c.title}</div>
        <div class="course-meta">
          <div class="course-meta-item">
            <span>👤</span>
            <span>${c.instructor}</span>
          </div>
          <div class="course-meta-item">
            <span>📍</span>
            <span>${c.room}</span>
          </div>
        </div>

        ${c.enrolled ? `
          <div style="margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">
              <span>Course Progress</span>
              <span>${c.progress}%</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" style="width: ${c.progress}%; background: ${c.color}"></div>
            </div>
          </div>
        ` : `
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
            Schedule: ${c.schedule}
          </div>
        `}

        <div class="course-footer">
          <button class="btn-pill btn-secondary" onclick="window.StudentApp.showCourseDetails('${c.id}')">
            View Syllabus
          </button>
          ${c.enrolled ? `
            <button class="btn-pill btn-outline-danger" onclick="window.StudentApp.dropCourse('${c.id}')">
              Drop Course
            </button>
          ` : `
            <button class="btn-pill btn-primary" onclick="window.StudentApp.enrollCourse('${c.id}')">
              Enroll Now +
            </button>
          `}
        </div>
      </div>
    `).join("");
  }

  // 3. Results View
  let selectedSemester = "Fall 2026 (Current)";

  function renderResults() {
    const semSelector = document.getElementById("results-semester-select");
    const container = document.getElementById("results-list-container");
    const cgpaVal = document.getElementById("results-cgpa-display");
    const sgpaVal = document.getElementById("results-sgpa-display");

    if (cgpaVal) cgpaVal.textContent = AppState.student.cgpa.toFixed(2);

    // Populate dropdown if needed
    if (semSelector && semSelector.options.length === 0) {
      semSelector.innerHTML = Object.keys(AppState.results).map(sem => `
        <option value="${sem}" ${sem === selectedSemester ? 'selected' : ''}>${sem}</option>
      `).join("");

      semSelector.addEventListener("change", (e) => {
        selectedSemester = e.target.value;
        renderResults();
      });
    }

    const currentResult = AppState.results[selectedSemester];
    if (!currentResult) return;

    if (sgpaVal) sgpaVal.textContent = currentResult.sgpa.toFixed(2);

    if (container) {
      container.innerHTML = currentResult.courses.map(course => {
        let gradeClass = "grade-A";
        if (course.grade.startsWith("B")) gradeClass = "grade-B";
        if (course.grade.startsWith("C")) gradeClass = "grade-C";
        if (course.grade.startsWith("D")) gradeClass = "grade-D";

        return `
          <div class="grade-card">
            <div>
              <div style="font-size: 0.75rem; font-weight: 700; color: var(--accent-primary);">${course.code} • ${course.credits} Credits</div>
              <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary); margin: 2px 0;">${course.name}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">
                Internal: <strong>${course.internal}/50</strong> | End-Term: <strong>${course.exam}/50</strong> | Total: <strong>${course.total}/100</strong>
              </div>
            </div>
            <div class="grade-pill ${gradeClass}">
              ${course.grade}
            </div>
          </div>
        `;
      }).join("");
    }
  }

  // 4. Profile View
  function renderProfile() {
    const s = AppState.student;
    if (!s) return;

    // Header info
    const profileAvatar = document.getElementById("profile-avatar-img");
    const profileName = document.getElementById("profile-full-name");
    const profileId = document.getElementById("profile-student-id");
    const profileMajor = document.getElementById("profile-major-badge");

    if (profileAvatar) profileAvatar.src = s.avatar;
    if (profileName) profileName.textContent = s.name;
    if (profileId) profileId.textContent = `ID: ${s.id}`;
    if (profileMajor) profileMajor.textContent = s.major;

    // Details rows
    const emailVal = document.getElementById("prof-email-val");
    const phoneVal = document.getElementById("prof-phone-val");
    const deptVal = document.getElementById("prof-dept-val");
    const yearVal = document.getElementById("prof-year-val");
    const advisorVal = document.getElementById("prof-advisor-val");
    const dobVal = document.getElementById("prof-dob-val");
    const emergencyVal = document.getElementById("prof-emergency-val");
    const addressVal = document.getElementById("prof-address-val");

    if (emailVal) emailVal.textContent = s.email;
    if (phoneVal) phoneVal.textContent = s.phone;
    if (deptVal) deptVal.textContent = s.department;
    if (yearVal) yearVal.textContent = s.year;
    if (advisorVal) advisorVal.textContent = s.advisor;
    if (dobVal) dobVal.textContent = s.dob;
    if (emergencyVal) emergencyVal.textContent = s.emergencyContact;
    if (addressVal) addressVal.textContent = s.address;
  }

  // --- Router / View Switcher ---
  function navigateTo(tabName) {
    AppState.activeTab = tabName;

    // Update bottom nav items
    document.querySelectorAll(".nav-item").forEach(item => {
      if (item.dataset.tab === tabName) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Toggle view visibility
    const views = ["dashboard", "courses", "results", "profile"];
    views.forEach(v => {
      const el = document.getElementById(`${v}-view`);
      if (el) {
        if (v === tabName) {
          el.classList.remove("hidden");
        } else {
          el.classList.add("hidden");
        }
      }
    });

    // Refresh view content
    if (tabName === "dashboard") renderDashboard();
    if (tabName === "courses") renderCourses();
    if (tabName === "results") renderResults();
    if (tabName === "profile") renderProfile();

    // Scroll to top
    const mainEl = document.querySelector(".main-content");
    if (mainEl) mainEl.scrollTop = 0;
  }

  // --- Authentication Management ---
  function showLogin() {
    document.getElementById("login-view").classList.remove("hidden");
    document.getElementById("main-app-shell").classList.add("hidden");
  }

  function showApp() {
    document.getElementById("login-view").classList.add("hidden");
    document.getElementById("main-app-shell").classList.remove("hidden");
    renderHeader();
    navigateTo(AppState.activeTab || "dashboard");
  }

  function handleLogin(email, password) {
    if (!email || !password) {
      showToast("Please enter both ID/Email and Password", "error");
      return;
    }
    AppState.isLoggedIn = true;
    localStorage.setItem("sm_logged_in", "true");
    showToast(`Welcome back, ${AppState.student.name}!`, "success");
    showApp();
  }

  function handleLogout() {
    AppState.isLoggedIn = false;
    localStorage.setItem("sm_logged_in", "false");
    showToast("Successfully logged out", "info");
    showLogin();
  }

  // --- Modal Helpers ---
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  // --- Public API for HTML Event Binding ---
  window.StudentApp = {
    navigateTo,
    handleLogin,
    handleLogout,
    openModal,
    closeModal,

    // Course Actions
    setCourseFilter(filter) {
      courseFilterTab = filter;
      document.querySelectorAll(".segment-btn").forEach(btn => {
        if (btn.dataset.filter === filter) btn.classList.add("active");
        else btn.classList.remove("active");
      });
      renderCourses();
    },

    searchCourses(query) {
      courseSearchQuery = query;
      renderCourses();
    },

    enrollCourse(courseId) {
      const course = AppState.courses.find(c => c.id === courseId);
      if (course) {
        course.enrolled = true;
        course.progress = 10;
        AppState.student.totalCredits += course.credits;
        AppState.saveCourses();
        AppState.saveStudent();
        showToast(`Enrolled in ${course.code}: ${course.title}!`, "success");
        renderCourses();
        renderDashboard();
      }
    },

    dropCourse(courseId) {
      const course = AppState.courses.find(c => c.id === courseId);
      if (course) {
        if (confirm(`Are you sure you want to drop ${course.code}: ${course.title}?`)) {
          course.enrolled = false;
          AppState.student.totalCredits = Math.max(0, AppState.student.totalCredits - course.credits);
          AppState.saveCourses();
          AppState.saveStudent();
          showToast(`Dropped ${course.code}`, "info");
          renderCourses();
          renderDashboard();
        }
      }
    },

    showCourseDetails(courseId) {
      const course = AppState.courses.find(c => c.id === courseId);
      if (!course) return;

      const titleEl = document.getElementById("modal-course-title");
      const bodyEl = document.getElementById("modal-course-body");

      if (titleEl) titleEl.textContent = `${course.code}: ${course.title}`;
      if (bodyEl) {
        bodyEl.innerHTML = `
          <div style="margin-bottom: 14px;">
            <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 4px;">Instructor: <strong>${course.instructor}</strong></div>
            <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 4px;">Schedule: <strong>${course.schedule}</strong></div>
            <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 4px;">Room: <strong>${course.room}</strong></div>
            <div style="font-size: 0.85rem; color: var(--text-secondary);">Credits: <strong>${course.credits} Units</strong></div>
          </div>
          <h4 style="font-size: 0.9rem; margin: 16px 0 8px 0; color: var(--text-primary);">Course Syllabus & Weekly Modules</h4>
          <ul style="padding-left: 18px; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">
            ${course.syllabus.map(m => `<li style="margin-bottom: 4px;">${m}</li>`).join("")}
          </ul>
        `;
      }
      openModal("course-details-modal");
    },

    // Edit Profile Modal
    openEditProfileModal() {
      const s = AppState.student;
      document.getElementById("edit-name-input").value = s.name;
      document.getElementById("edit-email-input").value = s.email;
      document.getElementById("edit-phone-input").value = s.phone;
      document.getElementById("edit-emergency-input").value = s.emergencyContact;
      document.getElementById("edit-address-input").value = s.address;
      openModal("edit-profile-modal");
    },

    saveProfileEdits(e) {
      e.preventDefault();
      const s = AppState.student;
      s.name = document.getElementById("edit-name-input").value.trim();
      s.email = document.getElementById("edit-email-input").value.trim();
      s.phone = document.getElementById("edit-phone-input").value.trim();
      s.emergencyContact = document.getElementById("edit-emergency-input").value.trim();
      s.address = document.getElementById("edit-address-input").value.trim();

      AppState.saveStudent();
      closeModal("edit-profile-modal");
      renderHeader();
      renderProfile();
      renderDashboard();
      showToast("Profile details updated successfully!", "success");
    },

    // Target GPA Simulator
    calculateTargetGPA() {
      const target = parseFloat(document.getElementById("target-gpa-input").value) || 3.9;
      const current = AppState.student.cgpa;
      const totalCredits = AppState.student.totalCredits;
      const futureCredits = 14; // Next semester

      // target = (current * totalCredits + needed * futureCredits) / (totalCredits + futureCredits)
      const neededGpa = ((target * (totalCredits + futureCredits)) - (current * totalCredits)) / futureCredits;

      const resultBox = document.getElementById("gpa-calc-result");
      if (resultBox) {
        if (neededGpa > 4.0) {
          resultBox.innerHTML = `⚠️ To hit <strong>${target.toFixed(2)}</strong>, you need <strong>${neededGpa.toFixed(2)}</strong> next term (exceeds 4.0 max). Aim for ~4.0 for max gain!`;
          resultBox.style.color = "var(--accent-warning)";
        } else if (neededGpa <= 0) {
          resultBox.innerHTML = `🎉 You have already exceeded this target!`;
          resultBox.style.color = "var(--accent-success)";
        } else {
          resultBox.innerHTML = `🎯 To reach <strong>${target.toFixed(2)}</strong> CGPA, you must average <strong>${neededGpa.toFixed(2)}</strong> SGPA next term.`;
          resultBox.style.color = "var(--accent-primary)";
        }
      }
    },

    // Quick demo login helper
    quickLogin(name, email) {
      document.getElementById("login-id").value = email;
      document.getElementById("login-pass").value = "password123";
      handleLogin(email, "password123");
    },

    // Reset demo
    resetDemoData() {
      if (confirm("Reset all modifications back to factory demo data?")) {
        localStorage.clear();
        AppState.init();
        showToast("Demo data reloaded", "info");
        renderHeader();
        navigateTo("dashboard");
      }
    },

    // Toggle Desktop / Mobile frame preview
    toggleExpandView() {
      const appEl = document.getElementById("app");
      const isExpanded = appEl.classList.toggle("expanded-mode");
      showToast(isExpanded ? "Expanded view mode enabled" : "Mobile view mode enabled", "info");
    },

    // Open notifications drawer
    openNotifications() {
      const listEl = document.getElementById("notif-drawer-list");
      if (listEl) {
        listEl.innerHTML = AppState.notifications.map((n, idx) => `
          <div style="padding: 12px; border-bottom: 1px solid var(--border-color); ${n.unread ? 'background: var(--accent-primary-light);' : ''}">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <span style="font-weight: 700; font-size: 0.85rem; color: var(--text-primary);">${n.title}</span>
              <span style="font-size: 0.7rem; color: var(--text-muted);">${n.time}</span>
            </div>
            <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0;">${n.text}</p>
          </div>
        `).join("");
      }
      openModal("notifications-modal");
      // Mark as read
      AppState.notifications.forEach(n => n.unread = false);
      const notifBadge = document.getElementById("header-notif-badge");
      if (notifBadge) notifBadge.style.display = "none";
    },

    // Print Transcript
    printTranscript() {
      window.print();
    }
  };

  // --- Document Ready / Initialization ---
  document.addEventListener("DOMContentLoaded", () => {
    AppState.init();

    // Theme toggle listener
    const themeCheckbox = document.getElementById("theme-toggle-checkbox");
    if (themeCheckbox) {
      themeCheckbox.checked = AppState.theme === "dark";
      themeCheckbox.addEventListener("change", (e) => {
        AppState.setTheme(e.target.checked ? "dark" : "light");
      });
    }

    // Login Form Submit listener
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const idVal = document.getElementById("login-id").value.trim();
        const passVal = document.getElementById("login-pass").value;
        handleLogin(idVal, passVal);
      });
    }

    // Profile Edit Form Submit listener
    const editProfileForm = document.getElementById("edit-profile-form");
    if (editProfileForm) {
      editProfileForm.addEventListener("submit", window.StudentApp.saveProfileEdits);
    }

    // Initial view decision
    if (AppState.isLoggedIn) {
      showApp();
    } else {
      showLogin();
    }
  });

})();
