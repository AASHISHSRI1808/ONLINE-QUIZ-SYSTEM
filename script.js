// Global data storage
let currentUser = null;
let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let quizTimer = null;
let timeRemaining = 0;
let quizStartTime = null;
let selectedStudentId = null;
let selectedStudentIds = [];

// Application data with enhanced structure
const appData = {
  students: {
    verified: [
      {
        id: 1,
        username: "rajiv",
        password: "rajiv123",
        name: "Rajiv Shukla",
        email: "rajiv.shukla@student.srmcem.edu",
        studentId: "SRM2024001",
        course: "B.Tech CSE",
        status: "verified",
        registrationDate: "2025-01-15",
        approvedDate: "2025-01-16"
      },
      {
        id: 2,
        username: "raman",
        password: "raman123",
        name: "Raman Mehta",
        email: "raman.mehta@student.srmcem.edu",
        studentId: "SRM2024002",
        course: "B.Tech ECE",
        status: "verified",
        registrationDate: "2025-01-16",
        approvedDate: "2025-01-17"
      },
      {
        id: 3,
        username: "priya",
        password: "priya123",
        name: "Priya Sharma",
        email: "priya.sharma@student.srmcem.edu",
        studentId: "SRM2024003",
        course: "B.Tech ME",
        status: "verified",
        registrationDate: "2025-01-17",
        approvedDate: "2025-01-18"
      },
      {
        id: 4,
        username: "amit",
        password: "amit123",
        name: "Amit Kumar Singh",
        email: "amit.singh@student.srmcem.edu",
        studentId: "SRM2024004",
        course: "MCA",
        status: "verified",
        registrationDate: "2025-01-18",
        approvedDate: "2025-01-19"
      },
      {
        id: 5,
        username: "kavya",
        password: "kavya123",
        name: "Kavya Patel",
        email: "kavya.patel@student.srmcem.edu",
        studentId: "SRM2024005",
        course: "MBA",
        status: "verified",
        registrationDate: "2025-01-19",
        approvedDate: "2025-01-20"
      }
    ],
    pending: [
      {
        id: 6,
        username: "rohit",
        password: "rohit123",
        name: "Rohit Gupta",
        email: "rohit.gupta@student.srmcem.edu",
        studentId: "SRM2024006",
        course: "B.Tech CSE",
        status: "pending",
        registrationDate: "2025-08-10"
      },
      {
        id: 7,
        username: "sneha",
        password: "sneha123",
        name: "Sneha Agarwal",
        email: "sneha.agarwal@student.srmcem.edu",
        studentId: "SRM2024007",
        course: "B.Tech ECE",
        status: "pending",
        registrationDate: "2025-08-11"
      }
    ],
    rejected: [
      {
        id: 8,
        username: "test",
        password: "test123",
        name: "Test User",
        email: "test@invalid.com",
        studentId: "INVALID001",
        course: "B.Tech CSE",
        status: "rejected",
        registrationDate: "2025-08-09",
        rejectionDate: "2025-08-09",
        rejectionReason: "Invalid email domain"
      }
    ]
  },
  admin: [
    {
      id: 1,
      username: "admin",
      password: "admin123",
      name: "Dr. Administrator"
    }
  ],
  courses: [
    "B.Tech CSE",
    "B.Tech ECE", 
    "B.Tech ME",
    "B.Tech CE",
    "B.Tech EE",
    "MBA",
    "MCA",
    "M.Tech CSE",
    "M.Tech ECE"
  ],
  quizzes: [
    {
      id: 1,
      title: "Mathematics Fundamentals",
      category: "Mathematics",
      duration: 15,
      questions: [
        {id: 1, question: "What is 15 + 27?", options: ["42", "41", "43", "40"], correct: 0},
        {id: 2, question: "What is the square root of 144?", options: ["11", "12", "13", "14"], correct: 1},
        {id: 3, question: "What is 8 × 7?", options: ["54", "56", "58", "52"], correct: 1},
        {id: 4, question: "What is 100 ÷ 4?", options: ["24", "25", "26", "23"], correct: 1},
        {id: 5, question: "What is 2³?", options: ["6", "8", "9", "12"], correct: 1},
        {id: 6, question: "What is the perimeter of a square with side 5?", options: ["15", "20", "25", "10"], correct: 1},
        {id: 7, question: "What is 45% of 200?", options: ["90", "95", "85", "100"], correct: 0},
        {id: 8, question: "What is the area of a circle with radius 3? (π≈3.14)", options: ["28.26", "18.84", "9.42", "37.68"], correct: 0},
        {id: 9, question: "What is log₁₀(1000)?", options: ["2", "3", "4", "5"], correct: 1},
        {id: 10, question: "What is the slope of line y = 3x + 2?", options: ["2", "3", "5", "1"], correct: 1}
      ]
    },
    {
      id: 2,
      title: "Science Basics",
      category: "Science", 
      duration: 15,
      questions: [
        {id: 1, question: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], correct: 2},
        {id: 2, question: "How many bones are in the human body?", options: ["206", "205", "207", "204"], correct: 0},
        {id: 3, question: "What planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 1},
        {id: 4, question: "What is the speed of light?", options: ["3×10⁸ m/s", "3×10⁷ m/s", "3×10⁹ m/s", "3×10⁶ m/s"], correct: 0},
        {id: 5, question: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 2},
        {id: 6, question: "What is the hardest natural substance?", options: ["Gold", "Iron", "Diamond", "Platinum"], correct: 2},
        {id: 7, question: "How many chambers does a human heart have?", options: ["2", "3", "4", "5"], correct: 2},
        {id: 8, question: "What is the smallest unit of matter?", options: ["Molecule", "Atom", "Cell", "Electron"], correct: 1},
        {id: 9, question: "What type of animal is a dolphin?", options: ["Fish", "Mammal", "Reptile", "Amphibian"], correct: 1},
        {id: 10, question: "What is the study of earthquakes called?", options: ["Geology", "Seismology", "Meteorology", "Astronomy"], correct: 1}
      ]
    },
    {
      id: 3,
      title: "Computer Science Fundamentals",
      category: "Computer Science",
      duration: 15,
      questions: [
        {id: 1, question: "What does HTML stand for?", options: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"], correct: 0},
        {id: 2, question: "Which data structure uses LIFO principle?", options: ["Queue", "Stack", "Array", "Linked List"], correct: 1},
        {id: 3, question: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correct: 1},
        {id: 4, question: "Which programming language is known as the mother of all languages?", options: ["C", "Assembly", "FORTRAN", "COBOL"], correct: 0},
        {id: 5, question: "What does CPU stand for?", options: ["Computer Processing Unit", "Central Processing Unit", "Central Program Unit", "Computer Program Unit"], correct: 1},
        {id: 6, question: "Which of these is a database management system?", options: ["Windows", "MySQL", "Photoshop", "Excel"], correct: 1},
        {id: 7, question: "What does SQL stand for?", options: ["Simple Query Language", "Structured Query Language", "Standard Query Language", "Sequential Query Language"], correct: 1},
        {id: 8, question: "Which protocol is used for web browsing?", options: ["FTP", "SMTP", "HTTP", "SSH"], correct: 2},
        {id: 9, question: "What is the binary equivalent of decimal 10?", options: ["1010", "1001", "1100", "1011"], correct: 0},
        {id: 10, question: "Which sorting algorithm has the best average time complexity?", options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"], correct: 2}
      ]
    }
  ],
  studentResults: [
    {studentId: 1, quizId: 1, score: 8, totalQuestions: 10, timeTaken: "12:30", date: "2025-08-10"},
    {studentId: 1, quizId: 2, score: 7, totalQuestions: 10, timeTaken: "11:45", date: "2025-08-09"},
    {studentId: 2, quizId: 1, score: 9, totalQuestions: 10, timeTaken: "10:20", date: "2025-08-10"},
    {studentId: 3, quizId: 3, score: 6, totalQuestions: 10, timeTaken: "13:15", date: "2025-08-08"},
    {studentId: 4, quizId: 2, score: 9, totalQuestions: 10, timeTaken: "11:20", date: "2025-08-09"},
    {studentId: 5, quizId: 1, score: 7, totalQuestions: 10, timeTaken: "13:45", date: "2025-08-07"}
  ]
};

// Generated AI questions storage
let generatedQuestions = [];

// Utility Functions
function showMessage(message, type = 'info') {
  const container = document.getElementById('messageContainer');
  const content = document.getElementById('messageContent');
  
  content.textContent = message;
  content.className = `message ${type}`;
  container.classList.remove('hidden');
  
  setTimeout(() => {
    container.classList.add('hidden');
  }, 5000);
}

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

function getNextStudentId() {
  const allStudents = [...appData.students.verified, ...appData.students.pending, ...appData.students.rejected];
  return Math.max(...allStudents.map(s => s.id)) + 1;
}

// Page navigation functions
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById(pageId).classList.add('active');
}

// Login and Signup Functions
function switchLoginTab(tabType) {
  console.log('Switching to tab:', tabType);
  
  // Remove active class from all tabs and forms
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelectorAll('.login-form').forEach(form => {
    form.classList.remove('active');
  });
  
  // Add active class to clicked tab
  event.target.classList.add('active');
  
  // Show corresponding form
  document.getElementById(tabType + 'Login').classList.add('active');
  
  // Update button text
  updateLoginButtonText(tabType);
}

function updateLoginButtonText(tabType) {
  const loginButton = document.querySelector(`#${tabType}Login button[type="submit"]`);
  if (loginButton) {
    if (tabType === 'student') {
      loginButton.textContent = 'Login as Student';
    } else {
      loginButton.textContent = 'Login as Admin';
    }
  }
}

function showSignupForm() {
  console.log('Showing signup form');
  document.getElementById('studentLogin').classList.remove('active');
  document.getElementById('studentSignup').classList.add('active');
}

function showLoginForm() {
  console.log('Showing login form');
  document.getElementById('studentSignup').classList.remove('active');
  document.getElementById('studentLogin').classList.add('active');
}

function showForgotPassword() {
  showMessage('Please contact admin for password reset: admin@srmcem.edu', 'info');
}

// Form validation
function validateSignupForm() {
  const name = document.getElementById('signupName').value.trim();
  const username = document.getElementById('signupUsername').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const studentId = document.getElementById('signupStudentId').value.trim();
  const course = document.getElementById('signupCourse').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('signupConfirmPassword').value;

  console.log('Validating form with values:', {name, username, email, studentId, course});

  // Check required fields
  if (!name || !username || !email || !studentId || !course || !password || !confirmPassword) {
    showMessage('All fields are required', 'error');
    return false;
  }

  // Check email domain
  if (!email.endsWith('@student.srmcem.edu')) {
    showMessage('Please use your official SRMCEM email (@student.srmcem.edu)', 'error');
    return false;
  }

  // Check password match
  if (password !== confirmPassword) {
    showMessage('Passwords do not match', 'error');
    return false;
  }

  // Check password length
  if (password.length < 6) {
    showMessage('Password must be at least 6 characters', 'error');
    return false;
  }

  // Check username uniqueness
  const allStudents = [...appData.students.verified, ...appData.students.pending, ...appData.students.rejected];
  if (allStudents.some(s => s.username === username)) {
    showMessage('Username already exists', 'error');
    return false;
  }

  // Check email uniqueness
  if (allStudents.some(s => s.email === email)) {
    showMessage('Email already registered', 'error');
    return false;
  }

  // Check student ID format - more lenient format
  if (!studentId.match(/^SRM\d{4}\d+$/)) {
    showMessage('Student ID should be in format SRM2024XXX', 'error');
    return false;
  }

  // Check student ID uniqueness
  if (allStudents.some(s => s.studentId === studentId)) {
    showMessage('Student ID already registered', 'error');
    return false;
  }

  return true;
}

function handleSignup(event) {
  event.preventDefault();
  console.log('Handling signup');
  
  if (!validateSignupForm()) return;

  const newStudent = {
    id: getNextStudentId(),
    username: document.getElementById('signupUsername').value.trim(),
    password: document.getElementById('signupPassword').value,
    name: document.getElementById('signupName').value.trim(),
    email: document.getElementById('signupEmail').value.trim(),
    studentId: document.getElementById('signupStudentId').value.trim(),
    course: document.getElementById('signupCourse').value,
    status: 'pending',
    registrationDate: getCurrentDate()
  };

  console.log('Adding new student:', newStudent);
  appData.students.pending.push(newStudent);
  
  // Clear form
  document.getElementById('signupForm').reset();
  
  showMessage('Registration successful! Your application is pending admin approval.', 'success');
  
  // Switch back to login after 2 seconds
  setTimeout(() => {
    showLoginForm();
  }, 2000);
}

function handleLogin(event, userType) {
  event.preventDefault();
  console.log('Handling login for:', userType);
  
  const username = document.getElementById(userType + 'Username').value.trim();
  const password = document.getElementById(userType + 'Password').value;
  
  console.log('Login attempt with username:', username);
  
  let user = null;
  
  if (userType === 'student') {
    // Check all student categories for login attempt
    const allStudents = [...appData.students.verified, ...appData.students.pending, ...appData.students.rejected];
    user = allStudents.find(s => s.username === username && s.password === password);
    console.log('Found student:', user);
    
    if (user) {
      if (user.status === 'pending') {
        showMessage('Your account is pending admin approval. Please wait for verification.', 'info');
        return;
      } else if (user.status === 'rejected') {
        showMessage('Your account has been rejected. Please contact admin for more information.', 'error');
        return;
      } else if (user.status === 'verified') {
        currentUser = { ...user, type: userType };
        console.log('Student login successful, redirecting to dashboard');
        showStudentDashboard();
      }
    } else {
      showMessage('Invalid credentials. Please try again.', 'error');
    }
  } else {
    user = appData.admin.find(a => a.username === username && a.password === password);
    console.log('Found admin:', user);
    
    if (user) {
      currentUser = { ...user, type: userType };
      console.log('Admin login successful, redirecting to dashboard');
      showAdminDashboard();
    } else {
      showMessage('Invalid admin credentials. Please try again.', 'error');
    }
  }
}

// Student Dashboard Functions
function showStudentDashboard() {
  console.log('Showing student dashboard for:', currentUser);
  document.getElementById('studentName').textContent = currentUser.name;
  showPage('studentDashboard');
  loadQuizzes();
  loadStudentHistory();
}

function loadQuizzes() {
  const quizGrid = document.getElementById('quizGrid');
  quizGrid.innerHTML = '';
  
  appData.quizzes.forEach(quiz => {
    const quizCard = document.createElement('div');
    quizCard.className = 'quiz-card';
    quizCard.innerHTML = `
      <div class="quiz-category">${quiz.category}</div>
      <h3>${quiz.title}</h3>
      <div class="quiz-meta">
        <p>${quiz.questions.length} Questions • ${quiz.duration} minutes</p>
      </div>
      <button class="btn btn--primary" onclick="startQuiz(${quiz.id})">Start Quiz</button>
    `;
    quizGrid.appendChild(quizCard);
  });
}

function loadStudentHistory() {
  const historyContainer = document.getElementById('resultsHistory');
  const userResults = appData.studentResults.filter(result => result.studentId === currentUser.id);
  
  if (userResults.length === 0) {
    historyContainer.innerHTML = '<p style="text-align: center; padding: 20px; color: var(--color-text-secondary);">No quiz history available.</p>';
    return;
  }
  
  historyContainer.innerHTML = '';
  userResults.forEach(result => {
    const quiz = appData.quizzes.find(q => q.id === result.quizId);
    const percentage = Math.round((result.score / result.totalQuestions) * 100);
    let badgeClass = 'average';
    
    if (percentage >= 80) badgeClass = 'excellent';
    else if (percentage >= 60) badgeClass = 'good';
    
    const resultItem = document.createElement('div');
    resultItem.className = 'result-item';
    resultItem.innerHTML = `
      <div class="result-info">
        <h4>${quiz.title}</h4>
        <p>${result.date} • ${result.timeTaken}</p>
      </div>
      <div class="result-score">
        <div class="score-badge ${badgeClass}">${result.score}/${result.totalQuestions}</div>
        <p>${percentage}%</p>
      </div>
    `;
    historyContainer.appendChild(resultItem);
  });
}

// Admin Dashboard Functions
function switchAdminTab(tabName) {
  console.log('Switching admin tab to:', tabName);
  
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelectorAll('.admin-tab-content').forEach(content => {
    content.classList.remove('active');
  });
  
  event.target.classList.add('active');
  document.getElementById(tabName + 'Tab').classList.add('active');
  
  if (tabName === 'overview') {
    loadOverviewData();
  } else if (tabName === 'students') {
    loadStudentManagement();
  } else if (tabName === 'quizzes') {
    loadQuizManagement();
  }
}

function showAdminDashboard() {
  console.log('Showing admin dashboard');
  showPage('adminDashboard');
  
  // Set initial admin tab to overview and activate it
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelectorAll('.admin-tab-content').forEach(content => {
    content.classList.remove('active');
  });
  
  // Find and activate the overview tab
  const overviewBtn = document.querySelector('.admin-tab-btn[onclick*="overview"]');
  if (overviewBtn) {
    overviewBtn.classList.add('active');
  }
  document.getElementById('overviewTab').classList.add('active');
  
  loadAdminData();
}

function loadAdminData() {
  loadOverviewData();
}

function loadOverviewData() {
  console.log('Loading overview data');
  
  // Update statistics
  const totalVerified = appData.students.verified.length;
  const totalPending = appData.students.pending.length;
  const totalAttempts = appData.studentResults.length;
  const avgScore = totalAttempts > 0 ? 
    Math.round(appData.studentResults.reduce((sum, result) => sum + (result.score / result.totalQuestions * 100), 0) / totalAttempts) : 0;

  document.getElementById('totalStudents').textContent = totalVerified;
  document.getElementById('pendingApprovals').textContent = totalPending;
  document.getElementById('totalQuizAttempts').textContent = totalAttempts;
  document.getElementById('avgScore').textContent = avgScore + '%';

  loadRecentResults();
  createPerformanceChart();
}

function loadRecentResults() {
  const resultsContainer = document.getElementById('recentResults');
  const recentResults = appData.studentResults.slice(-5).reverse();
  
  resultsContainer.innerHTML = '';
  recentResults.forEach(result => {
    const student = appData.students.verified.find(s => s.id === result.studentId);
    const quiz = appData.quizzes.find(q => q.id === result.quizId);
    if (!student || !quiz) return;
    
    const percentage = Math.round((result.score / result.totalQuestions) * 100);
    
    let badgeClass = 'average';
    if (percentage >= 80) badgeClass = 'excellent';
    else if (percentage >= 60) badgeClass = 'good';
    
    const resultItem = document.createElement('div');
    resultItem.className = 'admin-result-item';
    resultItem.innerHTML = `
      <div class="student-info">
        <h5>${student.name}</h5>
        <p>${quiz.title} - ${result.date}</p>
      </div>
      <div class="score-badge ${badgeClass}">${result.score}/${result.totalQuestions}</div>
    `;
    resultsContainer.appendChild(resultItem);
  });
}

function switchManagementTab(tabName) {
  console.log('Switching management tab to:', tabName);
  
  document.querySelectorAll('.management-tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelectorAll('.management-content').forEach(content => {
    content.classList.remove('active');
  });
  
  event.target.classList.add('active');
  document.getElementById(tabName + 'Students').classList.add('active');
  
  if (tabName === 'pending') {
    loadPendingStudents();
  } else if (tabName === 'approved') {
    loadApprovedStudents();
  } else if (tabName === 'rejected') {
    loadRejectedStudents();
  }
}

