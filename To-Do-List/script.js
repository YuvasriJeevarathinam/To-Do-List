const APIURL = "https://u8zo4uuzuc.execute-api.us-east-1.amazonaws.com/prod";

let students = [];

// ADD STUDENT
async function addStudent() {

    const name = document.getElementById("studentName").value;
    const rollNo = document.getElementById("rollNo").value;
    const course = document.getElementById("Course").value;

    // Validation
    if (!name || !rollNo || !course) {
        alert("Please fill all fields");
        return;
    }

    const student = {
        name: name,
        rollNo: rollNo,
        course: course,
        status: "Pending"
    };

    try {

        const response = await fetch(`${APIURL}/addstudent`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(student)
        });

        if (!response.ok) {
            throw new Error("Add request failed");
        }

        const data = await response.json();

        alert(data.message);

        // Add new student to frontend array
        students.push({
            ...student,
            taskId: data.taskId
        });

        renderStudents();

        // Clear input fields
        document.getElementById("studentName").value = "";
        document.getElementById("rollNo").value = "";
        document.getElementById("Course").value = "";

    } catch (error) {

        console.error("Add Error:", error);

        alert("Error adding student");
    }
}

// RENDER TABLE
function renderStudents() {

    const table = document.getElementById("studentTable");

    table.innerHTML = "";

    students.forEach(student => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${student.name}</td>

            <td>${student.rollNo}</td>

            <td>${student.course}</td>

            <td class="${student.status === 'Completed' ? 'completed' : 'pending'}">
                ${student.status}
            </td>

            <td>

                <button class="action-btn complete-btn"
                    onclick="completeStudent('${student.taskId}')">
                    Complete
                </button>

                <button class="action-btn delete-btn"
                    onclick="deleteStudent('${student.taskId}')">
                    Delete
                </button>

            </td>
        `;

        table.appendChild(row);
    });
}

// COMPLETE STUDENT
async function completeStudent(taskId) {

    try {

        const response = await fetch(`${APIURL}/completestudent`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                taskId: taskId
            })
        });

        if (!response.ok) {
            throw new Error("Complete request failed");
        }

        const data = await response.json();

        alert(data.message);

        // Update frontend status
        students = students.map(student =>
            student.taskId === taskId
                ? { ...student, status: "Completed" }
                : student
        );

        renderStudents();

    } catch (error) {

        console.error("Complete Error:", error);

        alert("Error updating status");
    }
}

// DELETE STUDENT
async function deleteStudent(taskId) {

    try {

        const response = await fetch(`${APIURL}/deletestudent`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                taskId: taskId
            })
        });

        if (!response.ok) {
            throw new Error("Delete request failed");
        }

        const data = await response.json();

        alert(data.message);

        // Remove student from frontend
        students = students.filter(
            student => student.taskId !== taskId
        );

        renderStudents();

    } catch (error) {

        console.error("Delete Error:", error);

        alert("Error deleting student");
    }
}