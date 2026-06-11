/* ==================================================
   EduPay - Core Application Logic & State Controller
   ================================================== */

const SCHEMA_VERSION = "2";

const DEFAULT_USERS = [
    { id: 'USR-001', name: 'Fiona Owen',      email: 'fiona.owen@kds.edu', password: 'admin123',  role: 'administrator', schoolName: 'King David Schol', designation: 'Finance Officer' },
    { id: 'USR-002', name: 'Dr. Arthur Vance', email: 'daoduemmanuel101@gmail.com',   password: 'vance123',  role: 'staff',         schoolName: 'King David Schol', designation: 'Senior Biology Teacher' },
    { id: 'USR-003', name: 'Clara Sterling',   email: 'Kingdavidayoola@gmail.com',password: 'sterling123',role: 'staff',         schoolName: 'King David Schol', designation: 'Math Specialist & Chair' },
    { id: 'USR-004', name: 'Marc Dupont',      email: 'm.dupont@kds.edu',  password: 'dupont123', role: 'staff',         schoolName: 'King David Schol', designation: 'Part-Time History Lecturer' },
    { id: 'USR-005', name: 'Sylvia Zhang',     email: 's.zhang@kds.edu',   password: 'zhang123',  role: 'staff',         schoolName: 'King David Schol', designation: 'Physics Lab Instructor' },
    { id: 'USR-006', name: 'Julian Ross',      email: 'j.ross@kds.edu',    password: 'ross123',   role: 'staff',         schoolName: 'King David Schol', designation: 'Academic Registrar' },
    { id: 'USR-007', name: 'Robert Finch',     email: 'r.finch@kds.edu',   password: 'finch123',  role: 'staff',         schoolName: 'King David Schol', designation: 'Facilities Supervisor' },
];

const DEFAULT_STAFF = [
    { id: "SJA-001", name: "Dr. Arthur Vance", email: "daoduemmanuel101@gmail.com", dept: "Sciences", designation: "Senior Biology Teacher", contractType: "Full-Time", basePay: 800000, loadLimit: 0, allowances: { housing: 120000, transport: 50000, extra: 80000 }, deductions: { pensionRate: 8.0, taxRate: 18.0 } },
    { id: "SJA-002", name: "Clara Sterling", email: "Kingdavidayoola@gmail.com", dept: "Mathematics", designation: "Math Specialist & Chair", contractType: "Full-Time", basePay: 750000, loadLimit: 0, allowances: { housing: 100000, transport: 50000, extra: 75000 }, deductions: { pensionRate: 8.0, taxRate: 18.0 } },
    { id: "SJA-003", name: "Marc Dupont", email: "m.dupont@kds.edu", dept: "Humanities", designation: "Part-Time History Lecturer", contractType: "Part-Time", basePay: 5000, loadLimit: 20, allowances: { housing: 0, transport: 15000, extra: 0 }, deductions: { pensionRate: 8.0, taxRate: 10.0 } },
    { id: "SJA-004", name: "Sylvia Zhang", email: "s.zhang@kds.edu", dept: "Sciences", designation: "Physics Lab Instructor", contractType: "Part-Time", basePay: 4000, loadLimit: 15, allowances: { housing: 0, transport: 12000, extra: 8000 }, deductions: { pensionRate: 8.0, taxRate: 10.0 } },
    { id: "SJA-005", name: "Julian Ross", email: "j.ross@kds.edu", dept: "Administration", designation: "Academic Registrar", contractType: "Full-Time", basePay: 600000, loadLimit: 0, allowances: { housing: 90000, transport: 50000, extra: 0 }, deductions: { pensionRate: 8.0, taxRate: 18.0 } },
    { id: "SJA-006", name: "Robert Finch", email: "r.finch@kds.edu", dept: "Support", designation: "Facilities Supervisor", contractType: "Full-Time", basePay: 450000, loadLimit: 0, allowances: { housing: 60000, transport: 35000, extra: 15000 }, deductions: { pensionRate: 8.0, taxRate: 15.0 } }
];

const DEFAULT_HISTORY = [
    {
        cycle: "March-2026", finalizedDate: "2026-03-31", staffPaid: 6, totalOutflow: 4250000, approver: "Fiona Owen",
        details: [
            { id: "SJA-001", name: "Dr. Arthur Vance", designation: "Senior Biology Teacher", type: "Full-Time", inputLogged: 0, baseEarned: 800000, allowances: 250000, deductions: 273000, net: 777000 },
            { id: "SJA-002", name: "Clara Sterling", designation: "Math Specialist & Chair", type: "Full-Time", inputLogged: 1, baseEarned: 715909, allowances: 225000, deductions: 245384, net: 695525 },
            { id: "SJA-003", name: "Marc Dupont", designation: "Part-Time History Lecturer", type: "Part-Time", inputLogged: 78, baseEarned: 390000, allowances: 15000, deductions: 48600, net: 356400 },
            { id: "SJA-004", name: "Sylvia Zhang", designation: "Physics Lab Instructor", type: "Part-Time", inputLogged: 55, baseEarned: 220000, allowances: 20000, deductions: 28800, net: 211200 },
            { id: "SJA-005", name: "Julian Ross", designation: "Academic Registrar", type: "Full-Time", inputLogged: 0, baseEarned: 600000, allowances: 140000, deductions: 206400, net: 533600 },
            { id: "SJA-006", name: "Robert Finch", designation: "Facilities Supervisor", type: "Full-Time", inputLogged: 0, baseEarned: 450000, allowances: 110000, deductions: 129600, net: 430400 }
        ]
    },
    {
        cycle: "April-2026", finalizedDate: "2026-04-30", staffPaid: 6, totalOutflow: 4380000, approver: "Fiona Owen",
        details: [
            { id: "SJA-001", name: "Dr. Arthur Vance", designation: "Senior Biology Teacher", type: "Full-Time", inputLogged: 0, baseEarned: 800000, allowances: 250000, deductions: 273000, net: 777000 },
            { id: "SJA-002", name: "Clara Sterling", designation: "Math Specialist & Chair", type: "Full-Time", inputLogged: 0, baseEarned: 750000, allowances: 225000, deductions: 255000, net: 720000 },
            { id: "SJA-003", name: "Marc Dupont", designation: "Part-Time History Lecturer", type: "Part-Time", inputLogged: 82, baseEarned: 410000, allowances: 15000, deductions: 51000, net: 374000 },
            { id: "SJA-004", name: "Sylvia Zhang", designation: "Physics Lab Instructor", type: "Part-Time", inputLogged: 58, baseEarned: 232000, allowances: 20000, deductions: 30240, net: 221760 },
            { id: "SJA-005", name: "Julian Ross", designation: "Academic Registrar", type: "Full-Time", inputLogged: 1, baseEarned: 572727, allowances: 140000, deductions: 197564, net: 515163 },
            { id: "SJA-006", name: "Robert Finch", designation: "Facilities Supervisor", type: "Full-Time", inputLogged: 2, baseEarned: 409091, allowances: 110000, deductions: 135527, net: 383564 }
        ]
    }
];

const DEPT_COLORS = {
    Sciences: "#0d9488",
    Mathematics: "#2563eb",
    Humanities: "#7c3aed",
    Administration: "#d97706",
    Support: "#64748b"
};

const ADMIN_EMAIL = "daoduemmanuel101@gmail.com";
const EMAILJS_SERVICE = "service_qcup3t2";
const EMAILJS_TEMPLATE_STAFF = "template_44vu7vi";
const EMAILJS_TEMPLATE_ADMIN = "template_9vl9ryr";

const COCOBASE_API_KEY = "M-htt6rvgjAuQBs4i3EXI3QLKvJgKFEZ0agKFffI";
const COCOBASE_PROJECT_ID = "033f04e4-4c7c-4ee7-94cc-5f15fb3afd8c";
const COCOBASE_COLLECTION = "pending_approvals";
let db = null;

let state = {
    staff: [],
    attendance: {},
    history: [],
    currentCycle: "May-2026",
    activeView: "dashboard",
    currentUser: null,
    users: [],
    pendingApprovals: []
};

// --------------------------------------------------
// DATABASE INIT
// --------------------------------------------------
async function initDatabase() {
    const cachedStaff = localStorage.getItem("edupay_staff");
    const cachedHistory = localStorage.getItem("edupay_history");
    const cachedAttendance = localStorage.getItem("edupay_attendance");

    state.staff = cachedStaff ? JSON.parse(cachedStaff) : [...DEFAULT_STAFF];
    if (!cachedStaff) localStorage.setItem("edupay_staff", JSON.stringify(state.staff));

    // Ensure Dr. Arthur Vance uses the real email for testing
    const vance = state.staff.find(s => s.id === "SJA-001");
    if (vance && vance.email !== "daoduemmanuel101@gmail.com") {
        vance.email = "daoduemmanuel101@gmail.com";
        localStorage.setItem("edupay_staff", JSON.stringify(state.staff));
    }

    // Ensure Clara Sterling uses the real email for testing
    const clara = state.staff.find(s => s.id === "SJA-002");
    if (clara && clara.email !== "Kingdavidayoola@gmail.com") {
        clara.email = "Kingdavidayoola@gmail.com";
        localStorage.setItem("edupay_staff", JSON.stringify(state.staff));
    }

    state.history = cachedHistory ? JSON.parse(cachedHistory) : [...DEFAULT_HISTORY];
    if (!cachedHistory) localStorage.setItem("edupay_history", JSON.stringify(state.history));

    state.pendingApprovals = [];

    if (cachedAttendance) {
        state.attendance = JSON.parse(cachedAttendance);
    } else {
        const initialCycleLogs = {};
        state.staff.forEach(emp => {
            initialCycleLogs[emp.id] = emp.contractType === "Full-Time" ? 0 : 80;
        });
        state.attendance[state.currentCycle] = initialCycleLogs;
        localStorage.setItem("edupay_attendance", JSON.stringify(state.attendance));
    }

    // Load pendingApprovals from Cocobase (cloud)
    try {
        if (window.CocobaseSDK) {
            db = new CocobaseSDK.Cocobase({ apiKey: COCOBASE_API_KEY, projectId: COCOBASE_PROJECT_ID });
            const docs = await db.listDocuments(COCOBASE_COLLECTION, { filters: { cycle: state.currentCycle }, limit: 1 });
            if (docs && docs.length > 0) {
                state._cocobaseDocId = docs[0]._id;
                state.pendingApprovals = [docs[0].data || docs[0]];
            }
        }
    } catch (err) {
        console.warn("Cocobase load failed, using empty state:", err);
    }
}

async function saveApprovalToCocobase() {
    if (!db) return;
    const approval = state.pendingApprovals.find(a => a.cycle === state.currentCycle);
    if (!approval) return;
    try {
        const data = { ...approval };
        if (state._cocobaseDocId) {
            await db.updateDocument(COCOBASE_COLLECTION, state._cocobaseDocId, data);
        } else {
            const created = await db.createDocument(COCOBASE_COLLECTION, data);
            state._cocobaseDocId = created._id;
        }
    } catch (err) {
        console.warn("Cocobase save failed:", err);
    }
}

async function deleteApprovalFromCocobase() {
    if (!db || !state._cocobaseDocId) return;
    try {
        await db.deleteDocument(COCOBASE_COLLECTION, state._cocobaseDocId);
        state._cocobaseDocId = null;
    } catch (err) {
        console.warn("Cocobase delete failed:", err);
    }
}

function syncStaffUserAccounts() {
    const defaultPwd = "staff123";
    let changes = false;
    state.staff.forEach(emp => {
        const exists = state.users.find(u => (u.staffEmail || u.email).toLowerCase() === emp.email.toLowerCase());
        if (!exists) {
            const nextUserNum = state.users.length > 0
                ? Math.max(...state.users.map(u => parseInt(u.id.split("-")[1]))) + 1
                : 1;
            state.users.push({
                id: `USR-${String(nextUserNum).padStart(3, '0')}`,
                name: emp.name,
                email: emp.email.toLowerCase(),
                password: defaultPwd,
                role: "staff",
                schoolName: "King David Schol",
                designation: emp.designation,
                staffEmail: emp.email
            });
            changes = true;
        } else {
            // Update email if it changed
            const targetEmail = emp.email.toLowerCase();
            if ((exists.staffEmail || exists.email).toLowerCase() !== targetEmail) {
                exists.email = targetEmail;
                exists.staffEmail = emp.email;
                changes = true;
            }
        }
    });
    if (changes) persistState(["users"]);
}