function loadStudentManagement() {
  console.log('Loading student management');
  updateStudentBadges();
  
  // Set initial management tab to pending
  document.querySelectorAll('.management-tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelectorAll('.management-content').forEach(content => {
    content.classList.remove('active');
  });
  
  const pendingBtn = document.querySelector('.management-tab-btn[onclick*="pending"]');
  if (pendingBtn) {
    pendingBtn.classList.add('active');
  }
  document.getElementById('pendingStudents').classList.add('active');
  
  loadPendingStudents();
}

function updateStudentBadges() {
  document.getElementById('pendingBadge').textContent = appData.students.pending.length;
  document.getElementById('approvedBadge').textContent = appData.students.verified.length;
  document.getElementById('rejectedBadge').textContent = appData.students.rejected.length;
}

function loadPendingStudents() {
  console.log('Loading pending students:', appData.students.pending);
  const container = document.getElementById('pendingStudentsTable');
  container.innerHTML = '';
  
  if (appData.students.pending.length === 0) {
    container.innerHTML = '<p style="text-align: center; padding: 20px; color: var(--color-text-secondary);">No pending registrations.</p>';
    return;
  }
  
  // Header
  const header = document.createElement('div');
  header.className = 'student-row header';
  header.innerHTML = `
    <div><input type="checkbox" onclick="toggleAllPending(this)"></div>
    <div>Student Details</div>
    <div>Student ID</div>
    <div>Course</div>
    <div>Registration Date</div>
    <div>Actions</div>
  `;
  container.appendChild(header);
  
  appData.students.pending.forEach(student => {
    const row = document.createElement('div');
    row.className = 'student-row';
    row.innerHTML = `
      <div><input type="checkbox" class="student-checkbox" data-student-id="${student.id}"></div>
      <div class="student-info">
        <div class="student-name">${student.name}</div>
        <div class="student-details">${student.email}</div>
      </div>
      <div>${student.studentId}</div>
      <div>${student.course}</div>
      <div>${student.registrationDate}</div>
      <div class="student-actions">
        <button class="action-btn view" onclick="viewStudentDetails(${student.id})">View</button>
        <button class="action-btn approve" onclick="approveStudentDirectly(${student.id})">Approve</button>
        <button class="action-btn reject" onclick="rejectStudentDirectly(${student.id})">Reject</button>
      </div>
    `;
    container.appendChild(row);
  });
}

