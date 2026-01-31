const axios = require("axios");

const BASE_URL = "http://localhost:3000";

async function testFullFlow() {
  console.log("🧪 Starting ProcureFlow Full Flow Test\n");
  console.log("=".repeat(50));

  try {
    // Step 1: Register an employee user
    console.log("\n1️⃣ Registering employee user...");
    const employeeUser = {
      username: "employee" + Date.now(),
      email: "employee" + Date.now() + "@example.com",
      password: "password123",
      department: "IT",
      role: "employee"
    };
    const employeeRes = await axios.post(`${BASE_URL}/api/auth/register`, employeeUser);
    console.log("✅ Employee registered:", employeeRes.data.data.username);

    // Step 2: Register a manager user
    console.log("\n2️⃣ Registering manager user...");
    const managerUser = {
      username: "manager" + Date.now(),
      email: "manager" + Date.now() + "@example.com",
      password: "password123",
      department: "IT",
      role: "manager"
    };
    const managerRes = await axios.post(`${BASE_URL}/api/auth/register`, managerUser);
    console.log("✅ Manager registered:", managerRes.data.data.username);

    // Step 3: Login as employee
    console.log("\n3️⃣ Logging in as employee...");
    const employeeLoginRes = await axios.post(`${BASE_URL}/api/auth/login`, {
      email: employeeUser.email,
      password: employeeUser.password
    });
    const employeeToken = employeeLoginRes.data.data.token;
    console.log("✅ Employee login successful");
    const employeeAuthHeaders = { Authorization: `Bearer ${employeeToken}` };

    // Step 4: Login as manager
    console.log("\n4️⃣ Logging in as manager...");
    const managerLoginRes = await axios.post(`${BASE_URL}/api/auth/login`, {
      email: managerUser.email,
      password: managerUser.password
    });
    const managerToken = managerLoginRes.data.data.token;
    console.log("✅ Manager login successful");
    const managerAuthHeaders = { Authorization: `Bearer ${managerToken}` };

    // Step 5: Employee creates PR
    console.log("\n5️⃣ Employee creating Purchase Request...");
    const createPRRes = await axios.post(`${BASE_URL}/api/pr`, {
      title: "Laptop for Developer",
      amount: 25000,
      description: "High-performance laptop",
      department: "IT"
    }, { headers: employeeAuthHeaders });
    const prId = createPRRes.data.data._id;
    console.log("✅ PR Created:", prId, "- Status:", createPRRes.data.data.status);

    // Step 6: Employee submits PR
    console.log("\n6️⃣ Employee submitting PR...");
    const submitRes = await axios.put(`${BASE_URL}/api/pr/${prId}/submit`, {}, { headers: employeeAuthHeaders });
    console.log("✅ PR Submitted - Status:", submitRes.data.data.status);

    // Step 7: Manager approves PR
    console.log("\n7️⃣ Manager approving PR...");
    const approveRes = await axios.put(`${BASE_URL}/api/pr/${prId}/approve`, {}, { headers: managerAuthHeaders });
    console.log("✅ PR Approved - Status:", approveRes.data.data.status);
    console.log("   Approved By:", approveRes.data.data.approvedBy);

    // Step 8: Check Audit Logs
    console.log("\n8️⃣ Fetching Audit Logs...");
    const auditRes = await axios.get(`${BASE_URL}/api/audit`, { headers: managerAuthHeaders });
    console.log("✅ Audit Logs retrieved:", auditRes.data.data.length, "entries");
    auditRes.data.data.forEach((log, i) => {
      console.log(`   ${i + 1}. [${log.action}] ${log.entityType}`);
    });

    console.log("\n" + "=".repeat(50));
    console.log("🎉 ALL TESTS PASSED! Full flow working correctly.");
    console.log("=".repeat(50));

  } catch (error) {
    console.error("\n❌ Test Failed:", error.response?.data?.message || error.message);
    if (error.response?.data) {
      console.error("Response data:", JSON.stringify(error.response.data, null, 2));
    }
  }
}

testFullFlow();