function persistState(keys = ["staff", "attendance", "history"]) {
    if (keys.includes("staff"))           localStorage.setItem("edupay_staff",           JSON.stringify(state.staff));
    if (keys.includes("attendance"))      localStorage.setItem("edupay_attendance",      JSON.stringify(state.attendance));
    if (keys.includes("history"))         localStorage.setItem("edupay_history",         JSON.stringify(state.history));
    if (keys.includes("users"))           localStorage.setItem("edupay_users",           JSON.stringify(state.users));
}

function getLinkedStaffRecord(user) {
    if (!user) return null;
    const lookupEmail = user.staffEmail || user.email;
    return state.staff.find(s => s.email === lookupEmail) || null;
}

// --------------------------------------------------
// AUTH SYSTEM
// --------------------------------------------------
function initUsers() {
    const storedVersion = localStorage.getItem('edupay_schema_version');
    const stored = localStorage.getItem('edupay_users');

    const needsReseed = !stored ||
        storedVersion !== SCHEMA_VERSION ||
        (() => { try { const u = JSON.parse(stored); return !Array.isArray(u) || !u[0]?.password; } catch(e) { return true; } })();

    if (needsReseed) {
        state.users = [...DEFAULT_USERS];
        localStorage.setItem('edupay_users', JSON.stringify(state.users));
        localStorage.setItem('edupay_schema_version', SCHEMA_VERSION);
        localStorage.removeItem('edupay_session');
    } else {
        state.users = JSON.parse(stored);
    }
}

function showAuthPortal() {
    document.getElementById('auth-portal-container').classList.remove('hidden');
    document.getElementById('app-container').classList.add('hidden');
    lucide.createIcons();
}

function bootDashboard(user) {
    state.currentUser = user;
    document.getElementById('auth-portal-container').classList.add('hidden');
    document.getElementById('app-container').classList.remove('hidden');

    const initials = user.name.split(' ').filter(n => n).map(n => n[0]).join('').substring(0, 2).toUpperCase();
    document.getElementById('sidebar-avatar').textContent = initials;
    document.getElementById('sidebar-user-name').textContent = user.name;
    document.getElementById('sidebar-user-role').textContent = user.designation;
    document.getElementById('school-name-badge').textContent = user.schoolName;

    if (user.role === 'administrator') {
        document.getElementById('admin-nav').classList.remove('hidden');
        document.getElementById('staff-nav').classList.add('hidden');
        switchView('dashboard');
    } else {
        document.getElementById('admin-nav').classList.add('hidden');
        document.getElementById('staff-nav').classList.remove('hidden');
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        const firstStaffItem = document.querySelector('#staff-nav .nav-item');
        if (firstStaffItem) firstStaffItem.classList.add('active');
        switchView('my-dashboard');
    }

    lucide.createIcons();
}

function checkExistingSession() {
    const session = localStorage.getItem('edupay_session');
    if (!session) return false;
    try {
        const parsed = JSON.parse(session);
        const user = state.users.find(u => u.id === parsed.id && u.email === parsed.email);
        if (user) { bootDashboard(user); return true; }
    } catch (e) { /* invalid session */ }
    return false;
}

function handleLogin() {
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;
    const errEl = document.getElementById('login-error-msg');
    errEl.classList.add('hidden');

    if (!email || !password) {
        errEl.textContent = 'Please enter both your email and password.';
        errEl.classList.remove('hidden');
        return;
    }

    const user = state.users.find(u => u.email.toLowerCase() === email && u.password === password);
    if (!user) {
        errEl.textContent = 'Invalid email or password. Please try again.';
        errEl.classList.remove('hidden');
        return;
    }
    if (user.enabled === false) {
        errEl.textContent = 'This account has been disabled. Please contact your administrator.';
        errEl.classList.remove('hidden');
        return;
    }

    bootDashboard(user);
}

function handleLogout() {
    state.currentUser = null;
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
    document.getElementById('login-error-msg').classList.add('hidden');
    closeSidebar();
    showAuthPortal();
}

function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon = btn.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.setAttribute('data-lucide', 'eye-off');
    } else {
        input.type = 'password';
        icon.setAttribute('data-lucide', 'eye');
    }
    lucide.createIcons();
}

// --------------------------------------------------
// MOBILE SIDEBAR TOGGLE
// --------------------------------------------------
function openSidebar() {
    document.getElementById('sidebar').classList.add('open');
    document.getElementById('sidebar-backdrop').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebar-backdrop').classList.remove('active');
    document.body.style.overflow = '';
}

// --------------------------------------------------
// HELPERS
// --------------------------------------------------
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
}

function calculateEmployeePayroll(emp, cycleInput = 0) {
    const isFullTime = emp.contractType === "Full-Time";
    let baseEarned = 0;
    let absencePenalty = 0;

    if (isFullTime) {
        const dayRate = emp.basePay / 22;
        absencePenalty = dayRate * cycleInput;
        baseEarned = Math.max(0, emp.basePay - absencePenalty);
    } else {
        baseEarned = emp.basePay * cycleInput;
    }

    const totalAllowances = emp.allowances.housing + emp.allowances.transport + emp.allowances.extra;
    const grossSalary = baseEarned + totalAllowances;
    const pensionDeduction = grossSalary * (emp.deductions.pensionRate / 100);
    const taxDeduction = grossSalary * (emp.deductions.taxRate / 100);
    const totalDeductions = pensionDeduction + taxDeduction;
    const netSalary = Math.max(0, grossSalary - totalDeductions);

    return {
        id: emp.id, name: emp.name, designation: emp.designation, type: emp.contractType,
        inputLogged: cycleInput, baseRate: emp.basePay, baseEarned, absencePenalty,
        housingAllow: emp.allowances.housing, transportAllow: emp.allowances.transport, extraAllow: emp.allowances.extra,
        totalAllowances, gross: grossSalary, taxDeduction, pensionDeduction, totalDeductions, net: netSalary
    };
}

// --------------------------------------------------
// VIEW ROUTING
// --------------------------------------------------
function switchView(viewName) {
    state.activeView = viewName;

    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.toggle("active", item.getAttribute("data-view") === viewName);
    });

    document.querySelectorAll(".view-section").forEach(sec => sec.classList.remove("active"));
    const targetSection = document.getElementById(`${viewName}-view`);
    if (targetSection) targetSection.classList.add("active");

    const titleEl = document.getElementById("view-title");
    const subEl   = document.getElementById("view-subtitle");
    const firstName = state.currentUser ? state.currentUser.name.split(' ')[0] : 'there';

    switch (viewName) {
        case "dashboard":
            titleEl.textContent = "Dashboard";
            subEl.textContent = `Welcome back, ${firstName}. Here is today's overview.`;
            renderDashboard();
            break;
        case "staff":
            titleEl.textContent = "Staff Directory";
            subEl.textContent = "Manage employee files, base pay grades, and structural configuration.";
            renderStaff();
            break;
        case "attendance":
            titleEl.textContent = "Log Attendance & Hours";
            subEl.textContent = "Review timesheet entries and check off monthly teacher loads.";
            renderAttendance();
            break;
        case "payroll":
            titleEl.textContent = "Run Monthly Payroll";
            subEl.textContent = "Compile allowances, deductions, and finalize calculations for disbursement.";
            renderPayroll();
            break;
        case "history":
            titleEl.textContent = "Payroll History & Archive";
            subEl.textContent = "Access verified historical cycles, print statements, and review records.";
            renderHistory();
            break;
        case "my-dashboard":
            titleEl.textContent = "My Pay Dashboard";
            subEl.textContent = `Hello, ${firstName}. Here is your personal pay summary for the current cycle.`;
            renderMyDashboard();
            break;
        case "my-timesheet":
            titleEl.textContent = "My Timesheet";
            subEl.textContent = "Log your working hours or absences for the current pay period.";
            renderMyTimesheet();
            break;
        case "my-payslips":
            titleEl.textContent = "My Payslips";
            subEl.textContent = "View and print your personal payslip statements.";
            renderMyPayslips();
            break;
        case "my-approvals":
            titleEl.textContent = "My Approvals";
            subEl.textContent = "Review and approve or reject your salary payment for the current cycle.";
            renderMyApprovals();
            break;
        case "spreadsheet":
            titleEl.textContent = "Spreadsheet";
            subEl.textContent = "Bulk edit staff data, attendance, and payroll inputs in a spreadsheet interface.";
            renderSpreadsheet();
            break;
        case "users":
            titleEl.textContent = "User Management";
            subEl.textContent = "Control login access, reset credentials, and link accounts to staff records.";
            renderUserManagement();
            break;
    }

    // Auto-close sidebar on mobile after navigating
    if (window.innerWidth <= 768) closeSidebar();

    lucide.createIcons();
}

// --------------------------------------------------
// VIEW: DASHBOARD (Admin)
// --------------------------------------------------
function renderDashboard() {
    let totalProjectedPayroll = 0;
    let totalHoursLogged = 0;
    let ftCount = 0;
    let ptCount = 0;
    const cycleInputs = state.attendance[state.currentCycle] || {};
    const deptTotals = {};

    state.staff.forEach(emp => {
        if (emp.contractType === "Full-Time") ftCount++;
        else ptCount++;
        const input = cycleInputs[emp.id] || 0;
        if (emp.contractType === "Part-Time") totalHoursLogged += input;
        const calc = calculateEmployeePayroll(emp, input);
        totalProjectedPayroll += calc.net;
        deptTotals[emp.dept] = (deptTotals[emp.dept] || 0) + calc.net;
    });

    document.getElementById("dash-total-payroll").textContent = formatCurrency(totalProjectedPayroll);
    document.getElementById("dash-active-staff").textContent = state.staff.length;
    document.getElementById("dash-staff-ratio").textContent = `${ftCount} FT / ${ptCount} PT`;
    document.getElementById("dash-hours-logged").textContent = `${totalHoursLogged} hrs`;

    renderDepartmentChart(deptTotals);
}

function renderDepartmentChart(deptTotals) {
    const chartContainer = document.getElementById("department-chart");
    chartContainer.innerHTML = "";

    const departments = Object.keys(deptTotals);
    const totalCost = Object.values(deptTotals).reduce((sum, val) => sum + val, 0);

    if (totalCost === 0) {
        chartContainer.innerHTML = `<div class="chart-loader">No active payroll data found.</div>`;
        return;
    }

    const size = 160;
    const r = 52;
    const cx = size / 2;
    const cy = size / 2;
    const strokeWidth = 16;
    const circumference = 2 * Math.PI * r;

    let accumulatedPercentage = 0;
    let svgCircles = "";

    departments.forEach(dept => {
        const val = deptTotals[dept];
        const pct = val / totalCost;
        const color = DEPT_COLORS[dept] || "#64748b";
        const strokeDasharray = `${pct * circumference} ${circumference}`;
        const rotationAngle = (accumulatedPercentage * 360) - 90;
        accumulatedPercentage += pct;

        svgCircles += `
            <circle cx="${cx}" cy="${cy}" r="${r}"
                fill="transparent" stroke="${color}"
                stroke-width="${strokeWidth}"
                stroke-dasharray="${strokeDasharray}"
                transform="rotate(${rotationAngle} ${cx} ${cy})"
                style="transition: stroke-dasharray 0.5s ease;" />
        `;
    });

    const innerText = `
        <circle cx="${cx}" cy="${cy}" r="${r - strokeWidth / 2}" fill="white" />
        <text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="9" font-weight="600" fill="#94a3b8" font-family="Outfit, sans-serif">TOTAL</text>
        <text x="${cx}" y="${cy + 13}" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a" font-family="Outfit, sans-serif">${formatCurrency(totalCost)}</text>
    `;

    const svgMarkup = `
        <div class="chart-svg-container">
            <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
                ${svgCircles}
                ${innerText}
            </svg>
            <div class="chart-legend">
                ${departments.map(dept => {
                    const cost = deptTotals[dept];
                    const pctLabel = ((cost / totalCost) * 100).toFixed(0);
                    return `
                        <div class="legend-item">
                            <span class="legend-color" style="background-color: ${DEPT_COLORS[dept] || '#64748b'}"></span>
                            <span><strong>${dept}</strong>: ${formatCurrency(cost)} (${pctLabel}%)</span>
                        </div>
                    `;
                }).join("")}
            </div>
        </div>
    `;

    chartContainer.innerHTML = svgMarkup;
}