function loadApprovedStudents() {
  const container = document.getElementById('approvedStudentsTable');
  container.innerHTML = '';
  
  // Header
  const header = document.createElement('div');
  header.className = 'student-row header';
  header.innerHTML = `
    <div></div>
    <div>Student Details</div>
    <div>Student ID</div>
    <div>Course</div>
    <div>Approved Date</div>
    <div>Status</div>
  `;
  container.appendChild(header);
  
  appData.students.verified.forEach(student => {
    const row = document.createElement('div');
    row.className = 'student-row';
    row.innerHTML = `
      <div></div>
      <div class="student-info">
        <div class="student-name">${student.name}</div>
        <div class="student-details">${student.email}</div>
      </div>
      <div>${student.studentId}</div>
      <div>${student.course}</div>
      <div>${student.approvedDate || student.registrationDate}</div>
      <div><span class="status-badge verified">Verified</span></div>
    `;
    container.appendChild(row);
  });
}

function loadRejectedStudents() {
  const container = document.getElementById('rejectedStudentsTable');
  container.innerHTML = '';
  
  if (appData.students.rejected.length === 0) {
    container.innerHTML = '<p style="text-align: center; padding: 20px; color: var(--color-text-secondary);">No rejected applications.</p>';
    return;
  }
  
  // Header
  const header = document.createElement('div');
  header.className = 'student-row header';
  header.innerHTML = `
    <div></div>
    <div>Student Details</div>
    <div>Student ID</div>
    <div>Course</div>
    <div>Rejection Date</div>
    <div>Actions</div>
  `;
  container.appendChild(header);
  
  appData.students.rejected.forEach(student => {
    const row = document.createElement('div');
    row.className = 'student-row';
    row.innerHTML = `
      <div></div>
      <div class="student-info">
        <div class="student-name">${student.name}</div>
        <div class="student-details">${student.email}</div>
      </div>
      <div>${student.studentId}</div>
      <div>${student.course}</div>
      <div>${student.rejectionDate}</div>
      <div class="student-actions">
        <button class="action-btn view" onclick="viewStudentDetails(${student.id})">View</button>
        <button class="action-btn reconsider" onclick="reconsiderStudent(${student.id})">Reconsider</button>
      </div>
    `;
    container.appendChild(row);
  });
}

