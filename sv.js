// CHECK EMAIL
function checkedEmail(email) {
    return /^[^\s@]+@[^\s@]+$/.test(email)
}

// VALIDATE FORM
function save(){

    let fullname = document.getElementById('full_name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    let gender = '';
    if (document.getElementById("male").checked){
        gender = document.getElementById('male').value;
    } else if (document.getElementById('female').checked){
        gender = document.getElementById('female').value;
    }
    // console.log(gender,fullname,email,phone,address);
    // Nếu mà full name ko được truyền giá trị thì sẽ báo lỗi (isEmpty) 
    // trim() bỏ khoảng trống

    // VALIDATE FULLNAME
    if (_.isEmpty(fullname) || (fullname.trim().length <= 2)) {
        fullname = ''; // xử lí lỗi khi nhập sai định dạng mà values vẫn hiện trong console
        document.getElementById('fullname_error').innerHTML = "Nhập đầy đủ họ tên";
    } else{
        document.getElementById('fullname_error').innerHTML = '';
    }

    // VALIDATE EMAIL
    if (_.isEmpty(email)){
        email = '';
        document.getElementById('email_error').innerHTML = "Nhập đầy đủ email";
    } else if (!checkedEmail(email)){
        email = '';
        document.getElementById('email_error').innerHTML = "Email ko đúng định dạng!";
    } else{
        document.getElementById('email_error').innerHTML = '';
    }

    // VALIDATE PHONE
    if (_.isEmpty(phone)){
        phone = '';
        document.getElementById('phone_error').innerHTML = "Nhâp số điện thoại!";
    } else if (phone.trim().length > 10 ){
        phone = '';
        document.getElementById('phone_error').innerHTML = "Số không đúng định dạng!"
    } else{
        document.getElementById('phone_error').innerHTML = '';
    }

    // VALIDATE ADDRESS
    if (_.isEmpty(address)) {
        address = '';
        document.getElementById('address_error').innerHTML = "Nhập đầy đủ địa chỉ";
    } else{
        document.getElementById('address_error').innerHTML = '';
    }
    if (_.isEmpty(gender)) {
        gender = '';
        document.getElementById('gender_error').innerHTML = "Chọn giới tính!";
    } else {
        document.getElementById('gender_error').innerHTML = '';
    }
    if (fullname && email && phone && address && gender){
        // Lưu trữ = dictionary
        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];// xử lí khi user nhập thêm svien
        students.push({
            fullname: fullname,
            email: email,
            phone: phone,
            address: address,
            gender: gender,
        });
        localStorage.setItem('students',JSON.stringify(students));
        this.listStudent(); // Gọi lại function
    }
}

// LOCAL STORAGE
// setItem (chỉ set kiểu string) và getItem
function listStudent(){ // Cài function này cho body để mổi khi reload trang thì body sẽ giữ nguyên values
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : []; // nếu mà (1) rỗng thì JSON.parse(2) nhận vào là string và tranform thành đối tượng, trái lại gán nó vào list []
    // Tạo biến students và lấy dữ liệu students từ localstorage
    if( students.length === 0 ) return false; // Nếu ko có sinh viên sẽ false 
    // Nếu length > 0 thì sẽ duyệt lệnh dưới
    let tableContent = ` <tr>
       <td style="text-align: center; color:cyan;">STT</td>
       <td style="text-align: center; color:cyan;">Họ và Tên</td>
       <td style="text-align: center; color:cyan;">Email</td>
       <td style="text-align: center; color:cyan;">Điện Thoại</td>
       <td style="text-align: center; color:cyan;">Địa Chỉ</td>
       <td style="text-align: center; color:cyan;">Giới Tính</td>
       <td style="text-align: center; color:cyan;">Hành Động</td>
   </tr>`;
   students.forEach((student,index) => {
    let studentId = index;
    index ++; // bắt đầu từ số 0 sẽ tăng dần theo STT
    tableContent += ` <tr>
       <td style="text-align:center">${index}</td>
       <td style="text-align:center">${student.fullname}</td>
       <td style="text-align:center">${student.email}</td>
       <td style="text-align:center">${student.phone}</td>
       <td style="text-align:center">${student.address}</td>
       <td style="text-align:center">${student.gender}</td>
       <td style="text-align:center">
            <a href="#"><i class="far fa-edit"></i></a> |  <a href="#" onclick="deleteStudents(${studentId})"><i class="fas fa-trash-alt"></i></a>
       </td>
   </tr>`;
   })
   document.getElementById('view_students').innerHTML = tableContent;
}
function deleteStudents(id){ // gán id là STT
    // Phải đọc thông tin từ storage mới có thể xoá được
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : []; 
    students.splice(id, 1);
    localStorage.setItem('students', JSON.stringify(students)); // ép kiểu students thành string vì hàm setItem nó cần string
    listStudent();
}