// --------------------------------------------------
// VIEW: STAFF DIRECTORY
// --------------------------------------------------
function renderStaff() {
    const tableBody = document.getElementById("staff-table-body");
    tableBody.innerHTML = "";

    const searchQuery = document.getElementById("staff-search").value.toLowerCase();
    const deptFilter  = document.getElementById("filter-dept").value;
    const typeFilter  = document.getElementById("filter-type").value;

    const filteredStaff = state.staff.filter(emp => {
        const matchesSearch = emp.name.toLowerCase().includes(searchQuery) ||
                              emp.email.toLowerCase().includes(searchQuery) ||
                              emp.designation.toLowerCase().includes(searchQuery);
        const matchesDept = deptFilter === "all" || emp.dept === deptFilter;
        const matchesType = typeFilter === "all" || emp.contractType === typeFilter;
        return matchesSearch && matchesDept && matchesType;
    });

    if (filteredStaff.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:40px;">No employees matched your search criteria.</td></tr>`;
        return;
    }

    filteredStaff.forEach(emp => {
        const initial = emp.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        const basePayFormatted = emp.contractType === "Full-Time"
            ? `${formatCurrency(emp.basePay)}/mo`
            : `${formatCurrency(emp.basePay)}/hr`;
        const totalAllowance = emp.allowances.housing + emp.allowances.transport + emp.allowances.extra;
        const deductionsLabel = `${emp.deductions.taxRate}% Tax / ${emp.deductions.pensionRate}% Pens.`;
        
        const avatarHtml = emp.photo
            ? `<img src="${emp.photo}" alt="${emp.name}" class="staff-photo">`
            : `<div class="staff-avatar">${initial}</div>`;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <div class="staff-cell">
                    ${avatarHtml}
                    <div class="staff-info">
                        <span class="staff-name">${emp.name}</span>
                        <span class="staff-email">${emp.email}</span>
                    </div>
                </div>
            </td>
            <td>${emp.dept}</td>
            <td><span class="badge ${emp.contractType === "Full-Time" ? "badge-blue" : "badge-purple"}">${emp.contractType}</span></td>
            <td>${emp.designation}</td>
            <td><strong>${basePayFormatted}</strong></td>
            <td>${formatCurrency(totalAllowance)}</td>
            <td><span class="text-secondary" style="font-size:12px;">${deductionsLabel}</span></td>
            <td class="actions-col">
                <button class="action-icon-btn edit-btn" data-id="${emp.id}" title="Edit Profile"><i data-lucide="edit"></i></button>
                <button class="action-icon-btn delete-btn" data-id="${emp.id}" title="Archive Employee"><i data-lucide="trash-2"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", () => openStaffModal(btn.getAttribute("data-id")));
    });
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", () => deleteStaff(btn.getAttribute("data-id")));
    });

    lucide.createIcons();
}

// --------------------------------------------------
// VIEW: ATTENDANCE
// --------------------------------------------------
function renderAttendance() {
    const tableBody = document.getElementById("attendance-table-body");
    tableBody.innerHTML = "";

    const cycleLogs = state.attendance[state.currentCycle] || {};

    state.staff.forEach(emp => {
        const value = cycleLogs[emp.id] !== undefined ? cycleLogs[emp.id] : (emp.contractType === "Full-Time" ? 0 : 80);
        const limitText = emp.contractType === "Full-Time"
            ? "N/A (Salaried)"
            : `${emp.loadLimit} hrs/wk (~${emp.loadLimit * 4} max/mo)`;
        const unit = emp.contractType === "Full-Time" ? "Absent Days" : "Teaching Hours";

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <div class="staff-cell">
                    <div class="staff-avatar">${emp.name.split(' ').map(n => n[0]).join('').substring(0, 2)}</div>
                    <div class="staff-info">
                        <span class="staff-name">${emp.name}</span>
                        <span class="staff-email">${emp.designation}</span>
                    </div>
                </div>
            </td>
            <td><span class="badge ${emp.contractType === 'Full-Time' ? 'badge-blue' : 'badge-purple'}">${emp.contractType}</span></td>
            <td><span class="text-secondary" style="font-size:12px;">${limitText}</span></td>
            <td><input type="number" class="timesheet-input" data-id="${emp.id}" value="${value}" min="0" max="${emp.contractType === 'Full-Time' ? 22 : 240}"></td>
            <td><strong style="font-size:12px;">${unit}</strong></td>
            <td><span class="badge badge-green"><i data-lucide="shield-check" style="width:11px;height:11px;margin-right:3px;"></i>Ready</span></td>
        `;
        tableBody.appendChild(row);
    });

    lucide.createIcons();
}

function saveAttendance() {
    const cycleLogs = {};
    document.querySelectorAll(".timesheet-input").forEach(input => {
        cycleLogs[input.getAttribute("data-id")] = parseFloat(input.value) || 0;
    });
    state.attendance[state.currentCycle] = cycleLogs;
    persistState(["attendance"]);

    const statusEl = document.getElementById("attendance-save-status");
    statusEl.textContent = "Changes saved to database successfully!";
    statusEl.style.color = "var(--green)";
    setTimeout(() => {
        statusEl.textContent = "All attendance changes saved locally.";
        statusEl.style.color = "var(--text-secondary)";
    }, 3000);
}

// --------------------------------------------------
// VIEW: PAYROLL CALCULATOR
// --------------------------------------------------
function renderPayroll() {
    const worksheetBody = document.getElementById("worksheet-table-body");
    worksheetBody.innerHTML = "";

    const cycleInputs = state.attendance[state.currentCycle] || {};
    let sumGross = 0, sumAllow = 0, sumDed = 0, sumNet = 0, ptHoursLogged = 0;

    state.staff.forEach(emp => {
        const inputVal = cycleInputs[emp.id] || 0;
        if (emp.contractType === "Part-Time") ptHoursLogged += inputVal;
        const calc = calculateEmployeePayroll(emp, inputVal);
        sumGross += calc.baseEarned;
        sumAllow += calc.totalAllowances;
        sumDed += calc.totalDeductions;
        sumNet += calc.net;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <div class="staff-info">
                    <span class="staff-name">${calc.name}</span>
                    <span class="staff-email">${calc.designation}</span>
                </div>
            </td>
            <td><strong>${formatCurrency(calc.baseEarned)}</strong> <span style="font-size:11px;color:var(--text-secondary);">${calc.type === 'Part-Time' ? `(${calc.inputLogged} hrs)` : calc.inputLogged > 0 ? `(-${calc.inputLogged} abs)` : ''}</span></td>
            <td>${formatCurrency(calc.totalAllowances)}</td>
            <td><span class="text-danger">${formatCurrency(calc.totalDeductions)}</span></td>
            <td><strong class="text-green">${formatCurrency(calc.net)}</strong></td>
        `;
        worksheetBody.appendChild(row);
    });

    document.getElementById("sum-gross").textContent = formatCurrency(sumGross);
    document.getElementById("sum-allowances").textContent = formatCurrency(sumAllow);
    document.getElementById("sum-deductions").textContent = `-${formatCurrency(sumDed)}`;
    document.getElementById("sum-net").textContent = formatCurrency(sumNet);

    const chkHours = document.getElementById("chk-hours");
    const chkHoursText = document.getElementById("chk-hours-text");
    if (ptHoursLogged > 0) {
        chkHours.className = "check-item checked";
        chkHours.querySelector("i")?.setAttribute("data-lucide", "check-circle-2");
        chkHoursText.textContent = `Verify hours are logged (${ptHoursLogged} hours verified)`;
    } else {
        chkHours.className = "check-item";
        chkHours.querySelector("i")?.setAttribute("data-lucide", "circle");
        chkHoursText.textContent = "Verify hours are logged (0 logged so far)";
    }

    document.querySelectorAll(".current-month-text").forEach(el => {
        el.textContent = state.currentCycle.replace("-", " ");
    });

    // Check for existing approval request for this cycle
    const existingApproval = state.pendingApprovals.find(a => a.cycle === state.currentCycle);
    const sendBtn = document.getElementById("send-approval-btn");
    const finalizeBtn = document.getElementById("approve-payroll-btn");
    const statusEl = document.getElementById("approval-status");

    if (existingApproval) {
        sendBtn.disabled = true;
        sendBtn.innerHTML = '<i data-lucide="check-circle"></i> Sent for Approval';
        
        const allApproved = existingApproval.details.every(d => d.status === "approved");
        const anyRejected = existingApproval.details.some(d => d.status === "rejected");
        const pendingCount = existingApproval.details.filter(d => d.status === "pending").length;
        const approvedCount = existingApproval.details.filter(d => d.status === "approved").length;
        const rejectedCount = existingApproval.details.filter(d => d.status === "rejected").length;

        if (allApproved) {
            finalizeBtn.disabled = false;
            statusEl.textContent = `All ${existingApproval.staffCount} staff members have approved. Ready to finalize.`;
            statusEl.style.color = "var(--green)";
        } else if (anyRejected) {
            finalizeBtn.disabled = true;
            statusEl.textContent = `${rejectedCount} rejected, ${pendingCount} pending, ${approvedCount} approved. Cannot finalize until all approve.`;
            statusEl.style.color = "var(--danger)";
        } else {
            finalizeBtn.disabled = true;
            statusEl.textContent = `${pendingCount} pending, ${approvedCount} approved. Waiting for staff responses...`;
            statusEl.style.color = "var(--amber)";
        }
    } else {
        sendBtn.disabled = false;
        sendBtn.innerHTML = '<i data-lucide="send"></i> Send for Staff Approval';
        finalizeBtn.disabled = true;
        statusEl.textContent = "";
    }

    // Staff approval status table
    const statusTableContainer = document.getElementById("staff-approval-status");
    if (existingApproval) {
        const badgeMap = {
            "pending": `<span class="badge badge-gray">Awaiting Response</span>`,
            "approved": `<span class="badge badge-green">Approved</span>`,
            "rejected": `<span class="badge badge-danger">Rejected</span>`
        };
        let tableHtml = `
            <div class="glass-card" style="margin-top:16px;padding:16px;">
                <h4 style="margin-bottom:12px;">Staff Approval Status</h4>
                <div style="overflow-x:auto;">
                    <table class="data-table" style="min-width:400px;">
                        <thead>
                            <tr><th>Staff</th><th>Designation</th><th>Net Pay</th><th>Status</th></tr>
                        </thead>
                        <tbody>`;
        existingApproval.details.forEach(d => {
            tableHtml += `<tr><td>${d.name}</td><td>${d.designation}</td><td>${formatCurrency(d.net)}</td><td>${badgeMap[d.status] || badgeMap.pending}</td></tr>`;
        });
        tableHtml += `</tbody></table></div></div>`;
        statusTableContainer.innerHTML = tableHtml;
    } else {
        statusTableContainer.innerHTML = "";
    }

    lucide.createIcons();
}

function sendForApproval() {
    const cycleInputs = state.attendance[state.currentCycle] || {};
    const details = [];
    let grandOutflow = 0;

    state.staff.forEach(emp => {
        const inputVal = cycleInputs[emp.id] || 0;
        const calc = calculateEmployeePayroll(emp, inputVal);
        grandOutflow += calc.net;
        details.push({
            id: emp.id, name: emp.name, designation: emp.designation, type: emp.contractType,
            inputLogged: inputVal, baseEarned: calc.baseEarned,
            allowances: calc.totalAllowances, deductions: calc.totalDeductions, net: calc.net,
            status: "pending", rejectionReason: null
        });
    });

    const approvalRequest = {
        cycle: state.currentCycle,
        requestedDate: new Date().toISOString().split("T")[0],
        requestedBy: state.currentUser ? state.currentUser.name : "Fiona Owen",
        totalOutflow: grandOutflow,
        staffCount: state.staff.length,
        details
    };

    state.pendingApprovals = state.pendingApprovals.filter(a => a.cycle !== state.currentCycle);
    state.pendingApprovals.unshift(approvalRequest);
    saveApprovalToCocobase();

    document.getElementById("send-approval-btn").disabled = true;
    document.getElementById("send-approval-btn").innerHTML = '<i data-lucide="check-circle"></i> Sent for Approval';
    document.getElementById("approval-status").textContent = `Approval request sent to ${state.staff.length} staff members. Waiting for their response...`;
    document.getElementById("approval-status").style.color = "var(--accent)";

    // Send email to each staff member
    state.staff.forEach((emp, i) => {
        const detail = approvalRequest.details.find(d => d.id === emp.id);
        if (detail) {
            setTimeout(() => sendApprovalRequestEmail(emp, detail), i * 300);
        }
    });

    lucide.createIcons();
    alert(`Approval request sent! ${state.staff.length} staff members have been notified to review and approve their payments for ${state.currentCycle.replace("-", " ")}.`);
}