function loadQuizManagement() {
  const container = document.getElementById('quizStats');
  container.innerHTML = '';
  
  appData.quizzes.forEach(quiz => {
    const attempts = appData.studentResults.filter(r => r.quizId === quiz.id);
    const avgScore = attempts.length > 0 ? 
      Math.round(attempts.reduce((sum, r) => sum + (r.score / r.totalQuestions * 100), 0) / attempts.length) : 0;
    
    const statCard = document.createElement('div');
    statCard.className = 'stat-item';
    statCard.innerHTML = `
      <span class="stat-label">${quiz.title}</span>
      <span class="stat-value">${attempts.length} attempts (${avgScore}% avg)</span>
    `;
    container.appendChild(statCard);
  });
}

// Student management functions
function viewStudentDetails(studentId) {
  selectedStudentId = studentId;
  
  let student = null;
  let category = '';
  
  if (appData.students.pending.find(s => s.id === studentId)) {
    student = appData.students.pending.find(s => s.id === studentId);
    category = 'pending';
  } else if (appData.students.verified.find(s => s.id === studentId)) {
    student = appData.students.verified.find(s => s.id === studentId);
    category = 'verified';
  } else if (appData.students.rejected.find(s => s.id === studentId)) {
    student = appData.students.rejected.find(s => s.id === studentId);
    category = 'rejected';
  }
  
  if (!student) return;
  
  const modalBody = document.getElementById('studentDetailBody');
  modalBody.innerHTML = `
    <div class="student-detail-grid">
      <p><strong>Name:</strong> ${student.name}</p>
      <p><strong>Username:</strong> ${student.username}</p>
      <p><strong>Email:</strong> ${student.email}</p>
      <p><strong>Student ID:</strong> ${student.studentId}</p>
      <p><strong>Course:</strong> ${student.course}</p>
      <p><strong>Status:</strong> <span class="status-badge ${student.status}">${student.status}</span></p>
      <p><strong>Registration Date:</strong> ${student.registrationDate}</p>
      ${student.approvedDate ? `<p><strong>Approved Date:</strong> ${student.approvedDate}</p>` : ''}
      ${student.rejectionDate ? `<p><strong>Rejection Date:</strong> ${student.rejectionDate}</p>` : ''}
      ${student.rejectionReason ? `<p><strong>Rejection Reason:</strong> ${student.rejectionReason}</p>` : ''}
    </div>
  `;
  
  const approveBtn = document.getElementById('approveStudentBtn');
  const rejectBtn = document.getElementById('rejectStudentBtn');
  
  if (category === 'pending') {
    approveBtn.style.display = 'block';
    rejectBtn.style.display = 'block';
  } else {
    approveBtn.style.display = 'none';
    rejectBtn.style.display = 'none';
  }
  
  document.getElementById('studentDetailModal').classList.remove('hidden');
}

