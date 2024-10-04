let students = [
    { studentId: "SV001", studentName: "Nguyễn Văn A", age: 20, sex: true, birthDate: "2002-04-23", birthPlace: "HN", address: "25, Vũ Ngọc Phan" },
    { studentId: "SV002", studentName: "Nguyễn Văn B", age: 21, sex: false, birthDate: "2001-09-09", birthPlace: "ĐN", address: "1, Ngô Quyền" },
    { studentId: "SV003", studentName: "Nguyễn Văn C", age: 19, sex: true, birthDate: "2003-07-07", birthPlace: "HCM", address: "1, Lý Tự Trọng" },
    { studentId: "SV004", studentName: "Nguyễn Văn D", age: 29, sex: false, birthDate: "2005-07-07", birthPlace: "HCM", address: "1, Lý Tự Trọng" }
];

// Lưu thông tin sinh viên tạm thời 
let tempStudent = {};

// Hàm hiển thị danh sách sinh viên
function displayStudents(studentsToDisplay) {
    let tbody = $("#studentsTable");
    tbody.empty();
    studentsToDisplay.forEach((student, index) => {
        let gender = student.sex ? "Nam" : "Nữ";
        tbody.append(`
            <tr>
                <td>${index + 1}</td>
                <td>${student.studentId}</td>
                <td>${student.studentName}</td>
                <td>${student.age}</td>
                <td>${gender}</td>
                <td>
                    <button class="btn btn-info btn-sm" onclick="viewStudent('${student.studentId}')">Xem</button>
                    <button class="btn btn-warning btn-sm" onclick="editStudent('${student.studentId}')">Sửa</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteStudent('${student.studentId}')">Xóa</button>
                </td>
            </tr>
        `);
    });
}

function viewStudent(id) {
    let student = students.find(s => s.studentId === id);
    localStorage.setItem('viewStudent', JSON.stringify(student));
    window.location.href = 'student-form.html';
}

// Hàm thêm mới sinh viên
$("#addNewStudent").click(function() {
    localStorage.removeItem('editingStudent'); 
    window.location.href = 'student-form.html';
});

// Hàm lưu sinh viên 
$("#saveStudent").click(function() {
    let studentId = $("#studentId").val();
    let student = {
        studentId: studentId ? studentId : `SV00${students.length + 1}`,
        studentName: $("#studentName").val(),
        age: parseInt($("#age").val()),
        sex: $("#sex").val() === "true",
        birthDate: $("#birthDate").val(),
        birthPlace: $("#birthPlace").val(),
        address: $("#address").val()
    };

    if (studentId) {
       
        let index = students.findIndex(s => s.studentId === studentId);
        students[index] = student;
    } else {
       
        students.push(student);
    }

    localStorage.setItem('students', JSON.stringify(students));
    window.location.href = 'index.html'; 
});

// Hàm sửa sinh viên
function editStudent(id) {
    let student = students.find(s => s.studentId === id);
    localStorage.setItem('editingStudent', JSON.stringify(student));
    window.location.href = 'student-form.html'; 
}

// Khi tải trang form, nếu có sinh viên đang sửa thì điền thông tin vào form
$(document).ready(function() {
    let editingStudent = localStorage.getItem('editingStudent');
    if (editingStudent) {
        let student = JSON.parse(editingStudent);
        $("#studentId").val(student.studentId);
        $("#studentName").val(student.studentName);
        $("#age").val(student.age);
        $("#sex").val(student.sex.toString());
        $("#birthDate").val(student.birthDate);
        $("#birthPlace").val(student.birthPlace);
        $("#address").val(student.address);
    }

    let storedStudents = localStorage.getItem('students');
    if (storedStudents) {
        students = JSON.parse(storedStudents);
        displayStudents(students);
    }
});

// Hàm xóa sinh viên
function deleteStudent(id) {
    students = students.filter(student => student.studentId !== id);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents(students);
}

// Tìm kiếm sinh viên
$("#searchKeyword").on("input", function() {
    let keyword = $(this).val().toLowerCase();
    let filteredStudents = students.filter(student => 
        student.studentName.toLowerCase().includes(keyword) || 
        student.studentId.toLowerCase().includes(keyword)
    );
    displayStudents(filteredStudents);
});