function approvePayroll() {
    const approval = state.pendingApprovals.find(a => a.cycle === state.currentCycle);
    if (!approval) {
        alert("No pending approval for this cycle.");
        return;
    }

    const allApproved = approval.details.every(d => d.status === "approved");
    const anyRejected = approval.details.some(d => d.status === "rejected");

    if (!allApproved) {
        alert("Cannot finalize payroll until all staff have approved. Some staff have not responded or have rejected.");
        return;
    }

    const historyItem = {
        cycle: approval.cycle,
        finalizedDate: new Date().toISOString().split("T")[0],
        staffPaid: approval.staffCount,
        totalOutflow: approval.totalOutflow,
        approver: approval.requestedBy,
        details: approval.details.map(d => ({
            id: d.id, name: d.name, designation: d.designation, type: d.type,
            inputLogged: d.inputLogged, baseEarned: d.baseEarned,
            allowances: d.allowances, deductions: d.deductions, net: d.net
        }))
    };

    state.history = state.history.filter(h => h.cycle !== approval.cycle);
    state.history.unshift(historyItem);
    state.pendingApprovals = state.pendingApprovals.filter(a => a.cycle !== approval.cycle);

    persistState(["history"]);
    deleteApprovalFromCocobase();

    alert(`Success! Payroll for ${approval.cycle.replace("-", " ")} has been finalized. Total payout: ${formatCurrency(approval.totalOutflow)}.`);

    switchView("history");
}