function closeStudentModal() {
  document.getElementById('studentDetailModal').classList.add('hidden');
  selectedStudentId = null;
}

function approveStudent() {
  if (!selectedStudentId) return;
  
  approveStudentDirectly(selectedStudentId);
  closeStudentModal();
}

function rejectStudent() {
  if (!selectedStudentId) return;
  
  const reason = prompt('Enter rejection reason (optional):') || 'Application not approved';
  rejectStudentWithReason(selectedStudentId, reason);
  closeStudentModal();
}

function approveStudentDirectly(studentId) {
  console.log('Approving student:', studentId);
  const studentIndex = appData.students.pending.findIndex(s => s.id === studentId);
  if (studentIndex === -1) return;
  
  const student = appData.students.pending[studentIndex];
  student.status = 'verified';
  student.approvedDate = getCurrentDate();
  
  appData.students.verified.push(student);
  appData.students.pending.splice(studentIndex, 1);
  
  showMessage(`Student ${student.name} has been approved successfully!`, 'success');
  
  loadStudentManagement();
  loadOverviewData();
}

function rejectStudentDirectly(studentId) {
  const reason = prompt('Enter rejection reason (optional):') || 'Application not approved';
  rejectStudentWithReason(studentId, reason);
}

function reconsiderStudent(studentId) {
  const studentIndex = appData.students.rejected.findIndex(s => s.id === studentId);
  if (studentIndex === -1) return;
  
  const student = appData.students.rejected[studentIndex];
  student.status = 'pending';
  delete student.rejectionDate;
  delete student.rejectionReason;
  
  appData.students.pending.push(student);
  appData.students.rejected.splice(studentIndex, 1);
  
  showMessage(`Student ${student.name} has been moved back to pending for reconsideration.`, 'success');
  
  loadStudentManagement();
  loadOverviewData();
}

