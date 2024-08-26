document.addEventListener('DOMContentLoaded', function() {
    const studentForm = document.getElementById('studentForm');
    const studentTable = document.getElementById('studentTable')?.getElementsByTagName('tbody')[0];
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Register a new student
    studentForm?.addEventListener('submit', function(e) {
        e.preventDefault();

        const newStudent = {
            name: studentForm.studentName.value,
            id: studentForm.studentId.value,
            email: studentForm.emailId.value,
            contact: studentForm.contactNo.value
        };

        students.push(newStudent);
        localStorage.setItem('students', JSON.stringify(students));
        studentForm.reset();

        if (studentTable) {
            renderTable();
        }
    });

    // Render student table
    function renderTable() {
        studentTable.innerHTML = '';
        students.forEach((student, index) => {
            const row = studentTable.insertRow();
            row.insertCell(0).innerText = student.name;
            row.insertCell(1).innerText = student.id;
            row.insertCell(2).innerText = student.email;
            row.insertCell(3).innerText = student.contact;

            const actionsCell = row.insertCell(4);
            actionsCell.innerHTML = `
                <button onclick="editStudent(${index})" class="glass-button">Edit</button>
                <button onclick="deleteStudent(${index})" class="glass-button">Delete</button>
            `;
        });
    }

    // Edit a student record
    window.editStudent = function(index) {
        const student = students[index];
        studentForm.studentName.value = student.name;
        studentForm.studentId.value = student.id;
        studentForm.emailId.value = student.email;
        studentForm.contactNo.value = student.contact;

        studentForm.onsubmit = function(e) {
            e.preventDefault();
            students[index] = {
                name: studentForm.studentName.value,
                id: studentForm.studentId.value,
                email: studentForm.emailId.value,
                contact: studentForm.contactNo.value
            };
            localStorage.setItem('students', JSON.stringify(students));
            renderTable();
            studentForm.reset();
            studentForm.onsubmit = null;
        };
    };

    // Delete a student record
    window.deleteStudent = function(index) {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
    };

    // Initial rendering of the table
    if (studentTable) {
        renderTable();
    }
});