// --------------------------------------------------
// CSV EXPORT
// --------------------------------------------------
function exportCycleToCSV(cycleId) {
    const run = state.history.find(h => h.cycle === cycleId);
    if (!run) return;

    const headers = ["Pay Period","Finalized Date","Employee ID","Name","Designation","Contract Type",
        "Hours/Days Logged","Base Earnings","Allowances","Deductions","Net Pay","Approver"];

    const rows = run.details.map(d => [
        run.cycle.replace("-", " "),
        run.finalizedDate,
        d.id,
        `"${d.name}"`,
        `"${d.designation}"`,
        d.type,
        d.inputLogged,
        d.baseEarned.toFixed(2),
        d.allowances.toFixed(2),
        d.deductions.toFixed(2),
        d.net.toFixed(2),
        `"${run.approver}"`
    ]);

    const totals = ["TOTALS", run.finalizedDate, "", "", "", "",
        run.details.reduce((s,d) => s + d.inputLogged, 0),
        run.details.reduce((s,d) => s + d.baseEarned, 0).toFixed(2),
        run.details.reduce((s,d) => s + d.allowances, 0).toFixed(2),
        run.details.reduce((s,d) => s + d.deductions, 0).toFixed(2),
        run.totalOutflow.toFixed(2),
        run.approver
    ];

    const csv = [headers, ...rows, totals].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `EduPay_Payroll_${run.cycle}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

function exportAllHistoryToCSV() {
    if (state.history.length === 0) { alert("No payroll history to export."); return; }

    const headers = ["Pay Period","Finalized Date","Employee ID","Name","Designation","Contract Type",
        "Hours/Days Logged","Base Earnings","Allowances","Deductions","Net Pay","Approver"];

    const rows = [];
    state.history.forEach(run => {
        run.details.forEach(d => {
            rows.push([
                run.cycle.replace("-", " "),
                run.finalizedDate,
                d.id,
                `"${d.name}"`,
                `"${d.designation}"`,
                d.type,
                d.inputLogged,
                d.baseEarned.toFixed(2),
                d.allowances.toFixed(2),
                d.deductions.toFixed(2),
                d.net.toFixed(2),
                `"${run.approver}"`
            ]);
        });
    });

    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `EduPay_AllPayroll_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

// --------------------------------------------------
// VIEW: PAYROLL HISTORY
// --------------------------------------------------
function renderHistory() {
    const tableBody = document.getElementById("history-table-body");
    tableBody.innerHTML = "";

    if (state.history.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:40px;">No finalized payroll runs found in the archive.</td></tr>`;
        return;
    }

    state.history.forEach(run => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><strong>${run.cycle.replace("-", " ")}</strong></td>
            <td>${run.finalizedDate}</td>
            <td>${run.staffPaid} employees</td>
            <td><strong class="text-green">${formatCurrency(run.totalOutflow)}</strong></td>
            <td><span class="badge badge-blue"><i data-lucide="check" style="width:11px;height:11px;margin-right:3px;"></i>${run.approver}</span></td>
            <td class="actions-col">
                <button class="secondary-btn export-csv-btn" data-cycle="${run.cycle}" style="padding:5px 10px;font-size:12px;margin-right:6px;" title="Download CSV">
                    <i data-lucide="download"></i>
                </button>
                <button class="primary-btn view-details-btn" data-cycle="${run.cycle}" style="padding:5px 10px;font-size:12px;">
                    View Ledger
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    document.querySelectorAll(".view-details-btn").forEach(btn => {
        btn.addEventListener("click", () => expandHistoryDetails(btn.getAttribute("data-cycle")));
    });
    document.querySelectorAll(".export-csv-btn").forEach(btn => {
        btn.addEventListener("click", () => exportCycleToCSV(btn.getAttribute("data-cycle")));
    });

    lucide.createIcons();
}

function expandHistoryDetails(cycleId) {
    const container = document.getElementById("history-detail-container");
    const title = document.getElementById("history-detail-month");
    const body = document.getElementById("history-detail-body");

    const run = state.history.find(h => h.cycle === cycleId);
    if (!run) return;

    title.textContent = `Details Ledger for Cycle: ${run.cycle.replace("-", " ")}`;
    body.innerHTML = "";

    run.details.forEach(item => {
        const row = document.createElement("tr");
        const logUnit = item.type === "Full-Time" ? `${item.inputLogged} absences` : `${item.inputLogged} hours`;
        row.innerHTML = `
            <td><strong>${item.name}</strong></td>
            <td style="font-size:12px;">${item.designation}</td>
            <td><span class="badge ${item.type === 'Full-Time' ? 'badge-blue' : 'badge-purple'}">${item.type}</span></td>
            <td>${logUnit}</td>
            <td>${formatCurrency(item.baseEarned)}</td>
            <td>${formatCurrency(item.allowances)}</td>
            <td><span class="text-danger">${formatCurrency(item.deductions)}</span></td>
            <td><strong class="text-green">${formatCurrency(item.net)}</strong></td>
            <td class="actions-col">
                <button class="action-icon-btn view-payslip-btn" data-cycle="${cycleId}" data-emp="${item.id}" title="View Payslip">
                    <i data-lucide="file-text"></i>
                </button>
            </td>
        `;
        body.appendChild(row);
    });

    container.classList.remove("hidden");
    container.scrollIntoView({ behavior: 'smooth' });

    document.querySelectorAll(".view-payslip-btn").forEach(btn => {
        btn.addEventListener("click", () => showPayslip(btn.getAttribute("data-cycle"), btn.getAttribute("data-emp")));
    });

    lucide.createIcons();
}

// --------------------------------------------------
// MODAL: PAYSLIP
// --------------------------------------------------
function showPayslip(cycleId, employeeId) {
    const modal = document.getElementById("payslip-modal");
    const run = state.history.find(h => h.cycle === cycleId);
    if (!run) return;
    const detail = run.details.find(d => d.id === employeeId);
    const originEmp = state.staff.find(e => e.id === employeeId);
    if (!detail || !originEmp) return;

    document.getElementById("ps-period").textContent = `Pay Period: ${cycleId.replace("-", " ")}`;
    document.getElementById("ps-name").textContent = detail.name;
    document.getElementById("ps-designation").textContent = detail.designation;
    document.getElementById("ps-dept").textContent = originEmp.dept;
    document.getElementById("ps-id").textContent = detail.id;
    document.getElementById("ps-type").textContent = detail.type;

    const baseDescEl = document.getElementById("ps-base-rate-desc");
    baseDescEl.textContent = detail.type === "Full-Time"
        ? "(Base Monthly Salary)"
        : `(${detail.inputLogged} hours @ ${formatCurrency(originEmp.basePay)}/hr)`;

    document.getElementById("ps-base-earn").textContent = formatCurrency(detail.baseEarned);
    document.getElementById("ps-allow-housing").textContent = formatCurrency(originEmp.allowances.housing);
    document.getElementById("ps-allow-transport").textContent = formatCurrency(originEmp.allowances.transport);
    document.getElementById("ps-allow-extra").textContent = formatCurrency(originEmp.allowances.extra);

    const grossVal = detail.baseEarned + detail.allowances;
    document.getElementById("ps-gross-total").textContent = formatCurrency(grossVal);
    document.getElementById("ps-tax-rate").textContent = originEmp.deductions.taxRate;
    document.getElementById("ps-pension-rate").textContent = originEmp.deductions.pensionRate;

    const pensionDeduct = grossVal * (originEmp.deductions.pensionRate / 100);
    const taxDeduct = grossVal * (originEmp.deductions.taxRate / 100);
    document.getElementById("ps-ded-tax").textContent = formatCurrency(taxDeduct);
    document.getElementById("ps-ded-pension").textContent = formatCurrency(pensionDeduct);

    const absRow = document.getElementById("ps-absence-row");
    if (detail.type === "Full-Time" && detail.inputLogged > 0) {
        absRow.style.display = "table-row";
        document.getElementById("ps-absences").textContent = detail.inputLogged;
        const penalty = (originEmp.basePay / 22) * detail.inputLogged;
        document.getElementById("ps-ded-absences").textContent = `-${formatCurrency(penalty)}`;
    } else {
        absRow.style.display = "none";
    }

    document.getElementById("ps-ded-total").textContent = formatCurrency(detail.deductions);
    document.getElementById("ps-strip-gross").textContent = formatCurrency(grossVal);
    document.getElementById("ps-strip-deductions").textContent = formatCurrency(detail.deductions);
    document.getElementById("ps-strip-net").textContent = formatCurrency(detail.net);

    modal.classList.add("active");
    lucide.createIcons();
}

function closePayslipModal() {
    document.getElementById("payslip-modal").classList.remove("active");
}

// --------------------------------------------------
// MODAL: ADD / EDIT STAFF
// --------------------------------------------------
function openStaffModal(empId = null) {
    const modal = document.getElementById("staff-modal");
    const form = document.getElementById("staff-form");
    const modalTitle = document.getElementById("modal-title");
    const submitBtn = document.getElementById("submit-staff-btn");

    form.reset();
    resetPhotoPreview();

    if (empId) {
        modalTitle.textContent = "Edit Employee Profile";
        submitBtn.textContent = "Save Changes";
        const emp = state.staff.find(e => e.id === empId);
        if (!emp) return;

        document.getElementById("staff-id-field").value = emp.id;
        document.getElementById("staff-name").value = emp.name;
        document.getElementById("staff-email").value = emp.email;
        document.getElementById("staff-dept").value = emp.dept;
        document.getElementById("staff-designation").value = emp.designation;
        document.getElementById("staff-contract-type").value = emp.contractType;
        document.getElementById("staff-base-pay").value = emp.basePay;
        document.getElementById("staff-limit").value = emp.loadLimit;
        document.getElementById("staff-allow-housing").value = emp.allowances.housing;
        document.getElementById("staff-allow-transport").value = emp.allowances.transport;
        document.getElementById("staff-allow-extra").value = emp.allowances.extra;
        document.getElementById("staff-ded-pension").value = emp.deductions.pensionRate;
        document.getElementById("staff-ded-tax").value = emp.deductions.taxRate;
        
        if (emp.photo) {
            setPhotoPreview(emp.photo);
        }
        handleContractFieldToggle(emp.contractType);
    } else {
        modalTitle.textContent = "Onboard New Employee";
        submitBtn.textContent = "Add Staff Member";
        document.getElementById("staff-id-field").value = "";
        document.getElementById("staff-limit").value = "20";
        document.getElementById("staff-allow-housing").value = "0";
        document.getElementById("staff-allow-transport").value = "0";
        document.getElementById("staff-allow-extra").value = "0";
        document.getElementById("staff-ded-pension").value = "8.0";
        document.getElementById("staff-ded-tax").value = "18.0";
        handleContractFieldToggle("Full-Time");
    }

    modal.classList.add("active");
    lucide.createIcons();
}

function resetPhotoPreview() {
    const preview = document.getElementById("staff-photo-preview");
    const input = document.getElementById("staff-photo");
    preview.classList.remove("has-photo");
    preview.innerHTML = '<i data-lucide="user" class="photo-placeholder-icon"></i><span class="photo-placeholder-text">Click to upload</span>';
    input.value = "";
    lucide.createIcons();
}

function setPhotoPreview(dataUrl) {
    const preview = document.getElementById("staff-photo-preview");
    preview.classList.add("has-photo");
    preview.innerHTML = `<img src="${dataUrl}" alt="Staff photo">`;
}

function handlePhotoUpload(input) {
    const file = input.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
    }
    
    if (file.size > 2 * 1024 * 1024) {
        alert('Image size must be less than 2MB');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        setPhotoPreview(e.target.result);
    };
    reader.readAsDataURL(file);
}

function closeStaffModal() {
    document.getElementById("staff-modal").classList.remove("active");
}

function handleContractFieldToggle(typeVal) {
    const salaryLabel = document.getElementById("salary-label-text");
    const limitGroup  = document.getElementById("limit-group");
    if (typeVal === "Full-Time") {
        salaryLabel.textContent = "Monthly Base Salary (₦) *";
        limitGroup.style.display = "none";
    } else {
        salaryLabel.textContent = "Hourly Pay Rate (₦) *";
        limitGroup.style.display = "block";
    }
}

function handleStaffSubmit(e) {
    e.preventDefault();

    const empId = document.getElementById("staff-id-field").value;
    const name = document.getElementById("staff-name").value.trim();
    const email = document.getElementById("staff-email").value.trim();
    const dept = document.getElementById("staff-dept").value;
    const designation = document.getElementById("staff-designation").value.trim();
    const contractType = document.getElementById("staff-contract-type").value;
    const basePay = parseFloat(document.getElementById("staff-base-pay").value) || 0;
    const loadLimit = parseInt(document.getElementById("staff-limit").value) || 0;
    const housing = parseFloat(document.getElementById("staff-allow-housing").value) || 0;
    const transport = parseFloat(document.getElementById("staff-allow-transport").value) || 0;
    const extra = parseFloat(document.getElementById("staff-allow-extra").value) || 0;
    const pensionRate = parseFloat(document.getElementById("staff-ded-pension").value) || 0;
    const taxRate = parseFloat(document.getElementById("staff-ded-tax").value) || 0;

    const photoPreview = document.getElementById("staff-photo-preview");
    const photo = photoPreview.classList.contains("has-photo") 
        ? photoPreview.querySelector("img").src 
        : null;

    const staffData = {
        name, email, dept, designation, contractType, basePay,
        loadLimit: contractType === "Part-Time" ? loadLimit : 0,
        allowances: { housing, transport, extra },
        deductions: { pensionRate, taxRate },
        photo
    };

    if (empId) {
        const index = state.staff.findIndex(e => e.id === empId);
        if (index !== -1) state.staff[index] = { id: empId, ...staffData };
    } else {
        const nextNum = state.staff.length > 0
            ? Math.max(...state.staff.map(e => parseInt(e.id.split("-")[1]))) + 1
            : 1;
        const newId = `SJA-${String(nextNum).padStart(3, '0')}`;
        state.staff.push({ id: newId, ...staffData });

        const currentInputs = state.attendance[state.currentCycle] || {};
        currentInputs[newId] = contractType === "Full-Time" ? 0 : 80;
        state.attendance[state.currentCycle] = currentInputs;

        // Auto-create a user account for the new staff member
        const existingUser = state.users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (!existingUser) {
            const nextUserNum = state.users.length > 0
                ? Math.max(...state.users.map(u => parseInt(u.id.split("-")[1]))) + 1
                : 1;
            const userId = `USR-${String(nextUserNum).padStart(3, '0')}`;
            const defaultPwd = "staff123";
            state.users.push({
                id: userId,
                name,
                email: email.toLowerCase(),
                password: defaultPwd,
                role: "staff",
                schoolName: "King David Schol",
                designation,
                staffEmail: email
            });
            persistState(["users"]);
            showToast(`Staff portal created: ${email} / ${defaultPwd}`, "success");
        }
    }

    persistState(["staff", "attendance"]);
    closeStaffModal();

    if (state.activeView === "staff") renderStaff();
    else if (state.activeView === "dashboard") renderDashboard();
}

function deleteStaff(empId) {
    const emp = state.staff.find(e => e.id === empId);
    if (!emp) return;
    if (confirm(`Are you sure you want to remove ${emp.name} from the active staff directory? History data will remain unaffected.`)) {
        state.staff = state.staff.filter(e => e.id !== empId);
        if (state.attendance[state.currentCycle]) {
            delete state.attendance[state.currentCycle][empId];
        }
        persistState(["staff", "attendance"]);
        renderStaff();
    }
}

// --------------------------------------------------
// VIEW: MY DASHBOARD (Staff Portal) — FIX: was missing
// --------------------------------------------------
function renderMyDashboard() {
    const user = state.currentUser;
    if (!user) return;

    const emp = getLinkedStaffRecord(user);
    if (!emp) {
        document.getElementById("my-net-pay").textContent = "N/A";
        document.getElementById("my-department").textContent = "Not in staff directory";
        return;
    }

    const cycleInput = (state.attendance[state.currentCycle] || {})[emp.id] || 0;
    const calc = calculateEmployeePayroll(emp, cycleInput);

    document.getElementById("my-net-pay").textContent = formatCurrency(calc.net);

    const inputLabel = document.getElementById("my-input-label");
    const inputValue = document.getElementById("my-input-value");
    const inputUnit  = document.getElementById("my-input-unit");

    if (emp.contractType === "Full-Time") {
        inputLabel.textContent = "Absent Days";
        inputValue.textContent = cycleInput;
        inputUnit.textContent  = "Days absent this cycle";
    } else {
        inputLabel.textContent = "Hours Logged";
        inputValue.textContent = cycleInput;
        inputUnit.textContent  = "Teaching hours this cycle";
    }

    document.getElementById("my-department").textContent   = emp.dept;
    document.getElementById("my-contract-type").textContent = emp.contractType;
    document.getElementById("my-designation").textContent  = emp.designation;

    // Profile header
    const avatarEl = document.getElementById("my-profile-avatar");
    if (emp.photo) {
        avatarEl.innerHTML = `<img src="${emp.photo}" alt="${emp.name}">`;
    } else {
        const initials = emp.name.split(' ').filter(n => n).map(n => n[0]).join('').substring(0, 2).toUpperCase();
        avatarEl.innerHTML = initials;
    }
    document.getElementById("my-profile-name").textContent = emp.name;
    document.getElementById("my-profile-email").textContent = emp.email;
    document.getElementById("my-profile-contract").textContent = emp.contractType;
    document.getElementById("my-profile-dept").textContent = emp.dept;

    document.getElementById("my-base-earned").textContent    = formatCurrency(calc.baseEarned);
    document.getElementById("my-allow-housing").textContent  = `+${formatCurrency(calc.housingAllow)}`;
    document.getElementById("my-allow-transport").textContent = `+${formatCurrency(calc.transportAllow)}`;
    document.getElementById("my-allow-extra").textContent    = `+${formatCurrency(calc.extraAllow)}`;
    document.getElementById("my-gross").textContent          = formatCurrency(calc.gross);
    document.getElementById("my-tax-ded").textContent        = `-${formatCurrency(calc.taxDeduction)}`;
    document.getElementById("my-pension-ded").textContent    = `-${formatCurrency(calc.pensionDeduction)}`;
    document.getElementById("my-final-net").textContent      = formatCurrency(calc.net);
}

// --------------------------------------------------
// VIEW: MY TIMESHEET (Staff Portal) — FIX: was missing
// --------------------------------------------------
function renderMyTimesheet() {
    const user = state.currentUser;
    if (!user) return;

    const emp = getLinkedStaffRecord(user);
    if (!emp) {
        document.getElementById("my-timesheet-name").textContent = "Not found in staff directory";
        return;
    }

    const avatarEl = document.getElementById("my-timesheet-avatar");
    if (emp.photo) {
        avatarEl.innerHTML = `<img src="${emp.photo}" alt="${emp.name}" class="staff-photo-large">`;
    } else {
        const initials = emp.name.split(' ').filter(n => n).map(n => n[0]).join('').substring(0, 2).toUpperCase();
        avatarEl.textContent = initials;
    }
    document.getElementById("my-timesheet-name").textContent        = emp.name;
    document.getElementById("my-timesheet-designation").textContent = emp.designation;

    const cycleInput = (state.attendance[state.currentCycle] || {})[emp.id] || 0;
    document.getElementById("my-timesheet-input").value = cycleInput;

    const inputLabel = document.getElementById("my-timesheet-input-label");
    const desc       = document.getElementById("my-timesheet-desc");

    if (emp.contractType === "Full-Time") {
        inputLabel.textContent = "Absent Days This Cycle";
        desc.textContent       = "Log your absent days for the current pay cycle. Each absence is deducted from your monthly salary.";
    } else {
        inputLabel.textContent = "Teaching Hours This Cycle";
        desc.textContent       = "Log your teaching hours for the current pay cycle. Your earnings are calculated from these hours.";
    }

    const loadLimit = emp.contractType === "Part-Time"
        ? `${emp.loadLimit} hrs/week (~${emp.loadLimit * 4} max/mo)`
        : "N/A (Salaried)";
    document.getElementById("my-load-limit").textContent = loadLimit;

    document.querySelectorAll(".current-month-text").forEach(el => {
        el.textContent = state.currentCycle.replace("-", " ");
    });

    lucide.createIcons();
}

function saveMyTimesheet() {
    const user = state.currentUser;
    if (!user) return;

    const emp = getLinkedStaffRecord(user);
    if (!emp) return;

    const val = parseFloat(document.getElementById("my-timesheet-input").value) || 0;
    if (!state.attendance[state.currentCycle]) state.attendance[state.currentCycle] = {};
    state.attendance[state.currentCycle][emp.id] = val;
    persistState(["attendance"]);

    const statusEl = document.getElementById("my-timesheet-save-status");
    statusEl.textContent = "Hours saved successfully!";
    statusEl.style.color = "var(--green)";
    setTimeout(() => {
        statusEl.textContent = "Changes auto-saved locally.";
        statusEl.style.color = "var(--text-secondary)";
    }, 3000);
}

// --------------------------------------------------
// VIEW: MY PAYSLIPS (Staff Portal) — FIX: was missing
// --------------------------------------------------
function renderMyPayslips() {
    const user = state.currentUser;
    if (!user) return;

    const emp = getLinkedStaffRecord(user);
    const container = document.getElementById("my-payslips-list");
    container.innerHTML = "";

    if (!emp) {
        container.innerHTML = `
            <div class="empty-state">
                <i data-lucide="user-x"></i>
                <p>Your employee profile was not found in the staff directory. Contact your administrator.</p>
            </div>`;
        lucide.createIcons();
        return;
    }

    // Profile header
    const avatarEl = document.getElementById("my-payslips-profile-avatar");
    if (emp.photo) {
        avatarEl.innerHTML = `<img src="${emp.photo}" alt="${emp.name}">`;
    } else {
        const initials = emp.name.split(' ').filter(n => n).map(n => n[0]).join('').substring(0, 2).toUpperCase();
        avatarEl.innerHTML = initials;
    }
    document.getElementById("my-payslips-profile-name").textContent = emp.name;
    document.getElementById("my-payslips-profile-email").textContent = emp.email;
    document.getElementById("my-payslips-profile-contract").textContent = emp.contractType;
    document.getElementById("my-payslips-profile-dept").textContent = emp.dept;

    const myRuns = state.history.filter(run => run.details.some(d => d.id === emp.id));

    if (myRuns.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i data-lucide="file-text"></i>
                <p>No finalized payslips found yet. Payslips will appear here once payroll has been processed and approved.</p>
            </div>`;
        lucide.createIcons();
        return;
    }

    myRuns.forEach(run => {
        const detail = run.details.find(d => d.id === emp.id);
        if (!detail) return;

        const grossVal = detail.baseEarned + detail.allowances;
        const card = document.createElement("div");
        card.className = "payslip-history-card";
        card.innerHTML = `
            <div class="payslip-history-meta">
                <strong>${run.cycle.replace("-", " ")}</strong>
                <span>Finalized: ${run.finalizedDate} &bull; Approver: ${run.approver}</span>
            </div>
            <div class="payslip-history-amounts">
                <div class="payslip-amount-block">
                    <span class="amount-label">Gross</span>
                    <span class="amount-val gross">${formatCurrency(grossVal)}</span>
                </div>
                <div class="payslip-amount-block">
                    <span class="amount-label">Deductions</span>
                    <span class="amount-val deductions">-${formatCurrency(detail.deductions)}</span>
                </div>
                <div class="payslip-amount-block">
                    <span class="amount-label">Net Pay</span>
                    <span class="amount-val net">${formatCurrency(detail.net)}</span>
                </div>
            </div>
            <button class="primary-btn view-my-payslip-btn" data-cycle="${run.cycle}" data-emp="${emp.id}" style="padding:7px 14px;font-size:12px;">
                <i data-lucide="file-text"></i> View Payslip
            </button>
        `;
        container.appendChild(card);
    });

    document.querySelectorAll(".view-my-payslip-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            showPayslip(btn.getAttribute("data-cycle"), btn.getAttribute("data-emp"));
        });
    });

    lucide.createIcons();
}

// --------------------------------------------------
// VIEW: MY APPROVALS (Staff Portal)
// --------------------------------------------------
function renderMyApprovals() {
    const user = state.currentUser;
    if (!user) return;

    const emp = getLinkedStaffRecord(user);
    const container = document.getElementById("my-approvals-list");
    container.innerHTML = "";

    if (!emp) {
        container.innerHTML = `
            <div class="empty-state">
                <i data-lucide="user-x"></i>
                <p>Your employee profile was not found in the staff directory. Contact your administrator.</p>
            </div>`;
        lucide.createIcons();
        return;
    }

    // Profile header
    const avatarEl = document.getElementById("my-approvals-profile-avatar");
    if (emp.photo) {
        avatarEl.innerHTML = `<img src="${emp.photo}" alt="${emp.name}">`;
    } else {
        const initials = emp.name.split(' ').filter(n => n).map(n => n[0]).join('').substring(0, 2).toUpperCase();
        avatarEl.innerHTML = initials;
    }
    document.getElementById("my-approvals-profile-name").textContent = emp.name;
    document.getElementById("my-approvals-profile-email").textContent = emp.email;
    document.getElementById("my-approvals-profile-contract").textContent = emp.contractType;
    document.getElementById("my-approvals-profile-dept").textContent = emp.dept;

    const pendingApproval = state.pendingApprovals.find(a => a.cycle === state.currentCycle);
    if (!pendingApproval) {
        container.innerHTML = `
            <div class="empty-state">
                <i data-lucide="clock"></i>
                <p>No pending approval requests for the current cycle. Your admin will send it when ready.</p>
            </div>`;
        lucide.createIcons();
        return;
    }

    const myDetail = pendingApproval.details.find(d => d.id === emp.id);
    if (!myDetail) {
        container.innerHTML = `
            <div class="empty-state">
                <i data-lucide="alert-circle"></i>
                <p>Your record was not found in the current approval cycle.</p>
            </div>`;
        lucide.createIcons();
        return;
    }

    const grossVal = myDetail.baseEarned + myDetail.allowances;
    const status = myDetail.status || "pending";
    const rejectionReason = myDetail.rejectionReason || "";

    let actionButtons = "";
    let statusHtml = "";

    if (status === "pending") {
        statusHtml = `<span class="badge badge-amber" style="font-size: 14px; padding: 8px 16px;">Awaiting Your Response</span>`;
        actionButtons = `
            <div class="glass-card" style="padding:16px;margin-top:16px;border-left:4px solid var(--accent);">
                <strong>Check Your Email</strong>
                <p style="margin-top:8px;color:var(--text-secondary);">
                    An approval request was sent to <strong>${emp.email}</strong>.
                    Open the email and click <strong>Approve</strong> or <strong>Reject</strong> to respond.
                </p>
            </div>
            <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: 12px;">
                <button class="success-btn" onclick="handleApprovalAction('${emp.id}', 'approved')">
                    <i data-lucide="check-circle"></i> Approve Payment
                </button>
                <button class="danger-btn" onclick="showRejectModal('${emp.id}')">
                    <i data-lucide="x-circle"></i> Reject & Provide Reason
                </button>
            </div>
        `;
    } else if (status === "approved") {
        statusHtml = `<span class="badge badge-green" style="font-size: 14px; padding: 8px 16px;"><i data-lucide="check-circle-2" style="width:14px;height:14px;margin-right:4px;"></i>Approved</span>`;
        actionButtons = `<p class="text-secondary" style="margin-top: 12px;">You have approved this payment. Waiting for admin to finalize.</p>`;
    } else if (status === "rejected") {
        statusHtml = `<span class="badge badge-danger" style="font-size: 14px; padding: 8px 16px;"><i data-lucide="x-circle" style="width:14px;height:14px;margin-right:4px;"></i>Rejected</span>`;
        actionButtons = `
            <div class="glass-card" style="padding: 16px; margin-top: 16px; border-left: 4px solid var(--danger);">
                <strong>Your Rejection Reason:</strong>
                <p style="margin-top: 8px; color: var(--text-secondary);">${rejectionReason}</p>
            </div>
            <p class="text-secondary" style="margin-top: 12px;">Admin has been notified. They will review and send a revised payment.</p>
        `;
    }

    const card = document.createElement("div");
    card.className = "payslip-history-card";
    card.style.flexDirection = "column";
    card.style.alignItems = "flex-start";
    card.style.gap = "16px";
    card.innerHTML = `
        <div style="width: 100%;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; width: 100%;">
                <div>
                    <strong style="font-size: 18px;">${pendingApproval.cycle.replace("-", " ")} Payment</strong>
                    <p class="text-secondary" style="margin-top: 4px;">Requested: ${pendingApproval.requestedDate} by ${pendingApproval.requestedBy}</p>
                </div>
                <div style="text-align: right;">
                    ${statusHtml}
                </div>
            </div>
            <div class="payslip-history-amounts" style="width: 100%; justify-content: space-between; margin-top: 8px;">
                <div class="payslip-amount-block">
                    <span class="amount-label">Base Earnings</span>
                    <span class="amount-val gross">${formatCurrency(myDetail.baseEarned)}</span>
                </div>
                <div class="payslip-amount-block">
                    <span class="amount-label">Allowances</span>
                    <span class="amount-val gross">+${formatCurrency(myDetail.allowances)}</span>
                </div>
                <div class="payslip-amount-block">
                    <span class="amount-label">Gross Total</span>
                    <span class="amount-val gross">${formatCurrency(grossVal)}</span>
                </div>
                <div class="payslip-amount-block">
                    <span class="amount-label">Deductions</span>
                    <span class="amount-val deductions">-${formatCurrency(myDetail.deductions)}</span>
                </div>
                <div class="payslip-amount-block">
                    <span class="amount-label">Net Pay</span>
                    <span class="amount-val net" style="font-size: 18px;">${formatCurrency(myDetail.net)}</span>
                </div>
            </div>
            ${actionButtons}
        </div>
    `;
    container.appendChild(card);

    lucide.createIcons();
}

function handleApprovalAction(empId, action) {
    const approval = state.pendingApprovals.find(a => a.cycle === state.currentCycle);
    if (!approval) return;

    const detail = approval.details.find(d => d.id === empId);
    if (!detail) return;

    if (action === "approved") {
        detail.status = "approved";
        detail.rejectionReason = null;
        saveApprovalToCocobase();
        renderMyApprovals();
        sendAdminNotification(detail.name, "approved");
    } else if (action === "rejected") {
        detail.status = "rejected";
        saveApprovalToCocobase();
        renderMyApprovals();
    }
}

function sendApprovalRequestEmail(emp, detail) {
    const cycleLabel = state.currentCycle.replace("-", " ");
    const grossVal = detail.baseEarned + detail.allowances;
    const dir = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const baseUrl = window.location.origin + dir;
    const confirmUrl = `${baseUrl}confirm.html?action=approve&id=${emp.id}&cycle=${state.currentCycle}`;
    const rejectUrl = `${baseUrl}confirm.html?action=reject&id=${emp.id}&cycle=${state.currentCycle}`;

    const params = {
        to_name: detail.name,
        to_email: emp.email,
        cycle: cycleLabel,
        base_earned: formatCurrency(detail.baseEarned),
        allowances: formatCurrency(detail.allowances),
        gross: formatCurrency(grossVal),
        deductions: formatCurrency(detail.deductions),
        net: formatCurrency(detail.net),
        confirmation_url: confirmUrl,
        rejection_url: rejectUrl
    };

    emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE_STAFF, params)
        .then(() => {
            console.log(`Approval email sent to ${emp.email}`);
            showToast(`Pay slip sent to ${emp.name} (${emp.email})`, "success");
        })
        .catch(err => {
            console.error(`Email to ${emp.email} failed:`, err);
            showToast(`Failed to send to ${emp.name}: ${err?.text || err?.message || "unknown"}`, "error");
        });
}

function sendAdminNotification(staffName, action, reason) {
    const cycleLabel = state.currentCycle.replace("-", " ");
    const params = {
        admin_email: ADMIN_EMAIL,
        staff_name: staffName,
        action: action,
        cycle: cycleLabel,
        reason: reason || ""
    };

    emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE_ADMIN, params)
        .then(() => {
            console.log(`Admin notification sent: ${staffName} ${action}`);
        })
        .catch(err => {
            console.error("Admin notification failed:", err);
        });
}

function showRejectModal(empId) {
    const reason = prompt("Please provide a reason for rejecting this payment:");
    if (reason === null) return; // User cancelled
    if (!reason.trim()) {
        alert("Please provide a reason for rejection.");
        return showRejectModal(empId);
    }

    const approval = state.pendingApprovals.find(a => a.cycle === state.currentCycle);
    if (!approval) return;

    const detail = approval.details.find(d => d.id === empId);
    if (!detail) return;

    detail.status = "rejected";
    detail.rejectionReason = reason.trim();

    saveApprovalToCocobase();
    renderMyApprovals();
    sendAdminNotification(detail.name, "rejected", reason.trim());
    
    alert("Your rejection has been sent to the admin with your reason.");
}

// --------------------------------------------------
// EVENT BINDINGS & INIT
// --------------------------------------------------
// --------------------------------------------------
// VIEW: USER MANAGEMENT (Admin)
// --------------------------------------------------
function renderUserManagement() {
    const total   = state.users.length;
    const active  = state.users.filter(u => u.enabled !== false).length;
    const admins  = state.users.filter(u => u.role === 'administrator').length;

    document.getElementById('user-stats-grid').innerHTML = `
        <div class="metric-card glass-card">
            <div class="metric-icon blue"><i data-lucide="users"></i></div>
            <div class="metric-details">
                <span class="metric-label">Total Accounts</span>
                <h2 class="metric-value">${total}</h2>
                <p class="metric-sub text-secondary">${admins} admin &bull; ${total - admins} staff</p>
            </div>
        </div>
        <div class="metric-card glass-card">
            <div class="metric-icon green"><i data-lucide="user-check"></i></div>
            <div class="metric-details">
                <span class="metric-label">Active Accounts</span>
                <h2 class="metric-value">${active}</h2>
                <p class="metric-sub text-secondary">Can log in to EduPay</p>
            </div>
        </div>
        <div class="metric-card glass-card">
            <div class="metric-icon orange"><i data-lucide="user-x"></i></div>
            <div class="metric-details">
                <span class="metric-label">Disabled Accounts</span>
                <h2 class="metric-value">${total - active}</h2>
                <p class="metric-sub text-secondary">Login access revoked</p>
            </div>
        </div>
    `;

    const tbody = document.getElementById('users-table-body');
    tbody.innerHTML = '';

    state.users.forEach(user => {
        const isEnabled   = user.enabled !== false;
        const isSelf      = state.currentUser && state.currentUser.id === user.id;
        const linkedStaff = state.staff.find(s => s.email === (user.staffEmail || user.email));
        const initials    = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div style="display:flex;align-items:center;gap:10px;">
                    <div class="avatar" style="width:32px;height:32px;font-size:11px;flex-shrink:0;">${initials}</div>
                    <div>
                        <strong>${user.name}</strong>
                        ${isSelf ? '<span class="badge badge-blue" style="margin-left:6px;font-size:10px;padding:1px 6px;">You</span>' : ''}
                    </div>
                </div>
            </td>
            <td style="font-family:monospace;font-size:13px;">${user.email}</td>
            <td><span class="badge ${user.role === 'administrator' ? 'badge-purple' : 'badge-blue'}">${user.role === 'administrator' ? 'Administrator' : 'Staff'}</span></td>
            <td>
                ${linkedStaff
                    ? `<span class="badge badge-green" style="gap:4px;"><i data-lucide="link" style="width:10px;height:10px;margin-right:3px;"></i>${linkedStaff.id} &bull; ${linkedStaff.dept}</span>`
                    : `<span style="color:var(--text-muted);font-size:12px;">No record linked</span>`
                }
            </td>
            <td>
                <span class="badge ${isEnabled ? 'badge-green' : 'badge-red'}">
                    <i data-lucide="${isEnabled ? 'check-circle' : 'ban'}" style="width:10px;height:10px;margin-right:3px;"></i>
                    ${isEnabled ? 'Active' : 'Disabled'}
                </span>
            </td>
            <td class="actions-col" style="white-space:nowrap;">
                <button class="secondary-btn um-link-btn" data-uid="${user.id}" style="padding:5px 9px;font-size:12px;margin-right:3px;" title="Link staff record">
                    <i data-lucide="link"></i>
                </button>
                <button class="secondary-btn um-reset-btn" data-uid="${user.id}" style="padding:5px 9px;font-size:12px;margin-right:3px;" title="Reset password">
                    <i data-lucide="key-round"></i>
                </button>
                <button class="secondary-btn um-toggle-btn" data-uid="${user.id}" style="padding:5px 9px;font-size:12px;" title="${isEnabled ? 'Disable account' : 'Enable account'}" ${isSelf ? 'disabled' : ''}>
                    <i data-lucide="${isEnabled ? 'user-minus' : 'user-plus'}"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    document.querySelectorAll('.um-reset-btn').forEach(btn => {
        btn.addEventListener('click', () => openResetPasswordModal(btn.getAttribute('data-uid')));
    });
    document.querySelectorAll('.um-toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => toggleUserStatus(btn.getAttribute('data-uid')));
    });
    document.querySelectorAll('.um-link-btn').forEach(btn => {
        btn.addEventListener('click', () => openLinkStaffModal(btn.getAttribute('data-uid')));
    });

    lucide.createIcons();
}

function openResetPasswordModal(userId) {
    const user = state.users.find(u => u.id === userId);
    if (!user) return;
    document.getElementById('reset-pwd-user-id').value = userId;
    document.getElementById('reset-pwd-subtitle').textContent = `Setting new credentials for: ${user.name}`;
    document.getElementById('reset-pwd-new').value = '';
    document.getElementById('reset-pwd-confirm').value = '';
    document.getElementById('reset-pwd-error').classList.add('hidden');
    const modal = document.getElementById('reset-password-modal');
    modal.classList.remove('hidden');
    modal.classList.add('active');
    lucide.createIcons();
}

function closeResetPasswordModal() {
    const modal = document.getElementById('reset-password-modal');
    modal.classList.remove('active');
    modal.classList.add('hidden');
}

function submitResetPassword() {
    const userId  = document.getElementById('reset-pwd-user-id').value;
    const newPwd  = document.getElementById('reset-pwd-new').value;
    const confirm = document.getElementById('reset-pwd-confirm').value;
    const errEl   = document.getElementById('reset-pwd-error');
    errEl.classList.add('hidden');

    if (!newPwd || newPwd.length < 6) {
        errEl.textContent = 'Password must be at least 6 characters.';
        errEl.classList.remove('hidden');
        return;
    }
    if (newPwd !== confirm) {
        errEl.textContent = 'Passwords do not match.';
        errEl.classList.remove('hidden');
        return;
    }

    const user = state.users.find(u => u.id === userId);
    if (user) {
        user.password = newPwd;
        persistState(['users']);
        closeResetPasswordModal();
        renderUserManagement();
    }
}

function toggleUserStatus(userId) {
    const user = state.users.find(u => u.id === userId);
    if (!user) return;
    const activeAdmins = state.users.filter(u => u.role === 'administrator' && u.enabled !== false).length;
    if (user.role === 'administrator' && user.enabled !== false && activeAdmins <= 1) {
        alert('Cannot disable the only active administrator account.');
        return;
    }
    user.enabled = user.enabled === false;
    persistState(['users']);
    renderUserManagement();
}

function openLinkStaffModal(userId) {
    const user = state.users.find(u => u.id === userId);
    if (!user) return;
    document.getElementById('link-staff-user-id').value = userId;
    document.getElementById('link-staff-subtitle').textContent = `Assign a staff directory record to: ${user.name}`;

    const sel = document.getElementById('link-staff-select');
    sel.innerHTML = '<option value="">— No linked record (remove link) —</option>';
    const currentLink = user.staffEmail || user.email;
    state.staff.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.email;
        opt.textContent = `${s.id} · ${s.name} (${s.dept})`;
        if (s.email === currentLink) opt.selected = true;
        sel.appendChild(opt);
    });

    const modal = document.getElementById('link-staff-modal');
    modal.classList.remove('hidden');
    modal.classList.add('active');
    lucide.createIcons();
}

function closeLinkStaffModal() {
    const modal = document.getElementById('link-staff-modal');
    modal.classList.remove('active');
    modal.classList.add('hidden');
}

function submitLinkStaff() {
    const userId     = document.getElementById('link-staff-user-id').value;
    const staffEmail = document.getElementById('link-staff-select').value;
    const user = state.users.find(u => u.id === userId);
    if (!user) return;
    user.staffEmail = staffEmail || null;
    persistState(['users']);
    closeLinkStaffModal();
    renderUserManagement();
}

// --------------------------------------------------
// VIEW: SPREADSHEET
// --------------------------------------------------
function renderSpreadsheet() {
    const container = document.getElementById("spreadsheet-grid");
    const activeTab = document.querySelector(".spreadsheet-tab-btn.active");
    if (!activeTab) return;

    const sheet = activeTab.getAttribute("data-sheet");
    const tabLabel = activeTab.textContent.trim();
    document.getElementById("sheet-info").textContent = tabLabel;

    const cycleInputs = state.attendance[state.currentCycle] || {};

    if (state.staff.length === 0) {
        container.innerHTML = '<div class="empty-state" style="padding:60px 20px;text-align:center;color:var(--text-muted);"><i data-lucide="database" style="width:44px;height:44px;opacity:0.35;margin-bottom:12px;"></i><p>No staff records yet. Add employees in the Staff Directory view to populate the spreadsheet.</p></div>';
        lucide.createIcons();
        return;
    }

    let html = '<table class="spreadsheet-table" id="sheet-table"><thead><tr>';

    if (sheet === "staff") {
        html += '<th class="row-header">#</th><th>Staff ID</th><th>Full Name</th><th>Email</th><th>Department</th><th>Designation</th><th>Contract Type</th><th class="num-col">Base Pay (₦)</th><th class="num-col">Housing (₦)</th><th class="num-col">Transport (₦)</th><th class="num-col">Extra (₦)</th><th class="num-col">Pension (%)</th><th class="num-col">Tax (%)</th></tr></thead><tbody>';
        state.staff.forEach((emp, i) => {
            html += `<tr>
                <td class="row-header">${i+1}</td>
                <td>${emp.id}</td>
                <td class="editable" data-field="name" data-id="${emp.id}">${escHtml(emp.name)}</td>
                <td class="editable" data-field="email" data-id="${emp.id}">${escHtml(emp.email)}</td>
                <td class="editable" data-field="dept" data-id="${emp.id}">${escHtml(emp.dept)}</td>
                <td class="editable" data-field="designation" data-id="${emp.id}">${escHtml(emp.designation)}</td>
                <td>${emp.contractType}</td>
                <td class="editable num-col" data-field="basePay" data-id="${emp.id}" data-type="number">${emp.basePay.toFixed(0)}</td>
                <td class="editable num-col" data-field="allow-housing" data-id="${emp.id}" data-type="number">${emp.allowances.housing.toFixed(0)}</td>
                <td class="editable num-col" data-field="allow-transport" data-id="${emp.id}" data-type="number">${emp.allowances.transport.toFixed(0)}</td>
                <td class="editable num-col" data-field="allow-extra" data-id="${emp.id}" data-type="number">${emp.allowances.extra.toFixed(0)}</td>
                <td class="editable num-col" data-field="ded-pension" data-id="${emp.id}" data-type="number">${emp.deductions.pensionRate.toFixed(0)}</td>
                <td class="editable num-col" data-field="ded-tax" data-id="${emp.id}" data-type="number">${emp.deductions.taxRate.toFixed(0)}</td>
            </tr>`;
        });
    } else if (sheet === "attendance") {
        html += '<th class="row-header">#</th><th>Staff ID</th><th>Full Name</th><th>Department</th><th>Contract Type</th><th class="num-col">Input Value</th><th>Unit</th></tr></thead><tbody>';
        state.staff.forEach((emp, i) => {
            const val = cycleInputs[emp.id] || 0;
            const unit = emp.contractType === "Full-Time" ? "Absent Days" : "Hours Logged";
            html += `<tr>
                <td class="row-header">${i+1}</td>
                <td>${emp.id}</td>
                <td>${escHtml(emp.name)}</td>
                <td>${escHtml(emp.dept)}</td>
                <td>${emp.contractType}</td>
                <td class="editable num-col" data-field="attendance" data-id="${emp.id}" data-type="number">${val}</td>
                <td>${unit}</td>
            </tr>`;
        });
    } else if (sheet === "payroll") {
        html += '<th class="row-header">#</th><th>Staff ID</th><th>Full Name</th><th>Department</th><th>Contract</th><th class="num-col">Base Pay (₦)</th><th class="num-col">Input</th><th class="num-col">Gross (₦)</th><th class="num-col">Allowances (₦)</th><th class="num-col">Deductions (₦)</th><th class="num-col">Net Pay (₦)</th></tr></thead><tbody>';
        state.staff.forEach((emp, i) => {
            const input = cycleInputs[emp.id] || 0;
            const calc = calculateEmployeePayroll(emp, input);
            html += `<tr>
                <td class="row-header">${i+1}</td>
                <td>${emp.id}</td>
                <td>${escHtml(emp.name)}</td>
                <td>${escHtml(emp.dept)}</td>
                <td>${emp.contractType}</td>
                <td class="num-col">${formatCurrency(emp.basePay)}</td>
                <td class="num-col">${input}</td>
                <td class="num-col">${formatCurrency(calc.gross)}</td>
                <td class="num-col">${formatCurrency(calc.allowances)}</td>
                <td class="num-col">${formatCurrency(calc.deductions)}</td>
                <td class="num-col">${formatCurrency(calc.net)}</td>
            </tr>`;
        });
    }

    html += '</tbody></table>';
    container.innerHTML = html;

    container.querySelectorAll(".editable").forEach(cell => {
        cell.contentEditable = true;
        cell.addEventListener("blur", () => cell.classList.remove("editing"));
        cell.addEventListener("focus", () => cell.classList.add("editing"));
        cell.addEventListener("keydown", e => {
            if (e.key === "Enter") { e.preventDefault(); cell.blur(); }
            if (e.key === "Tab") { e.preventDefault(); focusAdjacentCell(cell, e.shiftKey); }
        });
    });
}

function focusAdjacentCell(cell, shift) {
    const all = [...document.querySelectorAll("#sheet-table .editable")];
    const idx = all.indexOf(cell);
    const next = shift ? all[idx - 1] : all[idx + 1];
    if (next) next.focus();
}

function escHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

function saveSpreadsheetData() {
    const activeTab = document.querySelector(".spreadsheet-tab-btn.active");
    if (!activeTab) return;
    const sheet = activeTab.getAttribute("data-sheet");

    if (sheet === "staff") {
        document.querySelectorAll("#sheet-table .editable[data-id]").forEach(cell => {
            const id = cell.getAttribute("data-id");
            const field = cell.getAttribute("data-field");
            const emp = state.staff.find(e => e.id === id);
            if (!emp) return;
            const val = cell.textContent.trim();
            if (field === "name") emp.name = val;
            else if (field === "email") emp.email = val;
            else if (field === "dept") emp.dept = val;
            else if (field === "designation") emp.designation = val;
            else if (field === "basePay") emp.basePay = parseFloat(val) || 0;
            else if (field === "allow-housing") emp.allowances.housing = parseFloat(val) || 0;
            else if (field === "allow-transport") emp.allowances.transport = parseFloat(val) || 0;
            else if (field === "allow-extra") emp.allowances.extra = parseFloat(val) || 0;
            else if (field === "ded-pension") emp.deductions.pensionRate = parseFloat(val) || 0;
            else if (field === "ded-tax") emp.deductions.taxRate = parseFloat(val) || 0;
        });
        persistState(["staff"]);
    } else if (sheet === "attendance") {
        if (!state.attendance[state.currentCycle]) state.attendance[state.currentCycle] = {};
        document.querySelectorAll("#sheet-table .editable[data-id]").forEach(cell => {
            const id = cell.getAttribute("data-id");
            const val = parseInt(cell.textContent.trim()) || 0;
            state.attendance[state.currentCycle][id] = val;
        });
        persistState(["attendance"]);
    }

    renderSpreadsheet();
    showToast("Spreadsheet changes saved successfully.", "success");
}

function showToast(msg, type) {
    let toast = document.getElementById("toast-notification");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast-notification";
        toast.className = "toast-notification";
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.className = "toast-notification toast-" + (type || "info") + " show";
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

function importSpreadsheetData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const text = e.target.result;
            const lines = text.split("\n").filter(l => l.trim());
            if (lines.length < 2) { showToast("CSV file appears empty.", "error"); return; }

            const headers = parseCSVLine(lines[0]);
            const activeTab = document.querySelector(".spreadsheet-tab-btn.active");
            if (!activeTab) return;
            const sheet = activeTab.getAttribute("data-sheet");

            if (sheet === "staff") {
                for (let i = 1; i < lines.length; i++) {
                    const cols = parseCSVLine(lines[i]);
                    if (cols.length < 2) continue;
                    const id = cols[0].trim();
                    if (!id) continue;
                    const emp = state.staff.find(e => e.id === id);
                    if (!emp) continue;
                    if (cols[1]) emp.name = cols[1].trim();
                    if (cols[2]) emp.email = cols[2].trim();
                    if (cols[3]) emp.dept = cols[3].trim();
                    if (cols[4]) emp.designation = cols[4].trim();
                    if (cols[5]) emp.basePay = parseFloat(cols[5]) || emp.basePay;
                    if (cols[6]) emp.allowances.housing = parseFloat(cols[6]) || emp.allowances.housing;
                    if (cols[7]) emp.allowances.transport = parseFloat(cols[7]) || emp.allowances.transport;
                    if (cols[8]) emp.allowances.extra = parseFloat(cols[8]) || emp.allowances.extra;
                    if (cols[9]) emp.deductions.pensionRate = parseFloat(cols[9]) || emp.deductions.pensionRate;
                    if (cols[10]) emp.deductions.taxRate = parseFloat(cols[10]) || emp.deductions.taxRate;
                }
                persistState(["staff"]);
            } else if (sheet === "attendance") {
                if (!state.attendance[state.currentCycle]) state.attendance[state.currentCycle] = {};
                for (let i = 1; i < lines.length; i++) {
                    const cols = parseCSVLine(lines[i]);
                    if (cols.length < 2) continue;
                    const id = cols[0].trim();
                    if (!id) continue;
                    state.attendance[state.currentCycle][id] = parseInt(cols[1]) || 0;
                }
                persistState(["attendance"]);
            }

            renderSpreadsheet();
            showToast("CSV imported successfully.", "success");
        } catch (err) {
            showToast("Failed to parse CSV: " + err.message, "error");
        }
    };
    reader.readAsText(file);
}

function parseCSVLine(line) {
    const result = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') { inQuotes = !inQuotes; continue; }
        if (ch === "," && !inQuotes) { result.push(current); current = ""; continue; }
        current += ch;
    }
    result.push(current);
    return result;
}

function exportSpreadsheetCSV() {
    const activeTab = document.querySelector(".spreadsheet-tab-btn.active");
    if (!activeTab) return;
    const sheet = activeTab.getAttribute("data-sheet");
    let csv = "";
    const cycleInputs = state.attendance[state.currentCycle] || {};

    if (sheet === "staff") {
        csv = "Staff ID,Name,Email,Department,Designation,Base Pay,Housing,Transport,Extra,Pension %,Tax %\n";
        state.staff.forEach(emp => {
            csv += `${emp.id},"${emp.name}","${emp.email}","${emp.dept}","${emp.designation}",${emp.basePay},${emp.allowances.housing},${emp.allowances.transport},${emp.allowances.extra},${emp.deductions.pensionRate},${emp.deductions.taxRate}\n`;
        });
    } else if (sheet === "attendance") {
        csv = "Staff ID,Input Value\n";
        state.staff.forEach(emp => {
            csv += `${emp.id},${cycleInputs[emp.id] || 0}\n`;
        });
    } else if (sheet === "payroll") {
        csv = "Staff ID,Name,Department,Contract,Base Pay,Input,Gross,Allowances,Deductions,Net Pay\n";
        state.staff.forEach(emp => {
            const input = cycleInputs[emp.id] || 0;
            const calc = calculateEmployeePayroll(emp, input);
            csv += `${emp.id},"${emp.name}","${emp.dept}",${emp.contractType},${emp.basePay},${input},${calc.gross},${calc.allowances},${calc.deductions},${calc.net}\n`;
        });
    }

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${sheet}-data-${state.currentCycle || "current"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("CSV exported successfully.", "success");
}

document.addEventListener("DOMContentLoaded", async () => {
    if (typeof emailjs !== "undefined") {
        emailjs.init("vnQDxKGbAD3qFJtj9");
    } else {
        console.warn("EmailJS SDK not loaded. Email sending disabled.");
    }

    initUsers();
    await initDatabase();
    syncStaffUserAccounts();

    showAuthPortal();
    lucide.createIcons();

    // Auth keyboard support
    ['login-email', 'login-password'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('keypress', e => { if (e.key === 'Enter') handleLogin(); });
    });

    // Navigation
    document.querySelectorAll(".nav-item").forEach(item => {
        item.addEventListener("click", e => {
            e.preventDefault();
            const view = item.getAttribute("data-view");
            if (view) switchView(view);
        });
    });

    // Mobile sidebar controls
    document.getElementById("hamburger-btn").addEventListener("click", openSidebar);
    document.getElementById("sidebar-close-btn").addEventListener("click", closeSidebar);
    document.getElementById("sidebar-backdrop").addEventListener("click", closeSidebar);

    // Logout
    document.getElementById("logout-btn").addEventListener("click", handleLogout);

    // Admin Quick Actions
    document.querySelector('[data-action="run-payroll-shortcut"]').addEventListener("click", () => switchView("payroll"));
    document.querySelector('[data-action="add-staff-shortcut"]').addEventListener("click", () => openStaffModal());
    document.querySelector('[data-action="log-attendance-shortcut"]').addEventListener("click", () => switchView("attendance"));

    // Staff portal shortcuts
    document.querySelector('[data-action="goto-my-timesheet"]').addEventListener("click", () => switchView("my-timesheet"));
    document.querySelector('[data-action="goto-my-payslips"]').addEventListener("click", () => switchView("my-payslips"));

    // Staff directory
    document.getElementById("add-staff-btn").addEventListener("click", () => openStaffModal());
    document.getElementById("close-staff-modal-btn").addEventListener("click", closeStaffModal);
    document.getElementById("cancel-staff-btn").addEventListener("click", closeStaffModal);
    document.getElementById("staff-form").addEventListener("submit", handleStaffSubmit);
    document.getElementById("staff-search").addEventListener("input", renderStaff);
    document.getElementById("filter-dept").addEventListener("change", renderStaff);
    document.getElementById("filter-type").addEventListener("change", renderStaff);
    document.getElementById("staff-contract-type").addEventListener("change", e => handleContractFieldToggle(e.target.value));

    // Attendance
    document.getElementById("save-attendance-btn").addEventListener("click", saveAttendance);

    // My Timesheet
    document.getElementById("save-my-timesheet-btn").addEventListener("click", saveMyTimesheet);

    // Payroll
    document.getElementById("approve-payroll-btn").addEventListener("click", approvePayroll);
    document.getElementById("send-approval-btn").addEventListener("click", sendForApproval);

    // Payroll mobile slider — tabs sync with horizontal scroll-snap panels
    const payrollLayout = document.getElementById('payroll-split-layout');
    const payrollTabBtns = document.querySelectorAll('.payroll-tab-btn');
    if (payrollLayout && payrollTabBtns.length) {
        // Tab click → scroll to panel
        payrollTabBtns.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                const panels = payrollLayout.children;
                if (panels[i]) {
                    payrollLayout.scrollTo({ left: panels[i].offsetLeft, behavior: 'smooth' });
                }
                payrollTabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
        // Scroll → sync active tab
        payrollLayout.addEventListener('scroll', () => {
            const idx = Math.round(payrollLayout.scrollLeft / payrollLayout.clientWidth);
            payrollTabBtns.forEach((b, i) => b.classList.toggle('active', i === idx));
        }, { passive: true });
    }

    // Payslip modal
    document.getElementById("close-payslip-modal-btn").addEventListener("click", closePayslipModal);
    document.getElementById("print-payslip-btn").addEventListener("click", () => window.print());

    // History drawer & CSV export
    document.getElementById("close-history-detail-btn").addEventListener("click", () => {
        document.getElementById("history-detail-container").classList.add("hidden");
    });
    document.getElementById("export-all-csv-btn").addEventListener("click", exportAllHistoryToCSV);

    // User Management modals
    document.getElementById("close-reset-pwd-btn").addEventListener("click", closeResetPasswordModal);
    document.getElementById("cancel-reset-pwd-btn").addEventListener("click", closeResetPasswordModal);
    document.getElementById("submit-reset-pwd-btn").addEventListener("click", submitResetPassword);
    document.getElementById("close-link-staff-btn").addEventListener("click", closeLinkStaffModal);
    document.getElementById("cancel-link-staff-btn").addEventListener("click", closeLinkStaffModal);
    document.getElementById("submit-link-staff-btn").addEventListener("click", submitLinkStaff);

    // Spreadsheet tab switching
    document.querySelectorAll(".spreadsheet-tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".spreadsheet-tab-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderSpreadsheet();
        });
    });

    // Spreadsheet save
    document.getElementById("spreadsheet-save-btn").addEventListener("click", saveSpreadsheetData);

    // Spreadsheet import
    document.getElementById("spreadsheet-file-input").addEventListener("change", e => {
        if (e.target.files.length > 0) {
            importSpreadsheetData(e.target.files[0]);
            e.target.value = "";
        }
    });
    document.getElementById("spreadsheet-import-btn").addEventListener("click", () => {
        document.getElementById("spreadsheet-file-input").click();
    });

    // Spreadsheet export
    document.getElementById("spreadsheet-export-btn").addEventListener("click", exportSpreadsheetCSV);

    // Spreadsheet print
    document.getElementById("spreadsheet-print-btn").addEventListener("click", () => {
        document.body.classList.add("printing-spreadsheet");
        window.print();
    });

    // Spreadsheet toolbar
    document.querySelectorAll(".toolbar-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const action = btn.getAttribute("data-action");
            const sel = window.getSelection();
            if (!sel.rangeCount) return;
            const range = sel.getRangeAt(0);
            let node = range.commonAncestorContainer;
            if (node.nodeType === 3) node = node.parentNode;
            if (!node.closest) return;
            const cell = node.closest(".editable");
            if (!cell) return;

            if (action === "bold") {
                document.execCommand("bold");
                btn.classList.toggle("active");
            } else if (action === "italic") {
                document.execCommand("italic");
                btn.classList.toggle("active");
            }
        });
    });

    document.getElementById("font-size-select").addEventListener("change", function() {
        const sel = window.getSelection();
        if (!sel.rangeCount) return;
        const range = sel.getRangeAt(0);
        let node = range.commonAncestorContainer;
        if (node.nodeType === 3) node = node.parentNode;
        if (!node.closest) return;
        const cell = node.closest(".editable");
        if (!cell) return;
        cell.style.fontSize = this.value + "px";
    });

    // Close modals on overlay click
    window.addEventListener("click", e => {
        if (e.target === document.getElementById("staff-modal"))          closeStaffModal();
        if (e.target === document.getElementById("payslip-modal"))        closePayslipModal();
        if (e.target === document.getElementById("reset-password-modal")) closeResetPasswordModal();
        if (e.target === document.getElementById("link-staff-modal"))     closeLinkStaffModal();
    });

    // Set header date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("current-date").textContent = new Date().toLocaleDateString('en-US', options);

    // Remove right-edge scroll hint fade when user has scrolled to end of a table
    document.addEventListener("scroll", function(e) {
        const el = e.target;
        if (!(el instanceof Element)) return;   // guard: document/window have no classList
        if (el.classList.contains("table-container") || el.classList.contains("worksheet-table-container")) {
            const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
            el.classList.toggle("scrolled-end", atEnd);
        }
    }, true);
});

// Clean up print class after printing
window.onafterprint = function() {
    document.body.classList.remove("printing-spreadsheet");
};

// Expose globals needed by inline HTML event handlers
window.handleLogin = handleLogin;
window.togglePasswordVisibility = togglePasswordVisibility;
window.handleApprovalAction = handleApprovalAction;
window.showRejectModal = showRejectModal;