function rejectStudentWithReason(studentId, reason) {
  const studentIndex = appData.students.pending.findIndex(s => s.id === studentId);
  if (studentIndex === -1) return;
  
  const student = appData.students.pending[studentIndex];
  student.status = 'rejected';
  student.rejectionDate = getCurrentDate();
  student.rejectionReason = reason;
  
  appData.students.rejected.push(student);
  appData.students.pending.splice(studentIndex, 1);
  
  showMessage(`Student ${student.name} has been rejected.`, 'info');
  
  loadStudentManagement();
  loadOverviewData();
}

// Bulk operations
function toggleAllPending(checkbox) {
  const checkboxes = document.querySelectorAll('.student-checkbox');
  checkboxes.forEach(cb => {
    cb.checked = checkbox.checked;
  });
}

function selectAllPending() {
  const checkboxes = document.querySelectorAll('.student-checkbox');
  checkboxes.forEach(cb => {
    cb.checked = true;
  });
}

function bulkApprove() {
  const selectedIds = getSelectedStudentIds();
  if (selectedIds.length === 0) {
    showMessage('Please select students to approve', 'error');
    return;
  }
  
  if (confirm(`Approve ${selectedIds.length} selected students?`)) {
    selectedIds.forEach(id => approveStudentDirectly(id));
    showMessage(`${selectedIds.length} students approved successfully!`, 'success');
  }
}

function bulkReject() {
  const selectedIds = getSelectedStudentIds();
  if (selectedIds.length === 0) {
    showMessage('Please select students to reject', 'error');
    return;
  }
  
  if (confirm(`Reject ${selectedIds.length} selected students?`)) {
    const reason = prompt('Enter rejection reason (optional):') || 'Application not approved';
    selectedIds.forEach(id => rejectStudentWithReason(id, reason));
    showMessage(`${selectedIds.length} students rejected.`, 'info');
  }
}

function getSelectedStudentIds() {
  const checkboxes = document.querySelectorAll('.student-checkbox:checked');
  return Array.from(checkboxes).map(cb => parseInt(cb.dataset.studentId));
}

// Quiz functionality
function startQuiz(quizId) {
  currentQuiz = appData.quizzes.find(q => q.id === quizId);
  currentQuestionIndex = 0;
  userAnswers = new Array(currentQuiz.questions.length).fill(null);
  timeRemaining = currentQuiz.duration * 60;
  quizStartTime = Date.now();
  
  document.getElementById('quizTitle').textContent = currentQuiz.title;
  showPage('quizPage');
  
  startTimer();
  loadQuestion();
  updateProgress();
}

function startTimer() {
  quizTimer = setInterval(() => {
    timeRemaining--;
    updateTimerDisplay();
    
    if (timeRemaining <= 0) {
      clearInterval(quizTimer);
      submitQuiz();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  document.getElementById('timer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function loadQuestion() {
  const question = currentQuiz.questions[currentQuestionIndex];
  const questionCounter = document.getElementById('questionCounter');
  const currentQuestionEl = document.getElementById('currentQuestion');
  const optionsContainer = document.getElementById('optionsContainer');
  
  questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuiz.questions.length}`;
  currentQuestionEl.textContent = question.question;
  
  optionsContainer.innerHTML = '';
  question.options.forEach((option, index) => {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'option';
    if (userAnswers[currentQuestionIndex] === index) {
      optionDiv.classList.add('selected');
    }
    
    optionDiv.innerHTML = `
      <input type="radio" id="option${index}" name="question" value="${index}" ${userAnswers[currentQuestionIndex] === index ? 'checked' : ''}>
      <label for="option${index}">${option}</label>
    `;
    
    optionDiv.addEventListener('click', () => selectOption(index));
    optionsContainer.appendChild(optionDiv);
  });
  
  updateNavigationButtons();
}

function selectOption(optionIndex) {
  userAnswers[currentQuestionIndex] = optionIndex;
  
  document.querySelectorAll('.option').forEach(option => {
    option.classList.remove('selected');
  });
  document.querySelectorAll('.option')[optionIndex].classList.add('selected');
  document.querySelectorAll('input[name="question"]')[optionIndex].checked = true;
}

function updateNavigationButtons() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');
  
  prevBtn.disabled = currentQuestionIndex === 0;
  
  if (currentQuestionIndex === currentQuiz.questions.length - 1) {
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'block';
  } else {
    nextBtn.style.display = 'block';
    submitBtn.style.display = 'none';
  }
}

function updateProgress() {
  const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;
  document.getElementById('progressFill').style.width = `${progress}%`;
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
    updateProgress();
  }
}

function nextQuestion() {
  if (currentQuestionIndex < currentQuiz.questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
    updateProgress();
  }
}

function submitQuiz() {
  clearInterval(quizTimer);
  
  let score = 0;
  currentQuiz.questions.forEach((question, index) => {
    if (userAnswers[index] === question.correct) {
      score++;
    }
  });
  
  const endTime = Date.now();
  const timeTaken = Math.floor((endTime - quizStartTime) / 1000);
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  const result = {
    studentId: currentUser.id,
    quizId: currentQuiz.id,
    score: score,
    totalQuestions: currentQuiz.questions.length,
    timeTaken: timeString,
    date: getCurrentDate()
  };
  
  appData.studentResults.push(result);
  
  showQuizResults(score, timeString);
}

function showQuizResults(score, timeTaken) {
  const percentage = Math.round((score / currentQuiz.questions.length) * 100);
  
  document.getElementById('scorePercentage').textContent = `${percentage}%`;
  document.getElementById('scoreText').textContent = `You scored ${score} out of ${currentQuiz.questions.length} questions correctly.`;
  document.getElementById('timeText').textContent = `Time taken: ${timeTaken}`;
  
  const scoreCircle = document.querySelector('.score-circle');
  const degrees = (percentage / 100) * 360;
  scoreCircle.style.background = `conic-gradient(var(--color-primary) ${degrees}deg, var(--color-bg-1) ${degrees}deg)`;
  
  showAnswerReview();
  
  showPage('resultsPage');
}

function showAnswerReview() {
  const reviewContainer = document.getElementById('answersReview');
  reviewContainer.innerHTML = '<h3>Answer Review</h3>';
  
  currentQuiz.questions.forEach((question, index) => {
    const userAnswer = userAnswers[index];
    const isCorrect = userAnswer === question.correct;
    
    const reviewItem = document.createElement('div');
    reviewItem.className = `review-item ${isCorrect ? 'correct' : 'incorrect'}`;
    reviewItem.innerHTML = `
      <h4>Question ${index + 1}: ${question.question}</h4>
      <p class="your-answer">Your answer: ${userAnswer !== null ? question.options[userAnswer] : 'Not answered'}</p>
      <p class="correct-answer">Correct answer: ${question.options[question.correct]}</p>
    `;
    reviewContainer.appendChild(reviewItem);
  });
}

function goToStudentDashboard() {
  showStudentDashboard();
}

// Email functionality
function emailResults() {
  const emailDetails = document.getElementById('emailDetails');
  emailDetails.innerHTML = `
    <p><strong>Recipient:</strong> ${currentUser.email}</p>
    <p><strong>Subject:</strong> Quiz Results - ${currentQuiz.title}</p>
    <p><strong>Score:</strong> ${userAnswers.filter((answer, index) => answer === currentQuiz.questions[index].correct).length}/${currentQuiz.questions.length}</p>
  `;
  
  document.getElementById('emailModal').classList.remove('hidden');
}

function closeEmailModal() {
  document.getElementById('emailModal').classList.add('hidden');
}

// AI Question Generation
function generateAIQuestions() {
  const subject = document.getElementById('subjectSelect').value;
  const difficulty = document.getElementById('difficultySelect').value;
  const count = parseInt(document.getElementById('questionCount').value);
  
  document.getElementById('loadingSpinner').classList.remove('hidden');
  
  setTimeout(() => {
    document.getElementById('loadingSpinner').classList.add('hidden');
    
    generatedQuestions = [];
    const allQuestionTemplates = getQuestionTemplates(subject, difficulty);
    
    const shuffledTemplates = [...allQuestionTemplates].sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < Math.min(count, shuffledTemplates.length); i++) {
      generatedQuestions.push({ ...shuffledTemplates[i] });
    }
    
    if (count > shuffledTemplates.length) {
      for (let i = shuffledTemplates.length; i < count; i++) {
        const baseTemplate = shuffledTemplates[i % shuffledTemplates.length];
        const variation = createQuestionVariation(baseTemplate, subject, i);
        generatedQuestions.push(variation);
      }
    }
    
    showAIQuestionsPreview();
  }, 2000);
}

function createQuestionVariation(baseTemplate, subject, index) {
  const variations = {
    'Mathematics': [
      {
        question: "What is the value of π (pi) rounded to 2 decimal places?",
        options: ["3.14", "3.15", "3.13", "3.16"],
        correct: 0
      },
      {
        question: "What is 25% of 80?",
        options: ["15", "20", "25", "30"],
        correct: 1
      }
    ],
    'Science': [
      {
        question: "What is the symbol for the element Oxygen?",
        options: ["O", "Ox", "O2", "Om"],
        correct: 0
      },
      {
        question: "How many legs does a spider have?",
        options: ["6", "8", "10", "12"],
        correct: 1
      }
    ],
    'Computer Science': [
      {
        question: "What does CSS stand for?",
        options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
        correct: 1
      },
      {
        question: "Which programming language is primarily used for web development?",
        options: ["Python", "JavaScript", "C++", "Java"],
        correct: 1
      }
    ],
    'English': [
      {
        question: "What is the plural of 'mouse' (the animal)?",
        options: ["Mouses", "Mice", "Mouse", "Meese"],
        correct: 1
      },
      {
        question: "Which word is an adverb?",
        options: ["Quick", "Quickly", "Quickness", "Quicker"],
        correct: 1
      }
    ]
  };
  
  const subjectVariations = variations[subject] || variations['Mathematics'];
  return subjectVariations[index % subjectVariations.length];
}

function getQuestionTemplates(subject, difficulty) {
  const templates = {
    'Mathematics': [
      {
        question: "What is the derivative of x²?",
        options: ["2x", "x", "2", "x²"],
        correct: 0
      },
      {
        question: "What is the integral of 2x?",
        options: ["x²", "x² + C", "2", "2x + C"],
        correct: 1
      },
      {
        question: "What is sin(90°)?",
        options: ["0", "1", "0.5", "-1"],
        correct: 1
      }
    ],
    'Science': [
      {
        question: "What is the atomic number of Carbon?",
        options: ["6", "12", "14", "8"],
        correct: 0
      },
      {
        question: "What is the chemical formula for water?",
        options: ["H2O", "CO2", "O2", "H2SO4"],
        correct: 0
      }
    ],
    'Computer Science': [
      {
        question: "What does API stand for?",
        options: ["Application Programming Interface", "Advanced Programming Interface", "Automated Program Interface", "Application Process Interface"],
        correct: 0
      },
      {
        question: "Which sorting algorithm has O(n log n) time complexity?",
        options: ["Bubble Sort", "Merge Sort", "Selection Sort", "Insertion Sort"],
        correct: 1
      }
    ],
    'English': [
      {
        question: "What is a synonym for 'happy'?",
        options: ["Sad", "Joyful", "Angry", "Tired"],
        correct: 1
      },
      {
        question: "Which of these is a noun?",
        options: ["Run", "Beautiful", "House", "Quickly"],
        correct: 2
      }
    ]
  };
  
  return templates[subject] || templates['Mathematics'];
}

function showAIQuestionsPreview() {
  const previewContainer = document.getElementById('aiQuestionsPreview');
  previewContainer.innerHTML = '<h4>Generated Questions:</h4>';
  
  generatedQuestions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'ai-question-preview';
    questionDiv.innerHTML = `
      <h4>Question ${index + 1}: ${question.question}</h4>
      <ul>
        ${question.options.map((option, optIndex) => 
          `<li class="${optIndex === question.correct ? 'correct-option' : ''}">${option}</li>`
        ).join('')}
      </ul>
    `;
    previewContainer.appendChild(questionDiv);
  });
  
  document.getElementById('aiQuestionsModal').classList.remove('hidden');
}

function closeAIModal() {
  document.getElementById('aiQuestionsModal').classList.add('hidden');
}

function addQuestionsToBank() {
  showMessage(`${generatedQuestions.length} questions have been added to the quiz bank successfully!`, 'success');
  closeAIModal();
}

// Chart creation
function createPerformanceChart() {
  const ctx = document.getElementById('performanceChart').getContext('2d');
  
  const quizNames = appData.quizzes.map(quiz => quiz.title);
  const averageScores = appData.quizzes.map(quiz => {
    const quizResults = appData.studentResults.filter(result => result.quizId === quiz.id);
    if (quizResults.length === 0) return 0;
    return Math.round(quizResults.reduce((sum, result) => sum + (result.score / result.totalQuestions * 100), 0) / quizResults.length);
  });
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: quizNames,
      datasets: [{
        label: 'Average Score (%)',
        data: averageScores,
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
        borderColor: ['#1FB8CD', '#FFC185', '#B4413C'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
}

// Logout function
function logout() {
  console.log('Logging out');
  currentUser = null;
  currentQuiz = null;
  currentQuestionIndex = 0;
  userAnswers = [];
  selectedStudentId = null;
  selectedStudentIds = [];
  
  if (quizTimer) {
    clearInterval(quizTimer);
  }
  
  showPage('loginPage');
  
  // Reset login forms
  document.querySelectorAll('input').forEach(input => input.value = '');
  document.querySelectorAll('select').forEach(select => select.value = '');
  
  // Reset to student login tab
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.login-form').forEach(form => form.classList.remove('active'));
  const firstTab = document.querySelector('.tab-btn');
  if (firstTab) {
    firstTab.classList.add('active');
  }
  document.getElementById('studentLogin').classList.add('active');
  
  // Update button text
  updateLoginButtonText('student');
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing app');
  showPage('loginPage');
  
  // Set initial button text
  updateLoginButtonText('student');
});

// Make functions globally available
window.switchLoginTab = switchLoginTab;
window.showSignupForm = showSignupForm;
window.showLoginForm = showLoginForm;
window.showForgotPassword = showForgotPassword;
window.handleSignup = handleSignup;
window.handleLogin = handleLogin;
window.switchAdminTab = switchAdminTab;
window.switchManagementTab = switchManagementTab;
window.viewStudentDetails = viewStudentDetails;
window.closeStudentModal = closeStudentModal;
window.approveStudent = approveStudent;
window.rejectStudent = rejectStudent;
window.approveStudentDirectly = approveStudentDirectly;
window.rejectStudentDirectly = rejectStudentDirectly;
window.reconsiderStudent = reconsiderStudent;
window.toggleAllPending = toggleAllPending;
window.selectAllPending = selectAllPending;
window.bulkApprove = bulkApprove;
window.bulkReject = bulkReject;
window.startQuiz = startQuiz;
window.previousQuestion = previousQuestion;
window.nextQuestion = nextQuestion;
window.submitQuiz = submitQuiz;
window.goToStudentDashboard = goToStudentDashboard;
window.emailResults = emailResults;
window.closeEmailModal = closeEmailModal;
window.generateAIQuestions = generateAIQuestions;
window.closeAIModal = closeAIModal;
window.addQuestionsToBank = addQuestionsToBank;
window.logout = logout;